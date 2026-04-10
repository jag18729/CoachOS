import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import RosterCard from './RosterCard'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

export default function RostersView() {
  const { state, dispatch } = useApp()
  const [addingToRoster, setAddingToRoster] = useState(null)

  const availableClients = addingToRoster
    ? state.clients.filter(c => !addingToRoster.clientIds.includes(c.id))
    : []

  function handleAddClient(clientId) {
    dispatch({
      type: 'ADD_CLIENT_TO_ROSTER',
      payload: { rosterId: addingToRoster.id, clientId },
    })
    setAddingToRoster(null)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.rosters.map(roster => (
          <RosterCard
            key={roster.id}
            roster={roster}
            onAddClient={setAddingToRoster}
          />
        ))}
      </div>

      {/* Add client modal */}
      {addingToRoster && (
        <Modal
          open={!!addingToRoster}
          onClose={() => setAddingToRoster(null)}
          title={`Add Client to ${addingToRoster.name}`}
          footer={<Button variant="secondary" onClick={() => setAddingToRoster(null)}>Cancel</Button>}
        >
          {availableClients.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)] py-4 text-center">All clients are already in this roster.</p>
          ) : (
            <div className="space-y-2">
              {availableClients.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleAddClient(c.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  aria-label={`Add ${c.name} to roster`}
                >
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">{c.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{c.program}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}
