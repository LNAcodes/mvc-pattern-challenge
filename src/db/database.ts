import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

const DB_FILE = path.join(process.cwd(), "db", "blog.db");

let db: Database | null = null;

export async function connectDB(): Promise<Database> {
  db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database,
  });

  //SQL is run immediately, server starts even without seed
  // The SQL statement is passed as a template string so it can span multiple lines for readability. await blocks until the statement finishes, so by the time connectDB returns, the table is guaranteed to exist.
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    author TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    teaser TEXT NOT NULL,
    content TEXT NOT NULL
  )
`);

  return db;
}

export function getDB(): Database {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
