import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'tu_secreto_super_secreto';

export function middleware(req) {
  const token = req.cookies.get('token')?.value || req.headers.get('authorization');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const isGuest = token.startsWith('{'); // Verificar si es un JSON plano (invitado)
    if (isGuest) {
      const guestData = JSON.parse(token);
      if (guestData.role === 'guest') {
        return NextResponse.next(); // Permitir acceso al invitado
      }
    } else {
      jwt.verify(token, JWT_SECRET); // Validar token JWT normal
      return NextResponse.next();
    }
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'], // Asegurar rutas del dashboard
};
