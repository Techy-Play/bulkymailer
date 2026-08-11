import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadTemplateImageToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId, accessToken, filename } = await req.json();

    if (!fileId || !accessToken) {
      return NextResponse.json({ error: "Missing fileId or accessToken" }, { status: 400 });
    }

    // Download the file from Google Drive
    const driveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    const response = await fetch(driveUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[GOOGLE_DRIVE_DOWNLOAD_ERROR]", errorText);
      return NextResponse.json({ error: "Failed to download image from Google Drive" }, { status: 500 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const sizeBytes = buffer.byteLength;

    // Upload to Cloudinary
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const publicId = `template-image-${uniqueId}`;

    const { url, width, height } = await uploadTemplateImageToCloudinary(
      buffer,
      "bulkymailer/template-assets",
      publicId
    );

    // Save to Media Library
    await db.mediaAsset.create({
      data: {
        userId,
        url,
        filename: filename || `gdrive-${uniqueId}`,
        width,
        height,
        sizeBytes,
        mimeType: contentType,
      },
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (error: any) {
    console.error("[MEDIA_GOOGLE_DRIVE_ERROR]", error);
    return NextResponse.json({ error: "Failed to process Google Drive image" }, { status: 500 });
  }
}
