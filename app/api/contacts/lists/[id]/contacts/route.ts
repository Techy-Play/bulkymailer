import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@/app/generated/prisma/client";

const contactSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  customFields: z.record(z.string(), z.string()).optional(),
});

const updateSchema = z.object({
  id: z.string(),
  email: z.string().email().toLowerCase().trim().optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  customFields: z.record(z.string(), z.string()).optional(),
});

function toJsonField(v: Record<string, any> | undefined): Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue | undefined {
  if (v === undefined) return undefined;
  return v as Prisma.InputJsonValue;
}

async function verifyListOwnership(listId: string, userId: string) {
  return db.contactList.findFirst({ where: { id: listId, userId } });
}

type Params = Promise<{ id: string }>;

// POST — add single contact
export async function POST(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id: listId } = await context.params;
    const list = await verifyListOwnership(listId, userId);
    if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 });

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const contact = await db.contact.upsert({
      where: { email_listId: { email: parsed.data.email, listId } },
      create: {
        email: parsed.data.email,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone,
        customFields: toJsonField(parsed.data.customFields),
        listId,
      },
      update: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone,
        customFields: toJsonField(parsed.data.customFields),
      },
    });

    return NextResponse.json({ contact }, { status: 201 });
  } catch (err) {
    console.error("[contacts POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT — update a single contact
export async function PUT(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id: listId } = await context.params;
    const list = await verifyListOwnership(listId, userId);
    if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 });

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { id: contactId, customFields, ...rest } = parsed.data;

    const contact = await db.contact.update({
      where: { id: contactId },
      data: {
        ...rest,
        customFields: toJsonField(customFields),
      },
    });

    return NextResponse.json({ contact });
  } catch (err) {
    console.error("[contacts PUT]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE — remove a contact
export async function DELETE(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id: listId } = await context.params;
    const list = await verifyListOwnership(listId, userId);
    if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 });

    const { contactId } = await req.json();
    if (!contactId) return NextResponse.json({ error: "contactId required" }, { status: 400 });

    await db.contact.delete({ where: { id: contactId } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contacts DELETE]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
