import express from "express";
import bodyParser from "body-parser";
import db from "./database.js";

const app = express();
const port = 8000;
app.use(bodyParser.json());

// Get all groups
app.get("/groups", (req, res) => {
  db.all("SELECT * FROM groups", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Create a new group
app.post("/groups", (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO groups (name) VALUES (?)", [name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
