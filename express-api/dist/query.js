import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function query(sql) {
    const db = await open({
        filename: path.join(__dirname, "db.sqlite"),
        driver: sqlite3.Database,
    });
    try {
        const results = await db.all(sql);
    }
    catch (err) {
        console.error("Error executing query:", err.message);
    }
    finally {
        await db.close();
    }
}
// Get the SQL query from command line argument
const sql = process.argv[2];
if (!sql) {
    process.exit(1);
}
query(sql);
//# sourceMappingURL=query.js.map