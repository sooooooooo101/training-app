type Props = {
  label: string
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'gray'
}

const colorMap = {
  green: 'bg-primary-light text-primary-dark',
  blue: 'bg-blue-100 text-blue-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red: 'bg-red-100 text-red-700',
  gray: 'bg-gray-100 text-gray-600',
}

export function Badge({ label, color = 'gray' }: Props) {
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-[4px] ${colorMap[color]}`}>
      {label}
    </span>
  )
}
