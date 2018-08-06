import Vue from 'vue'
import App from './App.vue'
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Profile from "./pages/Profile.vue";
import Signup from "./pages/Signup.vue";
import List from "./pages/List.vue";
import AddPoll from "./pages/AddPoll.vue";
import ListPoll from "./pages/ListPoll.vue";
import Buefy from "buefy";
import VueRouter from "vue-router";
import Bulma from "bulma";
import VeeValidate from "vee-validate";
import store from "./store";

Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(Buefy);
Vue.use(Bulma);

Vue.config.productionTip = false

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/profile", component: Profile },
  { path: "/signup", component: Signup },
  { path: "/list", component :List},
  { path: "/addpoll", component : AddPoll},
  { path: "/pollList", component : ListPoll}
];
const router = new VueRouter({
  routes
});

new Vue({
  el: "#app",
  router: router,
  template: "<App/>",
  components: { App },
  render: h => h(App),
  store
}).$mount('#app')
