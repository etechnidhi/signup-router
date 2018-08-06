import Axios from "axios";
import { getField, updateField } from "vuex-map-fields";

export default {
  state: {
    users: [],
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    user: {},
    token: "",
    error: false,
    responseError: "",
    // responseError:"",
    login_progress: false
  },
  getters: {
    getField,
    getUser: state => state.user,
    responseError: state => state.responseError,
    isLoggedIn: state => (state.user.email ? true : false)
  },
  actions: {
    async login({ commit }, payload) {
      try {
        commit("login_progress", true);
        const response = await Axios.post(
          "http://192.168.1.7:8000/login",
          payload
        );
        delete payload.password;
        const responseData = response.data;

        if (responseData.error == 1) {
          commit("login_fail", responseData);
        } else {
          commit("login", responseData);
          commit("blankform", "");
        }
        commit("updateEmail", "");
        commit("updatePassword", "");
        commit("login_progress", false);
      } catch (err) {
        commit("login_progress", false);
        commit("login_fail", err);
      }
    },
    logout({ commit }) {
      commit("logout");
    },
    async addusers({ commit }, payload) {
      try {
        commit("login_progress", true);
        const response = await Axios.post(
          "http://192.168.1.7:8000/add_user",
          payload
        );
        payload.token = response;
        commit("adduser", payload);
        commit("updateEmail", "");
        commit("blankform", "");
        commit("login_progress", false);
      } catch (err) {
        commit("login_progress", false);
        commit("login_fail", err);
      }
    }
  },
  mutations: {
    updateField,
    login: (state, data) => {
      state.user = data;
      state.user.email = data.data.email;
      state.responseError = data;
      state.token = data.data.api_token;
    },
    login_fail: (state, data) => {
      state.error = data;
    },
    login_progress: (state, data) => {
      state.login_progress = data;
    },
    logout: state => {
      state.user = {};
    },
    adduser: (state, data) => {
      state.users.push(data);
      state.user = true;
    },
    blankform: (state, val) => {
      state.id = val;
      state.name = val;
      state.email = val;
      state.password = val;
      state.role = val;
    }
  }
};
