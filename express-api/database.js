import sqlite3 from "sqlite3";
sqlite3.verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
  );
});

export default db;
