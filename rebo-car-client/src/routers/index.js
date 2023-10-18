import { createRouter, createWebHistory } from "vue-router";
import ListCarsFinding from "../components/store/cars/ListCarsFinding.vue";
import CarDetail from "../components/store/cars/CarDetail.vue";
import Home from "../components/store/Home.vue";
import userDashboard from "../components/store/userDashboard/Dashboard.vue";
import Account from "../components/store/userDashboard/Account.vue";
import CarWishList from "../components/store/userDashboard/CarWishList.vue";
import MyReward from "../components/store/userDashboard/MyReward.vue";
import MyTrip from "../components/store/userDashboard/MyTrip.vue";
import ResetPwd from "../components/store/userDashboard/ResetPwd.vue";
import MyOrders from "../components/store/userDashboard/MyOrders.vue";
import UserCarsDashboard from "../components/store/userDashboard/userCarsDashboard/UserCarsDashboard.vue";
import MyListCars from "../components/store/userDashboard/userCarsDashboard/MyListCars.vue";
import TripOrders from "../components/store/userDashboard/userCarsDashboard/TripOrders.vue";
import TripsHistory from "../components/store/userDashboard/userCarsDashboard/TripsHistory.vue";
import Contracts from "../components/store/userDashboard/userCarsDashboard/Contract.vue";
import CarRegistration from "../components/store/cars/CarRegistration.Vue";
import CarStepRegister from "../components/store/cars/CarStepRegister.Vue";

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
    },
    {
      path: "/find/filter/cars",
      component: ListCarsFinding,
      name: "cars",
    },
    {
      path: "/carregister",
      component: CarRegistration,
      name: "CarRegistration",
    },
    {
      path: "/registerstep",
      component: CarStepRegister,
      name: "CarStepRegister",
    },
    {
      path: "/car/:id",
      component: CarDetail,
      name: "car",
    },

    {
      path: "/userdashboard",
      component: userDashboard,
      name: "userDashboard",
      children: [
        {
          path: "account",
          component: Account,
          name: "account",
        },
        {
          path: "myfavs",
          component: CarWishList,
          name: "CarWishList",
        },
        {
          path: "myrewards",
          component: MyReward,
          name: "MyReward",
        },
        {
          path: "mytrips",
          component: MyTrip,
          name: "MyTrip",
        },
        {
          path: "resetpwd",
          component: ResetPwd,
          name: "ResetPwd",
        },
        {
          path: "myorders",
          component: MyOrders,
          name: "MyOrders",
        },
      ],
    },
    {
      path: "/usercarsdashboard",
      component: UserCarsDashboard,
      name: "UserCarsDashboard",
      children: [
        {
          path: "mylistcars",
          component: MyListCars,
          name: "MyListCars",
        },
        {
          path: "triporders",
          component: TripOrders,
          name: "TripOrders",
        },
        {
          path: "tripshistory",
          component: TripsHistory,
          name: "TripsHistory",
        },
        {
          path: "contracts",
          component: Contracts,
          name: "Contracts",
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
