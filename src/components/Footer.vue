<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from './ui/Button.vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const isLoggedIn = () => {
  return api.getAuthToken() !== null
}

const signupOrLogin = () => {
  if (isLoggedIn()) {
    router.push('/dashboard')
  } else {
    router.push('/signup')
  }
}
</script>

<template>
  <footer class="bg-sidebar py-5 sm:py-10 mt-15">
    <div class="max-w-7xl mx-auto px-6 ">

      <div class="flex lg:flex-row items-center justify-center gap-2 lg:gap-2 xl:gap-15">

        <div class="flex gap-1 lg:gap-4 items-center">
          <div class="w-3 lg:w-40 h-32 lg:h-40 rounded-xl bg-secondary"></div>
          <div class="w-3 lg:w-40 h-40 lg:h-50 rounded-xl bg-secondary"></div>
          <div class="w-3 lg:w-40 h-48 lg:h-60 rounded-xl bg-secondary"></div>
        </div>


        <div class="text-center max-w-xl">
          <RouterLink to="/">
            <h1 class="font-TitleFont text-secondary text-3xl md:text-4xl lg:text-5xl">
              Flashify
            </h1>
          </RouterLink>
          <p class="text-foreground-subtle w sm:w-80 text-[12px] md:text-[15px] mt-6 mx-auto">
            Empowering students and lifelong learners with easy-to-access, customizable digital flashcards to make
            studying smarter, faster, and more effective.
          </p>
          <Button @click="signupOrLogin" variant="secondary" class="mt-8 text-base px-8 py-3">
            Sign Up
          </Button>
        </div>


        <div class="flex gap-1 lg:gap-4 items-center">
          <div class="w-3 lg:w-40 h-48 lg:h-60 rounded-xl bg-secondary"></div>
          <div class="w-3 lg:w-40 h-40 lg:h-50 rounded-xl bg-secondary"></div>
          <div class="w-3 lg:w-40 h-32 lg:h-40 rounded-xl bg-secondary"></div>
        </div>
      </div>

    </div>
    <div class="mx-5">
      <div class="mt-5 -mb-6 pt-4 border-t-2 border-primary">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-foreground-subtle text-sm">
          <p>© 2025 Flashify. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <RouterLink to="/privacy" class="hover:underline">
              Privacy Policy
            </RouterLink>
            <span>•</span>
            <RouterLink to="/terms" class="hover:underline">
              Terms & Conditions
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
