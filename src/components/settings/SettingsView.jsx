import { useApp } from '../../context/AppContext'
import { useTheme } from '../../context/ThemeContext'
import { useState } from 'react'

function ToggleSwitch({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-[var(--text-primary)]">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 ${
          checked ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  )
}

export default function SettingsView() {
  const { state, dispatch } = useApp()
  const { theme, toggleTheme } = useTheme()

  const [notifications, setNotifications] = useState({
    checkInReminders: true,
    invoiceAlerts: true,
    sessionReminders: false,
  })

  const inputClass = 'w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'

  return (
    <div className="max-w-lg space-y-6">
      {/* Program Name */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
        <h2 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">General</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold text-[var(--text-primary)] mb-1 block">Program Name</label>
            <input
              type="text"
              value={state.programName}
              onChange={e => dispatch({ type: 'SET_PROGRAM_NAME', payload: e.target.value })}
              className={inputClass}
              aria-label="Program name"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-[var(--text-primary)] mb-1 block">Default Client Fee ($)</label>
            <input
              type="number"
              value={state.defaultRate}
              onChange={e => dispatch({ type: 'SET_DEFAULT_RATE', payload: Number(e.target.value) })}
              className={inputClass}
              aria-label="Default client fee"
            />
          </div>
        </div>
      </div>

      {/* Role Selector */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
        <h2 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">Role</h2>
        <div className="flex gap-3">
          {['Admin', 'Coach'].map(role => (
            <button
              key={role}
              onClick={() => dispatch({ type: 'SET_ROLE', payload: role })}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                state.role === role
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-label={`Set role to ${role}`}
            >
              {role} View
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
        <h2 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">Appearance</h2>
        <div className="flex gap-3">
          {['light', 'dark'].map(t => (
            <button
              key={t}
              onClick={() => { if (theme !== t) toggleTheme() }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold capitalize transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                theme === t
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-label={`Switch to ${t} mode`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
        <h2 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">Notifications</h2>
        <div className="space-y-4">
          <ToggleSwitch
            label="Check-in Reminders"
            checked={notifications.checkInReminders}
            onChange={() => setNotifications(p => ({ ...p, checkInReminders: !p.checkInReminders }))}
          />
          <ToggleSwitch
            label="Invoice Alerts"
            checked={notifications.invoiceAlerts}
            onChange={() => setNotifications(p => ({ ...p, invoiceAlerts: !p.invoiceAlerts }))}
          />
          <ToggleSwitch
            label="Session Reminders"
            checked={notifications.sessionReminders}
            onChange={() => setNotifications(p => ({ ...p, sessionReminders: !p.sessionReminders }))}
          />
        </div>
      </div>
    </div>
  )
}
