import Vue from "vue";
import DashboardPlugin from "./plugins/dashboard-plugin";
import App from "./App.vue";
import Paginate from "vuejs-paginate";
import Notifications from "vue-notification";
import VuejsDialog from "vuejs-dialog";
import VuejsDialogMixin from "vuejs-dialog/dist/vuejs-dialog-mixin.min.js"; // only needed in custom components

// include the default style
import "vuejs-dialog/dist/vuejs-dialog.min.css";
// router setup
import router from "./routes/router";
// plugin setup
Vue.use(VuejsDialog);
Vue.use(DashboardPlugin);
Vue.use(Notifications);
Vue.component("paginate", Paginate);
Vue.prototype.$baseUrl = "http://localhost:3000";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router
});
