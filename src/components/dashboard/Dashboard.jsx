import { useNavigate } from 'react-router-dom'
import { Users, ClipboardList, DollarSign, Calendar, ArrowRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import StatCard from './StatCard'
import Button from '../ui/Button'

export default function Dashboard() {
  const { state } = useApp()
  const navigate = useNavigate()

  const activeClients = state.clients.filter(c => c.status === 'Active').length
  const pendingCheckIns = state.checkIns.filter(ci => ci.status === 'Pending').length

  const now = new Date()
  const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const monthlyRevenue = state.invoices
    .filter(inv => inv.status === 'Paid' && inv.paidDate?.startsWith(monthStr))
    .reduce((sum, inv) => sum + inv.amount, 0)

  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay() + 1)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  const weekSessions = state.sessions.filter(s => {
    const d = new Date(s.date)
    return d >= startOfWeek && d <= endOfWeek
  }).length

  // Build activity feed from recent events
  const activities = [
    ...state.checkIns.map(ci => ({
      id: `ci-${ci.id}`,
      text: `${ci.clientName} submitted a check-in`,
      time: new Date(ci.submittedAt),
      type: 'checkin',
    })),
    ...state.invoices.filter(inv => inv.paidDate).map(inv => ({
      id: `inv-${inv.id}`,
      text: `${inv.clientName} paid $${inv.amount}`,
      time: new Date(inv.paidDate),
      type: 'payment',
    })),
    ...state.sessions.filter(s => s.attended).map(s => ({
      id: `ses-${s.id}`,
      text: `${s.clientName} attended ${s.type} session`,
      time: new Date(s.date),
      type: 'session',
    })),
  ]
    .sort((a, b) => b.time - a.time)
    .slice(0, 5)

  function formatRelative(date) {
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Yesterday'
    return `${diff} days ago`
  }

  const dotColors = {
    checkin: 'bg-brand-blue',
    payment: 'bg-brand-green',
    session: 'bg-brand-amber',
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Active Clients" value={activeClients} color="bg-brand-blue" />
        <StatCard icon={ClipboardList} label="Pending Check-ins" value={pendingCheckIns} color="bg-brand-amber" />
        <StatCard icon={DollarSign} label="Monthly Revenue" value={`$${monthlyRevenue.toLocaleString()}`} color="bg-brand-green" />
        <StatCard icon={Calendar} label="Sessions This Week" value={weekSessions} color="bg-brand-cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity feed */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${dotColors[activity.type]}`} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)]">{activity.text}</p>
                  <p className="text-xs text-[var(--text-muted)]">{formatRelative(activity.time)}</p>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <p className="text-sm text-[var(--text-muted)]">No recent activity</p>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button
              variant="secondary"
              className="w-full justify-between"
              onClick={() => navigate('/checkins')}
              aria-label="Review check-ins"
            >
              Review Check-ins
              <ArrowRight size={16} />
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-between"
              onClick={() => navigate('/schedule')}
              aria-label="View schedule"
            >
              View Schedule
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
