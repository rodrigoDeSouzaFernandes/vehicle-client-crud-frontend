import { createContext, ReactNode, useCallback, useContext, useState, useRef } from 'react'

export type ToastVariant = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, variant: ToastVariant, duration?: number) => void
  removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastIdRef = useRef(0)
  const timeoutIdsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
    // Limpa timeout se existir
    const timeoutId = timeoutIdsRef.current.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutIdsRef.current.delete(id)
    }
  }, [])

  const addToast = useCallback(
    (message: string, variant: ToastVariant, duration = 3000) => {
      const id = `toast-${++toastIdRef.current}`
      const toast: Toast = { id, message, variant, duration }

      setToasts((prev) => [...prev, toast])

      if (duration > 0) {
        const timeoutId = setTimeout(() => {
          removeToast(id)
        }, duration)
        timeoutIdsRef.current.set(id, timeoutId)
      }
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider')
  }
  return context
}
