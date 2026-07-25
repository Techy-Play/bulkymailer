import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
}

export function LoadingButton({
  loading = false,
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}: LoadingButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-1'
  const variants = {
    primary: 'bg-[#111827] hover:bg-black text-white focus:ring-gray-900 disabled:opacity-50',
    secondary: 'bg-white hover:bg-gray-50 text-[#111827] border border-gray-200 focus:ring-gray-300 disabled:opacity-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:opacity-50',
    ghost: 'text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 focus:ring-gray-300 disabled:opacity-50',
  }
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}
