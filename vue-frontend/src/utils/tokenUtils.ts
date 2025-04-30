/**
 * Utility functions for token management
 */

/**
 * Checks if a token exists in localStorage and is valid
 */
export function checkToken(): { exists: boolean; token: string | null } {
  const token = localStorage.getItem("token");
    "Token in localStorage:",
    token ? `${token.substring(0, 10)}...` : "None"
  );
  return { exists: !!token, token };
}

/**
 * Sets a token in localStorage and returns success status
 */
export function setTokenInStorage(token: string): boolean {
  try {
    localStorage.setItem("token", token);
    return true;
  } catch (error) {
    console.error("Error setting token in localStorage:", error);
    return false;
  }
}

/**
 * Removes a token from localStorage
 */
export function removeTokenFromStorage(): void {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error removing token from localStorage:", error);
  }
}

/**
 * Validates token format (basic check)
 */
export function validateTokenFormat(token: string): boolean {
  // This is a basic check - adjust based on your token format
  // For JWT tokens, they typically have 3 parts separated by dots
  if (token.includes(".")) {
    const parts = token.split(".");
    return parts.length === 3;
  }

  // For simple tokens, just check if it's not empty
  return token.length > 0;
}
