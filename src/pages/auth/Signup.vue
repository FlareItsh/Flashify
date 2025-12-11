<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

const router = useRouter()

// form values
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

// visibility toggles
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// errors
const errors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  api: [] as string[] // Now an array
})

// toggles
const togglePassword = () => (showPassword.value = !showPassword.value)
const toggleConfirmPassword = () => (showConfirmPassword.value = !showConfirmPassword.value)

// VALIDATION
const validateUsername = () => {
  errors.value.username = username.value.trim() ? '' : 'Username is required.'
}

const validateEmail = () => {
  if (!email.value.trim()) {
    errors.value.email = 'Email is required.'
    return
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.value.email = regex.test(email.value) ? '' : 'Invalid email format.'
}

const validatePassword = () => {
  if (!password.value.trim()) {
    errors.value.password = 'Password is required.'
  } else if (password.value.length < 8) {
    errors.value.password = 'Password must be at least 8 characters.'
  } else {
    errors.value.password = ''
  }

  validateConfirmPassword()
}

const validateConfirmPassword = () => {
  if (!confirmPassword.value.trim()) {
    errors.value.confirmPassword = 'Please confirm your password.'
  } else if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = ''
  }
}

// overall form validation
const isFormValid = () => {
  return (
    username.value.trim() &&
    email.value.trim() &&
    password.value.trim() &&
    confirmPassword.value.trim() &&
    Object.values(errors.value).every(e => (Array.isArray(e) ? e.length === 0 : e === ''))
  )
}

// submit
const attemptSignup = async () => {
  if (!isFormValid()) return

  isLoading.value = true
  errors.value.api = [] // Clear previous API errors

  try {
    // Step 1: Register the user
    await api.post<any>(API_ENDPOINTS.auth.signup, {
      username: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    })

    // Step 2: Auto-login after successful registration
    const loginResponse = await api.post<any>(API_ENDPOINTS.auth.login, {
      login: email.value,
      password: password.value
    })

    const token = loginResponse.data?.token || loginResponse.token

    if (!token) {
      throw new Error('Registration successful but login failed. Please login manually.')
    }

    api.setAuthToken(token)
    await router.push('/dashboard')
  } catch (error: any) {
    console.error('Signup error:', error)
    console.error('Full error object:', error.response?.data)

    // Handle validation errors from backend
    if (error.response?.data?.errors) {
      const validationErrors = error.response.data.errors
      // Flatten all error messages into an array
      errors.value.api = Object.values(validationErrors).flat() as string[]
    } else {
      errors.value.api = [error.message || 'Signup failed. Please try again.']
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
    <div
      class="grid h-auto w-full max-w-7xl grid-cols-1 overflow-hidden rounded-lg shadow-2xl md:h-[600px] md:grid-cols-2 lg:h-[700px]"
    >
      <!-- Left -->
      <div class="bg-secondary flex flex-col justify-between gap-5 p-5 text-white">
        <RouterLink to="/">
          <h1 class="font-TitleFont">Flashify</h1>
        </RouterLink>
        <p>Study smarter with fast, clean, and customizable flashcards.</p>
      </div>

      <!-- Right -->
      <form class="border-border bg-primary/5 flex flex-col justify-center border p-5 md:p-10">
        <div class="text-center">
          <h2>Sign Up</h2>
          <p class="text-foreground-muted">Create your account to get started.</p>
        </div>

        <div class="mt-5 flex flex-col items-center gap-4">
          <!-- API Error Messages (now a list, no background/border) -->
          <div
            v-if="errors.api.length"
            class="w-full max-w-sm"
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

          <!-- Username -->
          <div class="flex w-full max-w-sm flex-col gap-1">
            <label
              for="username"
              class="text-sm"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              v-model="username"
              @input="validateUsername"
              class="border-border focus:border-primary hover:border-primary w-full rounded border bg-transparent p-2 transition-colors outline-none focus:ring-0"
            />
            <p
              v-if="errors.username"
              class="text-xs text-red-500"
            >
              {{ errors.username }}
            </p>
          </div>

          <!-- Email -->
          <div class="flex w-full max-w-sm flex-col gap-1">
            <label
              for="email"
              class="text-sm"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              @input="validateEmail"
              class="border-border focus:border-primary hover:border-primary w-full rounded border bg-transparent p-2 transition-colors outline-none focus:ring-0"
            />
            <p
              v-if="errors.email"
              class="text-xs text-red-500"
            >
              {{ errors.email }}
            </p>
          </div>

          <!-- Password -->
          <div class="flex w-full max-w-sm flex-col gap-1">
            <label
              for="password"
              class="text-sm"
            >
              Password
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                @input="validatePassword"
                class="border-border focus:border-primary hover:border-primary w-full rounded border bg-transparent p-2 pr-10 transition-colors outline-none focus:ring-0"
              />
              <button
                type="button"
                @click="togglePassword"
                class="text-foreground-muted hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors"
              >
                <EyeOff
                  v-if="showPassword"
                  class="h-5 w-5"
                />
                <Eye
                  v-else
                  class="h-5 w-5"
                />
              </button>
            </div>
            <p
              v-if="errors.password"
              class="text-xs text-red-500"
            >
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password -->
          <div class="flex w-full max-w-sm flex-col gap-1">
            <label
              for="confirm-password"
              class="text-sm"
            >
              Confirm Password
            </label>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                v-model="confirmPassword"
                @input="validateConfirmPassword"
                class="border-border focus:border-primary hover:border-primary w-full rounded border bg-transparent p-2 pr-10 transition-colors outline-none focus:ring-0"
              />
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="text-foreground-muted hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors"
              >
                <EyeOff
                  v-if="showConfirmPassword"
                  class="h-5 w-5"
                />
                <Eye
                  v-else
                  class="h-5 w-5"
                />
              </button>
            </div>
            <p
              v-if="errors.confirmPassword"
              class="text-xs text-red-500"
            >
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Sign Up Button -->
          <div class="w-full max-w-sm">
            <Button
              variant="secondary"
              class="mt-4 w-full"
              :disabled="!isFormValid() || isLoading"
              @click="attemptSignup"
            >
              {{ isLoading ? 'Signing up...' : 'Sign Up' }}
            </Button>
          </div>

          <!-- Login Link -->
          <p class="text-foreground-muted mt-4 text-center text-sm">
            Already have an account?
            <RouterLink
              to="/login"
              class="text-primary font-medium hover:underline"
            >
              Login
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
