import { defineStore } from "pinia";
import { ref } from "vue";
import { Group } from "../types";

interface Task {
  id: number;
  groupId: number;
  title: string;
  description?: string;
  completed: boolean;
}

export const useGroupsStore = defineStore("groups", () => {
  const groups = ref<Group[]>([]);
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch all groups
  async function fetchGroups() {
    loading.value = true;
    error.value = null;

    try {
      // In a real application, you would make an API call here
      // For now, we'll just use mock data
      groups.value = [
        { id: 1, name: "Work", description: null },
        { id: 2, name: "Personal", description: null },
        { id: 3, name: "Shopping", description: null },
      ];
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch groups";
    } finally {
      loading.value = false;
    }
  }

  // Fetch a single group by ID
  async function fetchGroupById(id: number) {
    loading.value = true;
    error.value = null;

    try {
      // In a real application, you would make an API call here
      // For now, we'll just find the group in our local state
      const group = groups.value.find((g) => g.id === id);

      if (!group) {
        error.value = "Group not found";
        return null;
      }

      return group;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch group";
      return null;
    } finally {
      loading.value = false;
    }
  }

  // Create a new group
  async function createGroup(name: string, description?: string) {
    loading.value = true;
    error.value = null;

    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate a successful creation
      const newGroup: Group = {
        id: groups.value.length + 1,
        name,
        description: description || null,
      };

      groups.value.push(newGroup);

      return { success: true, data: newGroup };
    } catch (err) {
      error.value = "Failed to create group";
      console.error("Error creating group:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Update a group
  async function updateGroup(id: number, name: string, description?: string) {
    loading.value = true;
    error.value = null;

    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate a successful update
      const groupIndex = groups.value.findIndex((g) => g.id === id);

      if (groupIndex === -1) {
        error.value = "Group not found";
        return { success: false, error: error.value };
      }

      groups.value[groupIndex] = {
        ...groups.value[groupIndex],
        name,
        description: description || null,
      };

      return { success: true, data: groups.value[groupIndex] };
    } catch (err) {
      error.value = "Failed to update group";
      console.error("Error updating group:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Delete a group
  async function deleteGroup(id: number) {
    loading.value = true;
    error.value = null;

    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate a successful deletion
      const groupIndex = groups.value.findIndex((g) => g.id === id);

      if (groupIndex === -1) {
        error.value = "Group not found";
        return { success: false, error: error.value };
      }

      groups.value = groups.value.filter((g) => g.id !== id);

      // Also delete tasks associated with this group
      tasks.value = tasks.value.filter((t) => t.groupId !== id);

      return { success: true };
    } catch (err) {
      error.value = "Failed to delete group";
      console.error("Error deleting group:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Fetch tasks for a group
  async function fetchTasksByGroupId(groupId: number) {
    loading.value = true;
    error.value = null;

    try {
      // In a real application, you would make an API call here
      // For now, we'll use mock data
      const groupTasks = tasks.value.filter((t) => t.groupId === groupId);

      if (groupTasks.length === 0) {
        // If no tasks exist yet, create some mock tasks
        const mockTasks = [
          {
            id: 1,
            groupId,
            title: "Complete project proposal",
            description: "Write and submit the project proposal",
            completed: false,
          },
          {
            id: 2,
            groupId,
            title: "Schedule team meeting",
            description: "Set up a meeting with the team",
            completed: true,
          },
          {
            id: 3,
            groupId,
            title: "Review code changes",
            description: "Review and approve code changes",
            completed: false,
          },
        ];

        tasks.value = [...tasks.value, ...mockTasks];
        return { success: true, data: mockTasks };
      }

      return { success: true, data: groupTasks };
    } catch (err) {
      error.value = "Failed to fetch tasks";
      console.error("Error fetching tasks:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Create a new task
  async function createTask(
    groupId: number,
    title: string,
    description?: string
  ) {
    loading.value = true;
    error.value = null;

    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate a successful creation
      const newId =
        tasks.value.length > 0
          ? Math.max(...tasks.value.map((t) => t.id)) + 1
          : 1;
      const newTask = {
        id: newId,
        groupId,
        title,
        description,
        completed: false,
      };

      tasks.value.push(newTask);

      return { success: true, data: newTask };
    } catch (err) {
      error.value = "Failed to create task";
      console.error("Error creating task:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Toggle task completion status
  async function toggleTaskStatus(taskId: number) {
    loading.value = true;
    error.value = null;

    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate a successful update
      const taskIndex = tasks.value.findIndex((t) => t.id === taskId);

      if (taskIndex === -1) {
        error.value = "Task not found";
        return { success: false, error: error.value };
      }

      tasks.value[taskIndex] = {
        ...tasks.value[taskIndex],
        completed: !tasks.value[taskIndex].completed,
      };

      return { success: true, data: tasks.value[taskIndex] };
    } catch (err) {
      error.value = "Failed to update task";
      console.error("Error updating task:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Delete a task
  async function deleteTask(taskId: number) {
    loading.value = true;
    error.value = null;

    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate a successful deletion
      const taskIndex = tasks.value.findIndex((t) => t.id === taskId);

      if (taskIndex === -1) {
        error.value = "Task not found";
        return { success: false, error: error.value };
      }

      tasks.value = tasks.value.filter((t) => t.id !== taskId);

      return { success: true };
    } catch (err) {
      error.value = "Failed to delete task";
      console.error("Error deleting task:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  return {
    groups,
    tasks,
    loading,
    error,
    fetchGroups,
    fetchGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    fetchTasksByGroupId,
    createTask,
    toggleTaskStatus,
    deleteTask,
  };
});
