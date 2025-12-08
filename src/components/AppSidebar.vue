<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isCollapsed = ref(false)

const menuItems = [
  {
    title: 'Dashboard',
    icon: '📊',
    url: '/dashboard'
  },
  {
    title: 'Flashcards',
    icon: '🃏',
    url: '/flashcards'
  },
  {
    title: 'Collections',
    icon: '📚',
    url: '/collections'
  },
  {
    title: 'Settings',
    icon: '⚙️',
    url: '/settings'
  }
]

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <aside
    :class="[
      'bg-sidebar border-border flex h-screen flex-col border-r transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- Header -->
    <div class="border-border flex items-center justify-between border-b p-4">
      <RouterLink
        to="/"
        v-if="!isCollapsed"
      >
        <h1 class="font-TitleFont text-sidebar-foreground text-xl">Flashify</h1>
      </RouterLink>
      <button
        @click="toggleSidebar"
        class="text-sidebar-foreground hover:bg-sidebar-accent rounded p-2 transition-colors"
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
    </div>

    <!-- Menu Items -->
    <nav class="flex-1 space-y-1 p-4">
      <RouterLink
        v-for="item in menuItems"
        :key="item.title"
        :to="item.url"
        class="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-3 rounded-lg p-3 transition-colors"
      >
        <span class="text-xl">{{ item.icon }}</span>
        <span
          v-if="!isCollapsed"
          class="font-medium"
        >
          {{ item.title }}
        </span>
      </RouterLink>
    </nav>

    <!-- Footer -->
    <div class="border-border border-t p-4">
      <div
        class="text-sidebar-foreground hover:bg-sidebar-accent flex items-center gap-3 rounded-lg p-3 transition-colors"
      >
        <span class="text-xl">👤</span>
        <span
          v-if="!isCollapsed"
          class="font-medium"
        >
          Profile
        </span>
      </div>
    </div>
  </aside>
</template>
