import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import BookSearch from "../views/BookSearch.vue";
import BookForm from "../views/BookForm.vue";
import Books from "../views/Books.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/books",
    name: "books",
    component: Books,
  },
  {
    path: "/search",
    name: "search",
    component: BookSearch,
  },
  // {
  //   path: "/form",
  //   name: "form",
  //   component: BookForm,
  // },
  {
    path: "/form",
    name: "form",
    component: BookForm,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
