<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { ref, watch } from 'vue'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

const props = defineProps<{
  show: boolean
  collectionId: string | number
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'created'): void
}>()

const question = ref('')
const answer = ref('')
const hint = ref('')
const explanation = ref('')
const loading = ref(false)

// Reset form when modal closes
watch(
  () => props.show,
  newVal => {
    if (!newVal) {
      question.value = ''
      answer.value = ''
      hint.value = ''
      explanation.value = ''
    }
  }
)

const saveCard = async () => {
  if (!question.value.trim() || !answer.value.trim()) return

  loading.value = true
  try {
    const response = await api.post<any>(API_ENDPOINTS.flashcards.create(props.collectionId), {
      front: question.value.trim(),
      back: answer.value.trim(),
      hint: hint.value.trim() || null,
      explaination: explanation.value.trim() || null
    })

    console.log('Flashcard created:', response.data)
    emit('created')
    emit('close')
  } catch (error) {
    console.error('Failed to create flashcard:', error)
    alert('Failed to create flashcard. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseModal
    :show="props.show"
    title="Add Card"
    @close="emit('close')"
    @save="saveCard"
  >
    <p class="text-foreground-muted">Enter Question</p>
    <textarea
      v-model="question"
      class="w-full resize-none border p-2"
      rows="3"
      placeholder="e.g., What is Vue 3?"
      :disabled="loading"
    />

    <p class="text-foreground-muted mt-4">Enter Answer</p>
    <textarea
      v-model="answer"
      class="w-full resize-none border p-2"
      rows="3"
      placeholder="e.g., A progressive JavaScript framework"
      :disabled="loading"
    />

    <div class="bg-foreground mx-5 my-10 h-px"></div>

    <p class="text-foreground-muted">Enter Hint (Optional)</p>
    <input
      v-model="hint"
      class="w-full border p-2"
      placeholder="e.g., Frontend framework"
      :disabled="loading"
    />

    <p class="text-foreground-muted mt-4">Enter Explanation (Optional)</p>
    <textarea
      v-model="explanation"
      class="w-full resize-none border p-2"
      rows="3"
      placeholder="e.g., Vue 3 is the latest major version with Composition API..."
      :disabled="loading"
    />
  </BaseModal>
</template>
