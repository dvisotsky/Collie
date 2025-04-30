<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">Collie</router-link>
    </div>
    <div class="nav-links">
      <router-link v-if="isAuthenticated" to="/dashboard"
        >Dashboard</router-link
      >
      <router-link v-if="isAuthenticated" to="/groups">Groups</router-link>
      <a v-if="!isAuthenticated" @click="login">Login</a>
      <a v-if="!isAuthenticated" @click="signup">Sign Up</a>
      <a v-if="isAuthenticated" @click="logout">Logout</a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isAuthenticated = ref(false);

onMounted(() => {
  checkAuth();
});

const checkAuth = () => {
  const token = localStorage.getItem("token");
  isAuthenticated.value = !!token;
};

const login = () => {
  router.push("/login");
};

const signup = () => {
  router.push("/signup");
};

const logout = () => {
  localStorage.removeItem("token");
  isAuthenticated.value = false;
  router.push("/login");
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: #2c3e50;
  text-decoration: none;
  cursor: pointer;
}

.nav-links a:hover {
  color: #42b983;
}

.router-link-active {
  font-weight: bold;
  color: #42b983;
}
</style>
