import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";

const createSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  description: z.string().max(500).optional(),
});

export async function GET() {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "contact.view");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const lists = await db.contactList.findMany({
      where: { organizationId: orgId },
      include: {
        _count: { select: { contacts: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ lists });
  } catch (err) {
    console.error("[contacts/lists GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "contact.edit");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const list = await db.contactList.create({
      data: {
        ...parsed.data,
        userId,
        organizationId: orgId,
      },
    });

    return NextResponse.json({ list }, { status: 201 });
  } catch (err) {
    console.error("[contacts/lists POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
