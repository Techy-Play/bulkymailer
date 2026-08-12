import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";
import { uploadLogoToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "organization.settings");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPG, PNG, WEBP, or SVG." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const url = await uploadLogoToCloudinary(
      buffer,
      "bulkymailer/logos",
      `org_${orgId}`
    );

    // Update organization logoUrl
    await db.organization.update({
      where: { id: orgId },
      data: { logoUrl: url },
    });

    return NextResponse.json({ success: true, url });
  } catch (err) {
    console.error("[upload/org-logo]", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
