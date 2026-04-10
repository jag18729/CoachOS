import { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import ClientFilters from './ClientFilters'
import ClientCard from './ClientCard'
import ClientProfile from './ClientProfile'
import EmptyState from '../ui/EmptyState'
import { Users } from 'lucide-react'

export default function ClientList() {
  const { state, dispatch } = useApp()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ status: '', group: '', billing: '' })

  const groups = useMemo(() => {
    return [...new Set(state.clients.map(c => c.group))].sort()
  }, [state.clients])

  const filtered = useMemo(() => {
    return state.clients.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
      if (filters.status && c.status !== filters.status) return false
      if (filters.group && c.group !== filters.group) return false
      if (filters.billing && c.billingStatus !== filters.billing) return false
      return true
    })
  }, [state.clients, search, filters])

  function handleFilterChange(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      <ClientFilters
        search={search}
        onSearchChange={setSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
        groups={groups}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No clients found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(client => (
            <ClientCard
              key={client.id}
              client={client}
              onClick={() => dispatch({ type: 'SET_SELECTED_CLIENT', payload: client.id })}
            />
          ))}
        </div>
      )}

      {state.selectedClientId && <ClientProfile />}
    </div>
  )
}
