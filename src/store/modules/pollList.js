import Axios from "axios";
import { getField, updateField } from "vuex-map-fields";

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
    isModalActive: false,
    isLoading: false,
    option1: ""
  },
  getters: {
    getField,
    poll: state => state.pollList,
    pollOption: state => state.rows,
    progressbar: state => (state.progress ? true : false),
    isLoadingPage: state => (state.isLoading ? true : false)
  },
  actions: {
    async showPollList({ commit }, payload) {
      commit("isLoading", true);
      const response = await Axios.get(
        "http://dev.hr.excellencetechnologies.in:8000/list_polls",
        {
          headers: {
            api_token: payload.token
          }
        }
      ).then(response => (this.info = response));
      commit("isLoading", false);
      response["data"]["data"].reverse();
      commit("list", response);
      this.state.response = true;
    },

    async delete({ dispatch, commit }, payload) {
      try {
        commit("progress", true);
        commit("isLoading", true);
        const response = await Axios.delete(
          `http://dev.hr.excellencetechnologies.in:8000/delete_poll/${
            payload.pollid
          }`,
          {
            headers: {
              api_token: payload.token
            }
          }
        ).then(
          dispatch("showPollList", payload)
        );
        commit("isLoading", false);
        commit("progress", false);
        this.response = response;
      } catch (err) {
        commit("progress", false);
        commit("login_fail", err);
      }
    },

    async updateTitle({ dispatch, commit }, payload) {
      commit("progress", true);
      commit("isLoading", true);
      const response = await Axios.put(
        `http://dev.hr.excellencetechnologies.in:8000/update_poll_title/${
          payload.pollid
        }`,
        {
          title: payload.title
        },
        {
          headers: {
            api_token: payload.token
          }
        }
      ).then(
        dispatch("showPollList", payload)
      );
      commit("isLoading", false);
      commit("progress", false);
      this.state.response = response;
    },

    async optionRowAdd({ commit }, payload) {
      commit("addRow", payload);
    },

    async submitAddOption({ dispatch, commit }, payload) {
      const response = await Axios.post(
        `http://dev.hr.excellencetechnologies.in:8000/add_poll_option/${
          payload.item.id
        }`,
        {
          title: payload.title,
          option: payload.option
        },
        {
          headers: {
            api_token: payload.token
          }
        }
      ).then(
        dispatch("showPollList", payload)
      );
      commit("isLoading", false);
      commit("addPollOption", payload);
      this.state.response = response;
    }
  },
  mutations: {
    updateField,
    list: (state, data) => {
      state.pollList = data.data.data;
    },
    login_fail: (state, data) => {
      state.error = data;
    },
    progress: (state, data) => {
      state.progress = data;
    },
    isLoading: (state, data) => {
      state.isLoading = data;
    },
    addRow: (state, data) => {
      if (!state.rows.length) {
        state.rows = [];
      }
      state.rows.push(data);
    },
    addPollOption: (state, data) => {
      state.option1 = data.option;
    }
  }
};
