<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-icon large class="mr-2">mdi-checkbox-marked-circle-outline</v-icon>
      <span class="text-h5 font-weight-bold">Task Tracker</span>
    </div>
    <v-spacer></v-spacer>
    <!-- Future header items can go here -->
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>
