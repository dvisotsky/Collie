import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/auth.js";
export const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // Check if user already exists
        db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (user) {
                res.status(400).json({ error: "User already exists" });
                return;
            }
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Insert new user
            db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword], function (err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(201).json({ id: this.lastID, username, email });
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (!user) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN,
            });
            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    created_at: user.created_at,
                },
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
export const getProfile = (req, res) => {
    if (!req.user) {
        res.status(401).json({ error: "User not authenticated" });
        return;
    }
    const { id } = req.user;
    db.get("SELECT id, username, email, created_at FROM users WHERE id = ?", [id], (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    });
};
//# sourceMappingURL=users.js.map