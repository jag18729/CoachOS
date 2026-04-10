import { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import CheckInCard from './CheckInCard'
import CheckInReviewModal from './CheckInReviewModal'

export default function CheckInInbox() {
  const { state, dispatch } = useApp()
  const [reviewingCheckIn, setReviewingCheckIn] = useState(null)
  const [toast, setToast] = useState(null)
  const [showPending, setShowPending] = useState(true)
  const [showReviewed, setShowReviewed] = useState(true)

  const pending = useMemo(() =>
    state.checkIns.filter(ci => ci.status === 'Pending')
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)),
    [state.checkIns]
  )

  const reviewed = useMemo(() =>
    state.checkIns.filter(ci => ci.status === 'Reviewed')
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)),
    [state.checkIns]
  )

  function handleSubmitReview(checkInId, response) {
    dispatch({
      type: 'MARK_CHECKIN_REVIEWED',
      payload: { id: checkInId, response },
    })

    const name = state.checkIns.find(ci => ci.id === checkInId)?.clientName
    setReviewingCheckIn(null)

    setToast(`Response sent to ${name}`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="relative">
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-brand-green text-white px-5 py-3 rounded-lg shadow-lg font-bold text-sm animate-fade-in"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-display font-bold text-[var(--text-primary)]">Check-in Inbox</h2>
        {pending.length > 0 && (
          <span className="bg-brand-red text-white text-xs font-bold rounded-full px-2.5 py-0.5">
            {pending.length} unreviewed
          </span>
        )}
      </div>

      {/* Needs Review */}
      <div className="mb-6">
        <button
          onClick={() => setShowPending(p => !p)}
          className="flex items-center gap-2 mb-3 text-sm font-display font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded"
          aria-expanded={showPending}
          aria-label="Toggle needs review section"
        >
          {showPending ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          Needs Review ({pending.length})
        </button>
        {showPending && (
          <div className="space-y-3">
            {pending.map(ci => (
              <CheckInCard key={ci.id} checkIn={ci} onReview={setReviewingCheckIn} />
            ))}
            {pending.length === 0 && (
              <p className="text-sm text-[var(--text-muted)] py-4">All caught up!</p>
            )}
          </div>
        )}
      </div>

      {/* Reviewed */}
      <div>
        <button
          onClick={() => setShowReviewed(p => !p)}
          className="flex items-center gap-2 mb-3 text-sm font-display font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded"
          aria-expanded={showReviewed}
          aria-label="Toggle reviewed section"
        >
          {showReviewed ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          Reviewed ({reviewed.length})
        </button>
        {showReviewed && (
          <div className="space-y-3">
            {reviewed.map(ci => (
              <CheckInCard key={ci.id} checkIn={ci} onReview={setReviewingCheckIn} />
            ))}
            {reviewed.length === 0 && (
              <p className="text-sm text-[var(--text-muted)] py-4">No reviewed check-ins yet</p>
            )}
          </div>
        )}
      </div>

      {/* Review modal */}
      <CheckInReviewModal
        checkIn={reviewingCheckIn}
        onClose={() => setReviewingCheckIn(null)}
        onSubmit={handleSubmitReview}
      />
    </div>
  )
}
