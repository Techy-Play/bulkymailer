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

## 📌 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Key Architecture & Core Features](#-key-architecture--core-features)
   - [✨ AI Assistant Studio Engine](#-ai-assistant-studio-engine)
   - [🎨 Figma-Style Visual Template Editor](#-figma-style-visual-template-editor)
   - [🚀 Campaign Management & Dispatch Worker](#-campaign-management--dispatch-worker)
   - [👥 Contact List Management & CSV/XLSX Parser](#-contact-list-management--csvxlsx-parser)
   - [🔐 Multi-Tenant Authentication & Onboarding](#-multi-tenant-authentication--onboarding)
   - [👑 Admin Management Panel](#-admin-management-panel)
   - [🛡️ CAN-SPAM Compliance & Deliverability Guard](#️-can-spam-compliance--deliverability-guard)
3. [Technology Stack](#-technology-stack)
4. [Database Schema & ER Model](#-database-schema--er-model)
5. [Project Structure](#-project-structure)
6. [Getting Started & Installation](#-getting-started--installation)
   - [Prerequisites](#prerequisites)
   - [Environment Configuration](#environment-configuration)
   - [Database Setup & Seeding](#database-setup--seeding)
   - [Running the Application](#running-the-application)
7. [API Endpoints Reference](#-api-endpoints-reference)
8. [Security & Data Isolation](#-security--data-isolation)
9. [License & Acknowledgments](#-license--acknowledgments)

---

## 📖 Executive Summary

**BulkyMailer** is a production-grade, enterprise-ready email marketing and campaign dispatch web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Prisma v7 ORM**, and **Google Gemini AI**.

It enables marketers, businesses, and individual creators to generate high-converting email templates using conversational AI prompts, visually edit templates in a dual-mode canvas with resizable panels, manage contact lists via CSV/Excel imports, and dispatch bulk email campaigns with real-time tracking, spam risk detection, and CAN-SPAM compliance.

---

## 🌟 Key Architecture & Core Features

### ✨ AI Assistant Studio Engine
- **Prompt-to-Email Generation**: Converts natural language prompts (e.g. *"Build a modern summer sale newsletter with hero banner, 2 product cards, and dark footer"*) into responsive HTML email designs.
- **Two-Column Studio Modal**:
  - **Left Column (45%)**: Quick design presets, custom prompt text area, live execution logs, spam risk assessment, and brand score calculations.
  - **Right Column (55%)**: Interactive `<iframe srcDoc={...}>` live preview with **Desktop** and **Mobile** viewport toggles.
- **Resilient Multi-Model Fallback**: Automatically tries active Gemini 2.x endpoints (`gemini-2.0-flash-lite`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-2.5-pro`) with exponential backoff on HTTP 429 rate limits.
- **Token Reduction Sanitizer**: Automatically strips inline base64 image strings (`data:image/...`) before sending prompts to the AI model, achieving an **~80% reduction** in Tokens-Per-Minute (TPM) usage.

---

### 🎨 Figma-Style Visual Template Editor
- **Dual Viewport Modes**:
  - **Preview Mode**: Renders the complete compiled HTML inside an `<iframe>` for **100% styling fidelity** (circular images, custom spacing, inline CSS).
  - **Edit Mode**: Interactive node-by-node visual canvas with click-to-select, drag-to-reorder, and inline text editing.
- **Resizable Drag Panels**:
  - Horizontal drag divider between Canvas and Inspector panel (resizable from 260px to 600px).
  - Vertical drag divider for the bottom **Monaco Source Code Editor** panel (resizable from 120px to 50% viewport height).
- **1-Click Component Palette**:
  - Quick-add buttons for `Hero Banner`, `Section Heading`, `Paragraph Text`, `CTA Button`, `Image Banner`, `Product Card`, and `Footer`.
- **Advanced Image Shape Controls**:
  - `⭕ Circle`: Applies `border-radius: 50%`, equal width/height, and `object-fit: cover` for perfect circular avatars.
  - `▢ Rounded`: Soft `16px` rounded corners.
  - `▭ Rectangle`: Sharp rectangular layout.
  - Alignment controls (Left, Center, Right) and pixel width sliders.
- **Version Timeline History**: Snapshot drawer to restore past template iterations.

---

### 🚀 Campaign Management & Dispatch Worker
- **Step-by-Step Campaign Wizard**:
  - Campaign Subject Line & Preview Text.
  - Sender Profile binding (From Name, From Email, Reply-To).
  - Contact List selector with contact count badges.
  - Email Content picker (select saved templates or build from scratch).
- **Live Device Previews**: Real-time Gmail inbox card preview, Desktop monitor frame, and Smartphone viewport.
- **Draft Auto-Save & Async Sending**: Async background campaign dispatch worker that updates campaign status (`DRAFT` → `QUEUED` → `SENDING` → `SENT`).

---

### 👥 Contact List Management & CSV/XLSX Parser
- **List Organization**: Group contacts into distinct marketing lists (e.g. *Newsletter Subscribers*, *VIP Customers*).
- **Drag-and-Drop File Import**: Parse `.csv`, `.xlsx`, and `.xls` files directly in the browser with custom column mapping (`Email`, `First Name`, `Last Name`, `Phone`, and custom key-value JSON fields).
- **Unsubscribe & Opt-Out Guard**: Automatically tracks unsubscribes and filters opted-out emails from future campaign dispatches.

---

### 🔐 Multi-Tenant Authentication & Onboarding
- **HttpOnly Cookie Sessions**: Secure `bm_session` cookie authentication managed via `lib/auth.ts`.
- **6-Digit Email OTP Verification**: Time-limited OTP codes for account verification.
- **Searchable Country Code Selector**: Dynamic phone selector with flag emojis (e.g. `🇮🇳 +91`) for phone number input.
- **Multi-Step Onboarding**: Guides new users through organization creation, team size selection, contact range specification, and marketing opt-ins.

---

### 👑 Admin Management Panel
- **Role-Based Access Control (RBAC)**: Supports `OWNER`, `ADMIN`, `EDITOR`, and `MEMBER` roles.
- **User Management Hub**: View all registered users, total organizations, active/pending/suspended counts.
- **Destructive Action Protections**: Password reset generator, status toggling, and type `'confirm'` confirmation modal for template deletion.

---

### 🛡️ CAN-SPAM Compliance & Deliverability Guard
- **Automatic Unsubscribe Enforcement**: Automatically detects existing unsubscribe links (`{{unsubscribeUrl}}`) and prevents duplicate footer stacking.
- **Liquid/Handlebars Merge Tags**: Replaces `{{firstName}}`, `{{lastName}}`, `{{company}}`, `{{email}}`, and `{{unsubscribeUrl}}` dynamically per recipient.
- **Spam Risk & Health Check**: Validates ALT text, link protocols, and subject line length before campaign execution.

---

## 🛠️ Technology Stack

| Category | Technology / Library | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | React framework with Server Components & API Routes |
| **Language** | TypeScript 5.x | End-to-end type safety |
| **UI Library** | React 19 | Component architecture & state hooks |
| **Styling** | Tailwind CSS v4 | Utility-first CSS framework |
| **Icons** | Lucide React | Modern vector icons |
| **Code Editor** | `@monaco-editor/react` | Embedded VS Code-style HTML code editor |
| **Database** | PostgreSQL 16 | Relational database storage |
| **ORM** | Prisma v7 (`@prisma/adapter-pg`) | Type-safe database client & schema migrations |
| **Authentication** | Custom HttpOnly Sessions & bcryptjs | Secure authentication engine |
| **AI Integration** | Google Gemini 2.x API | AI template & copy generation |
| **Media Storage** | Cloudinary API | Cloud storage for profile images & logos |
| **Email Transport** | Nodemailer / Resend | SMTP & API email delivery |
| **File Parsing** | `csv-parse`, `xlsx` | CSV and Excel file parsing |
| **Notifications** | Sonner | Modern toast notifications |

---

## 📊 Database Schema & ER Model

```mermaid
erDiagram
    Organization ||--o{ User : "has many"
    User ||--o{ ContactList : "owns"
    User ||--o{ SenderProfile : "owns"
    User ||--o{ Template : "owns"
    User ||--o{ Campaign : "dispatches"
    
    ContactList ||--o{ Contact : "contains"
    ContactList ||--o{ Campaign : "targeted by"
    
    Template ||--o{ Campaign : "used in"
    SenderProfile ||--o{ Campaign : "sender for"
    
    Campaign ||--o{ CampaignEvent : "logs"
```

### Models Summary:
- **`Organization`**: Stores company name, website, logo URL, address, team size, contact range, and marketing preferences.
- **`User`**: User credentials, role (`OWNER`, `ADMIN`, `EDITOR`, `MEMBER`), status (`PENDING`, `ACTIVE`, `SUSPENDED`), monthly email limit counters, profile image URL, and OTP state.
- **`ContactList` & `Contact`**: Contact lists and individual recipient records with dynamic custom JSON fields.
- **`Template`**: Stores raw `htmlContent`, `jsonTree` visual structure, category (`NEWSLETTER`, `PROMOTIONAL`, `PERSONALIZED`, `GENERAL`, `TRANSACTIONAL`), and `userId` (null = public system template).
- **`SenderProfile`**: Sender profiles containing `fromName`, `fromEmail`, and `replyTo`.
- **`Campaign`**: Campaign metadata, subject, snapshots of HTML/sender details at send time, recipient counts, and delivery metrics.
- **`CampaignEvent`**: Granular tracking log for `SENT`, `DELIVERED`, `OPENED`, `CLICKED`, `BOUNCED`, `COMPLAINED`, and `UNSUBSCRIBED` events.

---

## 📁 Project Structure

```
bulkymailer/
├── app/
│   ├── (auth)/                # Login, Register, Forgot Password, OTP pages
│   ├── (marketing)/           # Landing page with AI Showcase section
│   ├── admin/                 # Super-admin control panel
│   ├── api/                   # REST API routes
│   │   ├── admin/             # Admin user & system APIs
│   │   ├── ai/                # AI template generation endpoint
│   │   ├── auth/              # Authentication & OTP APIs
│   │   ├── campaigns/         # Campaign creation & send endpoints
│   │   ├── contacts/          # Contact list import & management APIs
│   │   ├── sender-profiles/   # Sender profile CRUD
│   │   └── templates/         # Template CRUD & duplication endpoints
│   └── dashboard/             # Main app dashboard
│       ├── campaigns/         # Campaign list & new campaign wizard
│       ├── contacts/          # Contact lists & import interface
│       ├── templates/         # Template gallery, new template, & visual editor
│       │   └── [id]/edit/     # Resizable Figma-style visual editor page
│       └── profile/           # User settings & profile management
├── components/
│   ├── admin/                 # Admin sidebar & user management tables
│   ├── editor/                # Canvas, Inspector, Breadcrumb, HealthPanel
│   ├── landing/               # AI Showcase & marketing sections
│   └── ui/                    # Shared buttons, modals, top progress bar
├── lib/
│   ├── auth.ts                # Cookie session auth & password hashing
│   ├── db.ts                  # Prisma client instance with @prisma/adapter-pg
│   ├── editor/                # Canvas compiler, serializer, commands, tokens
│   └── mailer.ts              # SMTP email transport & merge tag renderer
├── prisma/
│   ├── schema.prisma          # Prisma schema definition
│   └── seed.ts                # Seed script for initial admin user
├── public/                    # Static assets & favicon
└── package.json               # Project dependencies & scripts
```

---

## 🚀 Getting Started & Installation

### Prerequisites
- **Node.js**: v20.x or higher
- **PostgreSQL**: v14.x or higher (or cloud provider like Neon / Supabase)
- **npm** or **pnpm**

### Environment Configuration
Create a `.env` file in the root directory:

```env
# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/bulkymailer?schema=public"

# Session & JWT Secrets
JWT_SECRET="your-super-secret-jwt-key"
COOKIE_SECRET="your-super-secret-cookie-key"

# Google Gemini AI API Key
GEMINI_API_KEY="AIzaSy..."

# Cloudinary Credentials (Optional - for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# SMTP Email Configuration (Nodemailer / Resend)
SMTP_HOST="smtp.resend.com"
SMTP_PORT=587
SMTP_USER="resend"
SMTP_PASS="re_..."
SMTP_FROM_EMAIL="noreply@yourdomain.com"
SMTP_FROM_NAME="BulkyMailer"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Setup & Seeding

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma Client & Push Schema**:
   ```bash
   npx prisma db push
   ```

3. **Seed Database with Default Admin User**:
   ```bash
   npx prisma db seed
   ```

   **Default Admin Credentials (from `prisma/seed.ts`)**:
   - **Email**: `admin@bulkymailer.com`
   - **Password**: `Admin@1234`
   - **Role**: `ADMIN`

---

### Running the Application

- **Development Mode**:
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Production Build**:
  ```bash
  npm run build
  npm run start
  ```

- **Typecheck Verification**:
  ```bash
  npx tsc --noEmit
  ```

---

## 📡 API Endpoints Reference

### Authentication
- `POST /api/auth/register` — Register a new account & dispatch 6-digit OTP.
- `POST /api/auth/verify-otp` — Verify email via OTP code.
- `POST /api/auth/login` — Authenticate user and issue `bm_session` HttpOnly cookie.
- `POST /api/auth/logout` — Clear session cookie.

### AI Engine
- `POST /api/ai/template-generate` — Generates responsive email HTML from prompt instructions using Gemini 2.x models with automatic token reduction.

### Templates
- `GET /api/templates` — Fetch global system templates and current user's private templates.
- `POST /api/templates` — Create a new blank template.
- `GET /api/templates/[id]` — Retrieve template details.
- `PUT /api/templates/[id]` — Update template JSON tree or HTML content.
- `DELETE /api/templates/[id]` — Delete template (requires ownership).
- `POST /api/templates/[id]/duplicate` — Duplicate template into user's private library.
- `POST /api/templates/[id]/test-email` — Dispatch a personalized test email to recipient.

### Campaigns
- `GET /api/campaigns` — List user's email campaigns.
- `POST /api/campaigns` — Create a new draft campaign.
- `PATCH /api/campaigns/[id]` — Update campaign settings.
- `POST /api/campaigns/[id]/send` — Trigger background campaign dispatch worker.

### Contacts & Lists
- `GET /api/contacts/lists` — Retrieve user's contact lists.
- `POST /api/contacts/lists` — Create a new contact list.
- `POST /api/contacts/import` — Import contacts from parsed CSV/Excel file.

---

## 🔒 Security & Data Isolation

1. **Multi-Tenant Data Scope**:
   - Every database query for templates, campaigns, contact lists, and sender profiles explicitly filters by `userId: currentUserId`.
   - Public system templates use `userId: null` and are read-only for regular users.
2. **Destructive Action Confirmation**:
   - Deleting a template requires the user to type `"confirm"` into a confirmation modal before execution.
3. **API Rate Limiting & Backoff**:
   - Exponential backoff algorithm for AI API calls prevents rate-limit bans (HTTP 429).
4. **Input Sanitization**:
   - HTML base64 string stripping prevents payload bloat and token exhaustion attacks.

---

## 📜 License & Acknowledgments

Built with ❤️ by the **BulkyMailer Team** using Next.js 16, React 19, Tailwind CSS, Prisma, and Google Gemini AI.

*Copyright © 2026 BulkyMailer. All rights reserved.*
