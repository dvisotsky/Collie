<template>
  <div class="groups">
    <div class="groups-header">
      <h1>Groups</h1>
      <button class="btn" @click="showCreateForm = true">
        Create New Group
      </button>
    </div>

    <!-- Create Group Form -->
    <div v-if="showCreateForm" class="create-form">
      <h2>Create New Group</h2>
      <form @submit.prevent="createGroup">
        <div class="form-group">
          <label for="name">Group Name</label>
          <input
            type="text"
            id="name"
            v-model="newGroup.name"
            required
            placeholder="Enter group name"
          />
        </div>
        <div class="form-group">
          <label for="description">Description (Optional)</label>
          <textarea
            id="description"
            v-model="newGroup.description"
            placeholder="Enter group description"
            rows="3"
          ></textarea>
        </div>
        <div class="form-actions">
          <button
            type="button"
            class="btn-secondary"
            @click="showCreateForm = false"
          >
            Cancel
          </button>
          <button type="submit" class="btn">Create Group</button>
        </div>
      </form>
    </div>

    <!-- Groups List -->
    <div class="groups-list" v-if="groups.length > 0">
      <div v-for="group in groups" :key="group.id" class="group-card">
        <h3>{{ group.name }}</h3>
        <p>{{ group.description || "No description" }}</p>
        <div class="group-actions">
          <router-link :to="`/groups/${group.id}`" class="btn-secondary"
            >View</router-link
          >
          <button class="btn-danger" @click="deleteGroup(group.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>No groups yet. Create your first group to get started!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const groups = ref<Array<{ id: number; name: string; description?: string }>>(
  []
);
const showCreateForm = ref(false);
const newGroup = ref({
  name: "",
  description: "",
});

onMounted(async () => {
  try {
    // In a real application, you would fetch this data from your API
    // For now, we'll use mock data
    groups.value = [
      {
        id: 1,
        name: "Work Projects",
        description: "Tasks related to work projects",
      },
      {
        id: 2,
        name: "Personal Goals",
        description: "Personal development goals",
      },
      { id: 3, name: "Shopping List", description: "Items to buy" },
      { id: 4, name: "Home Tasks", description: "Tasks for home maintenance" },
      { id: 5, name: "Reading List", description: "Books to read" },
    ];
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
});

const createGroup = async () => {
  try {
    // In a real application, you would make an API call here
    // For now, we'll simulate a successful creation
    const newId =
      groups.value.length > 0
        ? Math.max(...groups.value.map((g) => g.id)) + 1
        : 1;
    const group = {
      id: newId,
      name: newGroup.value.name,
      description: newGroup.value.description || undefined,
    };

    groups.value.push(group);

    // Reset form
    newGroup.value = {
      name: "",
      description: "",
    };
    showCreateForm.value = false;
  } catch (error) {
    console.error("Error creating group:", error);
  }
};

const deleteGroup = async (id: number) => {
  if (confirm("Are you sure you want to delete this group?")) {
    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate a successful deletion
      groups.value = groups.value.filter((group) => group.id !== id);
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  }
};
</script>

<style scoped>
.groups {
  padding: 2rem;
}

.groups-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  color: #2c3e50;
}

.btn {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.btn:hover {
  background-color: #3aa876;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background-color: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}

.btn-secondary:hover {
  background-color: #e9ecef;
}

.btn-danger {
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #d62c1a;
}

.create-form {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.create-form h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.groups-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.group-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.group-card h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.group-card p {
  color: #666;
  margin-bottom: 1rem;
}

.group-actions {
  display: flex;
  gap: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-state p {
  margin-bottom: 1rem;
  color: #666;
}
</style>
