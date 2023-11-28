import { createApp } from "vue";
import { createStore } from "vuex";
import { router } from "./routers";
import ElementPlus from "element-plus";
import { createVfm } from "vue-final-modal";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "./assets/index.css";
import vueBraintree from "vue-braintree";
import FacebookChat from "./components/FacebookChat.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { VueperSlides, VueperSlide } from "vueperslides";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faPhone,
  faStar,
  faLocation,
  faLocationDot,
  faCarRear,
  faFilter,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

//import module store

import carStore from "./components/store/cars/store";
import authStore from "./components/store/auths/store";

const store = createStore({
  modules: {
    carStore: carStore,
    authStore: authStore,
  },
});

const vfm = createVfm();
/* add icons to the library */
library.add(
  faUserSecret,
  faPhone,
  faStar,
  faLocation,
  faLocationDot,
  faCarRear,
  faFilter,
  faCalendar
);

const app = createApp(App);
app.provide("base_url", "http://localhost:3000");
app.use(store);
app.use(vueBraintree);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("VueDatePicker", VueDatePicker);
app.component("FacebookChat", FacebookChat);
app.use(ElementPlus);
app.use(vfm);
app.use(router);
app.mount("#app");
