<script setup lang="ts">
import { useRouter } from 'vue-router'
import api from '@/services/api'
const blogCards = [
  {
    title: "Create A Deck/Collection",
    description: "Organize your study material by creating a deck or collection for any subject.",
    buttonText: "Start Your Journey",
  },
  {
    title: "Turn Study Time into Smart Time",
    description: "See how digital flashcards help students and professionals retain key information effortlessly.",
    buttonText: "Access Your Flashcards",
  },
  {
    title: "Study Smarter, Not Longer",
    description: "Learn how to structure your study sessions for maximum efficiency and minimal stress.",
    buttonText: "Boost Your Learning",
  },
  {
    title: "App Features & Updates",
    description: "Discover how to customize decks, and make learning interactive with Flashify.",
    buttonText: "Log In to Customize",
  },
];
const router = useRouter()

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

</script>

<template>
  <section id="blog" class="scroll-mt-24 text-center w-full mt-20 px-4">
    <h1 class="mb-2 text-4xl font-bold">Blog</h1>
    <p class="text-foreground-muted max-w-2xl mx-auto">
      Tips, Guides, and Study Insights
    </p>

    <!-- Desktop Layout - Preserved exactly as original -->
    <div class="hidden lg:flex lg:items-center lg:mt-5 lg:max-w-full lg:mx-auto">
      <div class="flex justify-center sm:mt-23 items-center h-96">
        <h1 class="rotate-90 text-8xl text-secondary tracking-[6rem] whitespace-nowrap">
          BLOG
        </h1>
      </div>

      <div class="flex flex-col gap-6 -ml-60">
        <div v-for="(card, index) in blogCards" :key="index"
          class="flex items-stretch h-35 gap-8 border-2 border-primary rounded-xl p-2 max-w-4xl">
          <div class="flex-1 justify-between flex flex-col">
            <h4 class="text-left text-xl font-semibold mb-4">{{ card.title }}</h4>
            <p class="text-foreground-muted text-base text-left">
              {{ card.description }}
            </p>
          </div>
          <div class="flex items-end">
            <button @click="handleStartLearning"
              class="bg-secondary text-background text-sm px-5 py-3 rounded-xl rounded-tl-sm rounded-tr-sm rounded-bl-sm cursor-pointer ml-20">
              {{ card.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile/Tablet Layout - Clean vertical cards -->
    <div class="lg:hidden mt-5 max-w-4xl mx-auto space-y-8">
      <div v-for="(card, index) in blogCards" :key="index" class="border-2 border-primary rounded-xl p-3">
        <h4 class="text-left text-xl font-semibold mb-4">{{ card.title }}</h4>
        <p class="text-foreground-muted text-base text-left mb-6">
          {{ card.description }}
        </p>
        <div class="flex justify-end">
          <button @click="handleStartLearning"
            class="bg-secondary text-background text-sm px-5 py-3 rounded-xl rounded-tl-sm rounded-tr-sm rounded-bl-sm">
            {{ card.buttonText }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
