<script setup lang="ts">
import Button from '@/components/ui/Button.vue'

const props = defineProps<{
  show: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const closeModal = () => emit('close')
const confirmDelete = () => emit('confirm')
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
  >
    <div class="bg-background relative w-11/12 max-w-md rounded-lg p-10 shadow-lg">
      <button
        @click="closeModal"
        class="absolute top-3 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <h2 class="mb-4 text-lg font-bold">{{ title }}</h2>

      <div class="space-y-4">
        <p class="text-muted-foreground">{{ message }}</p>

        <div class="flex justify-between gap-3">
          <Button
            variant="secondary"
            @click="closeModal"
          >
            {{ cancelText || 'Cancel' }}
          </Button>
          <Button
            variant="destructive"
            @click="confirmDelete"
          >
            {{ confirmText || 'Delete' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
