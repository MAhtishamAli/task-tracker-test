<template>
  <v-card class="mb-4 pa-4" outlined>
    <v-row align="center">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search by Title or Description"
          outlined
          dense
          hide-details
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="status"
          :items="statusOptions"
          label="Filter by Status"
          outlined
          dense
          hide-details
        ></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "FilterPanel",
  data: () => ({
    statusOptions: ["All", "Pending", "In Progress", "Completed"],
  }),
  computed: {
    search: {
      get() {
        return this.$store.state.tasks.filters.search;
      },
      set(val) {
        this.$store.commit("tasks/SET_FILTER_SEARCH", val || "");
      },
    },
    status: {
      get() {
        return this.$store.state.tasks.filters.status;
      },
      set(val) {
        this.$store.commit("tasks/SET_FILTER_STATUS", val);
      },
    },
  },
};
</script>
