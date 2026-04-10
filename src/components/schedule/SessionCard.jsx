const typeColors = {
  Strength: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
  Cardio: 'bg-brand-red/10 text-brand-red border-brand-red/20',
  Conditioning: 'bg-brand-amber/10 text-brand-amber border-brand-amber/20',
  Other: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
}

export default function SessionCard({ session, onClick }) {
  const color = typeColors[session.type] || typeColors.Other

  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-2.5 text-xs cursor-pointer hover:shadow-md transition-all ${color}`}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' && onClick) onClick() }}
      aria-label={`${session.clientName} ${session.type} session at ${session.time}`}
    >
      <p className="font-bold truncate">{session.time}</p>
      <p className="truncate">{session.clientName}</p>
      <p className="opacity-75">{session.type}</p>
    </div>
  )
}
