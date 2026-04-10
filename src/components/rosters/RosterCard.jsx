import { UserPlus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import StatusPill from '../ui/StatusPill'
import Button from '../ui/Button'

export default function RosterCard({ roster, onAddClient }) {
  const { state } = useApp()
  const enrolled = roster.clientIds.length
  const pct = Math.round((enrolled / roster.capacity) * 100)

  const clients = roster.clientIds
    .map(id => state.clients.find(c => c.id === id))
    .filter(Boolean)

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-display font-bold text-[var(--text-primary)]">{roster.name}</h3>
          <p className="text-sm text-[var(--text-muted)]">{roster.program}</p>
        </div>
        <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)] font-bold">
          {roster.schedule}
        </span>
      </div>

      {/* Capacity bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-[var(--text-muted)]">Capacity</span>
          <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{enrolled}/{roster.capacity}</span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              pct >= 90 ? 'bg-brand-red' : pct >= 70 ? 'bg-brand-amber' : 'bg-brand-green'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Client list */}
      <div className="space-y-2 mb-4">
        {clients.map(c => (
          <div key={c.id} className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-primary)]">{c.name}</span>
            <StatusPill status={c.status} />
          </div>
        ))}
        {clients.length === 0 && (
          <p className="text-sm text-[var(--text-muted)]">No clients enrolled</p>
        )}
      </div>

      {enrolled < roster.capacity && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onAddClient(roster)}
          aria-label={`Add client to ${roster.name}`}
        >
          <UserPlus size={14} /> Add Client
        </Button>
      )}
    </div>
  )
}
