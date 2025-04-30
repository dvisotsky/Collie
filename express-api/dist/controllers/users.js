import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database.js";
import { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN, } from "../config/auth.js";
export const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // Check if user already exists using async/await
        const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert new user
        const result = await db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
        // Ensure JWT_SECRET is defined
        if (!JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            res.status(500).json({ error: "Server configuration error" });
            return;
        }
        // Create token for the new user
        const accessToken = jwt.sign({ id: result.lastID, email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        // Return token and user data
        res.status(201).json({
            accessToken,
            refreshToken: "", // No refresh token on registration
            user: {
                id: result.lastID,
                username,
                email,
                created_at: new Date().toISOString(),
            },
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        // Ensure JWT secrets are defined
        if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
            console.error("JWT secrets are not defined");
            res.status(500).json({ error: "Server configuration error" });
            return;
        }
        // Generate access token
        const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        // Generate refresh token
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, JWT_REFRESH_SECRET, {
            expiresIn: JWT_REFRESH_EXPIRES_IN,
        });
        res.json({
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
export const getProfile = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ error: "User not authenticated" });
        return;
    }
    const { id } = req.user;
    try {
        const user = await db.get("SELECT id, username, email, created_at FROM users WHERE id = ?", [id]);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
};
/**
 * Refresh access token using refresh token
 */
export const refreshToken = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ error: "User not authenticated" });
        return;
    }
    const { id, email } = req.user;
    try {
        // Ensure JWT_SECRET is defined
        if (!JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            res.status(500).json({ error: "Server configuration error" });
            return;
        }
        // Generate new access token
        const accessToken = jwt.sign({ id, email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        res.json({ accessToken });
    }
    catch (error) {
        console.error("Token refresh error:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
//# sourceMappingURL=users.js.map