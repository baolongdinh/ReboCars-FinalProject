import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";

import NotFound from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    redirect: "dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Dashboard.vue")
      },
      {
        path: "/users",
        name: "users",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Users/Users.vue")
      },
      {
        path: "/cars",
        name: "cars",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Cars/Cars.vue")
      },
      {
        path: "/roles",
        name: "roles",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Roles/Roles.vue")
      },
      {
        path: "/discounts",
        name: "discounts",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Discounts/Discounts.vue"
          )
      },
      {
        path: "/tables",
        name: "tables",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/RegularTables.vue")
      }
    ]
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Login.vue"),
        meta: { publicRoute: true }
      },
      { path: "*", component: NotFound, meta: { publicRoute: true } }
    ]
  }
];

export default routes;
