# Contributing to CoachOS

## Setup

```bash
git clone https://github.com/jag18729/CoachOS.git
cd CoachOS
npm install
npm run dev
```

Open http://localhost:5173/CoachOS/ in your browser.

## Branch Workflow

```
main          ← production (auto-deploys to GitHub Pages)
  └── dev     ← integration branch (PRs merge here first)
       └── issue-1-toast-notifications   ← your feature branch
```

### Steps

1. **Start from dev**
   ```bash
   git checkout dev
   git pull origin dev
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b issue-<number>-short-description
   ```
   Example: `issue-1-toast-notifications`, `issue-6-accessibility`

3. **Do the work, commit often**
   ```bash
   git add <files>
   git commit -m "Add toast component for write actions"
   ```

4. **Push and open a PR to dev**
   ```bash
   git push origin issue-<number>-short-description
   ```
   Then open a Pull Request targeting `dev` (not `main`).

5. **After review, merge to dev**
   Once approved, merge the PR into `dev`. Rafael will merge `dev` into `main` for deployment.

## Project Structure

```
src/
├── components/
│   ├── analytics/     # CSS-only charts
│   ├── billing/       # Invoice table, generate modal
│   ├── checkins/      # Inbox, review modal
│   ├── clients/       # Card grid, filters, profile panel
│   ├── dashboard/     # Stat cards, activity feed
│   ├── layout/        # Sidebar, TopBar, Layout wrapper
│   ├── rosters/       # Group cards, add client modal
│   ├── schedule/      # Week grid, session cards
│   ├── settings/      # Config, role/theme toggles
│   └── ui/            # Reusable: Button, Modal, Avatar, StatusPill, Card, EmptyState
├── context/
│   ├── AppContext.jsx  # All app state (useReducer)
│   └── ThemeContext.jsx # Light/dark toggle
└── data/              # Seed data (clients, sessions, checkIns, invoices, rosters)
```

## State Management

All mutable state lives in `AppContext` via `useReducer`. To trigger a state change:

```jsx
import { useApp } from '../../context/AppContext'

const { state, dispatch } = useApp()

// Read state
state.clients
state.checkIns.filter(ci => ci.status === 'Pending')

// Dispatch actions
dispatch({ type: 'MARK_CHECKIN_REVIEWED', payload: { id, response } })
dispatch({ type: 'ADD_SESSION', payload: sessionObject })
dispatch({ type: 'GENERATE_INVOICE', payload: invoiceObject })
dispatch({ type: 'MARK_INVOICE_PAID', payload: { id } })
dispatch({ type: 'ADD_CLIENT_TO_ROSTER', payload: { rosterId, clientId } })
dispatch({ type: 'SET_ROLE', payload: 'Coach' })
```

## Styling

- **Tailwind CSS v3** with utility classes
- **CSS variables** for theme colors: `var(--bg-primary)`, `var(--accent)`, `var(--text-muted)`, etc.
- **Dark mode**: uses `darkMode: 'class'` -- the `.dark` class on `<html>` swaps CSS variables
- **Fonts**: `font-sans` (PT Sans), `font-display` (Space Grotesk), `font-mono` (JetBrains Mono)

## Before Submitting a PR

1. `npm run build` passes with no errors
2. Test in both light and dark themes
3. Test at 375px viewport width (mobile)
4. Check that your changes don't break other sections
