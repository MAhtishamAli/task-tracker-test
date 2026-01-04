<template>
  <v-app>
    <AppHeader />

    <v-main>
      <v-container>
        <FilterPanel />
        <TaskTable @edit-task="handleEditTask" />

        <TaskForm
          :itemToEdit="editingTask"
          @close="editingTask = null"
          @reset-editing="editingTask = null"
        />
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.text }}
      <template #action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="$store.commit('CLOSE_SNACKBAR')"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
import FilterPanel from "./components/FilterPanel";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    AppHeader,
    FilterPanel,
    TaskTable,
    TaskForm,
  },

  data: () => ({
    editingTask: null,
  }),

  computed: {
    ...mapState(["snackbar"]),
  },

  methods: {
    handleEditTask(task) {
      this.editingTask = task;
    },
  },
};
</script>
