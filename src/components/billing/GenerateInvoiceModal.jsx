import { useState, useMemo } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { useApp } from '../../context/AppContext'

export default function GenerateInvoiceModal({ open, onClose }) {
  const { state, dispatch } = useApp()
  const [clientId, setClientId] = useState('')
  const [amount, setAmount] = useState('')
  const [period, setPeriod] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })
  const [selectedSessions, setSelectedSessions] = useState([])

  const selectedClient = state.clients.find(c => c.id === clientId)

  const clientSessions = useMemo(() => {
    if (!clientId) return []
    return state.sessions.filter(s => s.clientId === clientId)
  }, [clientId, state.sessions])

  function handleClientChange(id) {
    setClientId(id)
    const client = state.clients.find(c => c.id === id)
    if (client) setAmount(String(client.monthlyRate))
    setSelectedSessions([])
  }

  function toggleSession(sid) {
    setSelectedSessions(prev =>
      prev.includes(sid) ? prev.filter(s => s !== sid) : [...prev, sid]
    )
  }

  function handleSubmit() {
    if (!clientId || !amount) return
    const today = new Date().toISOString().split('T')[0]
    const due = new Date()
    due.setDate(due.getDate() + 7)

    const invoice = {
      id: `inv${Date.now()}`,
      clientId,
      clientName: selectedClient?.name || '',
      amount: parseFloat(amount),
      issuedDate: today,
      dueDate: due.toISOString().split('T')[0],
      status: 'Pending',
      paidDate: null,
      sessionIds: selectedSessions,
    }

    dispatch({ type: 'GENERATE_INVOICE', payload: invoice })
    setClientId('')
    setAmount('')
    setSelectedSessions([])
    onClose()
  }

  const inputClass = 'w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Generate Invoice"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!clientId || !amount} aria-label="Generate invoice">
            Generate Invoice
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-[var(--text-primary)] mb-1 block">Client</label>
          <select
            value={clientId}
            onChange={e => handleClientChange(e.target.value)}
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
          <label className="text-sm font-bold text-[var(--text-primary)] mb-1 block">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className={inputClass}
            aria-label="Invoice amount"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-[var(--text-primary)] mb-1 block">Billing Period</label>
          <input
            type="month"
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className={inputClass}
            aria-label="Billing period"
          />
        </div>

        {clientSessions.length > 0 && (
          <div>
            <label className="text-sm font-bold text-[var(--text-primary)] mb-2 block">Sessions to Include</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {clientSessions.map(s => (
                <label key={s.id} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSessions.includes(s.id)}
                    onChange={() => toggleSession(s.id)}
                    className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                  />
                  <span className="text-[var(--text-primary)]">{s.date} - {s.time} ({s.type})</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
