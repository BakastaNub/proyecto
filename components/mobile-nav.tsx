'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, RefreshCcw, Truck, Users, Menu, X, LogOut } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const menuItems = [
  { name: 'Inicio', icon: Home, href: '/' },
  { name: 'Reembolsos', icon: RefreshCcw, href: '/reembolsos' },
  { name: 'Domicilios', icon: Truck, href: '/domicilios' },
  { name: 'Empleados', icon: Users, href: '/empleados' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="block md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[240px] sm:w-[300px] flex flex-col justify-between"
      >
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-lg font-semibold"
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => {
            /* Implementar lógica de cierre de sesión */
          }}
          className="flex items-center gap-2 text-lg font-semibold text-red-400 hover:text-red-300 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </button>
      </SheetContent>
    </Sheet>
  )
}
