import Axios from "axios";
import { getField, updateField } from "vuex-map-fields";

export default {
  state: {
    arrays: [],
    option: {},
    option0: "",
    title: "",
    rows: [
      {
        option: ""
      }
    ],
    login_progress: false,
    success: false
  },
  getters: {
    getOptions: state => state.option,
    getRows: state => state.rows,
    getField,
    isSuccess: state => (state.success ? true : false)
  },
  actions: {
    async addpoll({ commit }, payload) {
      commit("success", false);
      commit("login_progress", true);
      const responseData = await Axios.post(
        "http://dev.hr.excellencetechnologies.in:8000/add_poll",
        payload,
        {
          headers: {
            api_token: payload.token
          }
        }
      ).then(response => (this.info = response));
      commit("addpoll", responseData);
      commit("blankform", "");
      commit("login_progress", false);
      commit("success", true);
    },
    rowAdd({ commit }, payload) {
      commit("rowAdd", payload);
    }
  },
  mutations: {
    updateField,
    login_fail: (state, data) => {
      state.error = data;
    },
    login_progress: (state, data) => {
      state.login_progress = data;
    },
    addpoll: (state, data) => {
      state.arrays.push(data);
    },
    blankform: (state, val) => {
      state.title = val;
      state.rows = val;
    },
    success: (state, val) => {
      state.success = val;
    },
    rowAdd: (state, val) => {
      if (!state.rows.length) {
        state.rows = [];
      }
      state.rows.push(val);
    }
  }
};
