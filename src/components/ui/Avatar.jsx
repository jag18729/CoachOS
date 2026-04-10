const bgColors = [
  'bg-brand-cyan',
  'bg-brand-blue',
  'bg-brand-green',
  'bg-brand-amber',
  'bg-brand-red',
  'bg-brand-gold',
]

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

export default function Avatar({ name, initials, size = 'md' }) {
  const colorIndex = hashCode(name || '') % bgColors.length
  const bg = bgColors[colorIndex]
  const display = initials || name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'

  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }

  return (
    <div
      className={`${bg} ${sizes[size]} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
      aria-hidden="true"
    >
      {display}
    </div>
  )
}
