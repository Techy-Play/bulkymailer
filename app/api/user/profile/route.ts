import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";

const updateSchema = z.object({
  firstName: z.string().min(1).max(50).trim().optional(),
  lastName: z.string().min(1).max(50).trim().optional(),
  phoneNumber: z.string().max(50).optional().transform((v) => v?.trim() || undefined),
});

export async function GET() {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profileImageUrl: true,
        navLayout: true,
        emailsSentThisMonth: true,
        subscriptionType: true,
        organization: {
          select: {
            name: true,
            website: true,
            logoUrl: true,
            addressLine1: true,
            city: true,
            state: true,
            country: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ profile: user });
  } catch (err) {
    console.error("[user/profile GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const updated = await db.user.update({
      where: { id: userId },
      data: parsed.data,
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error("[user/profile PATCH]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
