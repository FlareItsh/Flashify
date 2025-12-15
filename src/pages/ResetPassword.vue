<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import Heading from '@/components/ui/Heading.vue'
import Button from '@/components/ui/Button.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const successMessage = ref('')

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const errors = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  api: [] as string[]
})

// Toggle password visibility
const toggleCurrentPassword = () => (showCurrentPassword.value = !showCurrentPassword.value)
const toggleNewPassword = () => (showNewPassword.value = !showNewPassword.value)
const toggleConfirmPassword = () => (showConfirmPassword.value = !showConfirmPassword.value)

// Validation functions
const validateCurrentPassword = () => {
  if (!currentPassword.value.trim()) {
    errors.value.currentPassword = 'Current password is required.'
  } else {
    errors.value.currentPassword = ''
  }
}

const validateNewPassword = () => {
  if (!newPassword.value.trim()) {
    errors.value.newPassword = 'New password is required.'
  } else if (newPassword.value.length < 8) {
    errors.value.newPassword = 'Password must be at least 8 characters.'
  } else {
    errors.value.newPassword = ''
  }
  // Re-validate confirm password when new password changes
  if (confirmPassword.value) {
    validateConfirmPassword()
  }
}

const validateConfirmPassword = () => {
  if (!confirmPassword.value.trim()) {
    errors.value.confirmPassword = 'Please confirm your new password.'
  } else if (confirmPassword.value !== newPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = ''
  }
}

// Check if form is valid
const isFormValid = () => {
  return (
    currentPassword.value.trim() &&
    newPassword.value.trim() &&
    confirmPassword.value.trim() &&
    errors.value.currentPassword === '' &&
    errors.value.newPassword === '' &&
    errors.value.confirmPassword === '' &&
    errors.value.api.length === 0
  )
}

const handleSubmit = async () => {
  if (!isFormValid()) return

  isLoading.value = true
  successMessage.value = ''
  errors.value.api = []

  try {
    const response = await api.post<{ message?: string }>(API_ENDPOINTS.auth.changePassword, {
      current_password: currentPassword.value,
      new_password: newPassword.value,
      new_password_confirmation: confirmPassword.value
    })

    successMessage.value = response.message || 'Password changed successfully'

    // Clear form
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''

    // Clear any field errors
    errors.value.currentPassword = ''
    errors.value.newPassword = ''
    errors.value.confirmPassword = ''
  } catch (error: any) {
    console.error('Password change error:', error)

    // Handle validation errors from backend
    if (error.response?.data?.errors) {
      const validationErrors = error.response.data.errors
      errors.value.api = Object.values(validationErrors).flat() as string[]
    } else {
      errors.value.api = [
        error.response?.data?.message || error.message || 'Failed to change password'
      ]
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <SettingsLayout>
    <div class="w-full max-w-2xl p-4 sm:p-6">
      <Heading
        title="Reset Password"
        subtitle="Update your password to keep your account secure."
      />

      <div class="mt-6 sm:mt-8">
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

        <!-- Password Change Form -->
        <form
          @submit.prevent="handleSubmit"
          class="space-y-5 sm:space-y-6"
        >
          <!-- Current Password -->
          <div>
            <label
              for="current-password"
              class="mb-2 block text-sm font-medium"
            >
              Current Password
            </label>
            <div class="relative">
              <input
                id="current-password"
                v-model="currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                @input="validateCurrentPassword"
                class="border-border focus:border-primary hover:border-primary w-full rounded-lg border bg-transparent px-3 py-2 pr-10 text-sm transition-colors outline-none focus:ring-0 sm:px-4 sm:text-base"
                placeholder="Enter your current password"
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="toggleCurrentPassword"
                class="text-foreground-muted hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors focus:outline-none sm:right-3"
                :aria-label="showCurrentPassword ? 'Hide password' : 'Show password'"
              >
                <EyeOff
                  v-if="showCurrentPassword"
                  class="h-4 w-4 sm:h-5 sm:w-5"
                />
                <Eye
                  v-else
                  class="h-4 w-4 sm:h-5 sm:w-5"
                />
              </button>
            </div>
            <p
              v-if="errors.currentPassword"
              class="mt-1 text-xs text-red-500"
            >
              {{ errors.currentPassword }}
            </p>
          </div>

          <!-- New Password -->
          <div>
            <label
              for="new-password"
              class="mb-2 block text-sm font-medium"
            >
              New Password
            </label>
            <div class="relative">
              <input
                id="new-password"
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                @input="validateNewPassword"
                class="border-border focus:border-primary hover:border-primary w-full rounded-lg border bg-transparent px-3 py-2 pr-10 text-sm transition-colors outline-none focus:ring-0 sm:px-4 sm:text-base"
                placeholder="Enter your new password"
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="toggleNewPassword"
                class="text-foreground-muted hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors focus:outline-none sm:right-3"
                :aria-label="showNewPassword ? 'Hide password' : 'Show password'"
              >
                <EyeOff
                  v-if="showNewPassword"
                  class="h-4 w-4 sm:h-5 sm:w-5"
                />
                <Eye
                  v-else
                  class="h-4 w-4 sm:h-5 sm:w-5"
                />
              </button>
            </div>
            <p
              v-if="errors.newPassword"
              class="mt-1 text-xs text-red-500"
            >
              {{ errors.newPassword }}
            </p>
            <p
              v-else
              class="text-foreground-muted mt-1 text-xs"
            >
              Password must be at least 8 characters long
            </p>
          </div>

          <!-- Confirm New Password -->
          <div>
            <label
              for="confirm-password"
              class="mb-2 block text-sm font-medium"
            >
              Confirm New Password
            </label>
            <div class="relative">
              <input
                id="confirm-password"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                @input="validateConfirmPassword"
                class="border-border focus:border-primary hover:border-primary w-full rounded-lg border bg-transparent px-3 py-2 pr-10 text-sm transition-colors outline-none focus:ring-0 sm:px-4 sm:text-base"
                placeholder="Confirm your new password"
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="text-foreground-muted hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors focus:outline-none sm:right-3"
                :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
              >
                <EyeOff
                  v-if="showConfirmPassword"
                  class="h-4 w-4 sm:h-5 sm:w-5"
                />
                <Eye
                  v-else
                  class="h-4 w-4 sm:h-5 sm:w-5"
                />
              </button>
            </div>
            <p
              v-if="errors.confirmPassword"
              class="mt-1 text-xs text-red-500"
            >
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Submit Button -->
          <div class="pt-2 sm:pt-4">
            <Button
              type="submit"
              :disabled="!isFormValid() || isLoading"
              variant="default"
              class="w-full"
            >
              {{ isLoading ? 'Changing Password...' : 'Change Password' }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </SettingsLayout>
</template>
