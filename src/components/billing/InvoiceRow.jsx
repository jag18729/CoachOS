import StatusPill from '../ui/StatusPill'
import Button from '../ui/Button'

export default function InvoiceRow({ invoice, onMarkPaid, onView }) {
  return (
    <tr className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors">
      <td className="py-3 px-4 text-sm text-[var(--text-primary)]">{invoice.clientName}</td>
      <td className="py-3 px-4 text-sm font-bold text-[var(--text-primary)]">${invoice.amount}</td>
      <td className="py-3 px-4 text-sm text-[var(--text-muted)]">{invoice.issuedDate}</td>
      <td className="py-3 px-4 text-sm text-[var(--text-muted)]">{invoice.dueDate}</td>
      <td className="py-3 px-4"><StatusPill status={invoice.status} /></td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          {(invoice.status === 'Pending' || invoice.status === 'Overdue') && (
            <Button size="sm" variant="secondary" onClick={() => onMarkPaid(invoice.id)} aria-label={`Mark invoice for ${invoice.clientName} as paid`}>
              Mark Paid
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={() => onView(invoice)} aria-label={`View invoice for ${invoice.clientName}`}>
            View
          </Button>
        </div>
      </td>
    </tr>
  )
}
