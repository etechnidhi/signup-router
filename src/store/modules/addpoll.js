import Axios from "axios";

export default {
  state: {
    polls: [],
    request: {},
    options:[],
    option:{},
    title: "",
    one: "",
    // two: "",
    // three: "",
    // four: "",
    // optionValue: [],
    login_progress: false
  },
  getters:{
    getOptions: state => state.options
  },
  actions: {
    async addpoll({ commit }, payload) {
    //   console.log(payload.token,"000000000000000000000");
    //   try {
        commit("login_progress", true);
        const responseData = await Axios.post(
            "http://192.168.1.116:8000/add_poll",payload,
            {
              headers: {
                api_token: payload.token
              }
            }
        ).then(response => (this.info = response));
        // eslint-disable-next-line
        console.log(responseData,"55555555555555");
        // eslint-disable-next-line
        // console.log(this.state.options,"000000000000");
        
        // commit("addpoll", payload);
        // commit("blankform", "");
        // commit("login_progress", false);
    //   } catch (err) {
        // commit("login_progress", false);
        // commit("login_fail", err);
    //   }
    }
  },
  mutations: {
    login_fail: (state, data) => {
      state.error = data;
    },
    login_progress: (state, data) => {
      state.login_progress = data;
    },
    updateTitle: (state, val) => {
      state.title = val;
    },
    updatOption1: (state,val) =>{
        // eslint-disable-next-line
        console.log(val,"dasdsadasdasda")
        state.options.push(val)
        // eslint-disable-next-line
        console.log(state.options,"99999999999999999999999");
    },
    updatOption2: (state,val) =>{
        state.options.push(val)
    },
    updatOption3: (state,val) =>{
        state.options.push(val)
    },
    updatOption4: (state,val) =>{
        state.options.push(val)
    },

    addpoll: (state, data) => {
        // eslint-disable-next-line
      console.log(data)
    },
    blankform: (state, val) => {
      state.title = val;
      state.one = val;
      state.two = val;
      state.three = val;
      state.four = val;
    }
  }
};
