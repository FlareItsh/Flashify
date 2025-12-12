<script setup lang="ts">
import DeckContent from './DeckContent.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: number
  title?: string
  description?: string
  tags?: string[]
  priority?: 'low' | 'medium' | 'high'
  editable?: boolean
}>()

const router = useRouter()

const goToFlashcard = () => {
  router.push({ name: 'flashcard', params: { id: props.id } })
}
</script>

<template>
  <div
    class="border-border h-full rounded-lg border p-6 shadow-md transition-shadow hover:shadow-md cursor-pointer"
    @click="goToFlashcard"
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
