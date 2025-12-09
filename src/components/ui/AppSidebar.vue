<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  BookOpenCheck,
  Library,
  Settings,
  User,
  Sun,
  Moon,
  X
} from 'lucide-vue-next'

const isCollapsed = ref(false)
const isMobileMenuOpen = ref(false)
const isDark = ref(false)
const route = useRoute()

onMounted(() => {
  // Check system preference or localStorage
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, url: '/dashboard' },
  { title: 'Collections', icon: Library, url: '/collections' },
  { title: 'Study', icon: BookOpenCheck, url: '/study' },
  { title: 'Settings', icon: Settings, url: '/settings' }
]

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

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

// Helper to know if Profile is active (you can change the path as needed)
const isProfileActive = () => route.path === '/profile'
</script>

<template>
  <!-- Mobile Top Navbar -->
  <nav
    v-if="!isMobileMenuOpen"
    class="bg-sidebar border-border fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-b px-4 py-3 md:hidden"
  >
    <div class="flex items-center gap-3">
      <button
        @click="toggleMobileMenu"
        class="text-sidebar-foreground hover:bg-sidebar-accent rounded-lg p-2 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <RouterLink to="/">
        <h1 class="font-TitleFont text-sidebar-foreground text-xl">Flashify</h1>
      </RouterLink>
    </div>
  </nav>

  <!-- Overlay for mobile -->
  <Transition name="overlay">
    <div
      v-if="isMobileMenuOpen"
      @click="closeMobileMenu"
      class="fixed inset-0 z-40 bg-black/50 md:hidden"
    ></div>
  </Transition>

  <!-- Sidebar -->
  <aside
    :class="[
      'bg-sidebar border-border fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r transition-all duration-300',
      'md:sticky md:translate-x-0',
      isCollapsed ? 'w-16' : 'w-64',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
  >
    <!-- Header -->
    <div class="border-border flex items-center justify-between border-b p-4">
      <RouterLink
        to="/"
        v-if="!isCollapsed"
        @click="closeMobileMenu"
      >
        <h1 class="font-TitleFont text-sidebar-foreground text-xl">Flashify</h1>
      </RouterLink>

      <!-- Desktop toggle button -->
      <button
        @click="toggleSidebar"
        class="text-sidebar-foreground hover:bg-sidebar-accent hidden rounded p-2 transition-colors md:block"
        :class="{ 'mx-auto': isCollapsed }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <!-- Mobile close button -->
      <button
        @click="closeMobileMenu"
        class="text-sidebar-foreground hover:bg-sidebar-accent rounded p-2 transition-colors md:hidden"
        :class="{ 'mx-auto': isCollapsed }"
      >
        <X class="h-5 w-5" />
      </button>
    </div>

    <!-- Menu Items -->
    <nav class="flex-1 space-y-1 p-4">
      <div
        v-for="item in menuItems"
        :key="item.title"
        class="group relative"
      >
        <!-- Active state classes -->
        <RouterLink
          :to="item.url"
          @click="closeMobileMenu"
          class="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary relative flex items-center gap-3 rounded-lg p-3 transition-colors data-[active=true]:font-semibold"
          :class="{ 'justify-center': isCollapsed, 'justify-start': !isCollapsed }"
          active-class="bg-primary/10 text-primary font-semibold"
          exact-active-class="bg-primary/10 text-primary font-semibold"
        >
          <!-- Optional left indicator bar when active -->
          <div
            v-if="$route.path === item.url"
            class="bg-primary absolute inset-y-0 left-0 w-1 rounded-r-full"
          ></div>

          <component
            :is="item.icon"
            class="h-5 w-5 shrink-0"
          />
          <span
            v-if="!isCollapsed"
            class="truncate font-medium"
          >
            {{ item.title }}
          </span>
        </RouterLink>

        <!-- Tooltip when collapsed -->
        <div
          v-if="isCollapsed"
          class="pointer-events-none absolute top-1/2 left-full z-50 ml-2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          <div
            class="bg-primary rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-white shadow-lg"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </nav>

    <!-- Footer Section -->
    <div class="border-border space-y-2 border-t p-4">
      <!-- Theme Toggle -->
      <div class="group relative">
        <button
          @click="toggleTheme"
          class="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative w-full rounded-lg p-3 transition-colors"
          :class="{ 'justify-center': isCollapsed, 'justify-start': !isCollapsed }"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <!-- Use grid to perfectly align icon in the center -->
          <div class="grid grid-cols-[auto_1fr] items-center gap-3">
            <!-- Icon column - always centered -->
            <div class="flex justify-center">
              <Transition
                name="icon"
                mode="out-in"
              >
                <Moon
                  v-if="isDark"
                  key="moon"
                  class="h-5 w-5 shrink-0"
                />
                <Sun
                  v-else
                  key="sun"
                  class="h-5 w-5 shrink-0"
                />
              </Transition>
            </div>

            <!-- Text - only visible when expanded -->
            <span
              v-if="!isCollapsed"
              class="text-left font-medium"
            >
              {{ isDark ? 'Dark' : 'Light' }}mode
            </span>
          </div>
        </button>

        <!-- Tooltip when collapsed -->
        <div
          v-if="isCollapsed"
          class="pointer-events-none absolute top-1/2 left-full z-50 ml-2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <div
            class="bg-primary rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-white shadow-lg"
          >
            {{ isDark ? 'Dark' : 'Light' }}mode
          </div>
        </div>
      </div>

      <!-- Profile Link -->
      <div class="group relative">
        <RouterLink
          to="/profile"
          @click="closeMobileMenu"
          class="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative block w-full rounded-lg p-3 transition-colors"
          :class="{ 'bg-primary/10 text-primary font-semibold': isProfileActive() }"
        >
          <div class="grid grid-cols-[auto_1fr] items-center gap-3">
            <div class="flex justify-center">
              <User class="h-5 w-5 shrink-0" />
            </div>
            <span
              v-if="!isCollapsed"
              class="text-left font-medium"
            >
              Profile
            </span>
          </div>

          <!-- Active indicator bar -->
          <div
            v-if="isProfileActive()"
            class="bg-primary absolute inset-y-0 left-0 w-1 rounded-r-full"
          ></div>
        </RouterLink>

        <!-- Tooltip when collapsed -->
        <div
          v-if="isCollapsed"
          class="pointer-events-none absolute top-1/2 left-full z-50 ml-2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <div
            class="bg-primary rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-white shadow-lg"
          >
            Profile
          </div>
        </div>
      </div>
    </div>
  </aside>
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

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
