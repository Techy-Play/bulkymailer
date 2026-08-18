import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, generateOtp } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/mailer";

const schema = z.object({
  workspaceType: z.enum(["PERSONAL", "ORGANIZATION"]).default("ORGANIZATION"),

  // Personal
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  phoneNumber: z.string().optional().transform((v) => v?.trim() || undefined),

  // Organization (now optional for personal workspaces)
  companyName: z.string().max(100).trim().optional(),
  website: z
    .string()
    .optional()
    .transform((v) => {
      if (!v?.trim()) return undefined;
      const s = v.trim();
      return /^https?:\/\//i.test(s) ? s : `https://${s}`;
    }),

  // Address
  addressLine1: z.string().max(200).trim().optional(),
  addressLine2: z.string().optional().transform((v) => v?.trim() || undefined),
  city: z.string().max(100).trim().optional(),
  state: z.string().optional().transform((v) => v?.trim() || undefined),
  postalCode: z.string().max(20).trim().optional(),
  country: z.string().max(100).trim().optional(),

  // Business profile
  teamSize: z.enum(["SOLO", "TWO_TO_FIVE", "SIX_TO_TEN", "ELEVEN_TO_FIFTY", "FIFTY_PLUS"]).optional(),
  contactRange: z.enum(["LESS_THAN_1000", "FROM_1K_TO_5K", "FROM_5K_TO_20K", "FROM_20K_TO_50K", "ABOVE_50K"]).optional(),
  sellsOnline: z.boolean().optional(),
  marketingOptIn: z.boolean().default(true),
}).superRefine((data, ctx) => {
  if (data.workspaceType === "ORGANIZATION") {
    if (!data.companyName?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Company name is required", path: ["companyName"] });
    if (!data.addressLine1?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Address is required", path: ["addressLine1"] });
    if (!data.city?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "City is required", path: ["city"] });
    if (!data.postalCode?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Postal code is required", path: ["postalCode"] });
    if (!data.country?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Country is required", path: ["country"] });
    if (!data.teamSize) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Team size is required", path: ["teamSize"] });
    if (!data.contactRange) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Contact range is required", path: ["contactRange"] });
    if (data.sellsOnline === undefined) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Sells online is required", path: ["sellsOnline"] });
  }
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
      workspaceType,
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

    const result = await db.$transaction(async (tx) => {
      // 1. Create the user first so we have their ID
      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          passwordHash,
          phoneNumber,
          isOnboardingCompleted: true, // All data collected at signup
          otpCode: otp,
          otpExpiresAt,
          otpAttempts: 0,
        },
      });

      // 2. Create the Organization (either PERSONAL or ORGANIZATION)
      const orgName = workspaceType === "PERSONAL" ? `${firstName}'s Workspace` : (companyName || `${firstName}'s Org`);
      
      const org = await tx.organization.create({
        data: {
          name: orgName,
          type: workspaceType,
          ownerUserId: workspaceType === "PERSONAL" ? user.id : undefined,
          website,
          addressLine1: addressLine1 || null,
          addressLine2,
          city: city || null,
          state,
          postalCode: postalCode || null,
          country: country || null,
          teamSize: teamSize || null,
          contactRange: contactRange || null,
          sellsOnline: sellsOnline ?? null,
          marketingOptIn,
        },
      });

      // 3. Update the user with the legacy organizationId (still used for session contexts)
      await tx.user.update({
        where: { id: user.id },
        data: { organizationId: org.id },
      });

      // 4. Create OrganizationMembership ONLY if it's an ORGANIZATION workspace
      if (workspaceType === "ORGANIZATION") {
        await tx.organizationMembership.create({
          data: {
            userId: user.id,
            organizationId: org.id,
            role: "OWNER",
            status: "ACTIVE",
          },
        });
      }

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
