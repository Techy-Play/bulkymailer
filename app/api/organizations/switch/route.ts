import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { setActiveOrganizationId } from "@/lib/auth/organization-context";
import { z } from "zod";

const SwitchSchema = z.object({
  organizationId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = SwitchSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid organization ID" }, { status: 400 });
    }

    const { organizationId } = result.data;

    // Verify membership exists and is active
    const membership = await db.organizationMembership.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId: user.id,
        },
      },
      include: {
        organization: true,
      },
    });

    if (!membership || membership.status !== "ACTIVE") {
      return NextResponse.json({ error: "Forbidden: Not an active member of this organization" }, { status: 403 });
    }

    // Set the cookie
    await setActiveOrganizationId(organizationId);

    // Optional: Log organization switch to audit log if necessary (as per phase 18 rules)
    await db.auditLog.create({
      data: {
        actorUserId: user.id,
        organizationId: organizationId,
        action: "ORGANIZATION_SWITCHED",
        resourceType: "ORGANIZATION",
        resourceId: organizationId,
        metadata: {
          timestamp: new Date().toISOString()
        }
      }
    });

    return NextResponse.json({
      success: true,
      organization: membership.organization,
      role: membership.role
    });

  } catch (error) {
    console.error("[org_switch_error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
