import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calendar,
  CreditCard,
  Layers,
  BarChart2,
  Settings,
  Sun,
  Moon,
  X,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useTheme } from '../../context/ThemeContext'

const allNavItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/clients', label: 'Clients', icon: Users },
  { path: '/checkins', label: 'Check-ins', icon: ClipboardList, badge: true },
  { path: '/schedule', label: 'Schedule', icon: Calendar },
  { path: '/billing', label: 'Billing', icon: CreditCard, adminOnly: true },
  { path: '/rosters', label: 'Rosters', icon: Layers },
  { path: '/analytics', label: 'Analytics', icon: BarChart2, adminOnly: true },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  const { state } = useApp()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const pendingCheckIns = state.checkIns.filter(ci => ci.status === 'Pending').length

  const navItems = state.role === 'Coach'
    ? allNavItems.filter(item => !item.adminOnly)
    : allNavItems

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-full w-60 bg-[var(--bg-card)] border-r border-[var(--border)] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[var(--border)]">
          <span className="text-xl font-display font-bold text-[var(--accent)]">CoachOS</span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] lg:hidden focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto" aria-label="Main navigation">
          {navItems.map(({ path, label, icon: Icon, badge }) => {
            const isActive = path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(path)

            return (
              <NavLink
                key={path}
                to={path}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--accent-light)] text-[var(--accent)] border-l-[3px] border-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                <Icon size={20} />
                <span className="flex-1">{label}</span>
                {badge && pendingCheckIns > 0 && (
                  <span className="ml-auto bg-brand-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingCheckIns}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Theme toggle */}
        <div className="px-3 py-4 border-t border-[var(--border)]">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </aside>
    </>
  )
}
