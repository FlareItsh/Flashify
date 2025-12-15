<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu, X, ChevronLeft } from 'lucide-vue-next'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

const router = useRouter()
const route = useRoute()
const avatarUrl = '/avatars/avatar'
const isMobileMenuOpen = ref(false)

// Load cached avatar immediately from localStorage
const cachedAvatar = localStorage.getItem('userAvatar')
const avatar = ref(cachedAvatar || '/avatars/avatar1.png')

// Listen for profile updates
const handleProfileUpdate = (event: CustomEvent) => {
  avatar.value = event.detail.avatar
}

onMounted(async () => {
  // Fetch current user info
  const token = api.getAuthToken()
  if (token) {
    try {
      const response = await api.get<any>(API_ENDPOINTS.auth.me)
      const user = response.data?.data || response.data || response
      const newAvatar = `${avatarUrl}${user.avatar_id}.png`
      avatar.value = newAvatar
      // Cache the avatar for instant loading next time
      localStorage.setItem('userAvatar', newAvatar)
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    }
  }

  // Add event listener for profile updates
  window.addEventListener('user-profile-updated', handleProfileUpdate as EventListener)
})

onUnmounted(() => {
  // Clean up event listener
  window.removeEventListener('user-profile-updated', handleProfileUpdate as EventListener)
})

const menuItems = [
  {
    label: 'Profile',
    path: '/settings/profile'
  },
  {
    label: 'Reset Password',
    path: '/settings/reset-password'
  }
]

const isActive = (path: string) => {
  return route.path === path
}

const navigateTo = (path: string) => {
  router.push(path)
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const goBack = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="bg-background min-h-screen">
    <!-- Mobile Top Bar -->
    <div
      class="border-border bg-background sticky top-0 z-40 flex items-center justify-between border-b px-4 py-3 md:hidden"
    >
      <button
        @click="goBack"
        class="hover:bg-border flex items-center gap-2 rounded-lg px-3 py-2 transition-colors"
      >
        <ChevronLeft class="h-5 w-5" />
        <span class="font-medium">Back</span>
      </button>

      <div class="flex items-center gap-3">
        <img
          :src="avatar"
          alt="User Avatar"
          class="h-8 w-8 rounded-sm object-cover"
        />
        <button
          @click="toggleMobileMenu"
          class="hover:bg-border rounded-lg p-2 transition-colors"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <X
            v-if="isMobileMenuOpen"
            class="h-6 w-6"
          />
          <Menu
            v-else
            class="h-6 w-6"
          />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="bg-background/80 fixed inset-0 z-30 backdrop-blur-sm md:hidden"
        @click="isMobileMenuOpen = false"
      />
    </Transition>

    <!-- Mobile Menu Dropdown -->
    <Transition name="slide-down">
      <nav
        v-if="isMobileMenuOpen"
        class="border-border bg-background fixed top-[57px] right-0 left-0 z-40 border-b shadow-lg md:hidden"
      >
        <div class="flex flex-col gap-1 p-3">
          <button
            v-for="item in menuItems"
            :key="item.path"
            :class="[
              'w-full rounded-lg px-4 py-3 text-left font-medium transition-all',
              isActive(item.path) ? 'bg-primary/10 text-primary' : 'hover:bg-border'
            ]"
            @click="navigateTo(item.path)"
          >
            {{ item.label }}
          </button>
        </div>
      </nav>
    </Transition>

    <div class="flex">
      <!-- Desktop Sidebar -->
      <aside class="sticky top-0 hidden h-screen w-72 flex-col md:flex">
        <!-- Avatar Header -->
        <div class="flex items-center justify-center p-8">
          <img
            :src="avatar"
            alt="User Avatar"
            class="h-20 w-20 rounded-sm object-cover"
          />
        </div>

        <!-- Navigation -->
        <nav class="flex flex-1 flex-col gap-2 p-4">
          <button
            v-for="item in menuItems"
            :key="item.path"
            :class="[
              'w-full rounded-lg px-4 py-3.5 text-left font-medium transition-all',
              isActive(item.path) ? 'bg-primary/10 text-primary' : 'hover:bg-border'
            ]"
            @click="navigateTo(item.path)"
          >
            {{ item.label }}
          </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide down transition for mobile menu */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
