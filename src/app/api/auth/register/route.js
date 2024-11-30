import db from '../../../../db';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Datos incompletos' }), {
      status: 400,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    stmt.run(email, hashedPassword);

    return new Response(JSON.stringify({ message: 'Usuario registrado' }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'El usuario ya existe' }), {
      status: 400,
    });
  }
}
