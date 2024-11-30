import db from '../../../../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'baleada';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Datos incompletos' }), {
      status: 400,
    });
  }

  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const user = stmt.get(email);

  if (!user) {
    return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
      status: 404,
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), {
      status: 401,
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return new Response(JSON.stringify({ token }), { status: 200 });
}
