<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        fab
        fixed
        bottom
        right
        v-bind="attrs"
        v-on="on"
        @click="resetForm"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.title"
                  label="Title"
                  :rules="titleRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.description"
                  label="Description"
                  rows="3"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.status"
                  :items="statusOptions"
                  label="Status"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save"
          :disabled="!valid || loading"
          :loading="loading"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TaskForm",
  props: {
    value: Boolean,
    itemToEdit: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    dialog: false,
    valid: true,
    editedItem: {
      title: "",
      description: "",
      status: "Pending",
    },
    defaultItem: {
      title: "",
      description: "",
      status: "Pending",
    },
    statusOptions: ["Pending", "In Progress", "Completed"],
    titleRules: [(v) => !!v || "Title is required"],
  }),

  computed: {
    formTitle() {
      return this.itemToEdit ? "Edit Task" : "New Task";
    },
    loading() {
      return this.$store.getters["tasks/isLoading"];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    itemToEdit(val) {
      if (val) {
        this.editedItem = JSON.parse(JSON.stringify(val));
        this.dialog = true;
      }
    },
  },

  methods: {
    resetForm() {
      this.$emit("reset-editing");
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.$emit("close");
      });
    },

    async save() {
      if (!this.$refs.form.validate()) return;

      if (this.itemToEdit) {
        // Update
        await this.$store.dispatch("tasks/updateTask", this.editedItem);
      } else {
        // Create
        await this.$store.dispatch("tasks/addTask", this.editedItem);
      }
      this.close();
    },
  },
};
</script>
