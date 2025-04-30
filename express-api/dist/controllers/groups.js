import db from "../database.js";
export const getAllGroups = async (req, res) => {
    try {
        const rows = await db.all("SELECT * FROM groups", []);
        res.json(rows);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
};
export const getGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const row = await db.get("SELECT * FROM groups WHERE id = ?", id);
        res.json(row);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
};
export const createGroup = async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = (await db.run("INSERT INTO groups (name, description) VALUES (?, ?)", [name, description]));
        res.json({ id: result.lastID, name, description: description || null });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
};
export const updateGroup = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    try {
        const result = (await db.run("UPDATE groups SET name = ? WHERE id = ?", [
            name,
            id,
        ]));
        res.json({ changes: result.changes });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
};
export const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const result = (await db.run("DELETE FROM groups WHERE id = ?", id));
        res.json({ changes: result.changes });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
};
//# sourceMappingURL=groups.js.map