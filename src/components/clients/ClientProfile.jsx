import { useState } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Avatar from '../ui/Avatar'
import StatusPill from '../ui/StatusPill'
import Button from '../ui/Button'

export default function ClientProfile() {
  const { state, dispatch } = useApp()
  const [note, setNote] = useState('')

  const client = state.clients.find(c => c.id === state.selectedClientId)
  if (!client) return null

  const clientCheckIns = state.checkIns
    .filter(ci => ci.clientId === client.id)
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 4)

  const clientSessions = state.sessions
    .filter(s => s.clientId === client.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4)

  const clientInvoices = state.invoices
    .filter(inv => inv.clientId === client.id)
    .sort((a, b) => new Date(b.issuedDate) - new Date(a.issuedDate))
    .slice(0, 4)

  function handleAddNote() {
    if (!note.trim()) return
    const newSession = {
      id: `s${Date.now()}`,
      clientId: client.id,
      clientName: client.name,
      group: client.group,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      duration: 60,
      type: 'Other',
      coachNote: note.trim(),
      attended: true,
    }
    dispatch({ type: 'ADD_SESSION', payload: newSession })
    setNote('')
  }

  function close() {
    dispatch({ type: 'SET_SELECTED_CLIENT', payload: null })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-[var(--bg-card)] border-l border-[var(--border)] shadow-xl overflow-y-auto transition-transform duration-300"
        role="dialog"
        aria-modal="true"
        aria-label={`Profile for ${client.name}`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Avatar name={client.name} initials={client.initials} size="lg" />
            <div>
              <h2 className="font-display font-bold text-lg text-[var(--text-primary)]">{client.name}</h2>
              <p className="text-sm text-[var(--text-muted)]">{client.program}</p>
            </div>
          </div>
          <button
            onClick={close}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label="Close profile"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">Status</p>
              <StatusPill status={client.status} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">Billing</p>
              <StatusPill status={client.billingStatus} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">Group</p>
              <p className="text-sm font-bold text-[var(--text-primary)]">{client.group}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">Monthly Rate</p>
              <p className="text-sm font-bold text-[var(--text-primary)]">${client.monthlyRate}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">Sessions</p>
              <p className="text-sm font-bold text-[var(--text-primary)]">{client.sessionsCompleted}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">Joined</p>
              <p className="text-sm font-bold text-[var(--text-primary)]">{client.joinDate}</p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-1">Coach Notes</p>
            <p className="text-sm text-[var(--text-primary)]">{client.notes}</p>
          </div>

          {/* Check-in history */}
          <div>
            <h3 className="text-sm font-display font-bold text-[var(--text-primary)] mb-3">Recent Check-ins</h3>
            {clientCheckIns.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No check-ins yet</p>
            ) : (
              <div className="space-y-3">
                {clientCheckIns.map(ci => (
                  <div key={ci.id} className="bg-[var(--bg-secondary)] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[var(--text-muted)]">Week {ci.weekNumber}</span>
                      <StatusPill status={ci.status} />
                    </div>
                    <p className="text-sm text-[var(--text-primary)] line-clamp-2">{ci.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Session history */}
          <div>
            <h3 className="text-sm font-display font-bold text-[var(--text-primary)] mb-3">Recent Sessions</h3>
            {clientSessions.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No sessions yet</p>
            ) : (
              <div className="space-y-3">
                {clientSessions.map(s => (
                  <div key={s.id} className="bg-[var(--bg-secondary)] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[var(--text-primary)]">{s.date} - {s.time}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-muted)]">{s.type}</span>
                    </div>
                    {s.coachNote && (
                      <p className="text-sm text-[var(--text-muted)]">{s.coachNote}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Invoice history */}
          <div>
            <h3 className="text-sm font-display font-bold text-[var(--text-primary)] mb-3">Recent Invoices</h3>
            {clientInvoices.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No invoices yet</p>
            ) : (
              <div className="space-y-3">
                {clientInvoices.map(inv => (
                  <div key={inv.id} className="bg-[var(--bg-secondary)] rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">${inv.amount}</p>
                      <p className="text-xs text-[var(--text-muted)]">Due {inv.dueDate}</p>
                    </div>
                    <StatusPill status={inv.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Write session note */}
          <div>
            <h3 className="text-sm font-display font-bold text-[var(--text-primary)] mb-3">Write Session Note</h3>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add a session note..."
              rows={3}
              className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
              aria-label="Session note"
            />
            <Button
              size="sm"
              className="mt-2"
              onClick={handleAddNote}
              disabled={!note.trim()}
              aria-label="Save session note"
            >
              Save Note
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
