import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import list from "./modules/list";
import addpoll from "./modules/addpoll";
import pollList from "./modules/pollList";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
const debug = process.env.Node_ENV !== "production";

export default new Vuex.Store({
  modules: {
    login,
    list,
    addpoll,
    pollList
  },
  strict: debug,
  plugins: [createPersistedState()]
});
