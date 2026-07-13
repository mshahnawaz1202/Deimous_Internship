# Study Sprint

> A production-quality responsive productivity timer for students and developers.

## Overview

Study Sprint transforms focused work into measurable progress. Choose a sprint mode, start your countdown, and let the split-flap timer keep you on track. Sessions are automatically logged so you can review your daily productivity at a glance.

Built as a pixel-perfect, accessible, fully responsive React application with smooth Framer Motion animations and a dual light/dark theme system.

---

## Features

| Feature | Details |
|---|---|
| Responsive Design | Mobile (320px) → Tablet → Desktop (1024px+) layout shifts |
| Split-Flap Timer | Animated digit flip transition on every second tick |
| Three Sprint Modes | Sprint 25 min · Deep Work 50 min · Break 5 min |
| Dark / Light Mode | System preference detection + localStorage persistence |
| Timer Controls | Start · Pause · Resume · Reset |
| Session Logging | Save completed sessions · Discard skipped sessions |
| Productivity Stats | Today's focus time · Streak counter · Sprint count |
| Loading States | Button spinner prevents double-actions |
| Accessibility | WCAG 2.1 AA — keyboard nav, ARIA roles, semantic HTML |
| Smooth Animations | Framer Motion page entrance, digit flip, theme transition |
| Design Token System | All colours defined as CSS custom properties |

---

## Project Structure

```
study-sprint/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TimerCard.tsx
│   │   ├── TimerBoard.tsx
│   │   ├── FlapDigit.tsx
│   │   ├── DurationSelector.tsx
│   │   ├── Button.tsx
│   │   ├── StatBadge.tsx
│   │   ├── Statistics.tsx
│   │   ├── DailyLog.tsx
│   │   └── LogRow.tsx
│   ├── hooks/
│   │   └── useTimer.ts
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   └── durations.ts
│   ├── types/
│   │   └── index.ts
│   ├── themes/
│   │   └── tokens.css
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
└── package.json
```

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** — lightning-fast dev server & build
- **Tailwind CSS v4** — utility-first styling (config-free)
- **Framer Motion 12** — animations (page entrance, digit flip, button spring)
- **Lucide React** — icon set
- **CSS Custom Properties** — full design token system

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server at `http://localhost:5173` with HMR.

### Production Build

```bash
npm run build
```

Outputs optimised static files to `dist/`.

### Preview Production Build

```bash
npm run preview
```

---

## Deployment

The app can be deployed to any static hosting platform that supports Vite builds.

**Vercel** — Connect your GitHub repository at [vercel.com](https://vercel.com). Vercel auto-detects Vite and configures the build settings.

**Netlify** — Connect your repository at [netlify.com](https://netlify.com) or drag-and-drop the `dist/` folder after running `npm run build`.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |

---

## Accessibility

- Semantic HTML: `<header>`, `<main>`, `<section>`, `<ul>`, `<li>`, `<button>`
- Timer: `role="timer"` + `aria-live="polite"` + human-readable `aria-label`
- Theme toggle: `aria-label="Toggle dark mode"` + `aria-pressed`
- All interactive elements keyboard-navigable (Tab / Enter / Space)
- Visible focus ring on all focusable elements
- Colour contrast meets WCAG AA in both themes

---

## Design Tokens

All colours are defined in `src/themes/tokens.css` as CSS custom properties:

```css
:root[data-theme="light"] {
  --bg:      #FAFAF7;
  --surface: #FFFFFF;
  --text:    #1B1E27;
  --primary: #C97A1D;
}

:root[data-theme="dark"] {
  --bg:      #14171F;
  --surface: #1B1F2A;
  --text:    #F1EFE6;
  --primary: #E8A23D;
}
```

