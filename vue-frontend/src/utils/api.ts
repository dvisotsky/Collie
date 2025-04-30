import { useAuthStore } from "../stores/auth";
import { AuthResponse } from "../types";

/**
 * Makes an authenticated API request with proper token handling
 */
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const authStore = useAuthStore();
  const token = authStore.token;

  if (!token) {
    throw new Error("No authentication token available");
  }

  // Ensure headers object exists
  const headers = options.headers || {};

  // Add Authorization header with proper format
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const url = `${import.meta.env.VITE_API_URL}${endpoint}`;

  const response = await fetch(url, requestOptions);

  // Log response status for debugging

  return response;
}

/**
 * Handles API errors with proper error messages
 */
export async function handleApiError(response: Response): Promise<never> {
  let errorMessage = "An unknown error occurred";

  try {
    const errorData = await response.json();
    errorMessage = errorData.error || errorData.message || response.statusText;
  } catch (e) {
    // If we can't parse the error JSON, use the status text
    errorMessage = response.statusText;
  }

  throw new Error(errorMessage);
}

/**
 * Login user and return auth response
 */
export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}

/**
 * Register a new user
 */
export async function register(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
}
