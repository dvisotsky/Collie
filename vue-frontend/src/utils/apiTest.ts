/**
 * API Test Utility
 *
 * This file contains functions to test API connectivity and token issues.
 * You can run these functions in the browser console to diagnose problems.
 */

import {
  checkToken,
  setTokenInStorage,
  removeTokenFromStorage,
  validateTokenFormat,
} from "./tokenUtils";

/**
 * Tests the login endpoint and logs the response
 */
export async function testLoginEndpoint(
  email = "test@example.com",
  password = "password123"
) {

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });


    try {
      const data = await response.json();

      if (data.token) {

        // Try to store the token
        const stored = setTokenInStorage(data.token);

        // Verify token was stored
        const { exists, token } = checkToken();
          "Token in localStorage matches received token:",
          token === data.token
        );
      } else {
        console.error("No token in response data");
      }
    } catch (e) {
      console.error("Error parsing response as JSON:", e);
    }
  } catch (error) {
    console.error("Error testing login endpoint:", error);
  }

}

/**
 * Tests the groups endpoint with the current token
 */
export async function testGroupsEndpoint() {

  // Check if token exists
  const { exists, token } = checkToken();

  if (!exists || !token) {
    console.error("No token available, cannot test groups endpoint");
    return;
  }


  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    try {
      const data = await response.json();
    } catch (e) {
      console.error("Error parsing response as JSON:", e);
    }
  } catch (error) {
    console.error("Error testing groups endpoint:", error);
  }

}

/**
 * Runs a complete test of the authentication flow
 */
export async function runAuthTest(
  email = "test@example.com",
  password = "password123"
) {

  // Clear any existing token
  removeTokenFromStorage();

  // Check token after clearing
  const { exists: existsAfterClear } = checkToken();

  // Test login
  await testLoginEndpoint(email, password);

  // Check token after login
  const { exists: existsAfterLogin, token: tokenAfterLogin } = checkToken();

  if (existsAfterLogin && tokenAfterLogin) {
    // Test groups endpoint
    await testGroupsEndpoint();
  } else {
    console.error("Login did not set a token, cannot test groups endpoint");
  }

}

// Export a function to run all tests
export function runAllTests() {
  runAuthTest();
}
