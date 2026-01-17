import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  document.title = to.name !== null ? to.name : 'Vuetify Form Builder'
})

export default router
