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
      path: '/faq',
      name: 'faq',
      component: () => import('../views/Faq.vue'),
    },
    {
      path: '/legalnotes',
      name: 'legalNotes',
      component: () => import('../views/LegalNotes.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { layout: DashboardLayout, requiresAuth: true }, // J'utilise le layout spécifique pour le Dashboard
    },
    {
      path: '/usercollection',
      name: 'userCollection',
      component: () => import('../views/UserCollection.vue'),
      meta: { layout: DashboardLayout, requiresAuth: true },
    },
    {
      path: '/userwishlist',
      name: 'userWishlist',
      component: () => import('../views/UserWishlist.vue'),
      meta: { layout: DashboardLayout, requiresAuth: true },
    },
    {
      path: '/game/:id',
      name: 'gameDetails',
      component: () => import('../views/GamesDetails.vue'),
      meta: { layout: DashboardLayout, requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isUserAuthenticated = localStorage.getItem('userId') !== null;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isUserAuthenticated) {
    next('/'); // Je redirige vers la page d'accueil si l'authentification est requise mais le user n'est pas authentifié
  } else {
    next(); // Sinon, je continue la navigation
  }
});

export default router;
