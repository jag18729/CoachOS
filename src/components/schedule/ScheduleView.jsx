import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import SessionCard from './SessionCard'
import AddSessionModal from './AddSessionModal'
import Button from '../ui/Button'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getMonday(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function formatDate(date) {
  return date.toISOString().split('T')[0]
}

export default function ScheduleView() {
  const { state } = useApp()
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()))
  const [showModal, setShowModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)

  const weekDates = useMemo(() => {
    return DAYS.map((_, i) => {
      const d = new Date(weekStart)
      d.setDate(weekStart.getDate() + i)
      return d
    })
  }, [weekStart])

  const sessionsByDay = useMemo(() => {
    const map = {}
    weekDates.forEach(d => {
      const key = formatDate(d)
      map[key] = state.sessions.filter(s => s.date === key)
    })
    return map
  }, [state.sessions, weekDates])

  function prevWeek() {
    setWeekStart(prev => {
      const d = new Date(prev)
      d.setDate(d.getDate() - 7)
      return d
    })
  }

  function nextWeek() {
    setWeekStart(prev => {
      const d = new Date(prev)
      d.setDate(d.getDate() + 7)
      return d
    })
  }

  const monthLabel = weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={prevWeek}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label="Previous week"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-display font-bold text-[var(--text-primary)]">{monthLabel}</h2>
          <button
            onClick={nextWeek}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label="Next week"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <Button onClick={() => setShowModal(true)} aria-label="Add session">
          <Plus size={16} /> Add Session
        </Button>
      </div>

      {/* Week grid */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-3 min-w-[700px]">
          {weekDates.map((date, i) => {
            const key = formatDate(date)
            const isToday = formatDate(new Date()) === key
            const sessions = sessionsByDay[key] || []

            return (
              <div key={key} className="min-h-[200px]">
                {/* Day header */}
                <div className={`text-center py-2 rounded-lg mb-2 ${
                  isToday
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                }`}>
                  <p className="text-xs font-bold">{DAYS[i]}</p>
                  <p className="text-lg font-mono font-bold">{date.getDate()}</p>
                </div>

                {/* Sessions */}
                <div className="space-y-2">
                  {sessions.map(s => (
                    <SessionCard
                      key={s.id}
                      session={s}
                      onClick={() => setSelectedSession(s)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Session detail popover */}
      {selectedSession && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={() => setSelectedSession(null)}
        >
          <div
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 shadow-xl max-w-sm w-full mx-4"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Session details"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-[var(--text-primary)]">{selectedSession.clientName}</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]">{selectedSession.type}</span>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-[var(--text-muted)]">Date:</span> <span className="text-[var(--text-primary)]">{selectedSession.date}</span></p>
              <p><span className="text-[var(--text-muted)]">Time:</span> <span className="text-[var(--text-primary)]">{selectedSession.time}</span></p>
              <p><span className="text-[var(--text-muted)]">Duration:</span> <span className="text-[var(--text-primary)]">{selectedSession.duration} min</span></p>
              <p><span className="text-[var(--text-muted)]">Group:</span> <span className="text-[var(--text-primary)]">{selectedSession.group}</span></p>
              {selectedSession.coachNote && (
                <div>
                  <p className="text-[var(--text-muted)] mb-1">Coach Note:</p>
                  <p className="text-[var(--text-primary)] bg-[var(--bg-secondary)] rounded-lg p-2">{selectedSession.coachNote}</p>
                </div>
              )}
              <div className="flex items-center gap-2 pt-2">
                <span className={`w-2.5 h-2.5 rounded-full ${selectedSession.attended ? 'bg-brand-green' : 'bg-brand-red'}`} aria-hidden="true" />
                <span className="text-[var(--text-primary)]">{selectedSession.attended ? 'Attended' : 'Not attended'}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedSession(null)}
              className="mt-4 w-full py-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Close session details"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <AddSessionModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
