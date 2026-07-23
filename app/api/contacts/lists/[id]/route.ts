import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";

async function getListOrFail(listId: string, userId: string) {
  const list = await db.contactList.findFirst({
    where: { id: listId, userId },
  });
  return list;
}

// GET /api/contacts/lists/[id] — list metadata + contacts (paginated)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const perPage = 50;
    const search = url.searchParams.get("search") ?? "";

    const list = await getListOrFail(id, userId);
    if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 });

    const where = {
      listId: id,
      ...(search
        ? {
            OR: [
              { email: { contains: search, mode: "insensitive" as const } },
              { firstName: { contains: search, mode: "insensitive" as const } },
              { lastName: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [contacts, total] = await Promise.all([
      db.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      db.contact.count({ where }),
    ]);

    return NextResponse.json({ list, contacts, total, page, perPage });
  } catch (err) {
    console.error("[contacts/lists/[id] GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/contacts/lists/[id] — update list metadata
const updateSchema = z.object({
  name: z.string().min(1).max(100).trim().optional(),
  description: z.string().max(500).optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    const list = await getListOrFail(id, userId);
    if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 });

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const updated = await db.contactList.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json({ list: updated });
  } catch (err) {
    console.error("[contacts/lists/[id] PUT]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/contacts/lists/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    const list = await getListOrFail(id, userId);
    if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 });

    await db.contactList.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contacts/lists/[id] DELETE]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
