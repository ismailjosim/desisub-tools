# DesiSub — Visual Design System

> **Last Updated:** 2026-08-07  
> **Status:** Approved  
> **Version:** 1.0

---

## 1. Design Philosophy

DesiSub should feel like a **premium cinema experience** — dark, immersive, and polished. The UI draws inspiration from streaming platforms (Netflix, Plex) and professional creative tools. Every interaction should feel smooth, intentional, and alive with subtle motion.

**Core Principles:**
- Dark mode first — cinema-inspired atmosphere
- Glassmorphism for elevated surfaces
- Micro-animations on every interaction
- Generous whitespace for breathing room
- Accessible contrast ratios despite dark theme

---

## 2. Color Palette

### Primary Colors
```css
--primary-50:  hsl(252, 100%, 97%);   /* Lightest violet */
--primary-100: hsl(252, 95%, 92%);
--primary-200: hsl(252, 90%, 82%);
--primary-300: hsl(252, 85%, 72%);
--primary-400: hsl(252, 80%, 62%);
--primary-500: hsl(252, 75%, 52%);    /* Main primary */
--primary-600: hsl(252, 70%, 42%);
--primary-700: hsl(252, 65%, 32%);
--primary-800: hsl(252, 60%, 22%);
--primary-900: hsl(252, 55%, 12%);
```

### Accent Colors (Warm Amber/Gold — Subtitle Highlight)
```css
--accent-50:  hsl(38, 100%, 97%);
--accent-100: hsl(38, 95%, 88%);
--accent-200: hsl(38, 90%, 75%);
--accent-300: hsl(38, 85%, 62%);
--accent-400: hsl(38, 80%, 52%);     /* Main accent */
--accent-500: hsl(38, 75%, 42%);
```

### Surface Colors (Dark Theme)
```css
--surface-bg:       hsl(240, 20%, 6%);     /* Page background — near-black */
--surface-card:     hsl(240, 18%, 10%);    /* Card background */
--surface-elevated: hsl(240, 16%, 14%);    /* Elevated surfaces, modals */
--surface-hover:    hsl(240, 14%, 18%);    /* Hover state backgrounds */
--surface-border:   hsl(240, 12%, 20%);    /* Subtle borders */
```

### Text Colors
```css
--text-primary:   hsl(0, 0%, 95%);    /* Main text — near-white */
--text-secondary: hsl(0, 0%, 65%);    /* Secondary/muted text */
--text-tertiary:  hsl(0, 0%, 45%);    /* Placeholder, disabled text */
```

### Semantic Colors
```css
--success: hsl(152, 70%, 45%);   /* Emerald green */
--warning: hsl(38, 90%, 55%);    /* Amber */
--error:   hsl(0, 75%, 55%);     /* Red */
--info:    hsl(210, 80%, 55%);   /* Blue */
```

### Gradient Presets
```css
--gradient-primary:  linear-gradient(135deg, hsl(252, 75%, 52%), hsl(280, 80%, 55%));
--gradient-accent:   linear-gradient(135deg, hsl(38, 80%, 52%), hsl(20, 85%, 55%));
--gradient-surface:  linear-gradient(180deg, hsl(240, 20%, 8%), hsl(240, 20%, 4%));
--gradient-glow:     radial-gradient(ellipse at center, hsla(252, 75%, 52%, 0.15), transparent 70%);
```

---

## 3. Typography

### Font Stack
```css
/* Headings */
--font-heading: 'Space Grotesk', 'Inter', system-ui, sans-serif;

/* Body */
--font-body: 'Inter', 'Segoe UI', system-ui, sans-serif;

/* Monospace (subtitle previews, code) */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale
| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `display-lg` | 3rem (48px) | 700 | 1.1 | Hero headlines |
| `display-sm` | 2.25rem (36px) | 700 | 1.2 | Section headlines |
| `heading-lg` | 1.5rem (24px) | 600 | 1.3 | Page titles |
| `heading-md` | 1.25rem (20px) | 600 | 1.4 | Card titles |
| `heading-sm` | 1rem (16px) | 600 | 1.4 | Sub-headings |
| `body-lg` | 1rem (16px) | 400 | 1.6 | Primary body text |
| `body-md` | 0.875rem (14px) | 400 | 1.5 | Secondary body text |
| `body-sm` | 0.75rem (12px) | 400 | 1.5 | Captions, labels |
| `mono-md` | 0.875rem (14px) | 400 | 1.7 | Subtitle preview text |

### Google Fonts Import
```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap
```

---

## 4. Spacing System

**Base unit:** 4px  
**Scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128

```css
--space-1:  0.25rem;   /* 4px */
--space-2:  0.5rem;    /* 8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-5:  1.25rem;   /* 20px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

---

## 5. Border Radius

```css
--radius-sm:   0.375rem;   /* 6px — small elements (badges, chips) */
--radius-md:   0.5rem;     /* 8px — buttons, inputs */
--radius-lg:   0.75rem;    /* 12px — cards */
--radius-xl:   1rem;       /* 16px — modals, large cards */
--radius-2xl:  1.5rem;     /* 24px — hero sections */
--radius-full: 9999px;     /* Fully round (avatars, pills) */
```

---

## 6. Shadows & Elevation

```css
--shadow-sm:   0 1px 2px hsla(0, 0%, 0%, 0.3);
--shadow-md:   0 4px 12px hsla(0, 0%, 0%, 0.4);
--shadow-lg:   0 8px 24px hsla(0, 0%, 0%, 0.5);
--shadow-xl:   0 16px 48px hsla(0, 0%, 0%, 0.6);
--shadow-glow: 0 0 20px hsla(252, 75%, 52%, 0.3);  /* Primary glow */
```

### Glassmorphism
```css
.glass {
  background: hsla(240, 18%, 12%, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid hsla(240, 12%, 24%, 0.4);
}
```

---

## 7. Animation & Motion

### Timing Functions
```css
--ease-smooth:  cubic-bezier(0.4, 0, 0.2, 1);   /* Standard */
--ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful overshoot */
--ease-spring:  cubic-bezier(0.22, 1, 0.36, 1);  /* Snappy spring */
```

### Duration Tokens
```css
--duration-fast:   150ms;   /* Hover effects, color changes */
--duration-normal: 250ms;   /* Most transitions */
--duration-slow:   400ms;   /* Page transitions, modals */
--duration-slower: 600ms;   /* Complex animations */
```

### Standard Micro-Animations
- **Button hover:** Scale 1.02 + shadow-glow, 150ms
- **Card hover:** TranslateY -2px + shadow-lg, 250ms
- **Drag-and-drop zone:** Dashed border pulse + accent color glow on drag-over
- **Progress bar:** Gradient shimmer animation (infinite)
- **Page transitions:** Fade + translateY from 10px, 400ms
- **Toast notifications:** Slide in from right + fade, 300ms

---

## 8. Component Patterns

### Cards
- Background: `--surface-card`
- Border: 1px solid `--surface-border`
- Radius: `--radius-lg`
- Padding: `--space-6`
- Hover: translateY(-2px), shadow-lg, border lightens

### Buttons
| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | `--gradient-primary` | white | none |
| Secondary | transparent | `--text-primary` | 1px `--surface-border` |
| Accent | `--gradient-accent` | white | none |
| Ghost | transparent | `--text-secondary` | none |
| Destructive | `--error` | white | none |

### Inputs
- Background: `--surface-elevated`
- Border: 1px solid `--surface-border`
- Focus: border → `--primary-400`, shadow-glow
- Radius: `--radius-md`
- Height: 44px (touch-friendly)

### Drag-and-Drop Zone
- Background: `--surface-card` with dashed border
- Dashed border: 2px dashed `--surface-border`
- Drag-over state: border → `--accent-400`, background glow, scale 1.01
- Icon + text centered

---

## 9. Responsive Breakpoints

```css
--bp-sm:  640px;    /* Mobile landscape */
--bp-md:  768px;    /* Tablet */
--bp-lg:  1024px;   /* Desktop */
--bp-xl:  1280px;   /* Wide desktop */
--bp-2xl: 1536px;   /* Ultra-wide */
```

---

## 10. Icons

- **Icon Set:** Lucide React (consistent, modern, MIT licensed)
- **Icon Sizes:** 16px (inline), 20px (buttons), 24px (navigation), 32px (feature icons), 48px (hero/empty states)
- **Icon Color:** Inherits from parent text color by default

---

> **Rule:** All components and pages must use these design tokens. Never use ad-hoc color values, magic number spacing, or unlisted fonts. If a new token is needed, add it here first.
