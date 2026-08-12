# BulkyMailer 🚀

> **AI-Powered Bulk Email Marketing, Campaign Management & Figma-Style Email Design Platform**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.11-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-v7-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-2.x_AI-8E44AD?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)

---

## 📖 Overview

**BulkyMailer** is a production-grade, enterprise-ready email marketing and campaign dispatch web application built with **Next.js 16 (App Router)**. 

If you are exploring full-stack engineering, this project is a prime example of building a SaaS application. It combines complex database relations (Multi-tenant RBAC), third-party integrations (Resend, Cloudinary, Gemini AI), and a rich interactive frontend (drag-and-drop template editor).

### **What does it do?**
It allows marketers to create beautiful emails (using AI or a visual editor), manage their contact lists (uploading via CSV), and send bulk email campaigns while tracking opens and bounces.

### **How does it work?**
It uses a Next.js Server Components architecture to fetch data efficiently, Prisma to interact with a PostgreSQL database in a type-safe manner, and the Resend API to handle batch email delivery.

### **Why this stack?**
Next.js provides both the frontend UI and the backend API routes in a single repository (monorepo feel). PostgreSQL with Prisma provides strict data guarantees, preventing orphaned data when users or organizations are deleted.

---

## 🌟 Core Features

1. **✨ AI Assistant Studio Engine**: Generates HTML emails using Google's Gemini AI. It automatically strips heavy images before sending prompts to save on AI token costs.
2. **🎨 Figma-Style Visual Template Editor**: A visual editor to drag and drop components, complete with a live dual-pane preview.
3. **🚀 Campaign Management**: Wizard to construct campaigns, bind sender profiles, and dispatch asynchronously.
4. **👥 Contact Management**: Import contacts directly via CSV/Excel parsing in the browser.
5. **🔐 Multi-Tenant RBAC**: Users belong to Organizations. Roles (Owner, Admin, Editor, Viewer) dictate what actions they can take.
6. **🛡️ CAN-SPAM Compliance**: Automatically injects unsubscribe links and handles bounce tracking via Resend webhooks.

---

## 🏗️ Architecture & Tech Stack

For a deep dive into the architecture, see our [Architecture Documentation](docs/ARCHITECTURE.md).

| Layer | Technology | Why we use it |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Seamless integration of Server Components and Server Actions. |
| **Language** | TypeScript 5.x | End-to-end type safety across the entire stack. |
| **Styling** | Tailwind CSS v4 | Rapid UI development without context switching. |
| **Database** | PostgreSQL 16 | Relational integrity for complex RBAC and multi-tenant data. |
| **ORM** | Prisma v7 | Auto-generated, type-safe queries. |
| **AI Integration** | Google Gemini 2.x API | Cost-effective and fast generative capabilities for templates. |
| **Media Storage** | Cloudinary API | Fast image delivery (CDN) for email campaigns. |
| **Email Transport** | Resend / Nodemailer | Reliable bulk delivery and bounce tracking. |

---

## 🚀 Getting Started (Dev Workflow)

For detailed deployment instructions, see our [Deployment Documentation](docs/DEPLOYMENT.md).

### Prerequisites
- **Node.js**: v20.x or higher
- **PostgreSQL**: Local instance or cloud (e.g., Neon)

### 1. Environment Setup
Clone the repository and copy the example environment file:
```bash
git clone <repository-url>
cd bulkymailer
cp .env.example .env
```
Fill in the `.env` variables (Database URL, Resend API key, Cloudinary keys).

### 2. Install Dependencies
```bash
npm install
```
*Note: This automatically triggers `prisma generate` to build the database client.*

### 3. Database Migration
Push the Prisma schema to your connected PostgreSQL database:
```bash
npx prisma db push
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Documentation Directory

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - System design, routing, and design decisions.
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) - DevOps, Vercel deployment, and environment variables.

---

## 📜 License & Acknowledgments

Built by the **BulkyMailer Team** to demonstrate advanced Next.js, Prisma, and AI integrations.

*Copyright © 2026 BulkyMailer. All rights reserved.*


---

# AI Co-editor Architecture

The BulkyMailer AI Co-editor provides intelligent, conversational assistance for email template creation and modification. It uses Google's Gemini models to generate and mutate `Templatical` JSON structures while ensuring safe preservation of existing email blocks.

## 1. System Components & Flow

The AI architecture is housed in `lib/ai/` and operates through a resilient, model-agnostic request router.

### Request Flow
1. **User Input:** The user submits a prompt via the AI Assistant UI in the editor.
2. **Context Compilation:** The system compiles the `userMessage`, `systemInstruction`, `currentTemplate` (JSON tree), and `conversationHistory` into an `AiRequestPayload`.
3. **Provider Router (`provider-router.ts`):** 
   - Requests eligible models from the `ModelRegistry`.
   - Iterates through available models based on priority and health status.
   - Calls the Google GenAI SDK.
4. **Validation (`validator.ts`):**
   - **Schema Validation:** Ensures the model returned a valid JSON object matching the `AiResponseData` interface (`intent`, `summary`, `proposedTemplate`, `suggestions`).
   - **Preservation Validation:** Checks if the AI hallucinated/deleted >50% of blocks or maliciously altered merge tags (`{{variable}}`) and image URLs for `modify` intents.
5. **Success/Failure:**
   - If successful, the response is returned and model health is updated.
   - If validation fails or a transient error occurs, the router retries or falls back to the next model.

## 2. Model Registry & Failover (`model-registry.ts`)

The system dynamically discovers models to ensure high availability and graceful degradation.

- **Discovery:** Fetches models via `ai.models.list()`. Filters for general text generation models (excluding audio, vision-only, etc.).
- **Prioritization:** Models are prioritized explicitly (e.g., `gemini-1.5-flash` might be priority 3, `gemini-2.5-flash` priority 1).
- **Caching:** Discovered models are cached for 15 minutes (`DISCOVERY_CACHE_TTL_MS`) to reduce API overhead.
- **Failover:** If discovery fails completely, it falls back to a hardcoded stable model (`models/gemini-1.5-flash`).

## 3. Provider Router & Error Handling (`provider-router.ts`)

The `ProviderRouter` handles model invocation and retry logic (`MAX_RETRIES_PER_MODEL = 2`).

### 404 & 429 Handling
Errors are classified using `classifyHttpError` (in `errors.ts`) and reported to the registry (`reportModelFailure`):
- **404 (Model Unavailable/Gone):** The model is marked with a 1-hour cooldown. The router skips this model for subsequent requests.
- **429 (Rate Limited):** The model is marked with a 60-second cooldown.
- **502/503/504 (Service Unavailable):** The model is marked with a 30-second cooldown. The router applies exponential backoff (250ms, 750ms, 1500ms) for transient errors before moving to the next model.
- **Fatal Errors (Auth/Permissions):** Halts the router immediately without fallback.

## 4. Preservation Validation (`validator.ts`)

To prevent destructive AI behavior during template editing (`intent: "modify"`):
- The `validatePreservation` function extracts a flat map of all block IDs.
- **Block Retention:** Rejects the response if >50% of the original blocks are removed (assuming original size > 2).
- **Image URLs:** Prevents AI from replacing existing custom image URLs with generic placeholders.
- **Merge Tags:** Ensures that `{{...}}` merge tags in paragraphs and titles are not randomly removed or corrupted if the block is kept.

## 5. User Interface Integration

- **Assistant UI:** Users interact with a chat-like interface. 
- **Conversational History:** Previous AI interactions and user prompts are passed as `conversationHistory` in the payload, allowing the model to understand context (e.g., "Make it blue" -> "Now make the button bigger").
- **Suggestions:** The AI returns contextual `suggestions` (e.g., "Make the tone more professional", "Add a footer") which are rendered as quick-action chips in the UI.


---

# API Documentation

BulkyMailer utilizes Next.js App Router API endpoints (`app/api/*`). Below is an inventory of critical API endpoints detailing their purpose, required authorization, and effects.

## Authentication (`/api/auth/*`)

| Method | Path | Auth | Description & DB Effect |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | None | Creates a new `User` (hashed password) and sets status to PENDING. Generates an OTP. |
| **POST** | `/api/auth/login` | None | Validates credentials. Sets `bm_session` cookie. |
| **POST** | `/api/auth/verify-otp` | Session | Validates 6-digit OTP against `User.otpCode`. Sets `emailVerified = true`. |
| **POST** | `/api/auth/logout` | Session | Clears `bm_session` and `bm_org_session` cookies. |
| **GET** | `/api/auth/me` | Session | Returns current user profile and available memberships. |

## Organization Management (`/api/organizations/*`)

| Method | Path | Auth / Role | Description & DB Effect |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/organizations/switch` | Session | Sets the `bm_org_session` cookie to change the active tenant context. |
| **GET** | `/api/organizations/[orgId]/members` | `member.view` | Fetches `OrganizationMembership` records for the tenant. |
| **POST** | `/api/organizations/[orgId]/invitations` | `member.invite` | Creates an `OrganizationInvitation` and sends email via Resend. |
| **POST** | `/api/organizations/[orgId]/members/[userId]/transfer-ownership`| OWNER | Transfers ownership by updating `OrgRole` fields on both users. |

## Campaigns (`/api/campaigns/*`)

| Method | Path | Auth / Role | Description & DB Effect |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/campaigns` | `campaign.view` | Retrieves list of `Campaign` objects filtered by `organizationId`. |
| **POST** | `/api/campaigns` | `campaign.create` | Creates a new draft `Campaign`. |
| **POST** | `/api/campaigns/[id]/send` | `campaign.send` | Updates campaign status to QUEUED/SENDING. Snapshots HTML and subject. Dispatches to sending queue/Resend. |

## Contacts (`/api/contacts/*`)

| Method | Path | Auth / Role | Description & DB Effect |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/contacts/lists` | `contact.edit` | Creates a new `ContactList`. |
| **POST** | `/api/contacts/import` | `contact.import`| Bulk creates `Contact` records from CSV data. |
| **GET** | `/api/contacts/lists/[id]/contacts` | `contact.view` | Paginates through `Contact` records for a specific list. |

## Templates & AI (`/api/templates/*`, `/api/ai/*`)

| Method | Path | Auth / Role | Description & DB Effect |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/templates` | `template.create` | Creates a new `Template` (MODERN or LEGACY). |
| **POST** | `/api/templates/[id]/duplicate` | `template.create` | Deep copies an existing template into a new record. |
| **POST** | `/api/ai/template-generate` | Session | Invokes Gemini AI to generate MJML/JSON tree structures based on text prompts. |
| **POST** | `/api/ai/preview-mjml` | Session | Compiles MJML payloads into raw HTML for previewing. |

## Super Admin (`/api/admin/*`)

*All routes under `/api/admin/*` require the `User.isSuperAdmin = true` flag.*

| Method | Path | Description & DB Effect |
| :--- | :--- | :--- |
| **GET** | `/api/admin/audit-logs` | Retrieves global `AuditLog` entries across all tenants. |
| **GET** | `/api/admin/organizations` | Lists all organizations on the platform. |
| **POST** | `/api/admin/system/ai` | Adjusts global AI settings or limits. |
| **POST** | `/api/admin/templates` | Creates global "seed" templates (templates with `organizationId = null`). |


---

# BulkyMailer System Architecture

## 1. Complete System Architecture

BulkyMailer is a modern, full-stack email marketing platform designed to handle multi-tenant organizations, role-based access control (RBAC), drag-and-drop template editing, and bulk email delivery.

```mermaid
graph TD
    %% Users & Entry Points
    User((User / Marketer)) -->|HTTP/HTTPS| Web[Next.js Web App]
    SuperAdmin((Super Admin)) -->|HTTP/HTTPS| Web
    
    %% Next.js Application Layers
    subgraph "Next.js (App Router)"
        Web --> Middleware[Proxy.ts Middleware]
        Middleware --> ClientApp[Client Components]
        Middleware --> ServerApp[Server Components & Server Actions]
        Middleware --> API[API Routes]
    end
    
    %% Application Logic & Integrations
    ServerApp --> DB[(PostgreSQL)]
    API --> DB
    
    %% External Services
    ServerApp --> Resend[Resend API - Email Delivery]
    ServerApp --> Cloudinary[Cloudinary - Media Storage]
    ServerApp --> Gemini[Gemini AI - Template Generation]
    
    API --> Resend
    API --> Cloudinary
    
    %% Data Layer
    subgraph "Data Layer"
        DB --- Prisma[Prisma ORM]
    end
```

## 2. Next.js Architecture

BulkyMailer uses the **Next.js App Router** (`app/` directory) taking advantage of Server Components, Server Actions, and API Routes.

### Routing & Layouts
The application is logically split into route groups to share layouts without affecting the URL structure:
- **`(marketing)`**: Public-facing marketing pages (e.g., Home, About, Pricing). Uses a common marketing layout with a top navigation bar and footer.
- **`dashboard`**: The core application for authenticated users. Uses a complex layout with sidebar navigation, tenant switching, and user profile management.
- **`admin`**: Super admin dashboard for managing users and platform-level settings.
- **`api`**: RESTful API endpoints for webhooks, external integrations, or heavy background processes.

### Middleware (`proxy.ts`)
Due to the structure, the middleware is implemented in `proxy.ts` (configured as standard Next.js middleware).
- **Authentication**: Checks for the `bm_session` cookie.
- **Protection**: Intercepts requests to `/dashboard` and `/admin`. Unauthenticated users are redirected to `/login`.
- **Redirection**: Authenticated users navigating to auth pages (`/login`, `/register`) are redirected back to the dashboard.

### Route Map (Abridged)
- `/` - Marketing landing page
- `/login`, `/register`, `/verify-email` - Authentication flows
- `/dashboard` - Organization overview
- `/dashboard/campaigns` - Campaign management
- `/dashboard/templates` - Template editor & list
- `/dashboard/contacts` - Contact list & CRM
- `/dashboard/settings` - Tenant & profile settings
- `/admin` - Super Admin dashboard

## 3. File/Folder Architecture Tree

```text
bulkymailer/
├── app/                  # Next.js App Router
│   ├── (marketing)/      # Public marketing pages
│   ├── admin/            # Super admin panel
│   ├── api/              # API routes (webhooks, etc.)
│   ├── dashboard/        # Core app dashboard
│   ├── layout.tsx        # Root layout (Providers, Fonts)
│   ├── globals.css       # Tailwind entry point
│   └── ...               # Auth and utility routes
├── components/           # React Components
│   ├── ui/               # Reusable base components (buttons, inputs)
│   ├── dashboard/        # Dashboard specific widgets
│   ├── editor/           # Templatical integration components
│   └── ...
├── lib/                  # Utility functions and integrations
│   ├── ai/               # Gemini AI integration helpers
│   ├── auth/             # Session management
│   ├── db.ts             # Prisma client singleton
│   └── mailer.ts         # Resend & Nodemailer dispatch logic
├── prisma/               # Database Layer
│   ├── schema.prisma     # Database schema definition
│   └── seed.ts           # Initial DB seeding logic
├── public/               # Static assets (images, fonts, icons)
├── docs/                 # Documentation (You are here)
├── next.config.ts        # Next.js configuration
├── proxy.ts              # Next.js Middleware (Auth protection)
└── package.json          # Dependencies and scripts
```

## 4. Important Design Decisions ("Why This Architecture?")

1. **Next.js App Router (React 19)**: 
   - **Why**: Allows aggressive server-side rendering (SSR) and static site generation (SSG) for marketing pages, while keeping the dashboard highly interactive. Server Actions eliminate the need for excessive API endpoints, making data mutation type-safe and co-located.
2. **Prisma & PostgreSQL**: 
   - **Why**: Prisma offers best-in-class type safety for TypeScript. PostgreSQL easily handles the complex relational data required for Multi-tenant RBAC (Organizations <-> Users <-> Roles).
3. **Resend over raw SMTP**: 
   - **Why**: Resend is built for modern developer workflows. It provides batch sending endpoints (crucial for bulk campaigns) and reliable webhooks for tracking bounces, opens, and clicks. A fallback to Nodemailer is kept for raw SMTP connections if needed.
4. **Cloudinary for Media**: 
   - **Why**: Email templates heavily rely on images. Cloudinary provides fast CDN delivery and on-the-fly image transformations, ensuring emails load quickly for end-users.
5. **Templatical**: 
   - **Why**: Building robust, cross-client HTML emails is notoriously difficult. Templatical provides a visual editor and outputs standardized JSON/HTML, bridging the gap between a nice UI and valid email markup (often leveraging MJML).

## 5. Technical Glossary

- **Tenant / Organization**: A distinct workspace. Users can belong to multiple organizations with different roles (Owner, Editor, Viewer).
- **Campaign**: A scheduled or immediate bulk email dispatch sent to a specific Contact List using a specific Template.
- **Templatical**: The underlying drag-and-drop editor framework used to compose email layouts.
- **Server Action**: Next.js pattern where asynchronous functions are executed on the server but called directly from client components.
- **RBAC**: Role-Based Access Control. BulkyMailer uses this at the Organization level to restrict what members can do (e.g., Viewers cannot send campaigns).


---

# Database Architecture (Prisma)

This document outlines the database architecture for the BulkyMailer platform, designed as a multi-tenant, Role-Based Access Control (RBAC) aware application built with Prisma and PostgreSQL.

## Core Multi-Tenant Architecture

The database is structured to support true multi-tenancy. Rather than tying resources directly to a single User, almost all application resources (Campaigns, Templates, Contacts, etc.) belong to an **Organization**. Users join Organizations through an intermediate `OrganizationMembership` model.

### 1. The Organization Model
The `Organization` is the primary tenant boundary. 
- **Purpose**: Represents a company or workspace.
- **Fields**: Basic info (`name`, `website`, `logoUrl`), billing/demographics (`teamSize`, `contactRange`), and branding.
- **Relationships**: Holds tenanted resources such as `contactLists`, `senderProfiles`, `templates`, `campaigns`, and `mediaAssets`.

### 2. The User Model
The `User` model represents a person logging into the application.
- **Purpose**: Authentication, profile information, and global platform state.
- **Fields**: `email`, `passwordHash`, `firstName`, `lastName`, `isSuperAdmin` (for platform administration).
- **Free Tier Limits**: Tracks `emailsSentThisMonth` and `emailsMonthResetAt` directly on the user for rate-limiting.
- **Relationships**: A user can have many `memberships` across multiple Organizations.

### 3. Tenant Isolation & Membership
- **OrganizationMembership**: The pivot table linking a `User` to an `Organization`. It includes the `OrgRole` (e.g., OWNER, ADMIN, VIEWER) that defines what the user can do *within that specific organization*.
- **OrganizationInvitation**: Manages pending invitations for users to join an organization. Includes a securely hashed token (`tokenHash`) and expiration time.

## Tenanted Resources

All the following models include an optional `organizationId` (to support legacy individual accounts, though standard usage requires it). Resources are isolated by filtering queries where `organizationId === activeOrgId`.

### Contact Management
- **ContactList**: A logical grouping of contacts (e.g., "Newsletter Subscribers").
- **Contact**: Represents an individual recipient. Enforces uniqueness on `[email, listId]`. Supports extensible data via `customFields` (JSON type).

### Campaigns & Sending
- **SenderProfile**: Pre-configured sender identities (`fromName`, `fromEmail`, `replyTo`).
- **Campaign**: The core email sending task. 
  - **Snapshots**: At send-time, the campaign takes a snapshot of the template's HTML (`htmlSnapshot`) and sender details. This guarantees that if a template is later edited, historical sent campaigns reflect what was actually sent.
  - **Status**: Tracked via `CampaignStatus` enum (DRAFT, QUEUED, SENDING, SENT, FAILED, CANCELLED).
- **CampaignEvent**: Logs fine-grained analytics (Sent, Delivered, Opened, Clicked, Bounced, Unsubscribed). Tracks metadata like device, location, and specific link URLs.

### Templates & AI
- **Template**: Reusable email designs. 
  - **Global vs Personal**: If a template has no `organizationId` and no `userId`, it acts as a **system global template** (accessible to all tenants as a starter template).
  - **MODERN vs LEGACY**: Tracked via the `TemplateGeneration` enum. `MODERN` refers to the new AI-powered MJML/JSON tree builder, while `LEGACY` refers to older raw HTML templates.
  - **JSON Tree**: The `jsonTree` field stores the structured AST for the visual builder.
- **TemplateVersion**: Maintains a history of changes to a template, allowing rollback and auditing.

### System & Audit
- **AuditLog**: Tracks actions across the platform for security and compliance (Actor, Action, ResourceType, ResourceID).

## Indexing Strategy
Indexes are strategically placed on foreign keys and frequently queried fields to ensure performance:
- `@@unique([organizationId, userId])` on Memberships.
- `@@index([organizationId])` on almost all tenanted resources.
- Email lookups (User `email` is unique).
- Campaign Event recipient and campaign lookups.


---

# BulkyMailer Deployment & DevOps Guide

## 1. Deployment Architecture

BulkyMailer is optimized for serverless edge deployments, but can run on any Node.js compatible hosting environment.

- **Frontend & API Host**: [Vercel](https://vercel.com) (Recommended) or Docker/Node.js environment. Next.js App Router integrates natively with Vercel for Serverless Functions and Edge Middleware.
- **Database**: Any cloud-hosted PostgreSQL database. Recommended providers: [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app).
- **Media Storage**: [Cloudinary](https://cloudinary.com) for fast, CDN-backed image delivery in email campaigns.
- **Email Delivery Engine**: [Resend](https://resend.com) handles batch sending and webhook tracking.
- **AI Engine**: Google Gemini API for generative email template creation.

## 2. Environment Variables

To run BulkyMailer, create a `.env` file at the root of the project. Do not commit this file to version control.

| Variable | Description | Required | Example |
|---|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgresql://user:pass@host:5432/db` |
| `NEXT_PUBLIC_APP_URL` | Base URL of the application | Yes | `http://localhost:3000` or `https://bulkymailer.com` |
| **Email (Resend)** | | | |
| `RESEND_API_KEY` | Resend API Key for bulk sending | Yes | `re_123456789...` |
| `RESEND_FROM` | Default verified sender address | Yes | `hello@send.yourdomain.com` |
| **Email (SMTP Fallback)** | | | |
| `SMTP_HOST` | Fallback SMTP Host | No | `smtp.gmail.com` |
| `SMTP_PORT` | Fallback SMTP Port | No | `587` |
| `SMTP_USER` | Fallback SMTP Username | No | `user@gmail.com` |
| `SMTP_PASS` | Fallback SMTP Password | No | `app-password` |
| `SMTP_FROM` | Fallback sender address | No | `user@gmail.com` |
| **Cloudinary** | | | |
| `CLOUDINARY_URL` | Cloudinary connection string | Yes | `cloudinary://key:secret@cloud_name` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | Yes | `djxk...` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | Yes | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | Yes | `secret123` |
| **Google APIs** | | | |
| `GEMINI_API_KEY` | API key for Gemini AI features | Yes | `AIzaSy...` |
| `NEXT_PUBLIC_GOOGLE_DRIVE_APP_ID` | Google Drive integration | No | `1234567890` |
| `NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY` | Google Drive integration | No | `AIzaSy...` |
| `NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID` | Google Drive integration | No | `123-abc.apps.googleusercontent.com` |

## 3. Developer Workflow

### Local Development Setup

1. **Install dependencies**: 
   ```bash
   npm install
   ```
   *Note: `postinstall` will automatically run `prisma generate`.*

2. **Configure Environment**: 
   Copy `.env.example` to `.env` and fill in your development keys.

3. **Database Migration**: 
   Push the Prisma schema to your development database:
   ```bash
   npx prisma db push
   ```
   *(Alternatively, use `npx prisma migrate dev` if you are tracking migrations).*

4. **Seed Database (Optional)**: 
   ```bash
   npm run prisma:seed
   ```
   *(Uses `tsx prisma/seed.ts` to populate mock data).*

5. **Start Development Server**: 
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

### Available NPM Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Compiles the application for production.
- `npm run start`: Starts the compiled production application.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run postinstall`: Generates the Prisma Client.

## 4. Troubleshooting Guide

### Issue: Prisma Client throwing Type Errors
**Cause**: The database schema changed but the Prisma Client wasn't updated.
**Fix**: Run `npx prisma generate` to rebuild the TypeScript definitions for the database schema.

### Issue: Emails are not sending / Emails going to spam
**Cause**: Resend domain isn't verified or SMTP credentials are wrong.
**Fix**: 
1. Check `lib/mailer.ts`. BulkyMailer expects the `FROM` address domain to match your verified domain in Resend.
2. Verify DKIM/SPF records in your DNS provider for the domain used in `RESEND_FROM`.
3. Check the Vercel logs for `[resend_sendEmail_error]`.

### Issue: Middleware redirect loop on Authentication
**Cause**: Session cookie logic misconfiguration in `proxy.ts`.
**Fix**: Ensure your local timezone / cookie expiry settings match. Clear your browser cookies for `localhost` and delete the `bm_session` cookie.

### Issue: Images broken in Email Templates
**Cause**: Cloudinary environment variables are missing or misconfigured.
**Fix**: Ensure `CLOUDINARY_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are correctly populated. Images uploaded in the template editor upload directly to Cloudinary; verify network requests in browser DevTools.


---

# Email Campaign System

The BulkyMailer email campaign system orchestrates the delivery of personalized bulk emails using Resend (backed by AWS SES), ensuring high deliverability, spam compliance, and detailed telemetry tracking.

## 1. Campaign Lifecycle (`Campaign` model)

Campaigns move through distinct statuses during their lifecycle:
1. **`DRAFT`**: The campaign is being configured. Users select a `Template`, a `ContactList`, and a `SenderProfile`.
2. **`QUEUED`**: When the user initiates a send (`app/api/campaigns/[id]/send/route.ts`), the system captures a "snapshot" of the campaign details.
3. **`SENDING`**: An asynchronous background process iterates through contacts and dispatches emails.
4. **`SENT`** / **`FAILED`**: The campaign completes, logging success and failure counts.

### Immutable Snapshots
To ensure historical accuracy, campaigns take snapshots at the moment they are queued. If a user modifies the template or sender profile weeks later, the sent campaign's history remains intact.
The system snapshots:
- `htmlSnapshot` (The exact HTML sent)
- `subjectSnapshot`
- `fromNameSnapshot` & `fromEmailSnapshot`

## 2. Dispatch Pipeline (`lib/mailer.ts`)

The `sendEmail` and `sendBulkEmailWithResend` functions handle outbound delivery.

### Personalization (Merge Tags)
Before dispatch, the `renderTemplateMergeTags` function compiles the HTML snapshot for each individual contact. It replaces liquid-style syntax (`{{ firstName }}`) with data from the `ContactList` (falling back to default values like "there"). 

### Anti-Spam Compliance
BulkyMailer automatically injects mandatory anti-spam elements if they are missing from the template:
1. **Unsubscribe Footer:** Appended to the bottom of the HTML if no unsubscribe link is detected.
2. **List-Unsubscribe Headers:** Injected into the SMTP headers (`List-Unsubscribe` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click`) to enable native "Unsubscribe" buttons in email clients like Gmail.
3. **Plain Text Version:** HTML is stripped down into a text-only multipart payload to improve spam scores.

### Quota Checks
Before sending each email in the loop, the system calls `checkAndIncrementEmailQuota` to enforce platform tier limits.

## 3. Domain Authentication & Sender Profiles

High deliverability requires strict domain authentication.

### Current Implementation (Shared Domain)
Currently, all emails are routed through a central, highly-reputable verified domain: `send.au-acadex.com`.
The platform enforces strict authentication on this domain:
- **SPF:** Authorizes Resend and AWS SES to send on behalf of the domain (`v=spf1 include:amazonses.com include:resend.com ~all`).
- **DKIM:** Cryptographically signs outbound emails.
- **DMARC:** Specifies the policy for handling failures (`p=none`).

**Sender Profiles** allow users to define a "From Name" and a "Reply-To" address, but the actual sending address is rewritten to align with the verified domain to pass DMARC alignment (e.g., `"Acme Corp" <acme@send.au-acadex.com>`).

### Planned Architecture (Custom Domains)
As seen in `app/dashboard/settings/domains/page.tsx`, the system is preparing for custom sending domains. This will allow organizations to add their own DNS records (SPF/DKIM/DMARC) via the Resend API, enabling fully whitelabeled outbound emails (e.g., `marketing@acmecorp.com`).


---

# BulkyMailer - Interview / Viva Preparation Guide

This document is designed to help you prepare for a technical interview or college viva based on the BulkyMailer project. It covers elevator pitches, common questions, architectural decisions, and code walk-throughs.

---

## ⏱️ Elevator Pitches

### 30 Seconds (The Hook)
"BulkyMailer is a full-stack, multi-tenant email marketing platform built with Next.js App Router, Prisma, and PostgreSQL. It allows organizations to manage contacts, design responsive emails using a drag-and-drop builder (Templatical), and dispatch bulk campaigns via Resend. It also features Gemini AI integration for automatic template generation."

### 1 Minute (The Core Features)
"BulkyMailer is a modern alternative to Mailchimp built specifically for Next.js. It features a robust multi-tenant architecture where users belong to organizations with specific RBAC permissions. The core workflow involves managing contacts via CSV uploads, creating email templates using an integrated visual editor, and scheduling campaigns. Delivery is handled by Resend, and we track analytics via webhooks. We also integrated Google's Gemini AI with a resilient `ProviderRouter` that automatically handles retries and fallback models if an API call fails."

### 3 Minutes (Technical Deep Dive)
"In building BulkyMailer, I focused heavily on modern React patterns using the Next.js App Router. We use Server Components for data fetching to reduce client bundle size, and Server Actions for form mutations. The database layer uses PostgreSQL with Prisma ORM, implementing a multi-tenant schema where everything (campaigns, templates, contacts) is scoped to an `Organization`. 

For email design, we implemented the `Templatical` framework, which outputs JSON trees and standard HTML. Since email HTML is notoriously hard to code, we built an AI generator using Gemini. Because AI endpoints can be unreliable or rate-limited, I built a custom `ProviderRouter` that implements bounded retries, exponential backoff, and model failover. Media management uses Cloudinary for CDN delivery, and even allows users to import assets directly from Google Drive securely via server-side processing."

---

## 🎯 Project-Specific "Why" Questions

**Q: Why use Next.js App Router instead of standard React (Vite/CRA)?**
**A:** Next.js allows us to use Server Components, which keeps heavy dependencies (like database clients) on the server. We also benefit from Server Actions, meaning we don't have to build hundreds of separate REST API endpoints just to save a contact or update a campaign.

**Q: Why use Templatical?**
**A:** Email clients (Outlook, Gmail) have terrible, inconsistent HTML parsing. Templatical provides a visual editor that generates clean, table-based HTML designed specifically for email compatibility, saving us from writing error-prone MJML manually.

**Q: Why implement a custom `ProviderRouter` for the AI?**
**A:** LLM APIs fail frequently due to rate limits (429) or server overloads (503). If the primary Gemini model fails during an email generation request, the `ProviderRouter` automatically retries with exponential backoff, and if it still fails, falls back to a different model (e.g., from `gemini-2.5-pro` to `gemini-2.5-flash`), ensuring a smooth user experience.

**Q: Why process Google Drive uploads on the server instead of the client?**
**A:** When a user picks an image from Google Drive via the frontend picker, we send the `fileId` and `accessToken` to our Next.js API. The server downloads the file from Google and pipes it to Cloudinary. This bypasses browser CORS issues and prevents the user from downloading a 5MB image to their phone just to re-upload it to our servers.

---

## 📂 Top 20 Most Important Files Walkthrough

1. **`prisma/schema.prisma`**: The heart of the app. Defines `User`, `Organization`, `Campaign`, `Template`, and relations.
2. **`proxy.ts`**: The Next.js middleware. Protects `/dashboard` routes, checks for auth cookies, and redirects unauthenticated users to login.
3. **`lib/ai/provider-router.ts`**: Handles AI API calls with retries, exponential backoff, and model fallback.
4. **`lib/auth/organization-context.ts`**: Centralized RBAC logic. Functions like `requirePermission` ensure users can't perform actions outside their role.
5. **`app/api/media/google-drive/route.ts`**: Server-side processing for downloading Drive files and uploading to Cloudinary.
6. **`lib/cloudinary.ts`**: Wrapper functions for the Cloudinary SDK (image compression, resizing).
7. **`components/media/media-library-modal.tsx`**: The frontend UI for the media library, including the Google Drive picker integration.
8. **`app/api/ai/template-generate/route.ts`**: The endpoint that the frontend calls to trigger AI email generation.
9. **`lib/mailer.ts`**: Abstraction layer for sending emails (wraps Resend and Nodemailer).
10. **`app/dashboard/layout.tsx`**: The shell of the app (Sidebar, Topnav). Fetches user session and organization context.
11. **`app/(marketing)/page.tsx`**: Public landing page (Server Component, statically generated).
12. **`lib/ai/model-registry.ts`**: Defines which Gemini models are available and tracks their health/status.
13. **`package.json`**: Defines dependencies (Resend, Prisma, Tailwind, Templatical).
14. **`app/dashboard/campaigns/page.tsx`**: Lists all campaigns for the active organization.
15. **`app/dashboard/templates/page.tsx`**: Lists templates and allows opening the Templatical editor.
16. **`components/ui/button.tsx`**: (and other UI components) The base design system.
17. **`app/login/page.tsx`**: Authentication entry point.
18. **`lib/db.ts`**: Global Prisma client singleton to prevent exhausting connection limits during dev.
19. **`docs/MEDIA.md`**: Architecture notes on the Media system.
20. **`docs/RBAC.md`**: Architecture notes on the Roles and Permissions system.

---

## 🔧 "If I am asked to modify this..." (Practical Scenarios)

**Scenario 1: Add a new "SMS Campaign" feature.**
- *DB:* Add `SmsCampaign` model in `schema.prisma`.
- *Auth:* Add `sms.create`, `sms.send` permissions in `organization-context.ts`.
- *UI:* Create `/dashboard/sms` route.
- *API:* Create an API route or Server Action to interface with Twilio.

**Scenario 2: Add AWS S3 support instead of Cloudinary.**
- *Backend:* Modify `lib/cloudinary.ts` (or create `lib/storage.ts`) to use AWS SDK `PutObjectCommand`.
- *API:* Update `/api/upload/template-image` to call the S3 function and save the S3 URL to `MediaAsset`.

**Scenario 3: Add a new AI Provider (e.g., OpenAI).**
- *Backend:* Modify `lib/ai/provider-router.ts`. Add a `callOpenAISDK` function alongside `callGeminiSDK`.
- *Registry:* Add GPT models to `lib/ai/model-registry.ts` and update the router loop to try OpenAI if Gemini fails.

---

## ❓ 100 Likely Interview Questions

*(These are grouped for quick review. Be prepared to answer HOW you implemented these concepts in BulkyMailer).*

### Next.js & Frontend (20)
1. What is the difference between App Router and Pages Router?
2. When do you use Server Components vs Client Components?
3. What is a Server Action and how is it used in this app?
4. How does `proxy.ts` (Middleware) work in Next.js?
5. How did you manage global state (React Context vs passing props)?
6. How does Next.js handle caching?
7. What is hydration in React?
8. How did you implement responsive design (Tailwind)?
9. Why did you use `useDrivePicker` on the client but process on the server?
10. How do you handle loading states in Next.js?
11. What is the purpose of `layout.tsx`?
12. How do you pass data from a Server Component to a Client Component?
13. What is `framer-motion` used for in this app?
14. How do you handle form validation? (Zod/React Hook Form)
15. What are React hooks? Name 3 used in this project.
16. How did you implement the drag-and-drop editor?
17. What is the difference between `useEffect` and `useLayoutEffect`?
18. How do you optimize images in Next.js?
19. What is a "suspense boundary"?
20. How do you handle routing between organizations?

### Database & Prisma (20)
21. What is an ORM and why use Prisma?
22. Explain the multi-tenant schema design.
23. What is a foreign key? Give an example from `schema.prisma`.
24. Explain `onDelete: Cascade`. Where did you use it?
25. How do you handle database migrations in Prisma?
26. What is connection pooling? Why is `lib/db.ts` a singleton?
27. How are Contacts linked to Contact Lists and Organizations?
28. Explain the difference between `1:N` and `M:N` relationships.
29. How do you store JSON data in PostgreSQL (e.g., Template JSON tree)?
30. What happens to a User's data if an Organization is deleted?
31. How did you model user invitations?
32. What is an Enum in Prisma?
33. How do you paginate results in Prisma (skip/take)?
34. Explain database indexing. Where are indexes used in this schema?
35. What is the difference between `findUnique` and `findFirst`?
36. How do you update a record in Prisma?
37. How did you implement the audit log?
38. What is a Prisma Generator?
39. How do you handle soft deletes vs hard deletes?
40. How is the `MediaAsset` table structured?

### Email Delivery & Resend (20)
41. What is SMTP?
42. Why use an API (Resend) instead of raw SMTP?
43. How does Resend track opens and clicks?
44. What is a webhook? How is it used for campaign tracking?
45. What is the difference between a Hard Bounce and a Soft Bounce?
46. Why must we capture a snapshot of the template HTML when sending a campaign?
47. What is CAN-SPAM / GDPR compliance in email?
48. How do you handle unsubscribe links?
49. What is DKIM/SPF/DMARC? (Sender Profile concepts)
50. How does Templatical generate email-safe HTML?
51. Why do emails use HTML tables instead of flexbox?
52. What is MJML?
53. How do you prevent emails from going to spam?
54. How did you implement batch sending?
55. What happens if Resend fails during a bulk dispatch?
56. What is a Sender Profile in the context of this app?
57. How do you store email delivery events?
58. What is the `previewText` in an email?
59. How do you test email delivery locally?
60. What is Nodemailer used for in this app?

### AI & Gemini Integration (20)
61. What is a System Instruction in generative AI?
62. Why did you force the AI to return JSON?
63. What is the purpose of the `ProviderRouter`?
64. Explain exponential backoff.
65. What is the difference between 429 and 503 HTTP errors?
66. How do you validate the AI's response schema?
67. What happens if the AI returns malformed JSON?
68. How do you prevent the AI from removing required template elements (Preservation)?
69. What is a model fallback?
70. How do you maintain the context of the user's current template?
71. What is the difference between Gemini Flash and Pro models?
72. How do you handle API keys securely?
73. What is rate limiting?
74. How does the model registry track failures?
75. What is a prompt injection attack?
76. How do you handle AI hallucinations in this app?
77. Why is the AI request done on the server and not the browser?
78. How do you parse the AI response?
79. What is temperature in LLM generation?
80. How did you structure the `AiRequestPayload`?

### Security, Auth & Architecture (20)
81. What is RBAC (Role-Based Access Control)?
82. How is authentication handled in this app?
83. What is the difference between Authorization and Authentication?
84. How do you protect API routes from unauthorized access?
85. What is JWT? Are you using it?
86. How are passwords hashed? (Bcrypt)
87. Why shouldn't you store plain text passwords?
88. What is CORS and how does it relate to the Google Drive integration?
89. How do you prevent a user in Org A from viewing Org B's contacts?
90. What is a Server-Side Request Forgery (SSRF) and how do you prevent it?
91. How are environment variables managed?
92. What happens if someone tries to upload a `.exe` file to the media library?
93. How do you handle multi-tenancy at the database level?
94. What is the purpose of the Audit Log?
95. How do you secure Cloudinary uploads?
96. What is XSS (Cross-Site Scripting) and how does React prevent it?
97. How do you handle CSRF (Cross-Site Request Forgery)?
98. Why use HTTP-only cookies for sessions?
99. How is the Next.js `proxy.ts` middleware involved in security?
100. How would you scale this application for 1,000,000 users?


---

# Media Management System

BulkyMailer features a centralized media management system that allows users to upload, store, and manage image assets for their email campaigns. The system integrates closely with Cloudinary for image hosting, delivery, and transformation, and Google Drive for seamless asset importation.

## Overview

The media system is built on a few core principles:
1. **Cloudinary as Source of Truth:** All images are uploaded to and served from Cloudinary.
2. **Organization-Level Isolation:** Assets are scoped to organizations (Multi-tenant) via the `MediaAsset` table.
3. **Multi-Source Uploads:** Users can upload local files or import directly from Google Drive.

## Data Model

The `MediaAsset` table in Prisma tracks all media uploaded by an organization.

```prisma
model MediaAsset {
  id             String        @id @default(cuid())
  userId         String        // Uploader
  organizationId String?       // Scoped to Organization
  url            String        // Cloudinary Secure URL
  filename       String
  width          Int?
  height         Int?
  sizeBytes      Int?
  mimeType       String?
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
}
```

## Storage & Processing (Cloudinary)

We use the Cloudinary Node.js SDK via `lib/cloudinary.ts`. Cloudinary is used because:
- **CDN Delivery:** Fast global delivery of images for email templates.
- **On-the-fly Transformation:** We can automatically compress and resize images during upload.

### Upload Functions
Different contexts require different image transformations:
- `uploadToCloudinary`: Profile pictures (cropped to 400x400 square).
- `uploadLogoToCloudinary`: Organization logos (limited to 800x200, aspect ratio preserved).
- `uploadTemplateImageToCloudinary`: Email template assets (max width 2000px, aspect ratio preserved). Returns `width` and `height` required for email HTML layout.

## Google Drive Integration

To improve workflow, users can import images directly from their Google Drive without downloading them locally first.

### Frontend: Google Drive Picker
We use `react-google-drive-picker` in `components/media/media-library-modal.tsx`.
1. The user authenticates with Google Drive via a popup.
2. The picker returns a `fileId` and `accessToken`.

### Backend: Server-Side Download
Instead of relying on the browser to download the file (which can face CORS issues), we handle the download on the Next.js server (`/api/media/google-drive`).

1. **Download:** The server uses the `accessToken` to fetch the file from Google APIs (`https://www.googleapis.com/drive/v3/files/{fileId}?alt=media`).
2. **Buffer:** The response is read into a Node.js `Buffer`.
3. **Upload:** The Buffer is sent to Cloudinary using `uploadTemplateImageToCloudinary`.
4. **Database:** A `MediaAsset` record is created.

This approach ensures the user's browser isn't burdened with downloading and re-uploading large files.

## API Routes

- `GET /api/media`: Returns a paginated list of `MediaAsset`s scoped to the active organization.
- `POST /api/upload/template-image`: Accepts `multipart/form-data` with a local `file`, uploads to Cloudinary via buffer stream, and creates a `MediaAsset`.
- `POST /api/media/google-drive`: Accepts `fileId` and `accessToken`, downloads from Drive server-side, uploads to Cloudinary, and creates a `MediaAsset`.

## Security & RBAC

All media routes are protected using the `requirePermission` utility from `lib/auth/organization-context.ts`.
- Uploading requires the `media.upload` permission.
- Viewing requires the `media.view` permission.
- Assets are strictly scoped to `organizationId`. A user in Org A cannot view or use assets from Org B.


---

# Role-Based Access Control (RBAC)

BulkyMailer utilizes a granular, multi-tenant Role-Based Access Control (RBAC) system. A user's permissions are scoped specifically to the **Organization** they are actively viewing. A user could be an `OWNER` in Organization A, but only a `VIEWER` in Organization B.

## Roles

The system defines 8 distinct organization-level roles (`OrgRole`):

1. **OWNER**: Full administrative access, including deleting the organization and transferring ownership.
2. **ADMIN**: Full access to all resources and member management (except removing owners).
3. **MARKETING_MANAGER**: Can manage campaigns, contacts, templates, and invite users, but restricted from deeper org settings.
4. **CAMPAIGN_MANAGER**: Specialized in creating and sending campaigns.
5. **CONTENT_MANAGER**: Specialized in template creation and media assets.
6. **SALES**: Focused on viewing campaigns and managing contacts.
7. **ANALYST**: Read-only access to analytics, campaigns, and templates.
8. **VIEWER**: General read-only access to most platform features.

## Permission Matrix

Permissions are represented as distinct string literals (e.g., `campaign.send`, `member.invite`). The matrix is defined centrally in `lib/auth/rbac.ts`.

| Permission | Owner | Admin | Mktg Mgr | Camp Mgr | Content Mgr | Sales | Analyst | Viewer |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **organization.settings** | ✓ | ✓ | | | | | | |
| **member.invite** | ✓ | ✓ | ✓ | | | | | |
| **member.remove** | ✓ | ✓ | | | | | | |
| **campaign.send** | ✓ | ✓ | ✓ | ✓ | | | | |
| **contact.edit** | ✓ | ✓ | ✓ | | | ✓ | | |
| **template.publish**| ✓ | ✓ | ✓ | | ✓ | | | |
| **analytics.view** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | |

*Note: This is a simplified subset. The codebase tracks granular permissions across 25+ specific actions.*

## Role Assignment Hierarchy

A strict hierarchy governs who can assign or manage roles. This prevents privilege escalation.
Defined in `ROLE_ASSIGNMENT_HIERARCHY`:
- An **ADMIN** can invite and manage other ADMINs, MARKETING_MANAGERs, etc., but cannot invite or manage an OWNER.
- A **MARKETING_MANAGER** can invite users up to CAMPAIGN_MANAGER level.

## Authorization Pipeline & Cross-Org Prevention

Authorization is enforced at the Server Component and API Route levels using a multi-step pipeline located in `lib/auth/organization-context.ts`:

1. **Active Organization Cookie**: The user's active organization is stored in an HTTPOnly cookie (`bm_org_session`).
2. **`requireActiveOrganization()`**: 
   - Retrieves the current session user.
   - Retrieves the active organization from the cookie.
   - Queries `OrganizationMembership` to verify the user has an `ACTIVE` status in that organization.
   - If membership is suspended or missing, it returns `null` (causing a 403 or redirect).
3. **`requirePermission(orgId, permission)`**:
   - For APIs or server actions acting on specific resources, the `orgId` is provided (usually from the request body or path param).
   - The helper validates membership for *that specific* `orgId` and checks if the role satisfies the required permission via `hasPermission()`.
   - **Cross-Org Prevention**: By asserting that the `orgId` of the resource being accessed matches the `orgId` where the user holds the required permission, horizontal privilege escalation (accessing Tenant B's data using Tenant A's token) is completely prevented.


---

# Security Architecture

BulkyMailer implements a robust security model to protect user data, ensure multi-tenant isolation, and provide secure authentication mechanisms.

## Authentication Implementation

The platform uses a custom, cookie-based authentication system rather than relying on heavy third-party providers like NextAuth (App Router specific design).

### Session Management
- **Cookies**: Sessions are tracked via a `bm_session` HTTPOnly, Secure, Lax cookie. This contains the user ID.
- **Passwords**: Passwords are hashed using `bcryptjs` with a work factor of 12 (`SALT_ROUNDS = 12`).
- **OTP Verification**: Email verification and onboarding use a 6-digit numeric OTP generated via cryptographically secure `crypto.randomInt()`. 

### Invitations & Tokens
- **Org Invitations**: Joining an organization requires a token. To prevent timing attacks and data leaks, tokens are generated securely (32-byte random hex) and a **SHA-256 hash** (`tokenHash`) is stored in the database. The raw token is only sent via email, ensuring the database only holds the non-reversible hash.

## Super Admin Architecture

To manage the platform globally, the system includes a "Super Admin" concept.
- **Implementation**: The `User` model contains an `isSuperAdmin` boolean flag.
- **Bypass**: Super Admins have access to specific `admin/*` routes.
- **Helper**: The `requireSuperAdmin()` helper in `lib/auth/organization-context.ts` strictly validates this flag, completely bypassing the standard organization context when accessing platform-wide analytics, global templates, or system audit logs.

## Tenant Isolation

All Prisma queries that fetch resources (Campaigns, Templates, Contacts) must include the `organizationId` in the `where` clause.
- The `requireActiveOrganization()` context helper retrieves the user's active org, and its ID is subsequently injected into Prisma queries.
- Even if an attacker guesses the UUID of a Campaign belonging to another organization, the query `where: { id: reqId, organizationId: userActiveOrg }` will return null.

## Known Security Considerations

1. **CSRF Protection**: By using `SameSite=Lax` on session cookies, basic cross-site request forgery is mitigated. However, API endpoints that mutate data should validate the origin or rely on Next.js Server Actions which have built-in CSRF protection.
2. **Rate Limiting**: The system implements a basic quota system (`checkAndIncrementEmailQuota`) to prevent abuse of the free tier (100 emails/month). 
3. **Database Injection**: Prisma ORM inherently protects against SQL injection by using parameterized queries.
4. **XSS in Templates**: The system allows users to create HTML templates. While the editor uses MJML/JSON structures (MODERN mode) which are relatively safe, LEGACY mode allows raw HTML. Rendered templates sent via Resend are isolated in email clients, but previewing them within the BulkyMailer dashboard requires careful sanitization to prevent stored XSS against other organization members.


---

# Email Template System

The BulkyMailer template system is built around **Templatical**, an open-source drag-and-drop email editor that generates MJML, which is then compiled into cross-client compatible HTML. The system supports multi-tenant architecture, distinguishing between public, organizational, and personal templates.

## 1. Data Model & Architecture (`Template` & `TemplateVersion`)

Templates are stored in the database using the `Template` Prisma model. 

### Source of Truth
- **Modern Templates (`generation: 'MODERN'`):** The source of truth is `jsonTree` (a JSON structure representing Templatical blocks). The `htmlContent` is generated dynamically and cached for previews.
- **Legacy Templates (`generation: 'LEGACY'`):** These templates contain only `htmlContent` and are treated as read-only inside the editor workspace (displayed in an `iframe`).

### Ownership & RBAC
- **Public Templates:** Identified by `userId: null` and `organizationId: null`. These form the global template library available to all users as starting points.
- **Organization Templates:** Owned by an organization (`organizationId` is set) and shared among members based on RBAC.
- **Personal Templates:** Owned by a specific user (`userId` is set, `organizationId: null`), used for personal drafts before moving to an organization.

## 2. Editor Integration (`Templatical`)

The visual editor is implemented in `app/dashboard/templates/[id]/edit/page.tsx` using `@templatical/editor`.

### Initialization
The editor mounts inside a `useRef` container when the page loads:
```typescript
import { init } from '@templatical/editor';

const editor = await init({
  container: containerRef.current,
  content: template.jsonTree,
  mergeTags: {
    tags: [
      { value: 'firstName', label: 'First Name', sample: 'John' },
      // ...
    ]
  },
  customBlocks: [advancedImageBlock], // Integrated custom image blocks
  onRequestMedia: async () => { ... } // Hooks into BulkyMailer's Media Library
});
```

### Custom Blocks & Cloudinary Integration
BulkyMailer extends Templatical with custom blocks like `advanced_image`. When a user crops an image, the editor hooks into Cloudinary's dynamic URL transformations, updating the image block URL on the fly instead of re-uploading the cropped image.

## 3. Rendering Pipeline (MJML)

Email clients (Outlook, Gmail, etc.) have notoriously inconsistent HTML/CSS support. BulkyMailer uses MJML to ensure responsive and consistent rendering.

### The Pipeline (`lib/templates/compile.ts`)
1. **JSON to MJML:** The `jsonTree` (TemplateContent) is parsed by `@templatical/renderer` (`renderToMjml()`). Custom blocks (like `advanced_image`) are mapped to their MJML equivalents (`<mj-image>`).
2. **MJML to HTML:** The MJML string is passed into the `mjml2html` parser. Soft validation is applied, and the resulting HTML string is returned.
3. **Usage:** This compilation step occurs during test email sends, actual campaign sends, and when updating the template's preview HTML cache.

## 4. Public Template Library

The platform includes a seeded public library (e.g., newsletters, welcome emails, promotional).
- When a user selects a public template, the system **forks** it (duplicates the `jsonTree` and assigns it to the user's `organizationId`), creating a mutable draft while leaving the original public template untouched.

