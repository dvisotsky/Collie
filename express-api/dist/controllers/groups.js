import db from "../database.js";
export const getAllGroups = (req, res) => {
    db.all("SELECT * FROM groups", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};
export const getGroupById = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM groups WHERE id = ?", id, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log("group", id, row);
        res.json(row);
    });
};
export const createGroup = (req, res) => {
    const { name, description } = req.body;
    db.run("INSERT INTO groups (name, description) VALUES (?, ?)", [name, description], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, description: description || null });
    });
};
export const updateGroup = (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    db.run("UPDATE groups SET name = ? WHERE id = ?", [name, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
};
export const deleteGroup = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM groups WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
};
//# sourceMappingURL=groups.js.map