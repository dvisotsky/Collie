import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent } from "@testing-library/vue";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "../stores/auth";
import Login from "../views/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Create a router instance for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: { template: "<div>Dashboard</div>" },
    },
    { path: "/login", name: "Login", component: Login },
  ],
});

describe("Authentication", () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia());
    // Clear all mocks
    vi.clearAllMocks();
    // Reset fetch mock
    mockFetch.mockReset();
  });

  describe("Login", () => {
    it("should store token in localStorage after successful login", async () => {
      // Mock successful API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            token: "test-token",
            user: { id: 1, name: "Test User", email: "test@example.com" },
          }),
      });

      const { getByLabelText, getByTestId } = render(Login, {
        global: {
          plugins: [router],
        },
      });
      const authStore = useAuthStore();

      // Fill in login form
      const emailInput = getByLabelText("Email");
      const passwordInput = getByLabelText("Password");
      await fireEvent.update(emailInput, "test@example.com");
      await fireEvent.update(passwordInput, "password123");

      // Submit form
      const submitButton = getByTestId("login-submit");
      await fireEvent.click(submitButton);

      // Wait for async operations to complete
      await vi.waitFor(() => {
        expect(authStore.token).toBe("test-token");
        expect(authStore.isAuthenticated).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          "token",
          "test-token"
        );
      });
    });

    it("should handle login failure", async () => {
      // Mock failed API response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        json: () => Promise.resolve({ error: "Invalid credentials" }),
      });

      const { getByLabelText, getByTestId, findByText } = render(Login, {
        global: {
          plugins: [router],
        },
      });
      const authStore = useAuthStore();

      // Fill in login form
      const emailInput = getByLabelText("Email");
      const passwordInput = getByLabelText("Password");
      await fireEvent.update(emailInput, "test@example.com");
      await fireEvent.update(passwordInput, "wrong-password");

      // Submit form
      const submitButton = getByTestId("login-submit");
      await fireEvent.click(submitButton);

      // Wait for error message
      const errorMessage = await findByText("Login failed: Unauthorized");
      expect(errorMessage).toBeTruthy();
      expect(authStore.token).toBeNull();
      expect(authStore.isAuthenticated).toBe(false);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe("Logout", () => {
    it("should clear token and user data on logout", async () => {
      const authStore = useAuthStore();

      // Set initial authenticated state
      authStore.setToken("test-token");
      authStore.setUser({
        id: 1,
        name: "Test User",
        email: "test@example.com",
      });

      // Perform logout
      authStore.logout();

      expect(authStore.token).toBeNull();
      expect(authStore.user).toBeNull();
      expect(authStore.isAuthenticated).toBe(false);
      expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    });
  });
});
