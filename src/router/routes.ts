import { RouteRecordRaw } from "vue-router";

import Medicines from "@/views/Medicines.vue";

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
        component: Medicines,
      }
    ],
  }
];

export default routes;
