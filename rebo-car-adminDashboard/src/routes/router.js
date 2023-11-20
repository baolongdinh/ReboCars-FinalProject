import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active",
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

function checkUserAuthentication() {
  // Assuming you have a token stored in local storage or a user authentication flag in your state
  const token = sessionStorage.getItem("refreshToken"); // Get the token from local storage
  const isAuthenticated = !!token; // Check if the token exists

  return isAuthenticated;
}

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkUserAuthentication();
  const publicRoute = to.matched.some(record => record.meta.publicRoute);
  console.log({ isAuthenticated, publicRoute });
  if (isAuthenticated || publicRoute) {
    next(); // Proceed to the next route
  } else {
    next("/login"); // Redirect to login page or wherever appropriate
  }
});

export default router;
