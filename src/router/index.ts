// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { api } from '@/services/api'

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
      meta: { requiresAuth: true },
      children: [
        {
          path: '', // /dashboard
          name: 'dashboard',
          component: () => import('@/Dashboard.vue')
        },
        {
          path: 'collections',
          name: 'collections',
          component: () => import('@/pages/Collections.vue')
        },

        {
          path: 'flashcard/:id',
          name: 'flashcard',
          component: () => import('@/pages/FlashCards.vue'),
          props: true
        },

        {
          path: 'study',
          name: 'study-list',
          component: () => import('@/pages/Study.vue'),
          props: true
        },

        {
          path: 'study/:deckId',
          name: 'study-mode',
          component: () => import('@/pages/StudyMode.vue'),
          props: true
        },

        {
          path: 'settings/profile',
          name: 'settings-profile',
          component: () => import('@/pages/Profile.vue')
        },
        {
          path: 'settings/reset-password',
          name: 'settings-reset-password',
          component: () => import('@/pages/ResetPassword.vue')
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

// Global navigation guard: protect routes marked with `meta.requiresAuth`
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta && record.meta.requiresAuth)
  const token = api.getAuthToken()

  if (requiresAuth && !token) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  return next()
})
