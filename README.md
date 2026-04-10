# CoachOS

**Program management platform for fitness coaches and small training businesses**

Built to mirror how coaches actually think: clients, sessions, billing. One screen, no context switching, no SaaS bloat.

[![Live Site](https://img.shields.io/badge/Live-jag18729.github.io/CoachOS-blue)](https://jag18729.github.io/CoachOS/)
[![Deploy](https://github.com/jag18729/CoachOS/actions/workflows/deploy.yml/badge.svg)](https://github.com/jag18729/CoachOS/actions)

---

## Features

- **Dashboard**: Active clients, pending check-ins, monthly revenue, sessions this week at a glance
- **Client Management**: Searchable roster with status, billing, and group filters; slide-in profile panel with full history
- **Check-in Inbox**: Weekly client check-ins with energy/sleep/compliance metrics, coach review workflow with confirmation
- **Schedule**: 7-day week grid with session cards, add/view sessions inline
- **Billing**: Invoice table with tab filters, mark-paid actions, and invoice generation with session linking
- **Rosters**: Group cards with capacity bars, add clients to groups
- **Analytics**: CSS-only bar charts for monthly revenue, client retention, compliance scores, top performers
- **Settings**: Program config, role selector (Admin/Coach), light/dark theme toggle, notification preferences

---

## Live Demo

**Production:** https://jag18729.github.io/CoachOS/

| View | Description |
|------|-------------|
| Dashboard | Stat cards + activity feed + quick actions |
| Clients | Filter by status, group, billing; click for full profile |
| Check-ins | Review inbox with metric bars and coach response |
| Schedule | Weekly grid with session management |
| Billing | Invoice tracking with generate/mark-paid workflows |

---

## Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Framework | React 18 | Component architecture, context-based state |
| Build | Vite | Sub-second HMR, optimized production builds |
| Styling | Tailwind CSS v3 | Utility-first, dark mode via class strategy |
| Routing | React Router v6 (HashRouter) | GitHub Pages compatible, no server-side fallback needed |
| Icons | lucide-react | Consistent icon set, tree-shakeable |
| Fonts | Space Grotesk + PT Sans | Display/body pairing from the design system |
| State | React Context + useReducer | No external state library needed at this scale |
| Deploy | GitHub Actions + GitHub Pages | Zero-cost hosting, automated on push to main |

---

## Quick Start

```bash
git clone https://github.com/jag18729/CoachOS.git
cd CoachOS
npm install
npm run dev
```

Open http://localhost:5173/CoachOS/ in your browser.

### Production Build

```bash
npm run build
npx serve dist
```

---

## Project Structure

```
src/
├── components/
│   ├── analytics/     # CSS-only charts, derived stats
│   ├── billing/       # Invoice table, generate modal
│   ├── checkins/      # Inbox, review modal, toast
│   ├── clients/       # Card grid, filters, profile panel
│   ├── dashboard/     # Stat cards, activity feed
│   ├── layout/        # Sidebar, top bar, main layout
│   ├── rosters/       # Group cards, add client modal
│   ├── schedule/      # Week grid, session cards, add modal
│   ├── settings/      # Config inputs, role/theme toggles
│   └── ui/            # Button, Modal, Avatar, StatusPill, Card
├── context/           # AppContext (useReducer), ThemeContext
└── data/              # Seed data (clients, sessions, check-ins, invoices, rosters)
```

---

## Design System

| Element | Light | Dark |
|---------|-------|------|
| Background | `#FFFBF0` | `#0F172A` |
| Card | `#FFFFFF` | `#1E293B` |
| Accent | `#D4A017` (gold) | `#06B6D4` (cyan) |
| Text | `#1E293B` | `#F1F5F9` |

Full design spec in [`docs/DESIGN.md`](./docs/DESIGN.md).

---

## Role System

| Role | Access |
|------|--------|
| Admin | All sections |
| Coach | Hides Billing and Analytics |

Switch roles in Settings. No authentication; roles are simulated via context.

---

## License

California State University, Northridge; COMP 485 Senior Design Project
