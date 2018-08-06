import Axios from "axios";

export default {
  state: {
    pollList: [],
    id: "",
    title: "",
    options: "",
    response: {}
  },
  getters: {
    poll: state => state.pollList
  },
  actions: {
    async showPollList({ commit }, payload) {
      const response = await Axios.get("http://192.168.1.7:8000/list_polls", {
        headers: {
          api_token: payload.token
        }
      }).then(response => (this.info = response));
      commit("list", response);
      this.state.response = true;
    }
  },
  mutations: {
    list: (state, data) => {
      state.pollList = data.data.data;
    }
  }
};
