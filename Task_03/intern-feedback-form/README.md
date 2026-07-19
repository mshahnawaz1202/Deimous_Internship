# Intern Feedback Form

A premium, fully responsive intern feedback form built with vanilla HTML, CSS, and JavaScript. Features a dark glassmorphism design with animated backgrounds, live form validation, and an interactive latest feedback panel.

---

## Live Preview

Open `index.html` directly in any modern browser — no build step or server required.

---

## Features

### Form
- **Full validation** — name, email (regex), category, star rating, and message (min 10 chars)
- **Live error clearing** — errors disappear as the user corrects each field
- **Interactive star rating** — hover and click to select 1–5 stars
- **Pill-style category selector** — General / Bug / Suggestion
- **Live character counter** — turns red when approaching 500-char limit
- **Submit with API** — POST to JSONPlaceholder; new entry prepended to feedback panel on success
- **Ripple effect** on submit button click

### UI & Design
- Animated gradient dark background
- Glassmorphism form card with `backdrop-filter: blur`
- Three animated floating blob background effects
- Gradient animated submit button with shimmer sweep on hover
- CSS loading spinner (no emoji, no text icon dependency)
- Slide-in success and error alert banners
- Skeleton shimmer loader for the feedback panel
- Fade-up animation on feedback cards
- Gradient accent bar on card hover
- Custom scrollbar styling

### Latest Feedback Panel
- Renders from a static in-memory data array (3 seed entries)
- Avatar with initials auto-generated from name
- Relative timestamps (e.g. "2h ago", "1d ago")
- Colour-coded category badges (General / Bug / Suggestion)
- Star display with filled/unfilled states
- Like button — toggles liked state and updates count per card
- New submissions are prepended live after a successful form submit

### Responsive
- Mobile (< 480px), Tablet (< 768px), Desktop layouts
- Grid auto-fits feedback cards

---

## Project Structure

```
intern-feedback-form/
├── index.html   — Markup: form, blobs, latest feedback section
├── style.css    — All styles: animations, glassmorphism, responsive
└── script.js    — Validation, submit handler, feedback rendering
```

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Markup     | HTML5 (semantic)                    |
| Styling    | Vanilla CSS3 (no frameworks)        |
| Logic      | Vanilla JavaScript (ES6+, async/await) |
| Fonts      | Google Fonts — Poppins              |
| Mock API   | JSONPlaceholder (`/posts` POST)     |

---

## Seed Data

Three pre-loaded feedback entries are defined in `script.js`:

| # | Name        | Category   | Rating |
|---|-------------|------------|--------|
| 1 | Ali Hassan  | Suggestion | 5 / 5  |
| 2 | Mubashar    | Bug        | 3 / 5  |
| 3 | Haider      | General    | 4 / 5  |

---

## Getting Started

```bash
# Clone the repository
git clone <repo-url>

# Open in browser
start index.html
```

No dependencies, no package manager, no build tool needed.

---

## Author

**Shahnawaz** — Deimos Internship Task 03
