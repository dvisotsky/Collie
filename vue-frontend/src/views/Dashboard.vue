<template>
  <div class="container">
    <h1 class="mb-5">Dashboard</h1>
    <h2 class="mb-4">Groups</h2>
    <div v-if="error" class="alert alert-danger mb-4">
      {{ error }}
    </div>
    <div
      v-if="groups.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div v-for="group in groups" :key="group.id" class="card p-4">
        <h3 class="mb-2">{{ group.name }}</h3>
        <p class="text-muted mb-4">
          {{ group.description || "No description" }}
        </p>
        <router-link :to="`/groups/${group.id}`" class="btn btn-primary"
          >View</router-link
        >
      </div>
    </div>
    <div v-else class="card p-4 text-center">
      <p class="text-muted mb-4">
        No groups found. Create a new group to get started.
      </p>
      <router-link to="/groups/new" class="btn btn-primary"
        >Create Group</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { apiRequest, handleApiError } from "../utils/api";

const router = useRouter();
const authStore = useAuthStore();

// Mock data for demonstration
const totalGroups = ref(0);
const activeTasks = ref(0);
const completedTasks = ref(0);
const groups = ref<Array<{ id: number; name: string; description?: string }>>(
  []
);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    if (!authStore.token) {
      console.error("No token available, redirecting to login");
      router.push("/login");
      return;
    }

    const response = await apiRequest("/groups");

    if (response.status === 401) {
      // Token is invalid or expired
      console.error("Token is invalid or expired");
      authStore.logout();
      router.push("/login");
      return;
    }

    if (!response.ok) {
      await handleApiError(response);
    }

    const data = await response.json();
    groups.value = data;
    totalGroups.value = data.length;
    activeTasks.value = 0; // These would need separate API endpoints
    completedTasks.value = 0; // These would need separate API endpoints
  } catch (err: unknown) {
    console.error("Error fetching dashboard data:", err);
    error.value =
      err instanceof Error
        ? err.message
        : "Failed to load dashboard data. Please try again later.";
  }
});
</script>
