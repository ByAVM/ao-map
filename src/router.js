import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:location",
      name: "map",
      component: () => import("~/views/Map.vue"),
      props: true,
    },
    { path: "/:pathMatch(.*)*", name: "not-found", redirect: "/svetolesye" },
  ],
});
