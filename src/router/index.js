import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import User from "../views/User.vue";
import Signup from "../views/Signup.vue";
import Applications from "../views/Applications.vue";
import Logout from "../views/Logout.vue";
import ApplicationsNew from "../views/ApplicationsNew.vue";
import ApplicationsEdit from "../views/ApplicationsEdit.vue";
import Analysis from "../views/Analysis.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: User,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/applications",
    name: "applications",
    component: Applications,
  },
  {
    path: "/applications/new",
    name: "applications-new",
    component: ApplicationsNew,
  },
  {
    path: "/applications/:id/edit",
    name: "applications-edit",
    component: ApplicationsEdit,
  },
  {
    path: "/analysis",
    name: "analysis",
    component: Analysis,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
