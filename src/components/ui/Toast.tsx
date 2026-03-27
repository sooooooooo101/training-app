import { useEffect, useState } from 'react'
import { listeners, type ToastItem } from './toastEmitter'

export { showToast } from './toastEmitter'

export function Toast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    const handler = (item: ToastItem) => {
      setToasts((prev) => [...prev, item])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== item.id))
      }, 3500)
    }
    listeners.push(handler)
    return () => {
      listeners.splice(listeners.indexOf(handler), 1)
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-input text-sm font-semibold shadow-md text-white transition-all ${
            t.type === 'success' ? 'bg-primary' : t.type === 'error' ? 'bg-danger' : 'bg-gray-700'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
