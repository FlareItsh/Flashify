<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  show: boolean
  title: string
  saveText?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const closeModal = () => emit('close')
const save = () => emit('save')
</script>

<template>
  <div
    v-if="props.show"
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
  >
    <div class="bg-background rounded-lg shadow-lg p-10 w-11/12 max-w-md relative">
      <button
        @click="closeModal"
        class="absolute top-3 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        ✕
      </button>

      <h2 class="text-lg font-bold mb-4">{{ props.title }}</h2>

      <slot />

      <div class="flex justify-center mt-6">
        <Button variant="secondary" @click="save">
          {{ props.saveText ?? 'Save' }}
        </Button>
      </div>
    </div>
  </div>
</template>
