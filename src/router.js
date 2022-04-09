import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(BASE),
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
