import './globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from '../components/sidebar'
import { MobileNav } from '../components/mobile-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Panel de Administración',
  description: 'Panel de administración para la gestión de reembolsos, domicilios y empleados',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <header className="bg-white border-b md:hidden">
              <div className="px-4 py-3">
                <MobileNav />
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

