<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from './ui/button'
import { RouterLink } from 'vue-router'

const isDark = ref(false)
const isMobileMenuOpen = ref(false)

onMounted(() => {
  // Check system preference or localStorage
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value

  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-sidebar p-5">
    <div class="flex items-center justify-between">
      <h1 class="font-TitleFont text-secondary text-2xl md:text-4xl">Flashify</h1>

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-4 md:flex">
        <!-- Theme Switch -->
        <button
          @click="toggleTheme"
          class="border-border hover:bg-border/20 flex h-8 w-16 items-center rounded-full border bg-transparent p-1 transition-colors"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <div
            class="bg-primary flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200"
            :class="{ 'translate-x-8': isDark }"
          >
            <Transition
              name="icon"
              mode="out-in"
            >
              <svg
                v-if="isDark"
                key="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-4 w-4 text-white"
              >
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z"
                />
              </svg>
              <svg
                v-else
                key="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-4 w-4 text-white"
              >
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                />
              </svg>
            </Transition>
          </div>
        </button>

        <RouterLink to="/login">
          <Button
            variant="outline"
            class="text-xs font-semibold"
          >
            Login
          </Button>
        </RouterLink>

        <RouterLink to="/signup">
          <Button class="text-xs font-semibold">Sign Up</Button>
        </RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="text-foreground hover:bg-border/20 rounded-md p-2 transition-colors md:hidden"
        aria-label="Toggle menu"
      >
        <svg
          v-if="!isMobileMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="border-border mt-4 flex flex-col gap-3 border-t pt-4 md:hidden"
      >
        <!-- Theme Switch Mobile -->
        <div class="flex items-center justify-between">
          <span class="text-foreground text-sm font-medium">Theme</span>
          <button
            @click="toggleTheme"
            class="border-border hover:bg-border/20 flex h-8 w-16 items-center rounded-full border bg-transparent p-1 transition-colors"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <div
              class="bg-primary flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200"
              :class="{ 'translate-x-8': isDark }"
            >
              <Transition
                name="icon"
                mode="out-in"
              >
                <svg
                  v-if="isDark"
                  key="moon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-4 w-4 text-white"
                >
                  <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z"
                  />
                </svg>
                <svg
                  v-else
                  key="sun"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-4 w-4 text-white"
                >
                  <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                  />
                </svg>
              </Transition>
            </div>
          </button>
        </div>

        <Button
          variant="outline"
          class="text-md w-full font-semibold"
        >
          Login
        </Button>
        <Button class="text-md w-full font-semibold">Sign Up</Button>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.icon-enter-active,
.icon-leave-active {
  transition: all 0.3s ease;
}

.icon-enter-from {
  opacity: 0;
  transform: rotate(-180deg);
}

.icon-leave-to {
  opacity: 0;
  transform: rotate(180deg);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
