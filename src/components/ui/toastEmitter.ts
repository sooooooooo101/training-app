type ToastType = 'success' | 'error' | 'info'

export type ToastItem = {
  id: string
  message: string
  type: ToastType
}

export let listeners: ((item: ToastItem) => void)[] = []

export function showToast(message: string, type: ToastType = 'info') {
  const item: ToastItem = { id: Date.now().toString(), message, type }
  listeners.forEach((l) => l(item))
}
