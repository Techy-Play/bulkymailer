import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { organization: { select: { logoUrl: true } } }
    });

    const orgLogoUrl = user?.organization?.logoUrl || null;

    const mediaAssets = await db.mediaAsset.findMany({
      where: { userId },
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
