import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/mailer";

const schema = z.object({
  email: z.string().email().toLowerCase().trim(),
  otp: z.string().length(6).regex(/^\d{6}$/, "OTP must be 6 digits"),
});

const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid OTP format — must be 6 digits." },
        { status: 400 }
      );
    }

    const { email, otp } = parsed.data;

    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        email: true,
        emailVerified: true,
        otpCode: true,
        otpExpiresAt: true,
        otpAttempts: true,
        status: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email." },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email is already verified. Please sign in.", code: "ALREADY_VERIFIED" },
        { status: 409 }
      );
    }

    if (!user.otpCode || !user.otpExpiresAt) {
      return NextResponse.json(
        { error: "No OTP found. Please request a new code.", code: "NO_OTP" },
        { status: 400 }
      );
    }

    // Check attempts
    if (user.otpAttempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: "Too many failed attempts. Please request a new OTP.", code: "TOO_MANY_ATTEMPTS" },
        { status: 429 }
      );
    }

    // Check expiry
    if (user.otpExpiresAt < new Date()) {
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one.", code: "OTP_EXPIRED" },
        { status: 400 }
      );
    }

    // Validate OTP
    if (user.otpCode !== otp) {
      // Increment attempts
      await db.user.update({
        where: { id: user.id },
        data: { otpAttempts: { increment: 1 } },
      });

      const attemptsLeft = MAX_ATTEMPTS - (user.otpAttempts + 1);
      return NextResponse.json(
        {
          error: `Incorrect code. ${attemptsLeft} attempt${attemptsLeft !== 1 ? "s" : ""} remaining.`,
          code: "WRONG_OTP",
        },
        { status: 400 }
      );
    }

    // ✅ OTP is correct — verify user and set session
    const now = new Date();
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        status: "ACTIVE",
        otpCode: null,
        otpExpiresAt: null,
        otpAttempts: 0,
        emailsMonthResetAt: now,
        lastLoginAt: now,
      },
    });

    // Set session
    await setSession(user.id);

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, user.firstName).catch((err) =>
      console.error("[verify-otp] welcome email failed:", err)
    );

    return NextResponse.json({ success: true, redirect: "/dashboard" });
  } catch (err) {
    console.error("[verify-otp]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
