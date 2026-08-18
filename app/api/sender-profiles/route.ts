import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { getActiveOrganizationId, requirePermission } from "@/lib/auth/organization-context";
import { db } from "@/lib/db";
import { z } from "zod";

const emailSchema = z.string().email();

export async function GET(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "organization.settings");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const profiles = await db.senderProfile.findMany({
      where: { organizationId: orgId },
      orderBy: [
        { isDefault: "desc" },
        { createdAt: "desc" }
      ]
    });

    const org = await db.organization.findUnique({
      where: { id: orgId },
      include: { emailProvider: true }
    });

    if (org?.emailProvider?.fromEmail && org?.emailProvider?.provider === "SMTP") {
      profiles.push({
        id: "smtp_org_default",
        userId: org.ownerUserId || userId,
        organizationId: orgId,
        fromName: org.emailProvider.fromName || "Org SMTP Default",
        fromEmail: org.emailProvider.fromEmail,
        replyTo: org.emailProvider.replyTo || null,
        isDefault: profiles.length === 0,
        createdAt: org.emailProvider.createdAt,
        updatedAt: org.emailProvider.updatedAt
      } as any);
    } else if (!org?.emailProvider || org?.emailProvider?.provider !== "SMTP") {
      const personalOrg = await db.organization.findFirst({
        where: { ownerUserId: userId, type: "PERSONAL" },
        include: { emailProvider: true }
      });
      if (personalOrg?.emailProvider?.fromEmail && personalOrg?.emailProvider?.provider === "SMTP") {
        profiles.push({
          id: "smtp_personal_default",
          userId,
          organizationId: orgId,
          fromName: personalOrg.emailProvider.fromName || "Personal SMTP Default",
          fromEmail: personalOrg.emailProvider.fromEmail,
          replyTo: personalOrg.emailProvider.replyTo || null,
          isDefault: profiles.length === 0,
          createdAt: personalOrg.emailProvider.createdAt,
          updatedAt: personalOrg.emailProvider.updatedAt
        } as any);
      }
    }

    return NextResponse.json({ profiles });
  } catch (err) {
    console.error("[sender_profiles_GET]", err);
    return NextResponse.json({ error: "Failed to fetch sender profiles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "organization.settings");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { fromName, fromEmail, replyTo, isDefault } = await req.json();

    if (!fromName || !fromEmail) {
      return NextResponse.json({ error: "fromName and fromEmail are required" }, { status: 400 });
    }

    const emailParse = emailSchema.safeParse(fromEmail);
    if (!emailParse.success) {
      return NextResponse.json({ error: emailParse.error.issues[0].message }, { status: 400 });
    }

    if (replyTo) {
      const replyParse = emailSchema.safeParse(replyTo);
      if (!replyParse.success) {
        return NextResponse.json({ error: replyParse.error.issues[0].message }, { status: 400 });
      }
    }

    if (isDefault) {
      await db.senderProfile.updateMany({
        where: { organizationId: orgId },
        data: { isDefault: false }
      });
    }

    const profile = await db.senderProfile.create({
      data: {
        userId,
        organizationId: orgId,
        fromName,
        fromEmail,
        replyTo,
        isDefault: !!isDefault
      }
    });

    return NextResponse.json({ profile });
  } catch (err) {
    console.error("[sender_profiles_POST]", err);
    return NextResponse.json({ error: "Failed to create sender profile" }, { status: 500 });
  }
}
