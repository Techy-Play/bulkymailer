import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";
import { parse } from "csv-parse/sync";
import * as XLSX from "xlsx";
import { Prisma } from "@/app/generated/prisma/client";

interface ParsedRow {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  customFields?: Record<string, string>;
}

function toJson(v?: Record<string, string>): Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue | undefined {
  if (!v || Object.keys(v).length === 0) return Prisma.JsonNull;
  return v as Prisma.InputJsonValue;
}

function normalizeHeaders(headers: string[]): Record<number, string> {
  const map: Record<number, string> = {};
  headers.forEach((h, i) => {
    const clean = h.toLowerCase().replace(/[^a-z0-9]/g, "");
    map[i] = clean;
  });
  return map;
}

function findColumn(headerMap: Record<number, string>, aliases: string[]): number {
  for (const [idx, name] of Object.entries(headerMap)) {
    if (aliases.some((a) => name.includes(a))) return Number(idx);
  }
  return -1;
}

function parseRows(rawRows: Record<string, string>[]): ParsedRow[] {
  const results: ParsedRow[] = [];
  const knownFields = ["email", "firstname", "first_name", "lastname", "last_name", "phone", "mobile", "telephone"];

  for (const row of rawRows) {
    const keys = Object.keys(row);
    const headerMap = normalizeHeaders(keys);

    const emailIdx = findColumn(headerMap, ["email", "mail"]);
    const firstIdx = findColumn(headerMap, ["firstname", "first_name", "first"]);
    const lastIdx = findColumn(headerMap, ["lastname", "last_name", "last"]);
    const phoneIdx = findColumn(headerMap, ["phone", "mobile", "telephone", "tel"]);

    if (emailIdx < 0) continue; // skip rows without email column

    const emailKey = keys[emailIdx];
    const email = row[emailKey]?.trim().toLowerCase();
    if (!email || !email.includes("@")) continue;

    const parsed: ParsedRow = { email };
    if (firstIdx >= 0) parsed.firstName = row[keys[firstIdx]]?.trim();
    if (lastIdx >= 0) parsed.lastName = row[keys[lastIdx]]?.trim();
    if (phoneIdx >= 0) parsed.phone = row[keys[phoneIdx]]?.trim();

    const customFields: Record<string, string> = {};
    for (const [idx, name] of Object.entries(headerMap)) {
      if (!knownFields.includes(name)) {
        const val = row[keys[Number(idx)]]?.trim();
        if (val) customFields[name] = val;
      }
    }
    if (Object.keys(customFields).length > 0) {
      parsed.customFields = customFields;
    }

    results.push(parsed);
  }

  return results;
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "contact.import");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const listId = formData.get("listId") as string | null;
    const newListName = formData.get("newListName") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Verify list ownership or create new list
    let targetListId = listId;
    if (!targetListId && newListName) {
      const list = await db.contactList.create({
        data: { name: newListName.trim(), userId, organizationId: orgId },
      });
      targetListId = list.id;
    } else if (targetListId) {
      const list = await db.contactList.findFirst({
        where: { id: targetListId, organizationId: orgId },
      });
      if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 });
    } else {
      return NextResponse.json(
        { error: "Provide listId or newListName" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name.toLowerCase();

    let rawRows: Record<string, string>[] = [];

    if (fileName.endsWith(".csv")) {
      rawRows = parse(buffer, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }) as Record<string, string>[];
    } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      rawRows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Use CSV or Excel (.xlsx/.xls)." },
        { status: 400 }
      );
    }

    const parsedRows = parseRows(rawRows);

    if (parsedRows.length === 0) {
      return NextResponse.json(
        { error: "No valid contacts found. Ensure file has an 'email' column." },
        { status: 400 }
      );
    }

    // Bulk upsert contacts
    let imported = 0;
    let duplicates = 0;
    const errors: string[] = [];

    for (const row of parsedRows) {
      try {
        await db.contact.upsert({
          where: { email_listId: { email: row.email, listId: targetListId! } },
          create: {
            email: row.email,
            firstName: row.firstName,
            lastName: row.lastName,
            phone: row.phone,
            customFields: toJson(row.customFields),
            listId: targetListId!,
          },
          update: {
            firstName: row.firstName,
            lastName: row.lastName,
            phone: row.phone,
            customFields: toJson(row.customFields),
          },
        });
        imported++;
      } catch {
        duplicates++;
        errors.push(row.email);
      }
    }

    return NextResponse.json({
      success: true,
      listId: targetListId,
      imported,
      duplicates,
      errors: errors.slice(0, 10), // Return first 10 error emails
    });
  } catch (err) {
    console.error("[contacts/import]", err);
    return NextResponse.json(
      { error: "Import failed. Please check your file format." },
      { status: 500 }
    );
  }
}
