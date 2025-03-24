import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/auth.js";
import {
  User,
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  AuthRequest,
} from "../types/index.js";

interface RunResult {
  lastID: number;
  changes: number;
}

export const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response
): Promise<void> => {
  const { username, password, email } = req.body;

  try {
    console.log("Registration attempt for:", email);
    // Check if user already exists
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err: Error | null, user: User | undefined) => {
        if (err) {
          console.error("Database error during user check:", err);
          res.status(500).json({ error: err.message });
          return;
        }
        if (user) {
          console.log("User already exists:", email);
          res.status(400).json({ error: "User already exists" });
          return;
        }

        try {
          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);
          console.log("Password hashed successfully");

          // Insert new user
          db.run(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword],
            function (this: RunResult, err: Error | null) {
              if (err) {
                console.error("Database error during user insertion:", err);
                res.status(500).json({ error: err.message });
                return;
              }

              try {
                // Create token for the new user
                const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET, {
                  expiresIn: JWT_EXPIRES_IN,
                });
                console.log("Token created successfully for user:", email);

                // Return token and user data
                res.status(201).json({
                  token,
                  user: {
                    id: this.lastID,
                    username,
                    email,
                    created_at: new Date().toISOString(),
                  },
                });
              } catch (jwtError) {
                console.error("JWT signing error:", jwtError);
                res
                  .status(500)
                  .json({ error: "Error creating authentication token" });
              }
            }
          );
        } catch (hashError) {
          console.error("Password hashing error:", hashError);
          res.status(500).json({ error: "Error processing password" });
        }
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response<AuthResponse | { error: string }>
): Promise<void> => {
  const { email, password } = req.body;

  try {
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err: Error | null, user: User | undefined) => {
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
      }
    );
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getProfile = (
  req: AuthRequest,
  res: Response<Omit<User, "password"> | { error: string }>
): void => {
  if (!req.user) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  const { id } = req.user;

  db.get(
    "SELECT id, username, email, created_at FROM users WHERE id = ?",
    [id],
    (err: Error | null, user: Omit<User, "password"> | undefined) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    }
  );
};
