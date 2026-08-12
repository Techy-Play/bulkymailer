import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUserId } from '@/lib/auth';
import { getActiveOrganizationId, requirePermission } from '@/lib/auth/organization-context';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "template.view");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id: templateId } = await params;

    const template = await db.template.findUnique({
      where: { id: templateId },
    });

    if (!template || template.organizationId !== orgId) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    const versions = await db.templateVersion.findMany({
      where: { templateId },
      orderBy: { version: 'desc' },
    });

    return NextResponse.json(versions);
  } catch (error) {
    console.error('Error fetching template versions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orgId = await getActiveOrganizationId();
    if (!orgId) return NextResponse.json({ error: "No active organization" }, { status: 403 });

    const __perm = await requirePermission(orgId, "template.edit");
    if (!__perm) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id: templateId } = await params;
    const { versionName, htmlContent, jsonTree } = await request.json();

    const template = await db.template.findUnique({
      where: { id: templateId },
    });

    if (!template || template.organizationId !== orgId) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    const lastVersion = await db.templateVersion.findFirst({
      where: { templateId },
      orderBy: { version: 'desc' },
    });

    const nextVersion = (lastVersion?.version ?? 0) + 1;

    const newVersion = await db.templateVersion.create({
      data: {
        templateId,
        version: nextVersion,
        versionName: versionName || `Version ${nextVersion}`,
        htmlContent,
        jsonTree,
      },
    });

    return NextResponse.json(newVersion);
  } catch (error) {
    console.error('Error creating template version:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
