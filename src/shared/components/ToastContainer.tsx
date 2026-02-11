import { useToast, type Toast } from '@/core/providers'
import { memo } from 'react'

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }): JSX.Element {
  const variants = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  }

  return (
    <div
      className={`${variants[toast.variant]} px-4 py-3 rounded-md shadow-lg flex items-center justify-between animate-slide-in`}
      role="alert"
      aria-live="polite"
    >
      <p>{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-4 text-sm font-bold hover:opacity-80 transition-opacity"
        aria-label={`Fechar notificação: ${toast.message}`}
      >
        ✕
      </button>
    </div>
  )
}

const MemoizedToastItem = memo(ToastItem)

export function ToastContainer(): JSX.Element {
  const { toasts, removeToast } = useToast()

  return (
    <div
      className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-auto"
      aria-label="Notificações do sistema"
      role="region"
    >
      {toasts.map((toast) => (
        <MemoizedToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}
