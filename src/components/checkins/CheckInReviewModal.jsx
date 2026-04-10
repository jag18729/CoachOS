import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Avatar from '../ui/Avatar'

function MetricBar({ label, value }) {
  const pct = (value / 5) * 100
  const color = value >= 4 ? 'bg-brand-green' : value >= 3 ? 'bg-brand-amber' : 'bg-brand-red'

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-[var(--text-muted)]">{label}</span>
        <span className="text-sm font-mono font-bold text-[var(--text-primary)]">{value}/5</span>
      </div>
      <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-300`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function CheckInReviewModal({ checkIn, onClose, onSubmit }) {
  const [response, setResponse] = useState('')

  if (!checkIn) return null

  const date = new Date(checkIn.submittedAt)
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  function handleSubmit() {
    if (!response.trim()) return
    onSubmit(checkIn.id, response.trim())
  }

  return (
    <Modal
      open={!!checkIn}
      onClose={onClose}
      title="Review Check-in"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!response.trim()} aria-label="Send response">
            Send Response
          </Button>
        </>
      }
    >
      {/* Client header */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar name={checkIn.clientName} size="lg" />
        <div>
          <h3 className="font-display font-bold text-[var(--text-primary)]">{checkIn.clientName}</h3>
          <p className="text-sm text-[var(--text-muted)]">Week {checkIn.weekNumber} - {dateStr}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3 mb-4">
        <MetricBar label="Energy" value={checkIn.energy} />
        <MetricBar label="Sleep" value={checkIn.sleep} />
        <MetricBar label="Compliance" value={checkIn.compliance} />
      </div>

      {/* Weight */}
      <div className="mb-4">
        <span className="text-sm text-[var(--text-muted)]">Weight: </span>
        <span className="text-sm font-bold text-[var(--text-primary)]">{checkIn.weight}</span>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <p className="text-sm text-[var(--text-muted)] mb-1">Client Notes</p>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <p className="text-sm text-[var(--text-primary)]">{checkIn.notes}</p>
        </div>
      </div>

      {/* Coach response */}
      <div>
        <label className="text-sm font-bold text-[var(--text-primary)] mb-2 block">Coach Response</label>
        <textarea
          value={response}
          onChange={e => setResponse(e.target.value)}
          placeholder="Write your response to the client..."
          rows={4}
          className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
          aria-label="Coach response"
        />
      </div>
    </Modal>
  )
}
