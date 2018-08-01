import Axios from "axios";

export default {
  state: {
    users: [],
    id: "",
    username: "",
    email: "",
    password: "",
    user: {},
    error: false,
    login_progress: false
  },
  getters: {
    getUser: state => state.user,
    isLoggedIn: state => (state.user.username ? true : false)
  },
  actions: {
    async login({ commit }, payload) {
      // eslint-disable-next-line
      console.log("dsadsadsadsadsadsaddsadsa");
      try {
        commit("login_progress", true);
        const response = await Axios.post(
          "https://reqres.in/api/login",
          payload
        );
        delete payload.password;
        payload.token = response;
        commit("login", payload);
        commit("updateUsername", "");
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
          "https://reqres.in/api/register",
          payload
        );
        payload.token = response;
        commit("adduser", payload);
        commit("updateUsername", "");
        commit("updatePassword", "");
        commit("login_progress", false);
      } catch (err) {
        commit("login_progress", false);
        commit("login_fail", err);
      }
    }
  },
  mutations: {
    simple :(state) => {
      state.count++
    },
    login: (state, data) => {
      state.user = data;
      for (var i = 0; i < state.users.length; i++) {
        if (
          state.users[i]["username"] === data.username &&
          state.users[i]["password"] === data.password
        ) {
          state.user = data;
        } else {
          // eslint-disable-next-line
          console.log("Email or password doesn't match");
        }
      }
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
    updateId: (state, val) => {
      state.id = val;
    },
    updateUsername: (state, data) => {
      state.username = data;
    },
    updateEmail: (state, data) => {
      state.email = data;
    },
    updatePassword: (state, data) => {
      state.password = data;
    },
    adduser: (state, data) => {
      state.users.push(data);
    },
    blankform: (state, val) => {
      state.id = val;
      state.username = val;
      state.email = val;
      state.password = val;
    }
  }
};
