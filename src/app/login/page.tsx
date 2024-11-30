'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      setMessage(data.error);
    }
  };

  const handleGuestLogin = () => {
    // Crear un token en formato JWT para el invitado
    const guestToken = JSON.stringify({
      role: 'guest', // Definir el rol como invitado
      id: 'guest',
    });
    localStorage.setItem('token', guestToken);
    window.location.href = '/dashboard'; // Redirigir al dashboard
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded mb-2">Iniciar Sesión</button>
        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full bg-gray-500 text-white p-2 rounded"
        >
          Ingresar como Invitado
        </button>
      </form>
    </div>
  );
}
