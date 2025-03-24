import { Request } from "express";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export interface Group {
  id: number;
  name: string;
  description: string | null;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

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
  token: string;
  user: Omit<User, "password">;
}
