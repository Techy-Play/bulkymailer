import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
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

    const secureUrl = await uploadToCloudinary(
      buffer,
      "bulkymailer/template-assets",
      publicId,
      "image"
    );

    return NextResponse.json({ url: secureUrl }, { status: 200 });
  } catch (error: any) {
    console.error("[UPLOAD_TEMPLATE_IMAGE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
