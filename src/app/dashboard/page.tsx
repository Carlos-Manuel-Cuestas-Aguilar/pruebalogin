'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1]; // Obtener la parte de datos del JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null; // Si falla la decodificación
  }
};

export default function DashboardPage() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      try {
        // Si el token es un JSON plano (invitado)
        const user = token.startsWith('{') ? JSON.parse(token) : decodeJWT(token);
        if (user) {
          setRole(user.role || 'user'); // Si no tiene rol, asumir que es usuario normal
        } else {
          router.push('/login'); // Token inválido
        }
      } catch (e) {
        router.push('/login'); // Error al procesar el token
      }
    }
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Bienvenido al Dashboard</h1>

      
      
    {/* Sección visible para todos */}
      {role != 'guest' && (
        <div className="mt-6 bg-white p-4 rounded shadow-md w-3/4">
        <h2 className="text-2xl font-semibold mb-4">Sección Pública</h2>
        <p>Esta sección es visible para todos los usuarios.</p>
      </div>
      )}



      {/* Sección visible solo para invitados */}
      {role === 'guest' && (
        <div className="mt-6 bg-blue-50 p-4 rounded shadow-md w-3/4">
          <h2 className="text-2xl font-semibold mb-4">Sección para Invitados</h2>
          <p>Esta sección solo es visible para el usuario invitado.</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white p-2 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
