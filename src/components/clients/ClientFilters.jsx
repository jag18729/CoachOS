import { Search } from 'lucide-react'

export default function ClientFilters({ search, onSearchChange, filters, onFilterChange, groups }) {
  const selectClass = 'bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label="Search clients by name"
        />
      </div>
      <select
        value={filters.status}
        onChange={e => onFilterChange('status', e.target.value)}
        className={selectClass}
        aria-label="Filter by status"
      >
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Paused">Paused</option>
        <option value="Pending">Pending</option>
      </select>
      <select
        value={filters.group}
        onChange={e => onFilterChange('group', e.target.value)}
        className={selectClass}
        aria-label="Filter by group"
      >
        <option value="">All Groups</option>
        {groups.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <select
        value={filters.billing}
        onChange={e => onFilterChange('billing', e.target.value)}
        className={selectClass}
        aria-label="Filter by billing status"
      >
        <option value="">All Billing</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
        <option value="Overdue">Overdue</option>
      </select>
    </div>
  )
}
