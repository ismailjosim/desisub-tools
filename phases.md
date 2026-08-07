# DesiSub — Build Phases

> **Last Updated:** 2026-08-07  
> **Status:** Approved  
> **Version:** 1.0

---

## Overview

DesiSub is built in **5 MVP phases + 1 post-MVP phase**. Each phase has a clear acceptance checklist — a phase is only "done" when every item is checked. Phases are sequential; do not start the next until the current one passes all criteria.

---

## Phase 01: Project Setup & Authentication

> **Goal:** Bootable project with working auth and a polished landing page.

- [ ] Initialize Next.js 14+ with App Router, TypeScript (strict), Tailwind CSS
- [ ] Install and configure shadcn/ui (dark theme)
- [ ] Set up Google Fonts (Space Grotesk, Inter, JetBrains Mono)
- [ ] Implement `globals.css` with all design tokens from `design.md`
- [ ] Configure `tailwind.config.ts` to extend theme with design tokens
- [ ] Set up PostgreSQL database (local or cloud)
- [ ] Configure Prisma with initial schema (User, Account, Translation, Subtitle, DownloadHistory)
- [ ] Run `npx prisma migrate dev` — migration succeeds
- [ ] Set up Better Auth with email-password plugin
- [ ] Registration form with Zod validation (email, password strength)
- [ ] Login form with email + password
- [ ] Session persists on page refresh (JWT strategy)
- [ ] Protected routes redirect to `/login` if unauthenticated
- [ ] Auth errors surfaced in UI with toast notifications (not just console)
- [ ] Landing page with:
  - [ ] Hero section (product name, tagline, CTA button)
  - [ ] Feature showcase (3 tools: Translate, Sync, Search)
  - [ ] Call-to-action section
  - [ ] Footer
- [ ] Landing page is responsive (mobile, tablet, desktop)
- [ ] Dark theme applied everywhere — no white-screen flashes
- [ ] `npm run dev` starts without errors or warnings
- [ ] `.env.example` created with all required environment variables

### Acceptance Test:
```
1. Open http://localhost:3000 → landing page renders with dark theme
2. Click "Get Started" → redirected to /register
3. Fill form with valid email + password → account created → redirected to dashboard
4. Refresh page → still logged in
5. Open /translate directly → page loads (authenticated)
6. Log out → try /translate → redirected to /login
```

---

## Phase 02: Subtitle Sync Fixer (Client-Side Tool)

> **Goal:** Fully working sync tool that runs in the browser — no server calls needed.

- [ ] Create `/sync` page within dashboard route group
- [ ] Drag-and-drop dual file upload UI (File A: timing source, File B: text source)
- [ ] Also support click-to-browse file selection
- [ ] Validate uploaded files are `.srt` or `.vtt` format
- [ ] Parse both files client-side using `srt-parser-2`
- [ ] Display file metadata after upload (line count, duration, first/last timestamp)
- [ ] Map text from File B onto timestamps of File A (line-by-line)
- [ ] Handle line count mismatch:
  - [ ] If B has fewer lines → remaining lines keep A's original text
  - [ ] If B has more lines → extra lines are discarded with a warning
- [ ] Live preview table showing: `#` | `Timestamp` | `Original (A)` | `Synced (B→A)`
- [ ] Highlight mismatched lines in the preview
- [ ] "Download Synced File" button → generates `.srt` file → browser download
- [ ] Option to download as `.vtt` format
- [ ] Loading states during file parsing
- [ ] Error states: invalid file format, empty file, corrupted timestamps
- [ ] All processing is client-side — zero server calls
- [ ] Page is responsive and works on mobile

### Acceptance Test:
```
1. Navigate to /sync
2. Upload a well-timed SRT (File A) and a translated SRT with wrong timing (File B)
3. Preview table shows B's text mapped onto A's timestamps
4. Click download → open the file in a text editor → timestamps match File A, text matches File B
5. Upload two files with different line counts → warning shown, partial sync works correctly
6. Upload a .txt file → error message shown, not processed
```

---

## Phase 03: AI Translation Module

> **Goal:** Upload an SRT file, translate it via AI into natural-sounding Bangla (or other languages), download the result.

- [ ] Create `/translate` page within dashboard route group
- [ ] Single file upload UI (drag-and-drop + click-to-browse)
- [ ] Validate uploaded file is `.srt` or `.vtt`
- [ ] Target language selector dropdown (Bangla, Hindi, Urdu — expandable later)
- [ ] Server-side translation pipeline:
  - [ ] Parse uploaded SRT into line objects
  - [ ] Batch lines into groups of 50–100
  - [ ] For each batch, include preceding 10 lines as context
  - [ ] Call OpenAI `gpt-4o-mini` via Vercel AI SDK with context-aware system prompt
  - [ ] Streaming response — show real-time progress in UI
  - [ ] Assemble translated lines with original timestamps
- [ ] Progress indicator showing: `Translating batch 3 of 12...`
- [ ] Translation result preview (side-by-side: original vs translated)
- [ ] "Download Translated File" button → `.srt` download
- [ ] Free tier enforcement:
  - [ ] Check daily usage count before processing
  - [ ] Display remaining translations today: `2 of 3 remaining`
  - [ ] If limit reached → show message, disable upload
- [ ] Translation record saved to database:
  - [ ] Status: PENDING → PROCESSING → COMPLETED / FAILED
  - [ ] Source file URL + result file URL stored in R2
- [ ] Error handling:
  - [ ] API rate limit → retry with backoff, show message
  - [ ] API timeout → mark as FAILED, allow retry
  - [ ] Malformed AI response → skip batch, log error, continue with next batch
- [ ] All errors surfaced in UI — never just console

### Acceptance Test:
```
1. Navigate to /translate
2. Upload a 200-line SRT file → select "Bangla" → click Translate
3. Progress bar moves through batches
4. Translation completes → preview shows natural Bangla (not Google Translate-quality)
5. Download the file → open in text editor → original timestamps preserved, text is Bangla
6. Translate 3 files in one day → 4th attempt shows "Daily limit reached"
7. Check /history → all 3 translations listed with status COMPLETED
```

---

## Phase 04: Subtitle Search & Download

> **Goal:** Search a large subtitle database and download files directly.

- [ ] Create `/search` page within dashboard route group
- [ ] Search bar with debounced input (300ms)
- [ ] Search by movie title (free text) or IMDB ID (detected if starts with `tt`)
- [ ] Server-side API route that proxies to OpenSubtitles REST API v3
- [ ] Search results displayed as cards:
  - [ ] Movie poster / thumbnail
  - [ ] Title, year, rating
  - [ ] Available languages (badges)
  - [ ] Format (SRT/VTT badge)
  - [ ] Download button
- [ ] Filter results by language (dropdown)
- [ ] Filter results by format (SRT / VTT toggle)
- [ ] Download button streams file from OpenSubtitles to user
- [ ] Download logged to `DownloadHistory` table
- [ ] Empty state: no results found (with illustration)
- [ ] Loading skeleton while search is in progress
- [ ] Error handling: API errors, no results, rate limiting
- [ ] Results are responsive (grid on desktop, stack on mobile)

### Acceptance Test:
```
1. Navigate to /search
2. Type "Inception" → results appear after 300ms debounce
3. Results show movie poster, year (2010), available languages
4. Filter by "English" → results narrow
5. Click download on an SRT result → file downloads
6. Check /history → download logged
7. Search "tt0816692" (Interstellar) → correct movie found via IMDB ID
8. Search "asdfjkl" → "No results found" empty state shown
```

---

## Phase 05: Dashboard & UX Polish

> **Goal:** User dashboard, history views, account management, and final visual polish.

- [ ] Dashboard home page (`/dashboard` or root of dashboard group):
  - [ ] Welcome message with user name
  - [ ] Quick-action cards for each tool (Translate, Sync, Search)
  - [ ] Today's usage stats (translations used / remaining)
  - [ ] Recent activity feed (last 5 translations + downloads)
- [ ] Translation history page (`/history`):
  - [ ] List of all translations with status, date, languages
  - [ ] Re-download completed translations
  - [ ] Retry failed translations
- [ ] Download history:
  - [ ] List of all subtitle downloads with movie title, language, date
- [ ] Account settings (`/settings`):
  - [ ] Update display name
  - [ ] Change password
  - [ ] Delete account (with confirmation dialog)
- [ ] Sidebar navigation:
  - [ ] Active state highlighting for current page
  - [ ] Collapsible on mobile (hamburger menu)
  - [ ] Tool icons from Lucide React
- [ ] Global UX polish:
  - [ ] Page transition animations (fade + translateY)
  - [ ] Button hover micro-animations (scale + glow)
  - [ ] Card hover effects (lift + shadow)
  - [ ] Toast notification system for success/error messages
  - [ ] Loading skeletons on all data-fetching pages
  - [ ] Empty states with illustrations on all list pages
- [ ] Performance:
  - [ ] Lazy-load heavy components (file upload zones, preview tables)
  - [ ] Code-split route groups
  - [ ] Optimize images with `next/image`
- [ ] SEO:
  - [ ] Proper `<title>` and `<meta description>` on landing page
  - [ ] Semantic HTML throughout
  - [ ] Single `<h1>` per page
- [ ] Responsive design verified on:
  - [ ] Mobile (375px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1280px)

### Acceptance Test:
```
1. Log in → dashboard shows welcome, usage stats, recent activity
2. Navigate between tools → sidebar highlights correctly, page transitions are smooth
3. Visit /history → translations and downloads listed
4. Visit /settings → update name → name updates across app
5. Resize to mobile → sidebar collapses, all pages remain usable
6. All interactive elements have hover effects
7. All list pages show skeletons while loading, empty states when empty
```

---

## Phase 06: Post-MVP Enhancements (Future)

> **Goal:** Community features, premium tier, and advanced editing — planned but not yet scheduled.

- [ ] Subtitle editor with interactive `video.js` player preview
  - [ ] Upload video + subtitle → see subtitle overlaid on video
  - [ ] Click a subtitle line to seek to that timestamp
  - [ ] Edit text inline, adjust timing
- [ ] Community subtitle sharing & rating system
  - [ ] Users can publish translated subtitles
  - [ ] Other users can rate quality (1–5 stars)
  - [ ] Search community subtitles alongside OpenSubtitles results
- [ ] Premium tier (Stripe integration)
  - [ ] Unlimited AI translations
  - [ ] Priority processing queue
  - [ ] Higher batch sizes for faster translation
- [ ] Webhook/email notifications when translation completes
- [ ] Additional languages (Tamil, Telugu, Marathi, Nepali, etc.)
- [ ] Batch translation (upload multiple files at once)

---

> **Rule:** A phase is ONLY done when every checkbox is checked. No exceptions. Update `memory.md` after completing each phase.
