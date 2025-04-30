import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import Signup from "../src/views/Signup.vue";
import { useAuthStore } from "../src/stores/auth";

// Mock the router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/dashboard", name: "Dashboard", component: {} },
    { path: "/login", name: "Login", component: {} },
  ],
});

// Mock the auth store
vi.mock("../src/stores/auth", () => ({
  useAuthStore: () => ({
    signup: vi.fn(),
  }),
}));

describe("Signup.vue", () => {
  let wrapper;
  let authStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    authStore = useAuthStore();
    wrapper = mount(Signup, {
      global: {
        plugins: [router],
      },
    });
  });

  it("renders signup form correctly", () => {
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("shows error when passwords do not match", async () => {
    await wrapper.find('input[type="text"]').setValue("Test User");
    await wrapper.find('input[type="email"]').setValue("test@example.com");
    await wrapper.find('input[type="password"]').setValue("password123");
    await wrapper
      .find('input[type="password"][placeholder="Confirm Password"]')
      .setValue("password456");

    await wrapper.find("form").trigger("submit");

    expect(wrapper.text()).toContain("Passwords do not match");
  });

  it("calls signup method with correct data", async () => {
    authStore.signup.mockResolvedValue({ success: true });

    await wrapper.find('input[type="text"]').setValue("Test User");
    await wrapper.find('input[type="email"]').setValue("test@example.com");
    await wrapper.find('input[type="password"]').setValue("password123");
    await wrapper
      .find('input[type="password"][placeholder="Confirm Password"]')
      .setValue("password123");

    await wrapper.find("form").trigger("submit");

    expect(authStore.signup).toHaveBeenCalledWith(
      "Test User",
      "test@example.com",
      "password123"
    );
  });

  it("redirects to dashboard on successful signup", async () => {
    authStore.signup.mockResolvedValue({ success: true });
    const push = vi.spyOn(router, "push");

    await wrapper.find('input[type="text"]').setValue("Test User");
    await wrapper.find('input[type="email"]').setValue("test@example.com");
    await wrapper.find('input[type="password"]').setValue("password123");
    await wrapper
      .find('input[type="password"][placeholder="Confirm Password"]')
      .setValue("password123");

    await wrapper.find("form").trigger("submit");

    expect(push).toHaveBeenCalledWith("/dashboard");
  });

  it("shows error message on failed signup", async () => {
    authStore.signup.mockResolvedValue({
      success: false,
      error: "Email already exists",
    });

    await wrapper.find('input[type="text"]').setValue("Test User");
    await wrapper.find('input[type="email"]').setValue("test@example.com");
    await wrapper.find('input[type="password"]').setValue("password123");
    await wrapper
      .find('input[type="password"][placeholder="Confirm Password"]')
      .setValue("password123");

    await wrapper.find("form").trigger("submit");

    expect(wrapper.text()).toContain("Email already exists");
  });
});
