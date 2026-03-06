# CoachOS

**Unified program management platform for fitness coaches**

Manage clients, schedules, rosters, and billing from a single workspace — no context switching required.

[![Live Site](https://img.shields.io/badge/Live-jag18729.github.io/CoachOS-orange)](https://jag18729.github.io/CoachOS)
[![Deploy](https://github.com/jag18729/CoachOS/actions/workflows/deploy.yml/badge.svg)](https://github.com/jag18729/CoachOS/actions)

---

## Features

- **Unified Workspace**: Clients, schedule, rosters, and billing in one interface
- **Inline Detail Panels**: Click any client card to expand full profile without leaving the view
- **Weekly Schedule View**: See all sessions, trainers, and enrollment counts at a glance
- **Roster Management**: Organize clients into program groups with real-time capacity tracking
- **Billing & Payments**: Track invoices, payment status, and due dates in one place
- **Analytics Dashboard**: Revenue, retention, satisfaction scores, and month-over-month trends
- **Responsive Design**: Fully functional on desktop, tablet, and mobile
- **Zero Dependencies**: Pure HTML/CSS/JS — no build process, no installation

---

## Live Demo

**Production:** https://jag18729.github.io/CoachOS

| Theme | Description |
|-------|-------------|
| [Light Theme](https://jag18729.github.io/CoachOS/index.html) | Default — warm white and gold |
| [Dark Theme](https://jag18729.github.io/CoachOS/dark.html) | Deep slate and cyan |

---

## HCI Principles

| Principle | Implementation |
|-----------|---------------|
| Workflow Closure | All client data (status, sessions, billing) accessible from one screen |
| Mental Models | Interface mirrors how coaches think: clients → sessions → money |
| Task Context | Inline expansion preserves focus; no page navigation required |
| Direct Manipulation | Cards respond to clicks immediately — no modals, no intermediate steps |

**Usability goal:** Answer "What is client X's status, next session, and payment status?" in under 30 seconds. Current fragmented workflow takes 3–5 minutes.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic) |
| Styles | CSS3 (custom properties, animations, responsive) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Space Grotesk (headlines), PT Sans (body) |
| Deployment | GitHub Pages via GitHub Actions |

---

## Quick Start

```bash
# Clone
git clone https://github.com/jag18729/CoachOS.git
cd CoachOS

# Open in browser (no build required)
open index.html        # Light theme
open dark.html         # Dark theme
```

On Windows: double-click `index.html` or right-click → Open With → Chrome/Firefox.

---

## Project Structure

```
CoachOS/
├── index.html          # Light theme — primary app
├── dark.html           # Dark theme variant
├── README.md           # This file
├── QUICKSTART.md       # Usage guide
├── LICENSE             # MIT License
├── .gitignore
└── docs/
    ├── DESIGN.md       # Design system (colors, typography, components)
    └── proposal.pdf    # HCI final project proposal
```

---

## Team

| Name | Role |
|------|------|
| Rafael Garcia ([@jag18729](https://github.com/jag18729)) | Frontend & Project Lead |
| Matthieu Resurreccion | UI Design |
| Christopher Butler | UX Research |

---

## Links

- [Design System](./docs/DESIGN.md)
- [Quick Start Guide](./QUICKSTART.md)
- [HCI Proposal](./docs/proposal.pdf)

---

## License

California State University, Northridge — COMP 485: Human-Computer Interaction Final Project
