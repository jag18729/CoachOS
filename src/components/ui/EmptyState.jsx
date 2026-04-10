export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
          <Icon size={28} className="text-[var(--text-muted)]" />
        </div>
      )}
      <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--text-muted)] max-w-sm">{description}</p>
      )}
    </div>
  )
}
