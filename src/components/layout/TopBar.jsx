import { useLocation } from 'react-router-dom'
import { Menu, Bell } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const titles = {
  '/': 'Dashboard',
  '/clients': 'Clients',
  '/checkins': 'Check-ins',
  '/schedule': 'Schedule',
  '/billing': 'Billing',
  '/rosters': 'Rosters',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
}

export default function TopBar({ onMenuClick }) {
  const location = useLocation()
  const { state } = useApp()
  const title = titles[location.pathname] || 'CoachOS'

  return (
    <header className="sticky top-0 z-20 h-16 bg-[var(--bg-card)] border-b border-[var(--border)] flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] lg:hidden transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-display font-bold text-[var(--text-primary)]">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
          state.role === 'Admin'
            ? 'bg-brand-blue/10 text-brand-blue'
            : 'bg-brand-green/10 text-brand-green'
        }`}>
          {state.role}
        </span>
      </div>
    </header>
  )
}
