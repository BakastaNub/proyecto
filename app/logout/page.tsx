'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    // Aquí deberías implementar la lógica para cerrar la sesión
    // Por ejemplo, limpiar el token de autenticación del localStorage
    localStorage.removeItem('authToken')
    
    // Redirigir al usuario a la página de inicio de sesión
    router.push('/login')
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-xl">Cerrando sesión...</p>
    </div>
  )
}

