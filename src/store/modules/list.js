import Axios from "axios";

export default {
  state: {
    userslist: [],
    id: "",
    name: "",
    email: "",
    role: "",
    userlistObject: {},
    success: false
  },
  getters: {
    getList: state => state.userslist,
    successPage: state => (state.success ? true : false)
  },
  actions: {
    async showlist({ commit }, payload) {
      commit("sucessData", true);
      const responseData = await Axios.get(
        "http://dev.hr.excellencetechnologies.in:8000/list_users",
        // "http://192.168.1.116:8000/list_users",
        {
          headers: {
            api_token: payload.token
          }
        }
      ).then(response => (this.info = response));
      commit("sucessData", false);
      commit("list", responseData);
      // this.state.userslist = responseData.data.data;
      this.state.userlistObject = true;
    }
  },
  mutations: {
    list: (state, data) => {
      state.userslist = data.data.data;
    },
    sucessData: (state, data) => {
      state.success = data;
    }
  }
};
