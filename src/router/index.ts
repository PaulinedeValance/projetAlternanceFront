import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomePage.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/jeux',
      name: 'jeux',
      component: () => import('../views/LesJeux.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUp.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { layout: DashboardLayout }, // J'utilise le layout spécifique pour le Dashboard
    },
    {
      path: '/usercollection',
      name: 'userCollection',
      component: () => import('../views/UserCollection.vue'),
      meta: { layout: DashboardLayout },
    },
    {
      path: '/userwishlist',
      name: 'userWishlist',
      component: () => import('../views/UserWishlist.vue'),
      meta: { layout: DashboardLayout },
    },
    {
      path: '/game/:id',
      name: 'gameDetails',
      component: () => import('../views/GamesDetails.vue'),
      meta: { layout: DashboardLayout },
    },
  ],
});

export default router;
