<template>
  <div class="container">
    <div class="mb-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>{{ group.name }}</h1>
        <div class="d-flex gap-2">
          <button
            v-if="!newGroup"
            class="btn btn-secondary"
            @click="showEditForm = true"
          >
            Edit
          </button>
          <button v-if="!newGroup" class="btn btn-danger" @click="deleteGroup">
            Delete
          </button>
          <button v-if="newGroup" class="btn btn-primary" @click="createGroup">
            Create
          </button>
        </div>
      </div>

      <p class="text-muted mb-4">{{ group.description }}</p>

      <!-- Edit Group Form -->
      <div v-if="showEditForm" class="card p-4 mb-4">
        <h2 class="mb-3">{{ newGroup ? "New Group" : "Edit Group" }}</h2>
        <form @submit.prevent="newGroup ? createGroup() : updateGroup()">
          <div class="mb-3">
            <label for="name" class="form-label">Group Name</label>
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="editedGroup.name"
              required
              placeholder="Enter group name"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label"
              >Description (Optional)</label
            >
            <textarea
              id="description"
              class="form-control"
              v-model="editedGroup.description"
              placeholder="Enter group description"
              rows="3"
            ></textarea>
          </div>
          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showEditForm = false"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              {{ newGroup ? "Create" : "Save Changes" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiRequest } from "../utils/api";
import { User } from "../types";

const route = useRoute();
const router = useRouter();
const groupId = route.params.id;
const newGroup = computed(() => route.name === "new-group");

const showEditForm = ref(false);
const editedGroup = ref({
  name: "",
  description: "",
});

const group = ref<{ id: number; name: string; description?: string }>({
  id: 0,
  name: "",
  description: "",
});

const members = ref<User[]>([]);

onMounted(async () => {
  try {
    // check if we're on the new-group route
    if (route.name === "new-group") {
      newGroup.value = true;
      // Initialize empty group for creation
      group.value = {
        id: 0,
        name: "",
        description: "",
      };
      editedGroup.value = {
        name: "",
        description: "",
      };
      showEditForm.value = true;
    } else {
      // Fetch existing group
      await fetchGroup();
    }
  } catch (error) {
    console.error("Error fetching group details:", error);
  }
});

const fetchGroup = async () => {
  try {
    const response = await apiRequest(`/groups/${groupId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);
    group.value = data;
    editedGroup.value = {
      name: group.value.name,
      description: group.value.description || "",
    };
    console.log("data", data);
  } catch (error) {
    console.error("Error fetching group:", error);
  }
};

const updateGroup = async () => {
  try {
    if (groupId === "new") {
      // Create new group
      const response = await apiRequest("/groups", {
        method: "POST",
        body: JSON.stringify({
          name: editedGroup.value.name,
          description: editedGroup.value.description || null,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      group.value = data;
      router.push(`/groups/${group.value.id}`);
    } else {
      // Update existing group
      const response = await apiRequest(`/groups/${groupId}`, {
        method: "PUT",
        body: JSON.stringify({
          name: editedGroup.value.name,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update local state
      group.value = {
        ...group.value,
        name: editedGroup.value.name,
        description: editedGroup.value.description || undefined,
      };
    }

    showEditForm.value = false;
  } catch (error) {
    console.error("Error updating group:", error);
  }
};

const deleteGroup = async () => {
  if (
    confirm(
      "Are you sure you want to delete this group? This will also delete all tasks in this group."
    )
  ) {
    try {
      const response = await apiRequest(`/groups/${groupId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      router.push("/groups");
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  }
};

const createGroup = async () => {
  try {
    const response = await apiRequest("/groups", {
      method: "POST",
      body: JSON.stringify({
        name: editedGroup.value.name,
        description: editedGroup.value.description || null,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    group.value = data;
    router.push(`/groups/${group.value.id}`);
  } catch (error) {
    console.error("Error creating group:", error);
  }
};
</script>
