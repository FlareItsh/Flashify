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

const emit = defineEmits<{
  (e: 'edit'): void
}>()

const router = useRouter()

const goToFlashcard = () => {
  router.push({ name: 'flashcard', params: { id: props.id } })
}

const handleEdit = () => {
  // No need to stopPropagation here since DeckContent already does it
  emit('edit')
}
</script>

<template>
  <div
    class="border-border bg-secondary/10 h-full cursor-pointer rounded-lg border p-6 shadow-md transition-shadow hover:shadow-md"
    @click="goToFlashcard"
  >
    <DeckContent
      :title="title"
      :description="description"
      :tags="tags"
      :priority="priority"
      :editable="editable"
      @edit="handleEdit"
    />
  </div>
</template>
