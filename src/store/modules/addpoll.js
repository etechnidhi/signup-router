import Axios from "axios";
import { getField, updateField } from 'vuex-map-fields';

export default {
  state: {
    arrays:[],
    array:{},
    option:{},
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    option0:'',
    title:"",
    login_progress: false,
    success:false,
  },
  getters:{
    getOptions: state => state.option,
    getField,
    isSuccess: state => (state.success ? true : false)
  },
  actions: {
    async addpoll({ commit }, payload) {   
      commit("success",false);
      
        commit("login_progress", true);
        const responseData = await Axios.post(
            "http://192.168.1.7:8000/add_poll",payload,
            {
              headers: {
                api_token: payload.token
              }
            }
        ).then(response => (this.info = response));
        commit("addpoll",responseData);
        commit("blankform","");
        commit("login_progress", false);
        commit("success",true);
        
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
      state.arrays.push(data) ;
    },
    blankform: (state, val) => {
      state.title = val;
      state.option1 = val;
      state.option2 = val;
      state.option3 = val;
      state.option4 = val;
    },
    success: (state,val) => {
      state.success = val;
    }
  }
};
