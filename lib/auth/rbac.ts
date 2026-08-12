import { OrgRole } from "@/app/generated/prisma/client";

export type Permission =
  // Organization / Members
  | "organization.settings"
  | "member.view"
  | "member.invite"
  | "member.change_role"
  | "member.suspend"
  | "member.remove"
  | "member.transfer_ownership"
  
  // Campaigns
  | "campaign.view"
  | "campaign.create"
  | "campaign.edit"
  | "campaign.send"
  | "campaign.delete"

  // Contacts
  | "contact.view"
  | "contact.import"
  | "contact.edit"
  | "contact.delete"

  // Templates
  | "template.view"
  | "template.create"
  | "template.edit"
  | "template.publish"
  | "template.delete"

  // Media
  | "media.view"
  | "media.upload"
  | "media.delete"
  
  // Analytics
  | "analytics.view";

/**
 * Maps each OrgRole to its permitted actions.
 */
export const ROLE_PERMISSIONS: Record<OrgRole, Permission[]> = {
  OWNER: [
    "organization.settings",
    "member.view", "member.invite", "member.change_role", "member.suspend", "member.remove", "member.transfer_ownership",
    "campaign.view", "campaign.create", "campaign.edit", "campaign.send", "campaign.delete",
    "contact.view", "contact.import", "contact.edit", "contact.delete",
    "template.view", "template.create", "template.edit", "template.publish", "template.delete",
    "media.view", "media.upload", "media.delete",
    "analytics.view"
  ],
  ADMIN: [
    "organization.settings",
    "member.view", "member.invite", "member.change_role", "member.suspend", "member.remove",
    "campaign.view", "campaign.create", "campaign.edit", "campaign.send", "campaign.delete",
    "contact.view", "contact.import", "contact.edit", "contact.delete",
    "template.view", "template.create", "template.edit", "template.publish", "template.delete",
    "media.view", "media.upload", "media.delete",
    "analytics.view"
  ],
  MARKETING_MANAGER: [
    "member.view", "member.invite", // Can invite but usually not remove or change roles arbitrarily
    "campaign.view", "campaign.create", "campaign.edit", "campaign.send", "campaign.delete",
    "contact.view", "contact.import", "contact.edit", "contact.delete",
    "template.view", "template.create", "template.edit", "template.publish", "template.delete",
    "media.view", "media.upload", "media.delete",
    "analytics.view"
  ],
  CAMPAIGN_MANAGER: [
    "member.view",
    "campaign.view", "campaign.create", "campaign.edit", "campaign.send",
    "contact.view",
    "template.view",
    "media.view", "media.upload",
    "analytics.view"
  ],
  CONTENT_MANAGER: [
    "member.view",
    "campaign.view", "campaign.create", "campaign.edit",
    "template.view", "template.create", "template.edit", "template.publish",
    "media.view", "media.upload", "media.delete",
    "analytics.view"
  ],
  SALES: [
    "member.view",
    "campaign.view",
    "contact.view", "contact.edit",
    "analytics.view"
  ],
  ANALYST: [
    "member.view",
    "campaign.view",
    "contact.view",
    "template.view",
    "analytics.view"
  ],
  VIEWER: [
    "member.view",
    "campaign.view",
    "contact.view",
    "template.view",
    "media.view"
  ]
};

/**
 * Checks if a given role has a specific permission.
 */
export function hasPermission(role: OrgRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Defines which roles can assign which other roles.
 * Example: An ADMIN cannot assign an OWNER role.
 */
export const ROLE_ASSIGNMENT_HIERARCHY: Record<OrgRole, OrgRole[]> = {
  OWNER: [
    "OWNER", "ADMIN", "MARKETING_MANAGER", "CAMPAIGN_MANAGER", 
    "CONTENT_MANAGER", "SALES", "ANALYST", "VIEWER"
  ],
  ADMIN: [
    "ADMIN", "MARKETING_MANAGER", "CAMPAIGN_MANAGER", 
    "CONTENT_MANAGER", "SALES", "ANALYST", "VIEWER"
  ],
  MARKETING_MANAGER: [
    "CAMPAIGN_MANAGER", "CONTENT_MANAGER", "SALES", "ANALYST", "VIEWER"
  ],
  CAMPAIGN_MANAGER: [],
  CONTENT_MANAGER: [],
  SALES: [],
  ANALYST: [],
  VIEWER: []
};

/**
 * Checks if an actor with `actorRole` is allowed to assign or manage a user with `targetRole`.
 */
export function canManageRole(actorRole: OrgRole, targetRole: OrgRole): boolean {
  return ROLE_ASSIGNMENT_HIERARCHY[actorRole]?.includes(targetRole) ?? false;
}
