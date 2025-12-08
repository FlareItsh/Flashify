import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import BrandGuidelines from '../components/BrandGuidelines.vue'
import Login from '@/pages/auth/Login.vue'
import Signup from '@/pages/auth/Signup.vue'
import HomeView from '@/views/HomeView.vue'
import Dashboard from '@/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/brand-guidelines',
      name: 'brand-guidelines',
      component: BrandGuidelines
    }
  ]
})

export default router
