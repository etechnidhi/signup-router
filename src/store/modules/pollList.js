import Axios from "axios";
import { getField, updateField } from "vuex-map-fields";

export default {
  state: {
    pollList: [],
    id: "",
    title: "",
    options: "",
    response: "",
    progress: false,
    responseError: false,
    error: false,
    isModalActive: false,
    isLoading: false,
    isLoadingtitle: false,
    option1: "",
    vote: "",
    rows: [],
    pollArray: [],
    buttonActive: true,
    addedOption: [],
    invalid:""
  },
  getters: {
    getField,
    poll: state => state.pollList,
    pollOption: state => state.rows,
    progressbar: state => (state.progress ? true : false),
    isLoadingPage: state => (state.isLoading ? true : false),
    isResponseError: state => (state.responseError ? true : false),
    isButtonActive: state => (state.buttonActive ? true : false),
    getResponse: state => state.response,
    isInvalid: state=> state.invalid,
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
      if(response.data.error == 0){
        commit("isLoading", false);
        response["data"]["data"].reverse();
        commit("list", response);
      }else{
        commit("notLogin",response.data)
      }
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
        ).then(dispatch("showPollList", payload));
        commit("responseData", response);
        commit("isLoading", false);
        commit("progress", false);
        this.response = response;
      } catch (err) {
        commit("progress", false);
        commit("login_fail", err);
      }
    },

    async updateTitle({ commit }, payload) {
      commit("isLoadingtitle", true);
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
      commit("isLoadingtitle", false);
      this.state.response = response;
    },

    async optionRowAdd({ commit }, payload) {
      commit("addRow", payload);
    },

    async submitAddOption({ commit }, payload) {
      // commit("isLoading", true);
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
        // ).then(dispatch("showPollList", payload));
      ).then(response => (this.info = response));

      commit("addOptiontoArray", response.data.data);
      // commit("isLoading", false);
      commit("clearRow", []);
      // commit("addPollOption", payload);
      this.state.response = response;
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
      commit("responseData", response);
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
    clearRow: (state, data) => {
      state.rows = data;
    },
    responseData: (state, data) => {
      state.response = data.data.data;
      state.responseError = true;
    },
    pollArrayId: (state, data) => {
      state.pollArray.push(data);
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
    isLoadingtitle: (state, val) => {
      state.isLoadingtitle = val;
    },
    addOptiontoArray: (state, val) => {
      for (let i = 0; i < state.pollList.length; i++) {
        for (let j = 0; j < val.length; j++) {
          if (state.pollList[i].id == val[j].poll_id) {
            state.pollList[i].options.push(val[j]);
          }
        }
      }
    },
    notLogin: (state,data)=>{
      state.invalid = data.message;
    }
  }
};
