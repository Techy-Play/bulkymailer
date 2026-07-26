import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        organization: user.organization ? { name: user.organization.name } : null,
      },
    });
  } catch (err: any) {
    console.error("[auth_me_GET]", err);
    return NextResponse.json({ authenticated: false, user: null });
  }
}
