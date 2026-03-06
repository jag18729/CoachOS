# CoachOS — Design System

## Design Principles

CoachOS is built around four HCI principles drawn from the project proposal:

1. **Workflow Closure** — All information needed to complete a task is accessible without leaving the app. A manager checking a client's status, sessions, and payment history does it from one screen.
2. **Mental Models** — The interface mirrors how coaches naturally think: clients → sessions → billing, not disconnected data tabs.
3. **Task Context** — Inline expansion keeps managers focused. Clicking a client reveals their details in-place rather than navigating to a new page.
4. **Direct Manipulation** — Cards respond to clicks immediately. No modal dialogs. No intermediate screens.

---

## Color Palette

### Light Theme (Default — `index.html`)

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#FFFBF0` | Page base |
| Surface | `#F5F1E8` | Cards, sidebar |
| Accent Primary | `#F59E0B` | Buttons, active states, highlights |
| Accent Hover | `#FBBF24` | Button hover, focus rings |
| Text Primary | `#1C1917` | Headlines, body |
| Text Secondary | `#78716C` | Labels, metadata |
| Border | `#E7E5E4` | Card outlines, dividers |
| Success | `#22C55E` | Paid status, active badge |
| Warning | `#F97316` | Pending status |
| Error | `#EF4444` | Overdue, cancelled |

### Dark Theme (`dark.html`)

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#0F172A` | Page base |
| Surface | `#1A2847` | Cards, sidebar |
| Accent Primary | `#06B6D4` | Buttons, active states |
| Accent Secondary | `#3B82F6` | Highlights, links |
| Text Primary | `#F1F5F9` | Headlines, body |
| Text Secondary | `#94A3B8` | Labels, metadata |

---

## Typography

| Scale | Font | Weight | Size | Usage |
|-------|------|--------|------|-------|
| Display | Space Grotesk | 700 | 24–32px | Page titles, section headers |
| Heading | Space Grotesk | 500 | 16–20px | Card titles, nav labels |
| Body | PT Sans | 400 | 14–16px | Descriptions, data |
| Label | PT Sans | 700 | 12–13px | Status badges, metadata |

---

## Components

### Status Badges
Inline pill labels with pulsing dot for live states.
- `Active` — green with pulse
- `Pending` — orange
- `Inactive` — gray
- `Paid` — green
- `Overdue` — red

### Client Cards
Grid layout. Each card shows: name, status badge, last session, next session, quick-action buttons. Click to expand inline detail panel.

### Detail Panel
Slides in from the right on desktop. On mobile, overlays full width. Preserves card grid behind it (task context).

### Progress Bars
Used in Rosters (enrollment capacity) and Analytics. Colored by threshold: green < 80%, orange 80–99%, red = full.

### Weekly Schedule Grid
Day columns, session rows. Shows: time, session name, trainer, participant count, edit/cancel actions.

---

## Animations

| Interaction | Animation |
|-------------|-----------|
| Page load | Staggered card fade-in (50ms delay per card) |
| Detail panel open | Slide from right, 300ms ease-out |
| Sidebar (mobile) | Slide from left, 250ms ease |
| Hamburger → X | CSS transform, 200ms |
| Button hover | Scale 1.02, shadow lift |
| Status pulse | 2s infinite keyframe on dot |

---

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| `1024px+` | Full sidebar visible, 3-column card grid |
| `768px–1023px` | Sidebar collapsible, 2-column grid |
| `< 768px` | Hamburger menu, 1-column grid, full-width detail panel |

---

## Accessibility

- Text contrast meets WCAG AA (11.5:1 primary text ratio)
- All interactive elements have visible focus states
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<header>`
- Keyboard navigable sidebar and card interactions
- Status colors are never the only indicator (always paired with text label)
