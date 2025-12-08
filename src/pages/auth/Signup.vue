<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
    <div
      class="grid h-auto w-full max-w-7xl grid-cols-1 overflow-hidden rounded-lg shadow-2xl md:h-[600px] md:grid-cols-2 lg:h-[700px]"
    >
      <!--Left Side-->
      <div class="bg-secondary flex flex-col justify-between gap-5 p-5 text-white">
        <RouterLink to="/">
          <h1 class="font-TitleFont">Flashify</h1>
        </RouterLink>
        <p>Study smarter with fast, clean, and customizable flashcards.</p>
      </div>

      <!--Right Side-->
      <form
        action=""
        class="border-border flex flex-col justify-center border p-5 md:p-10"
      >
        <div class="text-center">
          <h2>Sign Up</h2>
          <p class="text-foreground-muted">Create your account to get started.</p>
        </div>
        <div class="mt-5 flex flex-col items-center gap-4">
          <div class="flex w-full max-w-sm flex-col gap-1">
            <label
              for="fullname"
              class="text-sm"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              class="border-border focus:border-primary hover:border-primary w-full rounded border bg-transparent p-2 transition-colors outline-none focus:ring-0"
            />
          </div>
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
              class="border-border focus:border-primary hover:border-primary w-full rounded border bg-transparent p-2 transition-colors outline-none focus:ring-0"
            />
          </div>
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
                class="border-border focus:border-primary hover:border-primary w-full rounded border bg-transparent p-2 pr-10 transition-colors outline-none focus:ring-0"
              />
              <button
                type="button"
                @click="togglePassword"
                class="text-foreground-muted hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <svg
                  v-if="showPassword"
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
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
                <svg
                  v-else
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
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
                class="border-border focus:border-primary hover:border-primary w-full rounded border bg-transparent p-2 pr-10 transition-colors outline-none focus:ring-0"
              />
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="text-foreground-muted hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors"
                :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
              >
                <svg
                  v-if="showConfirmPassword"
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
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
                <svg
                  v-else
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <RouterLink
            to="/dashboard"
            class="w-full max-w-sm"
          >
            <Button
              variant="secondary"
              class="mt-4 w-full max-w-sm"
            >
              Sign Up
            </Button>
          </RouterLink>
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
