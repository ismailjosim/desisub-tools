# DesiSub — AI Coding Rules

> **Last Updated:** 2026-08-07  
> **Status:** Approved  
> **Version:** 1.0

---

## Purpose

This file contains **project-specific guardrails** for AI coding assistants. These are not generic best practices — they are rules born from the DesiSub stack, architecture, and known pitfalls. Read this file at the start of every session.

---

## 1. Framework Rules (Next.js App Router)

### DO:
- Always use the **App Router** (`/app` directory) — never Pages Router
- Use **Server Actions** for all data mutations (form submissions, database writes)
- Use **Route Handlers** (`route.ts`) for API endpoints
- Use **React Server Components** by default — only add `"use client"` when the component needs browser APIs, state, or effects
- Wrap any component using `useSearchParams()` in a `<Suspense>` boundary
- Use `next/navigation` for routing — never `next/router`
- Use `next/image` for all images — never raw `<img>` tags

### DON'T:
- Never use Pages Router patterns (`getServerSideProps`, `getStaticProps`)
- Never use `next/router` — it's Pages Router only
- Never put `"use client"` on a component that doesn't actually need it
- Never call `fetch()` from a Server Component to hit your own API routes — call the function directly

---

## 2. Database & Prisma Rules

### DO:
- Always use the **Prisma client singleton** from `src/lib/db/prisma.ts` — never instantiate a new client
- Always include `@@index` on fields used in `WHERE` clauses or JOINs
- Use `cuid()` for all primary keys
- Use `onDelete: Cascade` on relations where child records should be deleted with the parent
- Run `npx prisma migrate dev` after any schema change
- Run `npx prisma generate` after any schema change before importing types

### DON'T:
- Never write raw SQL — always use Prisma's query builder
- Never use `$transaction` where TypeScript inference breaks — use `Promise.all` instead
- Never store sensitive data (passwords, API keys) in plain text — always hash passwords with bcrypt

---

## 3. Subtitle Processing Rules

### DO:
- Use `srt-parser-2` for all SRT parsing — never regex-based custom parsers
- Always preserve original timestamps during AI translation — only modify text content
- Always preserve SRT structure: sequence number → timecodes → text → blank line
- When syncing files, handle line count mismatches by falling back to File A's text
- Validate file type (`.srt` or `.vtt`) before processing — reject other formats

### DON'T:
- Never modify timestamps during translation
- Never assume both files in sync operations have the same line count
- Never process entire subtitle files in a single AI call — always batch (50–100 lines)

---

## 4. AI Translation Rules

### DO:
- Process subtitle lines in batches of **50–100 lines**
- Include the preceding **10 lines** as context in each batch
- Use the system prompt defined in `src/lib/ai/prompts.ts` — never ad-hoc prompts
- Use Vercel AI SDK for streaming responses
- Track translation status: `PENDING → PROCESSING → COMPLETED / FAILED`
- Enforce free tier limit: **3 translations per day** per user
- Always include error handling for API rate limits and timeouts

### DON'T:
- Never send the entire file to the AI in one request
- Never translate literally — the system prompt must enforce natural, conversational output
- Never expose the OpenAI API key to the client — all AI calls happen server-side

---

## 5. Styling & UI Rules

### DO:
- Use design tokens from `design.md` — reference CSS custom properties
- Use `shadcn/ui` for all base components (Button, Dialog, Input, etc.)
- Use Tailwind CSS for layout and spacing utilities
- Use the `cn()` utility from `src/lib/utils.ts` for conditional class merging
- Add micro-animations on interactive elements (hover, focus, drag)
- Ensure all colors meet WCAG AA contrast ratios against `--surface-bg`
- Use Lucide React for all icons

### DON'T:
- Never use hardcoded color values — always use design tokens or Tailwind theme
- Never install other UI component libraries (Material UI, Ant Design, Chakra, etc.)
- Never use inline styles — use Tailwind classes or CSS modules
- Never use browser-default fonts — always use the defined font stack (Space Grotesk, Inter, JetBrains Mono)

---

## 6. TypeScript & Code Quality Rules

### DO:
- Enable `strict: true` in tsconfig
- Define types in `src/types/` — never use `any`
- Use Zod schemas for all API input validation
- Co-locate feature components in `src/components/features/{feature}/`
- Export types from barrel files (`index.ts`)
- Use absolute imports via `@/` path alias

### DON'T:
- Never use `any` — use `unknown` if the type is truly unknown, then narrow it
- Never ignore TypeScript errors with `@ts-ignore` — fix the type
- Never put business logic in components — extract to `src/lib/` or service functions
- Never leave `console.log` in production code — use proper error handling

---

## 7. Error Handling Rules

### DO:
- Surface all errors in the UI with user-friendly messages
- Use toast notifications for transient errors (network, timeout)
- Use inline error messages for form validation errors
- Log errors server-side with structured context (userId, action, error message)
- Return proper HTTP status codes from API routes (400, 401, 403, 404, 500)
- Implement retry logic for external API calls (OpenSubtitles, OpenAI)

### DON'T:
- Never just `console.log(error)` — always surface to the user
- Never expose internal error details to the client (stack traces, database errors)
- Never let the app crash on an API error — always handle gracefully with fallback UI

---

## 8. Environment & Tooling Rules

### DO:
- Always give terminal commands as **PowerShell** equivalents (Windows environment)
- Store all secrets in `.env.local` — never commit them
- Include a `.env.example` with all required keys (values empty)
- Use `pnpm` as the package manager (not yarn, not npm)

### DON'T:
- Never commit `.env.local` or any file containing secrets
- Never hardcode API keys, database URLs, or secrets in code
- Never use Unix-specific shell commands (use PowerShell equivalents)

---

## 9. Git & Version Control Rules

### DO:
- Write meaningful commit messages: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Keep commits atomic — one logical change per commit
- Update `memory.md` at the end of every coding session

### DON'T:
- Never commit `node_modules/`, `.next/`, or generated Prisma client files
- Never force-push to main

---

> **Rule:** If a coding decision isn't covered here and you're unsure, ask — don't guess. If you hit a new bug pattern, add it to this file so it never happens again.
