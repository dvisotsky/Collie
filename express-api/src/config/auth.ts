import { Secret } from "jsonwebtoken";

// JWT configuration
export const JWT_SECRET = process.env.JWT_SECRET as Secret;
export const JWT_REFRESH_SECRET = (process.env.JWT_REFRESH_SECRET ||
  JWT_SECRET) as Secret;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
export const JWT_REFRESH_EXPIRES_IN =
  process.env.JWT_REFRESH_EXPIRES_IN || "7d";

// Validate that JWT_SECRET is set
if (!JWT_SECRET) {
  console.error(
    "WARNING: JWT_SECRET is not set in environment variables. Using a fallback value is not secure for production."
  );
}
