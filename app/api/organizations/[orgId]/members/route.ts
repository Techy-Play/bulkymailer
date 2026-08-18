import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/organization-context";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    
    // Verify authorization
    const context = await requirePermission(orgId, "member.view");
    if (!context) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (context.organization.type === "PERSONAL") {
      return NextResponse.json({ error: "Personal workspaces do not support members." }, { status: 403 });
    }

    const memberships = await db.organizationMembership.findMany({
      where: { organizationId: orgId },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json({ memberships });
  } catch (error) {
    console.error("[get_members_error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
