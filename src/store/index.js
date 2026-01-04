import Vue from "vue";
import Vuex from "vuex";
import tasks from "./modules/tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      text: "",
      color: "success",
    },
  },
  mutations: {
    SHOW_SNACKBAR(state, { text, color = "success" }) {
      state.snackbar.text = text;
      state.snackbar.color = color;
      state.snackbar.show = true;
    },
    CLOSE_SNACKBAR(state) {
      state.snackbar.show = false;
    },
  },
  modules: {
    tasks,
  },
});
