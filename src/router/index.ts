import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import BrandGuidelines from '../components/BrandGuidelines.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    },
    {
      path: '/login',
      name: 'login',
      component: App
    },
    {
      path: '/signup',
      name: 'home',
      component: App
    },
    {
      path: '/brand-guidelines',
      name: 'brand-guidelines',
      component: BrandGuidelines
    }
  ]
})

export default router
