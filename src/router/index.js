// route/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import NotFound from '../views/NotFound.vue'; // Import the NotFound component
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, // Add meta field to require authentication
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/:catchAll(.*)', // Wildcard route to match any other routes
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global Route Guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // Check if the route requires authentication
    if (store.getters['user/isAuthenticated']) {
      // User is authenticated
      next();
    } else {
      // User is not authenticated, redirect to login page
      next({ name: 'Login' });
    }
  } else {
    // Route doesn't require authentication
    if (store.getters['user/isAuthenticated'] && (to.path === '/login' || to.path === '/signup')) {
      // User is already authenticated and trying to access login or signup, redirect to home
      next({ name: 'Home' });
    } else {
      // Proceed to the route
      next();
    }
  }
});

export default router;

