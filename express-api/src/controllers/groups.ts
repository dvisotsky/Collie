import { Request, Response } from "express";
import db from "../database.js";
import { Group, AuthRequest } from "../types/index.js";

interface RunResult {
  lastID: number;
  changes: number;
}

export const getAllGroups = (
  req: Request,
  res: Response<Group[] | { error: string }>
): void => {
  db.all("SELECT * FROM groups", [], (err: Error | null, rows: Group[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

export const getGroupById = (
  req: Request<{ id: string }>,
  res: Response<Group | { error: string }>
): void => {
  const { id } = req.params;
  db.get(
    "SELECT * FROM groups WHERE id = ?",
    id,
    (err: Error | null, row: Group | undefined) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log("group", id, row);
      res.json(row);
    }
  );
};

export const createGroup = (
  req: Request<{}, {}, { name: string; description?: string }>,
  res: Response<Group | { error: string }>
): void => {
  const { name, description } = req.body;
  db.run(
    "INSERT INTO groups (name, description) VALUES (?, ?)",
    [name, description],
    function (this: RunResult, err: Error | null) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, name, description: description || null });
    }
  );
};

export const updateGroup = (
  req: Request<{ id: string }, {}, { name: string }>,
  res: Response<{ changes: number } | { error: string }>
): void => {
  const { name } = req.body;
  const { id } = req.params;
  db.run(
    "UPDATE groups SET name = ? WHERE id = ?",
    [name, id],
    function (this: RunResult, err: Error | null) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
};

export const deleteGroup = (
  req: Request<{ id: string }>,
  res: Response<{ changes: number } | { error: string }>
): void => {
  const { id } = req.params;
  db.run(
    "DELETE FROM groups WHERE id = ?",
    id,
    function (this: RunResult, err: Error | null) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
};
