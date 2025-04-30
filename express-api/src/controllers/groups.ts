import { Request, Response } from "express";
import db from "../database.js";
import { Group, AuthRequest } from "../types/index.js";

interface RunResult {
  lastID: number;
  changes: number;
}

export const getAllGroups = async (
  req: Request,
  res: Response<Group[] | { error: string }>
): Promise<void> => {
  try {
    const rows = await db.all("SELECT * FROM groups", []);
    res.json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
};

export const getGroupById = async (
  req: Request<{ id: string }>,
  res: Response<Group | { error: string }>
): Promise<void> => {
  const { id } = req.params;
  try {
    const row = await db.get("SELECT * FROM groups WHERE id = ?", id);
    res.json(row);
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
};

export const createGroup = async (
  req: Request<{}, {}, { name: string; description?: string }>,
  res: Response<Group | { error: string }>
): Promise<void> => {
  const { name, description } = req.body;
  try {
    const result = (await db.run(
      "INSERT INTO groups (name, description) VALUES (?, ?)",
      [name, description]
    )) as RunResult;
    res.json({ id: result.lastID, name, description: description || null });
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
};

export const updateGroup = async (
  req: Request<{ id: string }, {}, { name: string }>,
  res: Response<{ changes: number } | { error: string }>
): Promise<void> => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const result = (await db.run("UPDATE groups SET name = ? WHERE id = ?", [
      name,
      id,
    ])) as RunResult;
    res.json({ changes: result.changes });
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
};

export const deleteGroup = async (
  req: Request<{ id: string }>,
  res: Response<{ changes: number } | { error: string }>
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = (await db.run(
      "DELETE FROM groups WHERE id = ?",
      id
    )) as RunResult;
    res.json({ changes: result.changes });
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
};
