// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/auth/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/auth/Signup.vue')
    },
    {
      path: '/brand-guidelines',
      name: 'brand-guidelines',
      component: () => import('@/components/BrandGuidelines.vue')
    },
    {
      path: '/dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '', // /dashboard
          name: 'dashboard',
          component: () => import('@/Dashboard.vue')
        },
        {
          path: '/collections',
          name: 'collections',
          component: () => import('@/pages/Collections.vue')
        },
        {
          path: '/study',
          name: 'study',
          component: () => import('@/pages/Study.vue')
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/pages/Settings.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/pages/Profile.vue')
        }
      ]
    },
    // Optional: catch-all for 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue') // create this if you want
    }
  ]
})

export default router
