import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../config/auth.js";
import { AuthRequest } from "../types/index.js";

/**
 * Middleware to verify JWT access token
 */
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Access token required" });
      return;
    }

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    jwt.verify(
      token,
      JWT_SECRET,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res
              .status(401)
              .json({ error: "Token expired", code: "TOKEN_EXPIRED" });
            return;
          }
          res.status(403).json({ error: "Invalid token" });
          return;
        }

        req.user = decoded as { id: number; email: string };
        next();
      }
    );
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

/**
 * Middleware to verify JWT refresh token
 */
export const authenticateRefreshToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ error: "Refresh token required" });
      return;
    }

    if (!JWT_REFRESH_SECRET) {
      console.error("JWT_REFRESH_SECRET is not defined");
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    jwt.verify(
      refreshToken,
      JWT_REFRESH_SECRET,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res.status(401).json({
              error: "Refresh token expired",
              code: "REFRESH_TOKEN_EXPIRED",
            });
            return;
          }
          res.status(403).json({ error: "Invalid refresh token" });
          return;
        }

        req.user = decoded as { id: number; email: string };
        next();
      }
    );
  } catch (error) {
    console.error("Refresh token verification error:", error);
    res.status(500).json({ error: "Refresh token verification failed" });
  }
};
