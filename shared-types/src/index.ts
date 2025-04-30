// User related interfaces
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

// Group related interfaces
export interface Group {
  id: number;
  name: string;
  description: string | null;
}

// Authentication related interfaces
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, "password">;
}

// Express specific interfaces
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}
