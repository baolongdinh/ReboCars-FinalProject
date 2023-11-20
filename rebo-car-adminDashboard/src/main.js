import Vue from "vue";
import DashboardPlugin from "./plugins/dashboard-plugin";
import App from "./App.vue";
import Paginate from "vuejs-paginate";

// router setup
import router from "./routes/router";
// plugin setup
Vue.use(DashboardPlugin);
Vue.component("paginate", Paginate);
Vue.prototype.$baseUrl = "http://localhost:3000";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router
});
