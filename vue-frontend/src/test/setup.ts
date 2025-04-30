import { config } from "@vue/test-utils";
import { vi } from "vitest";

// Mock environment variables
vi.stubEnv("VITE_API_URL", "http://localhost:3000");

// Configure Vue Test Utils
config.global.mocks = {
  // Add any global mocks here
};

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
