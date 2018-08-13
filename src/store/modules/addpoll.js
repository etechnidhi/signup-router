import Axios from "axios";
import { getField, updateField } from "vuex-map-fields";

export default {
  namespaced: true,
  state: {
    arrays: [],
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
      commit("blankform", []);
      commit("updateTitle", "");
      commit("login_progress", false);
      commit("success", true);
    },
    rowAdd({ commit }, payload) {
      commit("rowAdd", payload);
    },
    removeRow({ commit },payload){
      commit("removeRowFunction",payload)
    },
    updateTitle({commit},payload){
      commit ("updateTitle",payload);
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
      state.rows = val;
    },
    updateTitle: (state, val) => {
      state.title = val;
    },
    success: (state, val) => {
      state.success = val;
    },
    rowAdd: (state, val) => {
      if (!state.rows.length) {
        state.rows = [];
      }
      state.rows.push(val);
    },
    removeRowFunction: (state,val)=>{
      state.rows.splice(val,1);
    }
  }
};
