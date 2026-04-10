import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

function MetricDot({ value, label }) {
  const color = value >= 4 ? 'bg-brand-green' : value >= 3 ? 'bg-brand-amber' : 'bg-brand-red'
  return (
    <div className="flex items-center gap-1.5" title={`${label}: ${value}/5`}>
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} aria-hidden="true" />
      <span className="text-xs text-[var(--text-muted)]">{label}</span>
    </div>
  )
}

export default function CheckInCard({ checkIn, onReview }) {
  const date = new Date(checkIn.submittedAt)
  const timeStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
      <div className="flex items-start gap-3">
        <Avatar name={checkIn.clientName} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-bold text-[var(--text-primary)]">{checkIn.clientName}</h3>
            <span className="text-xs text-[var(--text-muted)] shrink-0">{timeStr}</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <MetricDot value={checkIn.energy} label="Energy" />
            <MetricDot value={checkIn.sleep} label="Sleep" />
            <MetricDot value={checkIn.compliance} label="Compliance" />
          </div>

          <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-3">
            {checkIn.notes.length > 80 ? checkIn.notes.slice(0, 80) + '...' : checkIn.notes}
          </p>

          {checkIn.status === 'Pending' ? (
            <Button size="sm" onClick={() => onReview(checkIn)} aria-label={`Review check-in from ${checkIn.clientName}`}>
              Review
            </Button>
          ) : (
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
              <p className="text-xs text-[var(--text-muted)] mb-1">Coach Response</p>
              <p className="text-sm text-[var(--text-primary)]">{checkIn.coachResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
