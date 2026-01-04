<template>
  <v-card outlined>
    <v-data-table
      :headers="headers"
      :items="tasks"
      :loading="loading"
      loading-text="Loading tasks from API..."
      sort-by="id"
      sort-desc
      :items-per-page="10"
      class="elevation-0"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.id="{ index }">
        {{ index + 1 }}
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" dark small>
          {{ item.status }}
        </v-chip>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.actions="{ item }">
        <v-icon small class="mr-2" @click="$emit('edit-task', item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="error" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TaskTable",
  data: () => ({
    headers: [
      { text: "#", value: "id", align: "start" },
      { text: "Title", value: "title" },
      { text: "Description", value: "description", sortable: false },
      { text: "Status", value: "status" },
      { text: "Created Date", value: "createdDate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapGetters("tasks", {
      tasks: "filteredTasks",
      loading: "isLoading",
    }),
  },
  mounted() {
    this.$store.dispatch("tasks/fetchTasks");
  },
  methods: {
    getStatusColor(status) {
      if (status === "Completed") return "green";
      else if (status === "In Progress") return "orange";
      return "red"; // Pending
    },
    async deleteItem(item) {
      if (confirm("Are you sure you want to delete this task?")) {
        await this.$store.dispatch("tasks/deleteTask", item.id);
      }
    },
  },
};
</script>
