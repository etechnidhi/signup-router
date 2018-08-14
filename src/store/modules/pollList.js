import Axios from "axios";
import { getField, updateField } from "vuex-map-fields";

export default {
  namespaced: true,
  state: {
    pollList: [], //array of poll List
    response: "", //contain the response of api
    responseError: false, //contain the error module and other to be true or false
    isLoading: false, //set the loadder true or false
    optionRows: [], //array of rows of options to be added
    pollVotedArray: [], //contain the array of poll that is voted
    buttonActive: true //making button able or disable
  },
  getters: {
    getField,
    poll: state => state.pollList,
    pollOption: state => state.optionRows,
    isLoadingPage: state => (state.isLoading ? true : false),
    isResponseError: state => (state.responseError ? true : false),
    isButtonActive: state => (state.buttonActive ? true : false),
    getResponse: state => state.response,
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
      if (response.data.error == 0) {
        commit("isLoading", false);
        response["data"]["data"].reverse();
        commit("list", response);
      } else {
        commit("notLogin", response.data);
      }
    },

    async delete({ dispatch, commit }, payload) {
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
      ).then(dispatch("showPollList", payload));
      commit("responseData", response.data.data);
      commit("isLoading", false);
    },

    async updateTitle({ commit }, payload) {
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
      ).then(response => (this.info = response));
      commit("updateTitleFunction", response);
      commit("isLoading", false);
    },

    async optionRowAdd({ commit }, payload) {
      commit("addRow", payload);
    },

    async submitAddOption({ commit }, payload) {
      const response = await Axios.post(
        `http://dev.hr.excellencetechnologies.in:8000/add_poll_option/
        ${payload.item.id}`,
        {
          title: payload.title,
          options: payload.options
        },
        {
          headers: {
            api_token: payload.token
          }
        }
      ).then(response => (this.info = response));
      if (response.data.error == 1) {
        commit("responseData", response.data.message);
      } else {
        commit("addOptiontoArray", response.data.data);
        commit("clearRow", []);
      }
    },

    async deletePollOptionLink({ dispatch, commit }, payload) {
      commit("isLoading", true);
      const response = await Axios.delete(
        `http://dev.hr.excellencetechnologies.in:8000/delete_poll_option/${
          payload.id
        }/${payload.opt_id}`,
        {
          headers: {
            api_token: payload.token
          }
        }
      ).then(dispatch("showPollList", payload));
      commit("responseData", response.data.data);
      commit("buttonActive", true);
      commit("isLoading", false);
    },

    async submitVote({ dispatch, commit }, payload) {
      commit("isLoading", true);
      await Axios.put(
        `http://dev.hr.excellencetechnologies.in:8000/vote/${payload.poll_id}/${
          payload.opt_id
        }`,
        {
          headers: {
            api_token: payload.token
          }
        }
      ).then(dispatch("showPollList", payload));
      commit("isButtonActiveFunction", false);
      commit("isLoading", false);
      commit("pollArrayId", payload.poll_id);
    },

    closeOptionState({ commit }, payload) {
      commit("closeOption", payload);
    },
    disableButton({ commit }, payload) {
      commit("isButtonActiveFunction", payload);
    },
    removeRow({ commit }, payload) {
      commit("removeRow", payload);
    }
  },
  mutations: {
    updateField,
    list: (state, data) => {
      state.pollList = data.data.data;
    },
    isLoading: (state, data) => {
      state.isLoading = data;
    },
    addRow: (state, data) => {
      if (!state.optionRows.length) {
        state.optionRows = [];
      }
      state.optionRows.push(data);
    },
    removeRow: (state, data) => {
      state.optionRows.splice(data.index, 1);
    },
    clearRow: (state, data) => {
      state.optionRows = data;
    },
    responseData: (state, data) => {
      state.response = data;
      state.responseError = true;
    },
    pollArrayId: (state, data) => {
      state.pollVotedArray.push(data);
    },
    isButtonActiveFunction: (state, payload) => {
      state.buttonActive = payload;
    },
    closeOption: (state, data) => {
      state.responseError = data;
    },
    updateTitleFunction: (state, val) => {
      for (let i = 0; i < state.pollList.length; i++) {
        if (state.pollList[i].id == val.data.data.id) {
          state.pollList[i].title = val.data.data.title;
        }
      }
    },
    addOptiontoArray: (state, val) => {
      for (let i = 0; i < state.pollList.length; i++) {
        for (let j = 0; j < val.length; j++) {
          if (state.pollList[i].id == val[j].poll_id) {
            state.pollList[i].options.push(val[j]);
          }
        }
      }
    }
  }
};
