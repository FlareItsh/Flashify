<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Heading from '@/components/ui/Heading.vue'
import Button from '@/components/ui/Button.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'
import { Check } from 'lucide-vue-next'

interface User {
  user_id: number
  username: string
  email: string
  avatar_id: number
}

const isLoading = ref(false)
const isSavingProfile = ref(false)
const successMessage = ref('')

// User data
const user = ref<User | null>(null)
const username = ref('')
const email = ref('')
const selectedAvatarId = ref(1)

// Available avatars (avatar1.png to avatar20.png)
const totalAvatars = 20
const availableAvatars = computed(() => {
  return Array.from({ length: totalAvatars }, (_, i) => ({
    id: i + 1,
    path: `/avatars/avatar${i + 1}.png`
  }))
})

// Validation errors
const errors = ref({
  username: '',
  email: '',
  api: [] as string[]
})

// Validation functions
const validateUsername = () => {
  if (!username.value.trim()) {
    errors.value.username = 'Username is required.'
  } else if (username.value.length < 3) {
    errors.value.username = 'Username must be at least 3 characters.'
  } else {
    errors.value.username = ''
  }
}

const validateEmail = () => {
  if (!email.value.trim()) {
    errors.value.email = 'Email is required.'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      errors.value.email = 'Invalid email format.'
    } else {
      errors.value.email = ''
    }
  }
}

// Check if form has changes
const hasChanges = computed(() => {
  if (!user.value) return false
  return (
    username.value !== user.value.username ||
    email.value !== user.value.email ||
    selectedAvatarId.value !== user.value.avatar_id
  )
})

// Check if form is valid
const isFormValid = () => {
  return (
    username.value.trim() &&
    email.value.trim() &&
    errors.value.username === '' &&
    errors.value.email === '' &&
    errors.value.api.length === 0 &&
    hasChanges.value
  )
}

// Fetch user data
const fetchUserData = async () => {
  isLoading.value = true
  try {
    const response = await api.get<any>(API_ENDPOINTS.auth.me)
    const userData = response.data?.data || response.data || response

    // Ensure avatar_id has a default value
    const normalizedUser = {
      ...userData,
      avatar_id: userData.avatar_id || 1
    }

    user.value = normalizedUser
    username.value = normalizedUser.username
    email.value = normalizedUser.email
    selectedAvatarId.value = normalizedUser.avatar_id
  } catch (error: any) {
    console.error('Failed to fetch user data:', error)
    errors.value.api = ['Failed to load user data. Please refresh the page.']
  } finally {
    isLoading.value = false
  }
}

// Select avatar
const selectAvatar = (avatarId: number) => {
  selectedAvatarId.value = avatarId
  successMessage.value = ''
  errors.value.api = []
}

// Save profile changes
const saveProfile = async () => {
  // Run validations
  validateUsername()
  validateEmail()

  if (!isFormValid()) return

  isSavingProfile.value = true
  successMessage.value = ''
  errors.value.api = []

  try {
    // Ensure avatar_id is a valid number between 1 and 20
    let avatarId = Number(selectedAvatarId.value)
    if (isNaN(avatarId) || avatarId < 1 || avatarId > 20) {
      errors.value.api = ['Selected avatar is invalid.']
      isSavingProfile.value = false
      return
    }
    const response = await api.put<any>(API_ENDPOINTS.users.update(user.value!.user_id), {
      username: username.value,
      email: email.value,
      avatar_id: avatarId
    })

    const updatedUser = response.data?.data || response.data || response
    user.value = updatedUser

    // Update localStorage cache
    localStorage.setItem('username', updatedUser.username)
    localStorage.setItem('userEmail', updatedUser.email)
    localStorage.setItem('userAvatar', `/avatars/avatar${updatedUser.avatar_id}.png`)

    successMessage.value = response.message || 'Profile updated successfully!'

    // Dispatch custom event to notify other components
    window.dispatchEvent(
      new CustomEvent('user-profile-updated', {
        detail: {
          username: updatedUser.username,
          email: updatedUser.email,
          avatar: `/avatars/avatar${updatedUser.avatar_id}.png`,
          avatar_id: updatedUser.avatar_id
        }
      })
    )
  } catch (error: any) {
    console.error('Profile update error:', error)

    // Handle validation errors from backend
    if (error.response?.data?.errors) {
      const validationErrors = error.response.data.errors
      errors.value.api = Object.values(validationErrors).flat() as string[]
    } else {
      errors.value.api = [
        error.response?.data?.message || error.message || 'Failed to update profile'
      ]
    }
  } finally {
    isSavingProfile.value = false
  }
}

// Reset form to original values
const resetForm = () => {
  if (user.value) {
    username.value = user.value.username
    email.value = user.value.email
    selectedAvatarId.value = user.value.avatar_id
    errors.value = { username: '', email: '', api: [] }
    successMessage.value = ''
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <SettingsLayout>
    <div class="w-full max-w-5xl p-4 sm:p-6">
      <Heading
        title="Profile"
        subtitle="View and edit your profile information here."
      />

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="mt-8 flex items-center justify-center py-12"
      >
        <div class="text-foreground-muted">Loading profile...</div>
      </div>

      <!-- Profile Form -->
      <div
        v-else
        class="mt-6 sm:mt-8"
      >
        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="bg-primary/10 border-primary text-primary mb-4 rounded-lg border px-3 py-2.5 text-sm sm:mb-6 sm:px-4 sm:py-3"
        >
          {{ successMessage }}
        </div>

        <!-- API Error Messages -->
        <div
          v-if="errors.api.length"
          class="mb-4 sm:mb-6"
        >
          <ul class="list-inside space-y-1 text-sm text-red-600">
            <li
              v-for="(error, index) in errors.api"
              :key="index"
            >
              {{ error }}
            </li>
          </ul>
        </div>

        <form
          @submit.prevent="saveProfile"
          class="space-y-6 sm:space-y-8"
        >
          <!-- Avatar Selection -->
          <div>
            <label class="mb-2 block text-sm font-medium sm:mb-3">Choose Your Avatar</label>
            <div
              class="grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3 md:grid-cols-6 md:gap-4 lg:grid-cols-8 xl:grid-cols-10"
            >
              <button
                v-for="avatar in availableAvatars"
                :key="avatar.id"
                type="button"
                @click="selectAvatar(avatar.id)"
                class="group focus:ring-primary relative aspect-square overflow-hidden rounded-lg border-2 transition-all hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                :class="
                  selectedAvatarId === avatar.id
                    ? 'border-primary ring-primary ring-2 ring-offset-2'
                    : 'border-border hover:border-primary/50'
                "
              >
                <img
                  :src="avatar.path"
                  :alt="`Avatar ${avatar.id}`"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
                <!-- Selected Indicator -->
                <div
                  v-if="selectedAvatarId === avatar.id"
                  class="bg-primary/10 absolute inset-0 flex items-center justify-center"
                >
                  <Check class="text-primary h-6 w-6 drop-shadow-lg sm:h-8 sm:w-8" />
                </div>
              </button>
            </div>
            <p class="text-foreground-muted mt-1.5 text-xs sm:mt-2">
              Select an avatar to represent your profile
            </p>
          </div>

          <!-- Username -->
          <div>
            <label
              for="username"
              class="mb-2 block text-sm font-medium"
            >
              Username
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              @input="validateUsername"
              class="border-border focus:border-primary hover:border-primary w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors outline-none focus:ring-0 sm:px-4 sm:text-base"
              placeholder="Enter your username"
              :disabled="isSavingProfile"
            />
            <p
              v-if="errors.username"
              class="mt-1 text-xs text-red-500"
            >
              {{ errors.username }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              @input="validateEmail"
              class="border-border focus:border-primary hover:border-primary w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors outline-none focus:ring-0 sm:px-4 sm:text-base"
              placeholder="Enter your email"
              :disabled="isSavingProfile"
            />
            <p
              v-if="errors.email"
              class="mt-1 text-xs text-red-500"
            >
              {{ errors.email }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4">
            <Button
              type="submit"
              :disabled="!isFormValid() || isSavingProfile"
              variant="default"
              class="order-1 w-full sm:order-0 sm:flex-1"
            >
              {{ isSavingProfile ? 'Saving Changes...' : 'Save Changes' }}
            </Button>
            <Button
              type="button"
              @click="resetForm"
              :disabled="!hasChanges || isSavingProfile"
              variant="outline"
              class="order-2 w-full sm:order-0 sm:flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  </SettingsLayout>
</template>
