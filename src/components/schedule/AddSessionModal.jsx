import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { useApp } from '../../context/AppContext'

export default function AddSessionModal({ open, onClose }) {
  const { state, dispatch } = useApp()
  const [form, setForm] = useState({
    clientId: '',
    date: '',
    time: '',
    type: 'Strength',
    notes: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.clientId || !form.date || !form.time) return

    const client = state.clients.find(c => c.id === form.clientId)
    const newSession = {
      id: `s${Date.now()}`,
      clientId: form.clientId,
      clientName: client?.name || '',
      group: client?.group || '',
      date: form.date,
      time: form.time,
      duration: 60,
      type: form.type,
      coachNote: form.notes,
      attended: false,
    }

    dispatch({ type: 'ADD_SESSION', payload: newSession })
    setForm({ clientId: '', date: '', time: '', type: 'Strength', notes: '' })
    onClose()
  }

  const inputClass = 'w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Session"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!form.clientId || !form.date || !form.time} aria-label="Create session">
            Create Session
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-bold text-[var(--text-primary)] mb-1 block">Client</label>
          <select
            value={form.clientId}
            onChange={e => setForm(p => ({ ...p, clientId: e.target.value }))}
            className={inputClass}
            aria-label="Select client"
          >
            <option value="">Select a client...</option>
            {state.clients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-bold text-[var(--text-primary)] mb-1 block">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
            className={inputClass}
            aria-label="Session date"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-[var(--text-primary)] mb-1 block">Time</label>
          <input
            type="time"
            value={form.time}
            onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
            className={inputClass}
            aria-label="Session time"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-[var(--text-primary)] mb-1 block">Type</label>
          <select
            value={form.type}
            onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
            className={inputClass}
            aria-label="Session type"
          >
            <option value="Strength">Strength</option>
            <option value="Cardio">Cardio</option>
            <option value="Conditioning">Conditioning</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-bold text-[var(--text-primary)] mb-1 block">Notes</label>
          <textarea
            value={form.notes}
            onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
            placeholder="Session notes..."
            rows={3}
            className={`${inputClass} resize-none`}
            aria-label="Session notes"
          />
        </div>
      </form>
    </Modal>
  )
}
