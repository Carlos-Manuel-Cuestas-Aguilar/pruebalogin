export async function POST() {
    return new Response(JSON.stringify({ message: 'Sesión cerrada' }), {
      status: 200,
      headers: {
        'Set-Cookie': 'token=; Max-Age=0; Path=/; HttpOnly;',
      },
    });
  }
  