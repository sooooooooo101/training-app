import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

export function Card({ children, className = '', ...props }: Props) {
  return (
    <div
      {...props}
      className={`bg-card border border-border rounded-card p-4 ${className}`}
    >
      {children}
    </div>
  )
}
