<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const gradientStyle = ref('')
gradientStyle.value = 'bg-gradient-to-r from-background from-80% to-transparent dark:from-background-dark'

const isLoggedIn = () => {
  return api.getAuthToken() !== null
}

const handleStartLearning = () => {
  if (isLoggedIn()) {
    router.push('/dashboard')
  } else {
    router.push('/signup')
  }
}

const scrollToHowItWorks = () => {
  const section = document.getElementById('howItWorks')
  section?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div :class="[
    'h-[620px] flex w-1/2 sm:items-center pointer-events-auto',
    gradientStyle,
    'md:w-1/2'
  ]">
    <div class="ml-6 md:ml-6">
      <p class="text-foreground-muted text-sm md:text-base">Digital Flashcards</p>

      <h2 class="text-foreground  sm:text-[42px] italic sm:leading-14 transition">
        <span class="text-3xl text-secondary transition sm:text-[42px]">Learn</span> smarter,
        <span class="text-3xl text-secondary transition sm:text-[42px]">Remember</span><br> more, and
        <span class="text-3xl text-secondary transition sm:text-[42px]">Master</span> any<br> subject faster.
      </h2>

      <p class="text-foreground-muted text-[13px] md:text-[13px] w-80 mt-5">
        Create your own flashcards, study anytime, and make learning simple, personalized, and effective.
      </p>

      <div class="flex sm:gap-5 mt-2 sm:mt-15 flex-col sm:flex-row">
        <button @click="handleStartLearning"
          class="mt-1 sm:mt-6 px-6 py-3 bg-secondary text-background rounded-xl hover:bg-secondary/90 transition cursor-pointer">
          Start Learning Now
        </button>
        <button @click="scrollToHowItWorks"
          class="mt-3 sm:mt-6 px-6 py-3 text-foreground border border-secondary text-background rounded-xl transition cursor-pointer">
          Learn More
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay * {
  pointer-events: none;
}
</style>
