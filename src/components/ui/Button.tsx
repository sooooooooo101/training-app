import type { ButtonHTMLAttributes } from 'react'
import { useLanguageStore } from '../../stores/languageStore'
import { translate } from '../../lib/i18n'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({ variant = 'primary', size = 'md', loading, children, disabled, className = '', ...props }: Props) {
  const { lang } = useLanguageStore()
  const base = 'inline-flex items-center justify-center font-semibold rounded-input transition-colors focus:outline-none'
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' }
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark disabled:opacity-50',
    secondary: 'bg-primary-light text-primary-dark hover:bg-green-100 disabled:opacity-50',
    danger: 'bg-danger text-white hover:bg-red-700 disabled:opacity-50',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 disabled:opacity-50',
  }

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          {translate(lang, 'processing')}
        </span>
      ) : children}
    </button>
  )
}
