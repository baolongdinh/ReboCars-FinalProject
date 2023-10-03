import { createApp } from "vue";
import { createStore } from "vuex";
import { router } from "./routers";
import ElementPlus from "element-plus";
import { createVfm } from "vue-final-modal";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "./assets/index.css";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

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
import productStore from "./components/products/store";

import carStore from "./components/store/cars/store";

const store = createStore({
  modules: {
    productStore: productStore,
    carStore: carStore,
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
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("VueDatePicker", VueDatePicker);
app.use(ElementPlus);
app.use(vfm);
app.use(router);
app.mount("#app");
