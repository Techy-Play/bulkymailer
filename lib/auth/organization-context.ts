import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { Permission, hasPermission } from "./rbac";

const ORG_SESSION_COOKIE = "bm_org_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// ---------------------------------------------------------------------------
// Cookie Context
// ---------------------------------------------------------------------------

/** Sets the active organization ID in the session cookie. */
export async function setActiveOrganizationId(organizationId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ORG_SESSION_COOKIE, organizationId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/** Clears the active organization session. */
export async function clearActiveOrganization(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ORG_SESSION_COOKIE);
}

/** Gets the active organization ID from the cookie, without validation. */
export async function getActiveOrganizationId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ORG_SESSION_COOKIE)?.value ?? null;
}

// ---------------------------------------------------------------------------
// Centralized Authorization Helpers
// ---------------------------------------------------------------------------

export type OrganizationContext = {
  user: NonNullable<Awaited<ReturnType<typeof getSessionUser>>>;
  organization: NonNullable<Awaited<ReturnType<typeof db.organization.findUnique>>>;
  membership: NonNullable<Awaited<ReturnType<typeof db.organizationMembership.findUnique>>>;
  role: import("@/app/generated/prisma/client").OrgRole;
};

/**
 * Validates that the active session matches a valid user,
 * reads the active organization from the cookie,
 * and ensures the user has an ACTIVE membership in that organization.
 * 
 * Returns the contextual objects, or throws a 403 / redirect in consuming routes.
 * If there is no active organization, returns null.
 */
export async function requireActiveOrganization(): Promise<OrganizationContext | null> {
  const user = await getSessionUser();
  if (!user) return null;

  const orgId = await getActiveOrganizationId();
  if (!orgId) return null;

  const membership = await db.organizationMembership.findUnique({
    where: {
      organizationId_userId: {
        organizationId: orgId,
        userId: user.id
      }
    },
    include: {
      organization: true
    }
  });

  if (!membership || membership.status !== "ACTIVE") {
    // If membership is revoked/suspended, the context is stale.
    // We cannot clear the cookie here (Server Component context), 
    // but returning null will force the layout to re-evaluate available orgs.
    return null;
  }

  return {
    user,
    organization: membership.organization,
    membership,
    role: membership.role
  };
}

/**
 * Checks if the currently authenticated user has ANY active membership in the specified orgId.
 * Does not depend on the active organization cookie.
 */
export async function requireOrganizationMembership(orgId: string) {
  const user = await getSessionUser();
  if (!user) return null;

  const membership = await db.organizationMembership.findUnique({
    where: {
      organizationId_userId: {
        organizationId: orgId,
        userId: user.id
      }
    },
    include: {
      organization: true
    }
  });

  if (!membership || membership.status !== "ACTIVE") {
    return null;
  }
  
  return { user, membership, organization: membership.organization, role: membership.role };
}

/**
 * Validates that the current user has the specified permission in the active organization context.
 */
export async function requirePermission(orgId: string, permission: Permission) {
  const context = await requireOrganizationMembership(orgId);
  if (!context) return null;

  if (!hasPermission(context.role, permission)) {
    return null;
  }

  return context;
}

/**
 * Validates that the currently authenticated user is a platform SUPER_ADMIN.
 * Ignores organization context entirely.
 */
export async function requireSuperAdmin() {
  const user = await getSessionUser();
  if (!user || !user.isSuperAdmin) {
    return null;
  }
  return user;
}
