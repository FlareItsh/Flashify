<script setup lang="ts">
import FlashcardContent from './FlashcardContent.vue'

defineProps<{
  title?: string
  description?: string
  tags?: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
}>()
</script>

<template>
  <div class="rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
    <FlashcardContent
      :title="title"
      :description="description"
      :tags="tags"
      :difficulty="difficulty"
    />
  </div>
</template>
