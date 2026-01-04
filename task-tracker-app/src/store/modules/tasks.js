import apiClient from "../../services/api";

const STORAGE_KEY = "task-tracker-local-changes";

// Helper to load local changes
const loadLocalChanges = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { added: [], updated: {}, deleted: [] };
};

// Helper to save local changes
const saveLocalChanges = (changes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(changes));
};

const state = {
  tasks: [],
  filters: {
    search: "",
    status: "All", // All, Pending, In Progress, Completed
  },
  loading: false,
  error: null,
};

const getters = {
  allTasks: (state) => state.tasks,
  filteredTasks: (state) => {
    return state.tasks.filter((task) => {
      const searchTerm = (state.filters.search || "").toLowerCase().trim();
      const matchTitle = (task.title || "").toLowerCase().includes(searchTerm);
      const matchDescription = (task.description || "")
        .toLowerCase()
        .includes(searchTerm);
      const matchStatus =
        state.filters.status === "All" || task.status === state.filters.status;
      return (matchTitle || matchDescription) && matchStatus;
    });
  },
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
};

const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  ADD_TASK(state, task) {
    state.tasks.unshift(task);
  },
  UPDATE_TASK(state, updatedTask) {
    const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask);
    }
  },
  DELETE_TASK(state, taskId) {
    state.tasks = state.tasks.filter((t) => t.id !== taskId);
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_FILTER_SEARCH(state, search) {
    state.filters.search = search;
  },
  SET_FILTER_STATUS(state, status) {
    state.filters.status = status;
  },
};

const actions = {
  async fetchTasks({ commit }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      // 1. Fetch Baseline from API
      const response = await apiClient.get("/todos?_limit=20");
      let tasks = response.data.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: "ullam nobis libero sapiente ad optio sint",
        status: todo.completed ? "Completed" : "Pending",
        createdDate: new Date().toISOString(),
      }));

      // 2. Load Local Changes
      const changes = loadLocalChanges();

      // 3. Merge Changes
      // A. Remove locally deleted tasks
      tasks = tasks.filter((t) => !changes.deleted.includes(t.id));

      // B. Apply local updates
      tasks = tasks.map((t) => {
        if (changes.updated[t.id]) {
          return { ...t, ...changes.updated[t.id] };
        }
        return t;
      });

      // C. Append locally added tasks
      // Ensure added tasks are also filtered by deleted list (edge case: added then deleted)
      const visibleAdded = changes.added.filter(
        (t) => !changes.deleted.includes(t.id)
      );
      tasks = [...visibleAdded, ...tasks];

      commit("SET_TASKS", tasks);
    } catch (error) {
      // Fallback: still try to show local data if API fails
      const changes = loadLocalChanges();
      commit("SET_TASKS", changes.added);
      commit(
        "SET_ERROR",
        "Failed to fetch API tasks. Showing local tasks only."
      );
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async addTask({ commit, state }, taskData) {
    commit("SET_LOADING", true);

    // 1. Generate ID
    const maxId =
      state.tasks.length > 0 ? Math.max(...state.tasks.map((t) => t.id)) : 0;
    const safeId = maxId + 1;

    const newTask = {
      ...taskData,
      id: safeId,
      createdDate: new Date().toISOString(),
    };

    // 2. Optimistic Update (UI + Persistence)
    // Save locally FIRST to prevent data loss
    commit("ADD_TASK", newTask);

    const changes = loadLocalChanges();
    changes.added.unshift(newTask);
    saveLocalChanges(changes);

    // 3. API Call
    try {
      await apiClient.post("/todos", {
        title: taskData.title,
        completed: taskData.status === "Completed",
        userId: 1,
      });

      // API Success
      commit(
        "SHOW_SNACKBAR",
        { text: "Task saved to API!", color: "success" },
        { root: true }
      );
    } catch (error) {
      // API Failure (Data already saved locally)
      commit(
        "SHOW_SNACKBAR",
        { text: "Network unavailable. Saved locally.", color: "warning" },
        { root: true }
      );
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async updateTask({ commit }, task) {
    commit("SET_LOADING", true);

    // 1. Optimistic Update
    commit("UPDATE_TASK", task);

    const changes = loadLocalChanges();
    const localIndex = changes.added.findIndex((t) => t.id === task.id);
    if (localIndex !== -1) {
      changes.added.splice(localIndex, 1, task);
    } else {
      changes.updated[task.id] = task;
    }
    saveLocalChanges(changes);

    // 2. API Call
    try {
      if (task.id <= 200) {
        await apiClient.put(`/todos/${task.id}`, {
          title: task.title,
          completed: task.status === "Completed",
        });
      }
      commit(
        "SHOW_SNACKBAR",
        { text: "Task updated on API!", color: "success" },
        { root: true }
      );
    } catch (error) {
      commit(
        "SHOW_SNACKBAR",
        { text: "Network unavailable. Updated locally.", color: "warning" },
        { root: true }
      );
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async deleteTask({ commit }, taskId) {
    commit("SET_LOADING", true);

    // 1. Optimistic Update
    commit("DELETE_TASK", taskId);

    const changes = loadLocalChanges();
    const localIndex = changes.added.findIndex((t) => t.id === taskId);
    if (localIndex !== -1) {
      changes.added.splice(localIndex, 1);
    } else {
      if (!changes.deleted.includes(taskId)) {
        changes.deleted.push(taskId);
      }
    }
    saveLocalChanges(changes);

    // 2. API Call
    try {
      if (taskId <= 200) {
        await apiClient.delete(`/todos/${taskId}`);
      }
      commit(
        "SHOW_SNACKBAR",
        { text: "Task deleted from API!", color: "success" },
        { root: true }
      );
    } catch (error) {
      commit(
        "SHOW_SNACKBAR",
        { text: "Network unavailable. Deleted locally.", color: "warning" },
        { root: true }
      );
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
