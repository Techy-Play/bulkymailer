hows the pqqlan 
# BulkyMailer — Full Feature Implementation Plan

## Overview
Major feature additions: OTP email verification, full signup with org details, Cloudinary media uploads (profile image + org logo), contact list management (CSV/Excel upload + in-platform editor), mail template picker with categories (personalized/newsletter/promo/general), and a rich dashboard with Free Tier indicators.

---

## User Review Required

> [!IMPORTANT]
> **Cloudinary URL format**: You provided `cloudinary://<your_api_key>:<your_api_secret>@daobuuozl`. Please replace with your actual API key and secret in `.env`. The cloud name is `daobuuozl`.

> [!IMPORTANT]
> **Free Tier limit**: Set to 100 emails/month per user. This is enforced at the API level before any campaign send. A counter (`emailsSentThisMonth`) will be tracked in the `User` model.

> [!WARNING]
> **Database migrations required**: Prisma schema changes will require running `npx prisma migrate dev` after implementation.

---

## Open Questions
None — requirements are clear. Proceeding with implementation.

---

## Proposed Changes

### Phase 1 — Environment & Schema

#### [MODIFY] `.env`
Add Cloudinary credentials:
```
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@daobuuozl
CLOUDINARY_CLOUD_NAME=daobuuozl
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

#### [MODIFY] `prisma/schema.prisma`
Add fields to `User`:
- `profileImageUrl String?` — Cloudinary URL
- `otpCode String?` — 6-digit OTP (replace token model for signup)
- `otpExpiresAt DateTime?`
- `otpAttempts Int @default(0)`
- `emailsSentThisMonth Int @default(0)`
- `emailsMonthResetAt DateTime?` — tracks when monthly counter was reset
- `subscriptionType String @default("free")`

Add to `Organization`:
- `logoUrl String?` — Cloudinary URL

Add new models:
- `ContactList` — list metadata (name, description, userId)
- `Contact` — individual contact record (email, firstName, lastName, custom fields JSON, listId)

---

### Phase 2 — OTP Auth System

#### [MODIFY] `lib/mailer.ts`
Add `sendOtpEmail(to, otp, firstName)` — beautiful OTP email with large code display.

#### [MODIFY] `lib/auth.ts`
Add `generateOtp(): string` — 6-digit numeric OTP.

#### [MODIFY] `app/api/auth/register/route.ts`
- Extended schema: collect ALL org/user info upfront (firstName, lastName, email, password, phone, companyName, website, address fields, teamSize, contactRange, sellsOnline)
- Create User + Organization in one transaction
- Generate 6-digit OTP, store in user record (`otpCode`, `otpExpiresAt`)
- Send OTP via `sendOtpEmail()`
- Redirect → `/verify-otp?email=...`

#### [NEW] `app/api/auth/verify-otp/route.ts`
- POST `{ email, otp }` → validate OTP, check expiry & attempts (max 5)
- On success: clear OTP, mark `emailVerified = true`, `status = ACTIVE`, `isOnboardingCompleted = true` (since all data collected at signup)
- Set session cookie → return `{ redirect: "/dashboard" }`

#### [MODIFY] `app/api/auth/resend-verification/route.ts`
- Updated to generate new OTP and resend OTP email

#### [MODIFY] `app/register/page.tsx`
Full multi-step signup form:
- **Step 1 — Personal**: firstName, lastName, email, password, phone
- **Step 2 — Organization**: companyName, website, address (line1, line2, city, state, postalCode, country)
- **Step 3 — Business Profile**: teamSize, contactRange, sellsOnline, marketingOptIn
- Progress indicator + smooth transitions
- Beautiful gradient design

#### [NEW] `app/verify-otp/page.tsx`
- 6 individual digit input boxes (auto-advance on keystroke, paste support)
- 60-second countdown timer for resend
- Shows masked email address
- Calls `/api/auth/verify-otp`

---

### Phase 3 — Cloudinary Media Uploads

#### [NEW] `lib/cloudinary.ts`
Cloudinary SDK config helper.

#### [NEW] `app/api/upload/profile-image/route.ts`
- Authenticated route — reads session
- Accepts `multipart/form-data` with image file
- Uploads to Cloudinary folder `bulkymailer/profiles/`
- Updates `user.profileImageUrl` in DB
- Returns `{ url }`

#### [NEW] `app/api/upload/org-logo/route.ts`
- Authenticated route — reads session, gets user's org
- Uploads to Cloudinary `bulkymailer/logos/`
- Updates `organization.logoUrl`
- Returns `{ url }`

---

### Phase 4 — Contact Lists (CSV/Excel + In-Platform Editor)

#### [NEW] `app/api/contacts/lists/route.ts`
- GET: list all contact lists for user
- POST: create new list

#### [NEW] `app/api/contacts/lists/[id]/route.ts`
- GET: list contacts in a list (paginated)
- PUT: update list metadata
- DELETE: delete list

#### [NEW] `app/api/contacts/lists/[id]/contacts/route.ts`
- GET: paginated contacts
- POST: add single contact
- PUT: bulk update contacts

#### [NEW] `app/api/contacts/import/route.ts`
- Accepts CSV/XLSX file upload
- Parses with `csv-parse` / `xlsx` package
- Maps columns: email (required), firstName, lastName, + any extra columns → stored as JSON in `customFields`
- Bulk inserts into `Contact` table
- Returns `{ imported, duplicates, errors }`

#### [NEW] `app/dashboard/contacts/page.tsx`
Full contacts management page:
- List of contact lists (cards with count, date)
- "New List" button
- "Import CSV/Excel" upload dropzone
- Per-list view: searchable, sortable data table
- Inline row editing (click cell to edit → auto-saves)
- Add/delete contacts from the table
- Export to CSV button

---

### Phase 5 — Mail Templates

#### [NEW] `app/dashboard/templates/page.tsx`
Template picker dashboard page:
- Filter tabs: All | Personalized | Newsletter | Promotional | General | E-Commerce | Transactional
- Grid of template cards, each showing:
  - Visual preview (colored HTML preview)
  - Category badge (color-coded)
  - "Personalized" badge (star icon, special highlight) for personalized templates
  - "Use Template" button
- Templates include org logo placeholder and dynamic field support (`{{firstName}}`, `{{companyName}}`, etc.)

---

### Phase 6 — Dashboard Profile & Settings

#### [MODIFY] `app/dashboard/page.tsx`
Rich dashboard rewrite:
- **Header banner**: gradient with user name + "Free Tier" + "100 emails/month" usage bar
- **Subscription badge**: `Free Plan` tag visible in top bar
- **Stats**: Campaigns Sent, Contacts, Open Rate, Emails Used This Month (x/100)
- **Quick Actions** grid
- **Getting Started checklist**
- **Recent Campaigns** table

#### [NEW] `app/dashboard/profile/page.tsx`
Profile & settings page:
- **Profile Image**: circular avatar with upload button → calls `/api/upload/profile-image`
- **Org Logo**: rectangular upload → calls `/api/upload/org-logo`
- Live preview of how logo appears in emails
- Edit personal info (name, phone)
- Edit org info (companyName, website, address)
- Password change section

---

### Phase 7 — Dashboard Sidebar Layout

#### [NEW] `app/dashboard/layout.tsx`
Persistent sidebar layout wrapping all `/dashboard/*` routes:
- Sidebar nav: Dashboard, Contacts, Templates, Campaigns, Analytics, Settings, Profile
- Top bar with user avatar (from Cloudinary), org name, notification bell
- Free Tier badge in sidebar footer
- Responsive (collapsible on mobile)

---

## Packages to Install
- `cloudinary` — Cloudinary Node SDK
- `csv-parse` — CSV parsing
- `xlsx` — Excel parsing
- `multer` or use native Next.js FormData handling

## Verification Plan

### Automated
- TypeScript compile: `npx tsc --noEmit`
- Prisma validate: `npx prisma validate`

### Manual Flow
1. `/register` → fill all 3 steps → submit → OTP email arrives
2. `/verify-otp` → enter 6-digit code → redirect to `/dashboard`  
3. `/login` → login with credentials → redirect to dashboard
4. Dashboard shows "Free Tier", email usage bar (0/100)
5. Upload profile image → avatar updates live
6. Upload org logo → logo shown in profile
7. Contacts → import CSV → table populates → edit cell inline → saved
8. Templates → filter by category → select "Personalized" template
9. Try to send >100 emails → blocked with upgrade prompt
