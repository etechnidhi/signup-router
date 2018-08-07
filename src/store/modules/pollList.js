import Axios from "axios";

export default {
  state: {
    pollList: [],
    id: "",
    title: "",
    options: "",
    response: {},
    responseError: "",
    progress: false,
    error: false,
    isModalActive: false
  },
  getters: {
    poll: state => state.pollList,
    progressbar: state => (state.progress ? true : false)
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
    },

    async delete({ dispatch, commit }, payload) {
      try {
        commit("progress", true);
        await Axios.delete(
          `http://192.168.1.7:8000/delete_poll/${payload.pollid}`,
          {
            headers: {
              api_token: payload.token
            }
          }
        ).then(response => {
          dispatch("showPollList", payload);
        });
        commit("progress", false);
      } catch (err) {
        commit("progress", false);
        commit("login_fail", err);
      }
    },

    async updateTitle({ dispatch, commit }, payload) {
      // eslint-disable-next-line
      console.log(payload.pollid, "88888888888888888888");
      // try {
      commit("progress", true);
      await Axios.put(
        `http://192.168.1.7:8000/update_poll_title/${payload.pollid}`,
        {
          title: payload.title
        },
        {
          headers: {
            api_token: payload.token
          }
        }
      ).then(response => {
        dispatch("showPollList", payload);
      });
      commit("progress", false);
    }
  },
  mutations: {
    list: (state, data) => {
      state.pollList = data.data.data;
    },
    login_fail: (state, data) => {
      state.error = data;
    },
    progress: (state, data) => {
      state.progress = data;
    }
  }
};
