import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission, requireSuperAdmin } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = await requireSuperAdmin();
    let orgId = await getActiveOrganizationId();
    
    if (!admin) {
      if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });
      const __perm = await requirePermission(orgId, "media.view");
      if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    } else {
      orgId = null;
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    let orgLogoUrl = null;
    if (orgId) {
      const org = await db.organization.findUnique({
        where: { id: orgId },
        select: { logoUrl: true }
      });
      orgLogoUrl = org?.logoUrl || null;
    }

    const mediaAssets = await db.mediaAsset.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    return NextResponse.json({ items: mediaAssets, orgLogoUrl });
  } catch (error: any) {
    console.error("[MEDIA_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch media assets" }, { status: 500 });
  }
}
