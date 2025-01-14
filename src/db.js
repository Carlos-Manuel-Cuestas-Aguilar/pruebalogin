import Database from 'better-sqlite3';

const db = new Database('database.db', { verbose: console.log });

// Crear tabla de usuarios si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

export default db;
