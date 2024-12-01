'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, RefreshCcw, Truck, Users, LogOut } from 'lucide-react'

const menuItems = [
  { name: 'Inicio', icon: Home, href: '/' },
  { name: 'Reembolsos', icon: RefreshCcw, href: '/reembolsos' },
  { name: 'Domicilios', icon: Truck, href: '/domicilios' },
  { name: 'Empleados', icon: Users, href: '/empleados' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-col h-screen w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center w-full px-4 py-2 transition-colors duration-200 hover:bg-gray-700 hover:text-white ${
                  pathname === item.href ? 'bg-gray-700 text-white' : ''
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={() => {/* Implementar lógica de cierre de sesión */}}
          className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  )
}

