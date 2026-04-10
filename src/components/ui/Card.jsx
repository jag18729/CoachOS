export default function Card({ children, className = '', onClick, hover = false }) {
  return (
    <div
      className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 transition-all duration-200 ${
        hover ? 'hover:-translate-y-1 hover:shadow-lg hover:border-[var(--accent)] cursor-pointer' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
