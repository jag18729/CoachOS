import { useState, useMemo } from 'react'
import { DollarSign } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import InvoiceRow from './InvoiceRow'
import GenerateInvoiceModal from './GenerateInvoiceModal'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

const TABS = ['All', 'Paid', 'Pending', 'Overdue']

export default function BillingView() {
  const { state, dispatch } = useApp()
  const [activeTab, setActiveTab] = useState('All')
  const [showGenerate, setShowGenerate] = useState(false)
  const [viewingInvoice, setViewingInvoice] = useState(null)

  const totals = useMemo(() => {
    const billed = state.invoices.reduce((s, i) => s + i.amount, 0)
    const collected = state.invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.amount, 0)
    return { billed, collected, outstanding: billed - collected }
  }, [state.invoices])

  const filtered = useMemo(() => {
    if (activeTab === 'All') return state.invoices
    return state.invoices.filter(i => i.status === activeTab)
  }, [state.invoices, activeTab])

  function handleMarkPaid(id) {
    dispatch({ type: 'MARK_INVOICE_PAID', payload: { id } })
  }

  return (
    <div>
      {/* Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Billed', value: totals.billed, color: 'text-[var(--text-primary)]' },
          { label: 'Collected', value: totals.collected, color: 'text-brand-green' },
          { label: 'Outstanding', value: totals.outstanding, color: 'text-brand-amber' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
            <p className="text-sm text-[var(--text-muted)] mb-1">{label}</p>
            <p className={`text-2xl font-display font-bold ${color}`}>${value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Tabs + action */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-lg p-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                activeTab === tab
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-label={`Filter invoices: ${tab}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <Button onClick={() => setShowGenerate(true)} aria-label="Generate invoice">
          <DollarSign size={16} /> Generate Invoice
        </Button>
      </div>

      {/* Invoice table */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-3 px-4 text-xs font-bold text-[var(--text-muted)] uppercase">Client</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-[var(--text-muted)] uppercase">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-[var(--text-muted)] uppercase">Issued</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-[var(--text-muted)] uppercase">Due</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-[var(--text-muted)] uppercase">Status</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-[var(--text-muted)] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(inv => (
              <InvoiceRow
                key={inv.id}
                invoice={inv}
                onMarkPaid={handleMarkPaid}
                onView={setViewingInvoice}
              />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm text-[var(--text-muted)]">No invoices found</div>
        )}
      </div>

      {/* View invoice detail modal */}
      {viewingInvoice && (
        <Modal
          open={!!viewingInvoice}
          onClose={() => setViewingInvoice(null)}
          title="Invoice Details"
          footer={<Button variant="secondary" onClick={() => setViewingInvoice(null)}>Close</Button>}
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Client</span><span className="font-bold text-[var(--text-primary)]">{viewingInvoice.clientName}</span></div>
            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Amount</span><span className="font-bold text-[var(--text-primary)]">${viewingInvoice.amount}</span></div>
            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Issued</span><span className="text-[var(--text-primary)]">{viewingInvoice.issuedDate}</span></div>
            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Due</span><span className="text-[var(--text-primary)]">{viewingInvoice.dueDate}</span></div>
            <div className="flex justify-between"><span className="text-[var(--text-muted)]">Status</span><span className="text-[var(--text-primary)]">{viewingInvoice.status}</span></div>
            {viewingInvoice.paidDate && (
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">Paid</span><span className="text-[var(--text-primary)]">{viewingInvoice.paidDate}</span></div>
            )}
            {viewingInvoice.sessionIds.length > 0 && (
              <div>
                <p className="text-[var(--text-muted)] mb-1">Sessions ({viewingInvoice.sessionIds.length})</p>
                <p className="text-[var(--text-primary)]">{viewingInvoice.sessionIds.join(', ')}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      <GenerateInvoiceModal open={showGenerate} onClose={() => setShowGenerate(false)} />
    </div>
  )
}
