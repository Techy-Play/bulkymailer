import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyPassword, setSession } from "@/lib/auth";
import { setActiveOrganizationId } from "@/lib/auth/organization-context";

const schema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // Find the user by email
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // NEW: Block Super Admins from using the normal login page.
    if (user.isSuperAdmin) {
      return NextResponse.json(
        { error: "Super Admins must use the dedicated Super Admin Portal." },
        { status: 403 }
      );
    }

    // Verify password against the stored hash
    const passwordValid = await verifyPassword(password, user.passwordHash);

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (user.status === "SUSPENDED") {
      return NextResponse.json(
        {
          error:
            "Your account has been suspended. Contact support@bulkymailer.com.",
        },
        { status: 403 }
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error: "Please verify your email before logging in.",
          code: "EMAIL_NOT_VERIFIED",
        },
        { status: 403 }
      );
    }

    // Update lastLoginAt
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Set HttpOnly session cookie
    await setSession(user.id);

    // Initialize organization context if the user has exactly one active organization
    const activeMemberships = await db.organizationMembership.findMany({
      where: { userId: user.id, status: "ACTIVE" }
    });
    
    if (activeMemberships.length === 1) {
      await setActiveOrganizationId(activeMemberships[0].organizationId);
    }

    // Redirect destination
    const redirect = user.isOnboardingCompleted ? "/dashboard" : "/onboarding";

    return NextResponse.json({ success: true, redirect });
  } catch (err) {
    console.error("[login]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

