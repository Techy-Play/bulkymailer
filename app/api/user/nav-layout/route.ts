import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({
  navLayout: z.enum(["sidebar", "topnav"]),
});

export async function PATCH(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "navLayout must be 'sidebar' or 'topnav'" },
        { status: 400 }
      );
    }

    await db.user.update({
      where: { id: userId },
      data: { navLayout: parsed.data.navLayout },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[user/nav-layout]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
