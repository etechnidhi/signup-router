import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
const debug = process.env.Node_ENV !== "production";

export default new Vuex.Store({
  modules: {
    login
  },
  strict: debug,
  plugins: [createPersistedState()]
});
