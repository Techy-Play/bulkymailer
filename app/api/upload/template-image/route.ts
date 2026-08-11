import { NextResponse } from "next/server";
import { uploadTemplateImageToCloudinary } from "@/lib/cloudinary";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate a unique ID using timestamp and random string
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const publicId = `template-image-${uniqueId}`;

    const { url, width, height } = await uploadTemplateImageToCloudinary(
      buffer,
      "bulkymailer/template-assets",
      publicId
    );

    // Create the MediaAsset in the database
    await db.mediaAsset.create({
      data: {
        userId,
        url,
        filename: file.name || "uploaded-image",
        width,
        height,
        sizeBytes: file.size,
        mimeType: file.type,
      },
    });

    // As requested, return ONLY the canonical { url } for onRequestMedia to consume
    return NextResponse.json({ url }, { status: 200 });
  } catch (error: any) {
    console.error("[UPLOAD_TEMPLATE_IMAGE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
