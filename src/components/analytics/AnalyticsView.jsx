import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'

export default function AnalyticsView() {
  const { state } = useApp()

  // Monthly revenue (last 6 months)
  const monthlyRevenue = useMemo(() => {
    const months = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      const total = state.invoices
        .filter(inv => inv.status === 'Paid' && inv.paidDate?.startsWith(key))
        .reduce((s, inv) => s + inv.amount, 0)
      months.push({ key, label, total })
    }
    return months
  }, [state.invoices])

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.total), 1)

  // Client retention
  const activeCount = state.clients.filter(c => c.status === 'Active').length
  const totalCount = state.clients.length
  const retention = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0

  // Avg compliance
  const avgCompliance = useMemo(() => {
    const scores = state.checkIns.map(ci => ci.compliance)
    if (scores.length === 0) return 0
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
  }, [state.checkIns])

  // Top clients by sessions completed
  const topClients = useMemo(() => {
    return [...state.clients]
      .sort((a, b) => b.sessionsCompleted - a.sessionsCompleted)
      .slice(0, 3)
  }, [state.clients])

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-center">
          <p className="text-4xl font-display font-bold text-[var(--accent)]">{retention}%</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Client Retention</p>
          <p className="text-xs text-[var(--text-muted)]">{activeCount} of {totalCount} active</p>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-center">
          <p className="text-4xl font-display font-bold text-[var(--accent)]">{avgCompliance}</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Avg Compliance Score</p>
          <p className="text-xs text-[var(--text-muted)]">out of 5</p>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <p className="text-sm text-[var(--text-muted)] mb-3">Top Clients</p>
          <div className="space-y-2">
            {topClients.map((c, i) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-primary)]">
                  <span className="font-bold text-[var(--accent)] mr-2">#{i + 1}</span>
                  {c.name}
                </span>
                <span className="text-[var(--text-muted)]">{c.sessionsCompleted} sessions</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly revenue bar chart */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
        <h2 className="text-lg font-display font-bold text-[var(--text-primary)] mb-6">Monthly Revenue</h2>
        <div className="space-y-3">
          {monthlyRevenue.map(month => (
            <div key={month.key} className="flex items-center gap-3">
              <span className="text-sm text-[var(--text-muted)] w-16 shrink-0">{month.label}</span>
              <div className="flex-1 h-8 bg-[var(--bg-secondary)] rounded-lg overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)] rounded-lg transition-all duration-500 flex items-center px-3"
                  style={{ width: `${Math.max((month.total / maxRevenue) * 100, month.total > 0 ? 10 : 0)}%` }}
                >
                  {month.total > 0 && (
                    <span className="text-xs font-bold text-white whitespace-nowrap">${month.total}</span>
                  )}
                </div>
              </div>
              {month.total === 0 && (
                <span className="text-xs text-[var(--text-muted)]">$0</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
