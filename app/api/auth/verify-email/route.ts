import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/mailer";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/verify-email?error=missing_token", req.url)
    );
  }

  const record = await db.emailVerificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record) {
    return NextResponse.redirect(
      new URL("/verify-email?error=invalid_token", req.url)
    );
  }

  if (record.expiresAt < new Date()) {
    // Clean up expired token
    await db.emailVerificationToken.delete({ where: { id: record.id } });
    return NextResponse.redirect(
      new URL("/verify-email?error=expired_token", req.url)
    );
  }

  // Mark user as verified and active
  await db.user.update({
    where: { id: record.userId },
    data: {
      emailVerified: true,
      status: "ACTIVE",
    },
  });

  // Delete used token
  await db.emailVerificationToken.delete({ where: { id: record.id } });

  // Send welcome email
  try {
    await sendWelcomeEmail(record.user.email, record.user.firstName);
  } catch {
    // Non-fatal — don't block the redirect
  }

  return NextResponse.redirect(new URL("/verify-email?success=1", req.url));
}
