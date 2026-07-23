import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

// Normalize website URL — strip leading protocol, add https on save
function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

const schema = z.object({
  companyName: z.string().min(1).max(100).trim(),
  website: z.string().optional().transform((v) => (v ? normalizeUrl(v) : undefined)),
  addressLine1: z.string().min(1).max(200).trim(),
  addressLine2: z.string().optional().transform((v) => v?.trim() || undefined),
  city: z.string().min(1).max(100).trim(),
  state: z.string().optional().transform((v) => v?.trim() || undefined),
  postalCode: z.string().min(1).max(20).trim(),
  country: z.string().min(1).max(100).trim(),
  teamSize: z.enum([
    "SOLO",
    "TWO_TO_FIVE",
    "SIX_TO_TEN",
    "ELEVEN_TO_FIFTY",
    "FIFTY_PLUS",
  ]),
  contactRange: z.enum([
    "LESS_THAN_1000",
    "FROM_1K_TO_5K",
    "FROM_5K_TO_20K",
    "FROM_20K_TO_50K",
    "ABOVE_50K",
  ]),
  sellsOnline: z.boolean(),
  phoneNumber: z.string().optional().transform((v) => v?.trim() || undefined),
  marketingOptIn: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
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
      phoneNumber,
      marketingOptIn,
    } = parsed.data;

    // Create the organization
    const org = await db.organization.create({
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

    // Link org to user and mark onboarding complete
    await db.user.update({
      where: { id: userId },
      data: {
        organizationId: org.id,
        isOnboardingCompleted: true,
        ...(phoneNumber ? { phoneNumber } : {}),
      },
    });

    return NextResponse.json({ success: true, redirect: "/dashboard" });
  } catch (err) {
    console.error("[onboarding]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
