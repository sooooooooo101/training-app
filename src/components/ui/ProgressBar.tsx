type Props = {
  value: number // 0-100
}

export function ProgressBar({ value }: Props) {
  const clamped = Math.min(100, Math.max(0, value))
  const color = clamped >= 80 ? 'bg-primary' : 'bg-yellow-400'
  return (
    <div className="w-full bg-gray-200 rounded-[4px] h-1.5">
      <div
        className={`h-1.5 rounded-[4px] transition-all ${color}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
