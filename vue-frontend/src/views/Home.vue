<template>
  <div class="home">
    <h1>Welcome to Collie</h1>
    <p>Your personal task management system</p>
    <div class="actions">
      <template v-if="!isAuthenticated">
        <router-link to="/login" class="btn">Login</router-link>
        <router-link to="/signup" class="btn">Sign Up</router-link>
      </template>
      <template v-else>
        <router-link to="/dashboard" class="btn">Dashboard</router-link>
        <router-link to="/groups" class="btn">Groups</router-link>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const isAuthenticated = computed(() => {
  return !!localStorage.getItem("token");
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #666;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #3aa876;
}
</style>
