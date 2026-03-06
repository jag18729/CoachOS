# CoachOS — Program Management Platform

> A unified workspace for fitness coaches to manage clients, schedules, rosters, and billing without context switching.

## Overview

CoachOS is a single-page application (SPA) designed to consolidate fragmented fitness coaching workflows. Program managers can access everything they need in one place: client information, weekly schedules, program rosters, billing status, and analytics—all without opening multiple tabs or applications.

### The Problem We Solve

Fitness coaches today juggle multiple tools:
- Client data scattered across spreadsheets and email
- Session schedules in Calendly or Google Calendar
- Workout plans in Trainerize
- Payment tracking in separate billing systems
- Progress notes in WhatsApp or text messages

This fragmentation breaks workflow closure. Coaches waste time context-switching and can't provide timely, personalized feedback because accessing full client context takes too long.

### The Solution

CoachOS brings all critical information into a single, intuitive interface. Program managers can:
- **View clients** with status, engagement, and next session details
- **Manage schedules** for the entire week at a glance
- **Organize rosters** and track program utilization
- **Track billing** with payment status and invoice history
- **Access analytics** for program performance and revenue
- **Send check-in requests** directly from the client view

Everything is a single click away. No more tab-switching. No more lost context.

## Features

### Clients Dashboard
- Complete roster with status indicators
- Last session date and next scheduled session
- Quick access to client details via expandable panel
- Send updates and check-in requests directly

### Weekly Schedule
- Full week view of all sessions
- Trainer assignment and participant count
- Edit or cancel sessions
- See utilization at a glance

### Program Rosters
- Organize clients into training groups
- Real-time capacity utilization tracking
- Visual progress bars showing enrollment
- Add or manage clients per group

### Billing & Payments
- Track all invoices and payment status
- See payment due dates
- Record payments
- Send invoice reminders

### Analytics Dashboard
- Total revenue metrics
- Client retention rates
- Average satisfaction scores
- Session count and pending payments
- Trend indicators for month-over-month growth

### Settings
- Configure program name and default fees
- Enable/disable notifications
- Manage integrations (future)

## Technical Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, animations, responsive design
- **JavaScript (Vanilla)** — No dependencies, zero build required
- **Fonts** — PT Sans (body), Space Grotesk (headlines)

## Design Philosophy

CoachOS follows these HCI principles:

1. **Workflow Closure** — All information needed to complete a task is accessible without context switching
2. **Mental Models** — The interface mirrors how coaches naturally think about their program
3. **Task Context** — Inline expansion preserves focus and prevents navigation fatigue
4. **Direct Manipulation** — Click cards to view details; no modal dialogs or separate pages

## Color Themes

### Light Theme (Default)
- **Background:** Warm white and beige (`#FFFBF0`, `#F5F1E8`)
- **Accents:** Warm yellow/gold (`#F59E0B`, `#FBBF24`)
- **Text:** Dark grays for contrast and readability
- **File:** `index.html`

### Dark Theme
- **Background:** Deep slate (`#0f172a`, `#1a2847`)
- **Accents:** Bright cyan and blue (`#06b6d4`, `#3b82f6`)
- **Text:** Light grays
- **File:** `dark.html`

## Getting Started

### Run Locally

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/coachOS.git
   cd CoachOS
   ```

2. Open in your browser
   ```bash
   # Light theme (recommended)
   open index.html
   
   # Dark theme
   open dark.html
   ```

That's it. No build process, no dependencies, no installation required.

### Project Structure

```
CoachOS/
├── index.html          # Light theme (primary)
├── dark.html           # Dark theme variant
├── README.md           # This file
├── .gitignore          # Git ignore rules
├── docs/               # Documentation
│   ├── DESIGN.md       # Design system and principles
│   └── PROPOSAL.md     # HCI final project proposal
└── assets/             # (Future) Images, icons
```

## Features in Detail

### Responsive Design
- **Desktop:** Full sidebar, multi-column cards
- **Tablet:** Collapsible sidebar, 2-column layout
- **Mobile:** Hamburger menu, single-column cards, full-width detail panel

### Animations
- Staggered card reveals on page load
- Smooth transitions for all interactions
- Hover effects on buttons and cards
- Detail panel slides in from right
- Hamburger menu animates to X shape

### Accessibility
- Semantic HTML structure
- Color contrast meets WCAG AA standards
- Focus states on interactive elements
- Keyboard navigation support

## Future Enhancements

- [ ] Backend API integration
- [ ] Real-time client check-in notifications
- [ ] Video feedback link embedding
- [ ] Payment processing integration
- [ ] Email invoice automation
- [ ] Client mobile app (check-in submission)
- [ ] Advanced analytics and reporting
- [ ] Multi-user support with role-based access

## Design System

See `docs/DESIGN.md` for detailed design documentation, including:
- Color palette and usage
- Typography system
- Component library
- Animation guidelines
- Responsive breakpoints

## HCI Principles

This project demonstrates core human-computer interaction concepts:

1. **Understanding Needs** through observational research of actual coaching workflows
2. **Workflow Closure** by consolidating fragmented tools into unified experience
3. **Mental Models** aligned with how coaches think about program management
4. **Task Context Preservation** through single-page architecture and inline details
5. **Visibility** providing feedback on program status, client engagement, financial health

For the full HCI analysis, see the project proposal in `docs/PROPOSAL.docx`.

## Credits

**Team:** Rafa, Christopher Butler, Matthieu Resurreccion  
**Course:** COMP 485 — Human-Computer Interaction  
**Instructor:** Armineh Karamian

## License

MIT License — See LICENSE file for details

---

**Questions or feedback?** Open an issue or contact the team.

Made with focus on solving real problems in fitness coaching.
