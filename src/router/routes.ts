import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/App.vue"),
      },
      {
        path: "/medicines",
        name: "medicines",
        component: () => import("@/views/Medicines.vue"),
      }
    ],
  }
];

export default routes;
