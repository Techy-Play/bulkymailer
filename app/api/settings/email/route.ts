import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireActiveOrganization, requirePermission } from "@/lib/auth/organization-context";
import { encrypt } from "@/lib/encryption";
import { EmailProviderType } from "@/app/generated/prisma/client";

export async function GET() {
  try {
    const orgContext = await requireActiveOrganization();
    if (!orgContext) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let permitted = await requirePermission(orgContext.organization.id, "email_provider.view");
    if (!permitted) {
      permitted = await requirePermission(orgContext.organization.id, "email_provider.configure");
      if (!permitted) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }

    const config = await db.emailProviderConfiguration.findUnique({
      where: { organizationId: orgContext.organization.id },
    });

    if (!config) {
      return NextResponse.json(null);
    }

    // Mask password
    const maskedConfig = {
      ...config,
      smtpPassword: config.encryptedSmtpPassword ? "********" : null,
      encryptedSmtpPassword: undefined,
    };

    return NextResponse.json(maskedConfig);
  } catch (error) {
    console.error("[EMAIL_PROVIDER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const orgContext = await requireActiveOrganization();
    if (!orgContext) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const permitted = await requirePermission(orgContext.organization.id, "email_provider.configure");
    if (!permitted) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const {
      provider,
      smtpHost,
      smtpPort,
      smtpUsername,
      smtpPassword,
      smtpSecure,
      fromName,
      fromEmail,
      replyTo
    } = body;

    const dataToUpdate: any = {
      provider,
      smtpHost,
      smtpPort: smtpPort ? parseInt(smtpPort, 10) : null,
      smtpUsername,
      smtpSecure: !!smtpSecure,
      fromName,
      fromEmail,
      replyTo,
    };

    if (smtpPassword && smtpPassword !== "********") {
      try {
        dataToUpdate.encryptedSmtpPassword = encrypt(smtpPassword);
      } catch (err: any) {
        console.error("Encryption error:", err);
        return new NextResponse(err.message || "Failed to encrypt password", { status: 400 });
      }
    }

    const config = await db.emailProviderConfiguration.upsert({
      where: { organizationId: orgContext.organization.id },
      create: {
        organizationId: orgContext.organization.id,
        ...dataToUpdate
      },
      update: {
        ...dataToUpdate
      }
    });

    const maskedConfig = {
      ...config,
      smtpPassword: config.encryptedSmtpPassword ? "********" : null,
      encryptedSmtpPassword: undefined,
    };

    return NextResponse.json(maskedConfig);

  } catch (error) {
    console.error("[EMAIL_PROVIDER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  return POST(req);
}
