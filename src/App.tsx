import { ThemeProvider, ToastProvider } from '@/core/providers'
import { ToastContainer, ThemeToggle } from '@/shared/components'
import { ClientsPage } from '@/features/clients'

function AppContent(): JSX.Element {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestão de Clientes
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <ClientsPage />
      </main>

      <ToastContainer />
    </div>
  )
}

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  )
}
