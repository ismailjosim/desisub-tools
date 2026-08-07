# DesiSub — Project Requirements Document

> **Last Updated:** 2026-08-07  
> **Status:** Approved  
> **Version:** 1.0

---

## 1. Product Overview

**DesiSub** is a subtitle-focused web platform built for South Asian movie lovers — primarily Bangla-speaking audiences — who need high-quality, natural-sounding subtitles for movies and TV shows.

The platform solves a real problem: existing translation tools (Google Translate, DeepL, etc.) produce **literal, robotic translations** that destroy idioms, humor, slang, and cultural context. A subtitle that says "তুমি একটি কঠিন বাদামী" instead of naturally conveying "You're a tough nut to crack" ruins the viewing experience.

DesiSub delivers subtitles that sound like a native speaker wrote them.

---

## 2. Target Users

### Primary Users
- **South Asian movie enthusiasts** (primarily Bangla-speaking) who watch international content and need natural subtitles
- **Subtitle creators and translators** who want AI-assisted translation that preserves tone and context
- **Casual viewers** who just need to find and download subtitles quickly

### User Pain Points
- Existing subtitle translation tools produce unnatural, literal translations
- Finding subtitles for specific movies in specific languages is scattered across multiple sites
- Downloaded subtitles often have timing mismatches with the video file being used
- No single tool combines search, translate, and sync-fix in one place

---

## 3. Core Features

### Feature 1: Subtitle Downloader
Search and download subtitles from a large database (via OpenSubtitles API).

- Search movies/TV shows by **title** or **IMDB ID**
- Filter results by **language** and **format** (SRT, VTT)
- View movie metadata (poster, year, rating) alongside results
- Stream direct file downloads to the user
- Track download history per user

### Feature 2: Context-Aware AI Translator
Upload a subtitle file and get a natural, conversational translation powered by AI.

- Upload a single SRT or VTT file
- Choose a target language from supported options
- AI processes subtitle lines in **batches of 50–100 lines** with preceding context
- System prompt enforces: *"Translate into natural, conversational native Bangla. Do not translate literally. Preserve tone, humor, regional idioms, and keep sentence lengths short enough to fit video subtitle timing standards."*
- Real-time progress indicator during translation
- Download the translated subtitle file
- **Free tier:** 3 translations per day per user (to manage API costs)
- Translation status tracked: PENDING → PROCESSING → COMPLETED / FAILED

### Feature 3: Two-File Timestamp Sync Fixer
Fix timing mismatches by combining the timestamps of one file with the text of another.

- Upload **File A** (correct timing, wrong language or bad translation)
- Upload **File B** (perfect translation, broken timing)
- Tool parses timestamps from File A, maps text lines from File B onto File A's timecodes
- Live preview showing the mapped result before download
- Handles mismatched line counts gracefully (fallback to original text)
- One-click SRT/VTT download of the synced file
- **Runs entirely client-side** — no server upload needed for this tool

---

## 4. User Tiers

| Tier | Access | Limits |
|---|---|---|
| **Free** | All 3 tools | 3 AI translations/day, unlimited sync & download |
| **Premium** *(Future)* | All 3 tools + priority | Unlimited AI translations, faster processing |

---

## 5. Success Metrics

- Users can find and download a subtitle in under 30 seconds
- AI translations read naturally — not detectably machine-translated
- Sync Fixer produces frame-accurate subtitle files
- Platform loads fast and feels premium

---

## 6. What This Document Does NOT Cover

- Tech stack decisions → see `Architecture.md`
- Visual design decisions → see `design.md`
- Coding rules and constraints → see `rules.md`
- Build phases and timelines → see `phases.md`

---

> **Rule:** This file is product-focused only. No tech stack, no folder names, no library choices. Those belong in Architecture.md.
