<script setup lang="ts">
import Button from '@/components/ui/Button.vue'

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
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
  >
    <div class="bg-background relative w-11/12 max-w-md rounded-lg p-10 shadow-lg">
      <button
        @click="closeModal"
        class="absolute top-3 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <h2 class="mb-4 text-lg font-bold">{{ props.title }}</h2>

      <slot />

      <div class="mt-6 flex justify-center">
        <Button
          variant="secondary"
          @click="save"
        >
          {{ props.saveText ?? 'Save' }}
        </Button>
      </div>
    </div>
  </div>
</template>
