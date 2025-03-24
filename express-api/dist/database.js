import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { open } from "sqlite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
sqlite3.verbose();
const dbPath = process.env.DB_PATH || path.join(__dirname, "db.sqlite");
const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
});
// Create tables if they don't exist
await db.exec(`
  CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
export default db;
//# sourceMappingURL=database.js.map