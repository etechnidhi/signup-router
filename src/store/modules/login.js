export default {
  state: {
    users: [],
    id: "",
    username: "",
    email: "",
    password: "",
    user: {}
  },
  getters: {
    getUser: state => state.user,
    isLoggedIn: state => (state.user.username ? true : false)
  },
  actions: {
    login({ commit }, payload) {
      commit("login", payload);
      commit("updateEmail", "");
      commit("updatePassword", "");
    },
    logout({ commit }) {
      commit("logout");
    }
  },
  mutations: {
    login: (state, data) => {
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
