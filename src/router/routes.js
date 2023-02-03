const routes = [
  {
    path: "/dashboard",
    name: "Playground",
    component: () => import("../views/dashboard.vue"),
  },
];
export default routes;
