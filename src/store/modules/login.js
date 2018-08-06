import Axios from "axios";

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
    getUser: state => state.user,
    responseError: state => state.responseError,
    isLoggedIn: state => (state.user.email ? true : false)
  },
  actions: {
    async login({ commit }, payload) {
      try {
        commit("login_progress", true);
        const response = await Axios.post(
          "http://192.168.1.116:8000/login",
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
          "http://192.168.1.116:8000/add_user",
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
    login: (state, data) => {
      state.user = data;
      state.user.email = data.data.email;
      state.responseError = data;
      state.token = data.data.api_token;
      // eslint-disable-next-line
      // console.log(state.token,"000000000000000");
    },
    login_fail: (state, data) => {
      // eslint-disable-next-line
      console.log(data, "dsadsada");
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
    updatename: (state, data) => {
      state.name = data;
    },
    updateEmail: (state, data) => {
      state.email = data;
    },
    updatePassword: (state, data) => {
      state.password = data;
    },
    updateRole: (state, data) => {
      state.role = data;
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
