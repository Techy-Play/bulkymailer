import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const SALT_ROUNDS = 12;
const SESSION_COOKIE = "bm_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// ---------------------------------------------------------------------------
// Password helpers
// ---------------------------------------------------------------------------

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ---------------------------------------------------------------------------
// Session cookie
// ---------------------------------------------------------------------------

export async function setSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

/** Returns the full User record for the current session, or null. */
export async function getSessionUser() {
  const userId = await getSessionUserId();
  if (!userId) return null;
  return db.user.findUnique({
    where: { id: userId },
    include: { organization: true },
  });
}

// ---------------------------------------------------------------------------
// OTP — 6-digit numeric code
// ---------------------------------------------------------------------------

export function generateOtp(): string {
  // Cryptographically random 6-digit number (100000–999999)
  const { randomInt } = require("crypto") as typeof import("crypto");
  return String(randomInt(100000, 1000000));
}

/** @deprecated Use OTP flow instead — kept for resend-verification compat */
export function generateVerificationToken(): string {
  const { randomBytes } = require("crypto") as typeof import("crypto");
  return randomBytes(32).toString("hex");
}

// ---------------------------------------------------------------------------
// Free-tier email quota helpers (100/month)
// ---------------------------------------------------------------------------

export const FREE_TIER_MONTHLY_LIMIT = 100;

/**
 * Check if user is within their monthly email limit.
 * Resets counter if a new month has begun.
 */
export async function checkAndIncrementEmailQuota(
  userId: string
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      emailsSentThisMonth: true,
      emailsMonthResetAt: true,
      subscriptionType: true,
    },
  });

  if (!user) return { allowed: false, used: 0, limit: FREE_TIER_MONTHLY_LIMIT };

  const now = new Date();
  const resetDate = user.emailsMonthResetAt;
  const needsReset =
    !resetDate ||
    resetDate.getFullYear() !== now.getFullYear() ||
    resetDate.getMonth() !== now.getMonth();

  let currentCount = user.emailsSentThisMonth;

  if (needsReset) {
    // Reset counter for new month
    await db.user.update({
      where: { id: userId },
      data: { emailsSentThisMonth: 0, emailsMonthResetAt: now },
    });
    currentCount = 0;
  }

  const limit = FREE_TIER_MONTHLY_LIMIT; // Only free tier for now
  const allowed = currentCount < limit;

  if (allowed) {
    await db.user.update({
      where: { id: userId },
      data: { emailsSentThisMonth: { increment: 1 } },
    });
  }

  return { allowed, used: currentCount, limit };
}
