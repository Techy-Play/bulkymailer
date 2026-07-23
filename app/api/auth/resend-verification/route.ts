import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateOtp } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/mailer";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().toLowerCase().trim(),
});

// Simple in-memory rate limiter
const lastSent = new Map<string, number>();
const RATE_LIMIT_MS = 60_000; // 60 seconds

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = parsed.data;

    // Rate limit check
    const last = lastSent.get(email);
    if (last && Date.now() - last < RATE_LIMIT_MS) {
      const secondsLeft = Math.ceil((RATE_LIMIT_MS - (Date.now() - last)) / 1000);
      return NextResponse.json(
        { error: `Please wait ${secondsLeft}s before requesting another code.` },
        { status: 429 }
      );
    }

    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, firstName: true, emailVerified: true },
    });

    // Return success even if user not found — prevent enumeration
    if (!user || user.emailVerified) {
      return NextResponse.json({ success: true });
    }

    // Generate new OTP
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await db.user.update({
      where: { id: user.id },
      data: { otpCode: otp, otpExpiresAt, otpAttempts: 0 },
    });

    await sendOtpEmail(email, otp, user.firstName);

    lastSent.set(email, Date.now());

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[resend-verification]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
