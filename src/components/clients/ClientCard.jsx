import Avatar from '../ui/Avatar'
import StatusPill from '../ui/StatusPill'

export default function ClientCard({ client, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border-[var(--accent)] transition-all duration-200"
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') onClick() }}
      aria-label={`View profile for ${client.name}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={client.name} initials={client.initials} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-[var(--text-primary)] truncate">{client.name}</h3>
          <p className="text-xs text-[var(--text-muted)]">{client.program}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)] font-bold">
          {client.group}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <StatusPill status={client.status} />
        <StatusPill status={client.billingStatus} />
      </div>
    </div>
  )
}
