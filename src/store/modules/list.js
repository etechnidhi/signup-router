import Axios from "axios";

export default {
  state: {
    userslist: [],
    id: "",
    name: "",
    email: "",
    role: "",
    userlist: {}
  },
  getters: {
    getList: state => state.userslist
  },
  actions: {
    async showlist({ commit }, payload) {
      const responseData = await Axios.get(
        "http://192.168.1.7:8000/list_users",
        {
          headers: {
            api_token: payload.token
          }
        }
      ).then(response => (this.info = response));
      commit("list",responseData);
      // this.state.userslist = responseData.data.data;
      this.state.userlist = true;
    }
  },
  mutations:{
    list: (state,data)=>{
      state.userslist = data.data.data;
    }
  }
};
