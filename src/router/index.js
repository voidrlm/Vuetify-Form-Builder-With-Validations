import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

export default router;
router.afterEach((to) => {
  document.title = to.name !== null ? to.name : "Vue And Vuetify";
});
