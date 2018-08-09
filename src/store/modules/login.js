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
    login_progress: false
  },
  getters: {
    getField,
    getUser: state => state.user,
    responseError: state => (state.error ? true : false),
    isLoggedIn: state => (state.user.email ? true : false)
  },
  actions: {
    async login({ commit }, payload) {
      try {
        commit("login_progress", true);
        const response = await Axios.post(
          "http://dev.hr.excellencetechnologies.in:8000/login",
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
          "http://dev.hr.excellencetechnologies.in:8000/add_user",
          payload
        );
        payload.token = response;

        const responseData = response.data;
        // console.log(responseData,"9999999999999999999999999");
        if (responseData.error == 1) {
          commit("login_fail", responseData);
        } else {
          commit("adduser", payload);
        }
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
      state.error = true;
      state.responseError = data.message;
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
