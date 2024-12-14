import express from "express";
import bodyParser from "body-parser";
import db from "./database.js";
import cors from "cors";

const app = express();
const port = 8000;
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Allow localhost:3000
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

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
  const { name, description } = req.body;
  db.run(
    "INSERT INTO groups (name, description) VALUES (?, ?)",
    [name, description],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//endpoint to edit a group
app.put("/groups/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  db.run("UPDATE groups SET name = ? WHERE id = ?", [name, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

//endpoint to delete a group
app.delete("/groups/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM groups WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});
