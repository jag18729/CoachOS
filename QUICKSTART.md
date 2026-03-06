# CoachOS — Quick Start

## Open the App

No installation required. Just open a file in your browser.

```bash
# Light theme (recommended)
open index.html

# Dark theme
open dark.html
```

On Windows: double-click `index.html` or right-click → Open With → Chrome/Firefox.

---

## Navigating CoachOS

### Sidebar
Click any section to switch views:
- **Clients** — Full client roster with status and session info
- **Schedule** — Weekly session calendar
- **Rosters** — Program groups and enrollment
- **Billing** — Invoices and payment tracking
- **Analytics** — Revenue and retention metrics
- **Settings** — Program configuration

### Client Details
Click any client card to expand their full profile inline — no page navigation needed.

### Mobile
Tap the hamburger menu (top-left) to open the sidebar. The layout adapts to single-column on small screens.

---

## Customize Sample Data

Open `index.html` in a text editor. Find:

```js
const clients = [
```

Replace the array entries with your actual client data. Same pattern applies for `sessions`, `rosters`, and `invoices`.

---

## Project Structure

```
CoachOS/
├── index.html          # Light theme — primary app
├── dark.html           # Dark theme variant
├── README.md           # Full documentation
├── QUICKSTART.md       # This file
├── LICENSE             # MIT License
├── .gitignore
└── docs/
    ├── DESIGN.md       # Design system and decisions
    └── proposal.pdf    # HCI final project proposal
```
