<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

const router = useRouter()

const showPassword = ref(false)
const login = ref('')
const password = ref('')
const isLoading = ref(false)

const errors = ref({
  login: '',
  password: '',
  api: [] as string[] // Now an array
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Validation logic
const validateLogin = () => {
  if (!login.value.trim()) {
    errors.value.login = 'Email or username is required.'
  } else {
    // If it looks like an email, validate format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (login.value.includes('@') && !emailRegex.test(login.value)) {
      errors.value.login = 'Invalid email format.'
    } else {
      errors.value.login = ''
    }
  }
}

const validatePassword = () => {
  if (!password.value.trim()) {
    errors.value.password = 'Password is required.'
  } else if (password.value.length < 8) {
    errors.value.password = 'Password must be at least 8 characters.'
  } else {
    errors.value.password = ''
  }
}

const isFormValid = () => {
  return (
    errors.value.login === '' &&
    errors.value.password === '' &&
    login.value.trim() !== '' &&
    password.value.trim() !== '' &&
    errors.value.api.length === 0
  )
}

// Login handler
const attemptLogin = async () => {
  if (!isFormValid()) return

  isLoading.value = true
  errors.value.api = [] // Clear previous API errors

  try {
    const response = await api.post<any>(API_ENDPOINTS.auth.login, {
      login: login.value,
      password: password.value
    })

    const token = response.token || response.data?.token

    if (!token) {
      throw new Error('No authentication token received')
    }

    api.setAuthToken(token)
    await router.push('/dashboard')
  } catch (error: any) {
    console.error('Login error:', error)
    console.error('Full error object:', error.response?.data)

    // Handle backend validation errors (e.g., Laravel-style { errors: { ... } })
    if (error.response?.data?.errors) {
      const validationErrors = error.response.data.errors
      errors.value.api = Object.values(validationErrors).flat() as string[]
    } else {
      // Fallback to generic message or Axios error message
      errors.value.api = [
        error.response?.data?.message ||
          error.message ||
          'Login failed. Please check your credentials.'
      ]
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
    <div
      class="grid h-auto w-full max-w-7xl grid-cols-1 overflow-hidden rounded-lg shadow-2xl md:h-[500px] md:grid-cols-2 lg:h-[600px]"
    >
      <!-- Left Side -->
      <div class="bg-secondary flex flex-col justify-between gap-5 p-5 text-white">
        <RouterLink to="/">
          <h1 class="font-TitleFont">Flashify</h1>
        </RouterLink>
        <p>Study smarter with fast, clean, and customizable flashcards.</p>
      </div>

      <!-- Right Side -->
      <form class="border-border bg-primary/5 flex flex-col justify-center border p-5 md:p-10">
        <div class="text-center">
          <h2>Login</h2>
          <p class="text-foreground-muted mx-auto max-w-sm">
            Welcome Back! Let's get you logged in and get back on track.
          </p>
        </div>

        <div class="mt-5 flex flex-col items-center gap-4">
          <!-- API Error Messages (list, no background/border) -->
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

          <!-- Email or Username -->
          <div class="flex w-full max-w-sm flex-col gap-1">
            <label
              for="login"
              class="text-sm"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="login"
              v-model="login"
              @input="validateLogin"
              class="border-border focus:border-primary hover:border-primary w-full rounded border bg-transparent p-2 transition-colors outline-none focus:ring-0"
            />
            <p
              v-if="errors.login"
              class="text-xs text-red-500"
            >
              {{ errors.login }}
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
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
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

          <!-- Login Button -->
          <div class="mt-4 w-full max-w-sm">
            <Button
              variant="secondary"
              class="w-full"
              :disabled="!isFormValid() || isLoading"
              @click="attemptLogin"
            >
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </Button>
          </div>

          <p class="text-foreground-muted mt-4 text-center text-sm">
            Don't have an account?
            <RouterLink
              to="/signup"
              class="text-primary font-medium hover:underline"
            >
              Sign Up
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
