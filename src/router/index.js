import { createRouter, createWebHistory } from 'vue-router'
import { fetchAuthSession } from 'aws-amplify/auth'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const guard = async (to) => {
  const session = await fetchAuthSession()
  if (!session.tokens && to.name !== 'login') {
    return { name: 'login' }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: async (to) => {
        return await guard(to)
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: async (to) => {
        return await guard(to)
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
