const variants = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Reviewed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Received: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Paused: 'bg-gray-100 text-gray-600 dark:bg-gray-700/30 dark:text-gray-400',
  Overdue: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const dotColors = {
  Active: 'bg-emerald-500',
  Paid: 'bg-emerald-500',
  Reviewed: 'bg-emerald-500',
  Received: 'bg-blue-500',
  Pending: 'bg-amber-500',
  Paused: 'bg-gray-400',
  Overdue: 'bg-red-500',
}

export default function StatusPill({ status }) {
  const variant = variants[status] || variants.Pending
  const dot = dotColors[status] || dotColors.Pending

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${variant}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {status}
    </span>
  )
}
