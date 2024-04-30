import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    /* component: () => import("@/App.vue"), */
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/App.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "catchAll",
    redirect: "/home",
    component: () => import("@/App.vue")
  }
];

export default routes;