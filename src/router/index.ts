import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jeux',
      name: 'jeux',
      component: () => import('../views/LesJeux.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue')
    },
  ]
})

export default router
