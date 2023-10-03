import { createRouter, createWebHistory } from "vue-router";
import SearchBar from "../components/SearchBar.vue";
import Product from "../components/products/Product.vue";
import Navigation from "../components/store/Navigation.vue";
import ProductDetail from "../components/products/ProductDetail.vue";
import ListCarsFinding from "../components/store/cars/ListCarsFinding.vue";
import CarDetail from "../components/store/cars/CarDetail.vue";
import Home from "../components/store/Home.vue";
export const router = createRouter({
  history: createWebHistory(),
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
      path: "/car",
      component: CarDetail,
      name: "car",
    },
    {
      path: "/products",
      component: Product,
      name: "products",
      children: [
        { path: "", component: Navigation },
        { path: "", component: SearchBar },
      ],
    },
    {
      path: "/productDetail/:id",
      component: ProductDetail,
      name: "productDetail",
      children: [{ path: "", component: Navigation }],
    },
  ],
});
