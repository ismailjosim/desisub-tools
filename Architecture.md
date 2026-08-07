# DesiSub — Architecture

> **Last Updated:** 2026-08-07  
> **Status:** Approved  
> **Version:** 1.0

---

## 1. Tech Stack

| Layer                | Technology                           | Rationale                                                                           |
| -------------------- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| **Framework**        | Next.js 14+ (App Router)             | Server Actions, Route Handlers, RSC, built-in API layer                             |
| **Language**         | TypeScript (strict mode)             | Type safety across the full stack                                                   |
| **UI Components**    | shadcn/ui                            | Accessible, customizable, composable components                                     |
| **Styling**          | Tailwind CSS                         | Utility-first, pairs with shadcn/ui, design token integration via `tailwind.config` |
| **Database**         | PostgreSQL                           | Structured relational data (users, translations, downloads)                         |
| **ORM**              | Prisma                               | Type-safe database queries, schema migrations, introspection                        |
| **Authentication**   | Better Auth                          | Modern, comprehensive auth solution with plugins and type-safety                    |
| **AI Engine**        | Vercel AI SDK + OpenAI `gpt-4o-mini` | Streaming responses, cost-effective batch translation                               |
| **File Storage**     | Cloudflare R2                        | S3-compatible, free egress, cheap storage for SRT/VTT files                         |
| **Subtitle Parsing** | `srt-parser-2`                       | Reliable SRT parsing, timestamp extraction, re-assembly                             |
| **External API**     | OpenSubtitles REST API v3            | Large subtitle database, search by title/IMDB ID                                    |
| **Validation**       | Zod                                  | Runtime type validation for API inputs and forms                                    |
| **Icons**            | Lucide React                         | Consistent, modern, MIT-licensed icon set                                           |
| **Deployment**       | Vercel                               | Native Next.js support, edge functions, preview deployments                         |

---

## 2. System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                            │
│  Next.js App Router (React Server Components + Client)   │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │  Search   │  │ Translate │  │   Sync   │  Landing     │
│  │  & DL     │  │   Tool   │  │  Fixer   │  Dashboard   │
│  └────┬─────┘  └────┬─────┘  └──────────┘  Auth Pages   │
│       │              │        (client-only)               │
└───────┼──────────────┼───────────────────────────────────┘
        │              │
        ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                     SERVER LAYER                         │
│                                                          │
│  ┌────────────────┐  ┌────────────────┐                  │
│  │ Route Handlers │  │ Server Actions │                  │
│  │   /api/v1/*    │  │  (mutations)   │                  │
│  └───────┬────────┘  └───────┬────────┘                  │
│          │                   │                           │
│  ┌───────┴───────────────────┴────────┐                  │
│  │          Service Layer             │                  │
│  │  (Business logic, validation)      │                  │
│  └───────┬────────────┬───────────────┘                  │
│          │            │                                  │
│  ┌───────▼────┐  ┌────▼──────────┐                       │
│  │   Prisma   │  │  External APIs │                      │
│  │  (PostgreSQL)│ │  - OpenAI     │                      │
│  │            │  │  - OpenSubs   │                       │
│  │            │  │  - R2 Storage │                       │
│  └────────────┘  └───────────────┘                       │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Folder Structure

```
📁 desisub/
│
├── 📄 PRD.md                     # Product requirements (WHAT)
├── 📄 design.md                  # Visual design system
├── 📄 Architecture.md            # This file (HOW)
├── 📄 rules.md                   # AI coding guardrails
├── 📄 phases.md                  # Build phases & acceptance criteria
├── 📄 memory.md                  # Session state tracker
│
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── 📄 layout.tsx         # Root layout (fonts, theme, providers)
│   │   ├── 📄 page.tsx           # Landing page
│   │   ├── 📄 globals.css        # Global styles & CSS custom properties
│   │   │
│   │   ├── 📁 (auth)/            # Auth route group (no layout nesting)
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 register/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📄 layout.tsx     # Auth-specific layout (centered card)
│   │   │
│   │   ├── 📁 (dashboard)/       # Protected route group
│   │   │   ├── 📄 layout.tsx     # Dashboard layout (sidebar + header)
│   │   │   ├── 📁 translate/
│   │   │   │   └── 📄 page.tsx   # AI Translation tool page
│   │   │   ├── 📁 sync/
│   │   │   │   └── 📄 page.tsx   # Sync Fixer tool page
│   │   │   ├── 📁 search/
│   │   │   │   └── 📄 page.tsx   # Subtitle search & download page
│   │   │   ├── 📁 history/
│   │   │   │   └── 📄 page.tsx   # User history (translations + downloads)
│   │   │   └── 📁 settings/
│   │   │       └── 📄 page.tsx   # Account settings
│   │   │
│   │   └── 📁 api/               # API Route Handlers
│   │       └── 📁 v1/
│   │           ├── 📁 auth/
│   │           │   └── 📄 [...all]/route.ts
│   │           ├── 📁 subtitles/
│   │           │   ├── 📄 search/route.ts       # GET: search subtitles
│   │           │   └── 📄 download/route.ts     # GET: download subtitle file
│   │           ├── 📁 translate/
│   │           │   ├── 📄 route.ts              # POST: start translation
│   │           │   └── 📄 [id]/route.ts         # GET: translation status
│   │           └── 📁 user/
│   │               ├── 📄 route.ts              # GET: user profile
│   │               └── 📄 history/route.ts      # GET: user history
│   │
│   ├── 📁 components/
│   │   ├── 📁 ui/                # shadcn/ui components (auto-generated)
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 dialog.tsx
│   │   │   ├── 📄 dropdown-menu.tsx
│   │   │   ├── 📄 progress.tsx
│   │   │   ├── 📄 accordion.tsx
│   │   │   ├── 📄 sheet.tsx
│   │   │   └── ...
│   │   ├── 📁 layout/           # Structural components
│   │   │   ├── 📄 header.tsx
│   │   │   ├── 📄 sidebar.tsx
│   │   │   ├── 📄 footer.tsx
│   │   │   └── 📄 mobile-nav.tsx
│   │   └── 📁 features/         # Feature-specific components
│   │       ├── 📁 translate/
│   │       │   ├── 📄 file-upload.tsx
│   │       │   ├── 📄 language-selector.tsx
│   │       │   ├── 📄 translation-progress.tsx
│   │       │   └── 📄 translation-result.tsx
│   │       ├── 📁 sync/
│   │       │   ├── 📄 dual-file-upload.tsx
│   │       │   ├── 📄 sync-preview.tsx
│   │       │   └── 📄 sync-result.tsx
│   │       ├── 📁 search/
│   │       │   ├── 📄 search-bar.tsx
│   │       │   ├── 📄 search-results.tsx
│   │       │   └── 📄 subtitle-card.tsx
│   │       └── 📁 shared/
│   │           ├── 📄 file-dropzone.tsx
│   │           ├── 📄 download-button.tsx
│   │           └── 📄 usage-badge.tsx
│   │
│   ├── 📁 lib/                  # Core logic & utilities
│   │   ├── 📁 db/
│   │   │   ├── 📄 prisma.ts     # Prisma client singleton
│   │   │   └── 📄 schema.prisma # Database schema
│   │   ├── 📁 ai/
│   │   │   ├── 📄 translate.ts  # AI translation logic (batch processing)
│   │   │   └── 📄 prompts.ts    # System prompts for translation
│   │   ├── 📁 subtitle/
│   │   │   ├── 📄 parser.ts     # SRT/VTT parsing utilities
│   │   │   ├── 📄 sync.ts       # Two-file sync logic
│   │   │   └── 📄 formatter.ts  # Output formatting (SRT/VTT)
│   │   ├── 📁 api/
│   │   │   └── 📄 opensubtitles.ts  # OpenSubtitles API client
│   │   ├── 📁 storage/
│   │   │   └── 📄 r2.ts         # Cloudflare R2 upload/download
│   │   ├── 📄 auth.ts           # Better Auth configuration
│   │   ├── 📄 auth-client.ts    # Better Auth client configuration
│   │   ├── 📄 utils.ts          # General utilities (cn, formatters)
│   │   └── 📄 validations.ts    # Zod schemas
│   │
│   ├── 📁 hooks/                # Custom React hooks
│   │   ├── 📄 use-file-upload.ts
│   │   ├── 📄 use-translation.ts
│   │   └── 📄 use-subtitle-sync.ts
│   │
│   └── 📁 types/                # TypeScript type definitions
│       ├── 📄 subtitle.ts       # Subtitle-related types
│       ├── 📄 api.ts            # API response types
│       └── 📄 index.ts          # Barrel exports
│
├── 📁 prisma/
│   ├── 📄 schema.prisma         # Database schema (canonical location)
│   └── 📁 migrations/           # Auto-generated migrations
│
├── 📁 public/
│   ├── 📁 images/               # Static images
│   └── 📄 favicon.ico
│
├── 📄 .env.local                # Environment variables (local)
├── 📄 .env.example              # Environment variable template
├── 📄 next.config.js            # Next.js configuration
├── 📄 tailwind.config.ts        # Tailwind configuration (design tokens)
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 package.json
└── 📄 .gitignore
```

---

## 4. Database Schema

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id
  name          String
  email         String
  emailVerified Boolean
  image         String?
  createdAt     DateTime
  updatedAt     DateTime
  sessions      Session[]
  accounts      Account[]

  // Custom
  translations  Translation[]
  downloads     DownloadHistory[]

  @@unique([email])
  @@map("user")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String
  createdAt DateTime
  updatedAt DateTime
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@map("session")
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime
  updatedAt             DateTime

  @@map("account")
}

model Verification {
  id         String    @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime?
  updatedAt  DateTime?

  @@map("verification")
}

model Subtitle {
  id         String   @id @default(cuid())
  imdbId     String
  movieTitle String
  language   String
  format     String   // "srt" or "vtt"
  fileUrl    String
  uploadedBy String?
  createdAt  DateTime @default(now())

  @@index([imdbId])
  @@index([language])
}

model Translation {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  originalLang String
  targetLang   String
  status       String   @default("PENDING") // PENDING, PROCESSING, COMPLETED, FAILED
  sourceFileUrl String?
  resultFileUrl String?
  lineCount    Int?
  errorMessage String?
  createdAt    DateTime @default(now())
  completedAt  DateTime?

  @@index([userId])
  @@index([status])
}

model DownloadHistory {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  imdbId       String
  movieTitle   String?
  language     String?
  downloadedAt DateTime @default(now())

  @@index([userId])
}
```

---

## 5. API Endpoints

### Authentication

| Method | Endpoint                | Description                                               |
| ------ | ----------------------- | --------------------------------------------------------- |
| ALL    | `/api/v1/auth/[...all]` | Better Auth handlers (register, login, session, callback) |

### Subtitles

| Method | Endpoint                                         | Description                        |
| ------ | ------------------------------------------------ | ---------------------------------- |
| GET    | `/api/v1/subtitles/search?q={query}&lang={lang}` | Search subtitles via OpenSubtitles |
| GET    | `/api/v1/subtitles/download?id={fileId}`         | Download a subtitle file           |

### Translation

| Method | Endpoint                    | Description                     |
| ------ | --------------------------- | ------------------------------- |
| POST   | `/api/v1/translate`         | Start a new AI translation job  |
| GET    | `/api/v1/translate/{id}`    | Get translation status & result |
| GET    | `/api/v1/translate/history` | Get user's translation history  |

### User

| Method | Endpoint               | Description                                    |
| ------ | ---------------------- | ---------------------------------------------- |
| GET    | `/api/v1/user/profile` | Get user profile                               |
| PATCH  | `/api/v1/user/profile` | Update user profile                            |
| GET    | `/api/v1/user/usage`   | Get daily usage stats (translations remaining) |

---

## 6. Key Data Flows

### AI Translation Flow

```
User uploads SRT → Parse file (extract lines) → Validate format
    → Batch lines (50-100 per batch) → For each batch:
        → Build context prompt (include preceding 10 lines)
        → Call OpenAI API (streaming)
        → Append translated lines to result
    → Assemble final SRT with original timestamps
    → Upload result to R2 → Update Translation record → Return download URL
```

### Sync Fixer Flow (Client-Side)

```
User uploads File A (timing) + File B (text)
    → Parse both files in browser (srt-parser-2)
    → Map: for each line in A, take timestamp from A + text from B
    → Handle line count mismatch (fallback to A's text if B runs out)
    → Show preview table (timestamp | original | synced)
    → User clicks download → Generate SRT string → Browser download
```

### Subtitle Search Flow

```
User enters search query → Hit /api/v1/subtitles/search
    → Proxy request to OpenSubtitles API v3
    → Parse response, extract: title, year, language, format, download link
    → Return formatted results → User clicks download
    → Hit /api/v1/subtitles/download → Stream file from OpenSubtitles → Log to DownloadHistory
```

---

## 7. Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/desisub"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# OpenAI
OPENAI_API_KEY="sk-..."

# OpenSubtitles
OPENSUBTITLES_API_KEY="your-api-key"
OPENSUBTITLES_BASE_URL="https://api.opensubtitles.com/api/v1"

# Cloudflare R2
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key"
R2_SECRET_ACCESS_KEY="your-secret-key"
R2_BUCKET_NAME="desisub-files"
R2_PUBLIC_URL="https://your-r2-domain.com"
```

---

> **Rule:** All new features must follow this folder structure. If a new module doesn't fit the existing pattern, update this document first, then write the code.
