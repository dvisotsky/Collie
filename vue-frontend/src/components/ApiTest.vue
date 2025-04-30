<template>
  <div class="api-test" v-if="showDebug">
    <h3>API Test</h3>
    <div class="debug-info">
      <p><strong>API URL:</strong> {{ apiUrl }}</p>
      <p><strong>Login Endpoint:</strong> {{ loginEndpoint }}</p>
    </div>
    <div class="debug-actions">
      <button @click="testLoginEndpoint">Test Login Endpoint</button>
    </div>
    <div v-if="apiTestResult" class="api-test-result">
      <p><strong>API Test Result:</strong> {{ apiTestResult }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const showDebug = ref(true); // Set to false in production
const apiTestResult = ref<string | null>(null);

const apiUrl = computed(() => import.meta.env.VITE_API_URL);
const loginEndpoint = computed(
  () => `${import.meta.env.VITE_API_URL}/auth/login`
);

async function testLoginEndpoint() {
  try {
    apiTestResult.value = "Testing login endpoint...";

    // Test with a dummy login request
    const response = await fetch(loginEndpoint.value, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    apiTestResult.value = `Response status: ${response.status}`;

    // Try to parse the response
    try {
      const data = await response.json();
      apiTestResult.value += `\nResponse data: ${JSON.stringify(
        data,
        null,
        2
      )}`;
    } catch (e) {
      apiTestResult.value += "\nCould not parse response as JSON";
    }
  } catch (error) {
    apiTestResult.value = `Error: ${
      error instanceof Error ? error.message : "Unknown error"
    }`;
  }
}
</script>

<style scoped>
.api-test {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
}

.debug-info {
  margin-bottom: 1rem;
}

.debug-actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.api-test-result {
  padding: 0.5rem;
  background-color: #e9ecef;
  border-radius: 4px;
  white-space: pre-wrap;
}
</style>
