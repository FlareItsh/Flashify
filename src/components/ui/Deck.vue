<script setup lang="ts">
import DeckContent from './DeckContent.vue'

defineProps<{
  title?: string
  description?: string
  tags?: string[]
  priority?: 'low' | 'medium' | 'high'
}>()
</script>

<template>
  <div
    class="border-border h-full rounded-lg border p-6 shadow-md transition-shadow hover:shadow-md"
  >
    <DeckContent
      :title="title"
      :description="description"
      :tags="tags"
      :priority="priority"
    />
  </div>
</template>
