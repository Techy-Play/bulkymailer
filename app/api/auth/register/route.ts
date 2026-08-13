import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, generateOtp } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/mailer";

const schema = z.object({
  // Personal
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  phoneNumber: z.string().optional().transform((v) => v?.trim() || undefined),

  // Organization
  companyName: z.string().min(1).max(100).trim(),
  website: z
    .string()
    .optional()
    .transform((v) => {
      if (!v?.trim()) return undefined;
      const s = v.trim();
      return /^https?:\/\//i.test(s) ? s : `https://${s}`;
    }),

  // Address
  addressLine1: z.string().min(1).max(200).trim(),
  addressLine2: z.string().optional().transform((v) => v?.trim() || undefined),
  city: z.string().min(1).max(100).trim(),
  state: z.string().optional().transform((v) => v?.trim() || undefined),
  postalCode: z.string().min(1).max(20).trim(),
  country: z.string().min(1).max(100).trim(),

  // Business profile
  teamSize: z.enum(["SOLO", "TWO_TO_FIVE", "SIX_TO_TEN", "ELEVEN_TO_FIFTY", "FIFTY_PLUS"]),
  contactRange: z.enum(["LESS_THAN_1000", "FROM_1K_TO_5K", "FROM_5K_TO_20K", "FROM_20K_TO_50K", "ABOVE_50K"]),
  sellsOnline: z.boolean(),
  marketingOptIn: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      companyName,
      website,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      teamSize,
      contactRange,
      sellsOnline,
      marketingOptIn,
    } = parsed.data;

    // Check for existing account
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Generate 6-digit OTP (expires in 10 minutes)
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Create Organization + User in one transaction
    const result = await db.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          name: companyName,
          website,
          addressLine1,
          addressLine2,
          city,
          state,
          postalCode,
          country,
          teamSize,
          contactRange,
          sellsOnline,
          marketingOptIn,
        },
      });

      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          passwordHash,
          phoneNumber,
          organizationId: org.id,
          isOnboardingCompleted: true, // All data collected at signup
          otpCode: otp,
          otpExpiresAt,
          otpAttempts: 0,
        },
      });

      await tx.organizationMembership.create({
        data: {
          userId: user.id,
          organizationId: org.id,
          role: "OWNER",
          status: "ACTIVE",
        },
      });

      return { user, org };
    });

    // Send OTP email
    await sendOtpEmail(email, otp, firstName);

    return NextResponse.json(
      { success: true, email },
      { status: 201 }
    );
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
