<script setup lang="ts">
import DeckContent from './DeckContent.vue'

withDefaults(
  defineProps<{
    title?: string
    description?: string
    tags?: string[]
    priority?: 'low' | 'medium' | 'high'
    editable?: boolean
  }>(),
  {
    editable: true
  }
)
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
      :editable="editable"
    />
  </div>
</template>
