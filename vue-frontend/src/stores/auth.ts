import { defineStore } from "pinia";
import { ref } from "vue";
import { User, AuthResponse } from "../types";
import { login as apiLogin, register as apiRegister } from "../utils/api";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("token"));
  const user = ref<Omit<User, "password"> | null>(null);
  const isAuthenticated = ref<boolean>(!!token.value);

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem("token", newToken);
    isAuthenticated.value = true;
  }

  function setUser(userData: Omit<User, "password">) {
    user.value = userData;
  }

  function logout() {
    token.value = null;
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("token");
  }

  async function login(email: string, password: string) {
    try {
      const data = await apiLogin(email, password);

      if (!data.accessToken) {
        console.error("No token in response:", data);
        logout();
        throw new Error("No token received from server");
      }

      setToken(data.accessToken);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      logout();
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  }

  async function signup(username: string, email: string, password: string) {
    try {
      const data = await apiRegister(username, email, password);

      if (!data.accessToken) {
        console.error("No token in response:", data);
        logout();
        throw new Error("No token received from server");
      }

      setToken(data.accessToken);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      logout();
      return {
        success: false,
        error: error instanceof Error ? error.message : "Signup failed",
      };
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    setToken,
    setUser,
  };
});
