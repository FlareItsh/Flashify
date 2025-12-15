<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { ref, watch, computed } from 'vue'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

const props = defineProps<{
  show: boolean
  flashcard: any
  collectionId: string | number
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updated'): void
}>()

const question = ref('')
const answer = ref('')
const hint = ref('')
const explanation = ref('')
const loading = ref(false)
const showErrors = ref(false)

const isValid = computed(() => question.value.trim().length > 0 && answer.value.trim().length > 0)

// Populate form when flashcard changes
watch(
  () => props.flashcard,
  newVal => {
    if (newVal) {
      question.value = newVal.front || ''
      answer.value = newVal.back || ''
      hint.value = newVal.hint || ''
      explanation.value = newVal.explaination || ''
      showErrors.value = false
    }
  },
  { immediate: true }
)

const updateFlashcard = async () => {
  showErrors.value = true
  if (!isValid.value) return

  loading.value = true
  try {
    const response = (await api.put(
      API_ENDPOINTS.flashcards.update(props.collectionId, props.flashcard.flashcard_id),
      {
        front: question.value.trim(),
        back: answer.value.trim(),
        hint: hint.value.trim() || null,
        explaination: explanation.value.trim() || null
      }
    )) as any

    console.log('Flashcard updated:', response.data)
    emit('updated')
    emit('close')
  } catch (error) {
    console.error('Failed to update flashcard:', error)
    alert('Failed to update flashcard. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseModal
    :show="props.show"
    title="Edit Card"
    @close="emit('close')"
    @save="updateFlashcard"
  >
    <p class="text-foreground-muted">
      Question
      <span class="text-red-500">*</span>
    </p>
    <textarea
      v-model="question"
      :class="[
        'w-full resize-none rounded-sm border p-2',
        showErrors && !question.trim() ? 'border-red-500' : 'border-border'
      ]"
      rows="3"
      placeholder="e.g., What is Vue 3?"
      :disabled="loading"
    />
    <p
      v-if="showErrors && !question.trim()"
      class="mt-1 text-sm text-red-500"
    >
      Question is required
    </p>

    <p class="text-foreground-muted mt-4">
      Answer
      <span class="text-red-500">*</span>
    </p>
    <textarea
      v-model="answer"
      :class="[
        'w-full resize-none rounded-sm border p-2',
        showErrors && !answer.trim() ? 'border-red-500' : 'border-border'
      ]"
      rows="3"
      placeholder="e.g., A progressive JavaScript framework"
      :disabled="loading"
    />
    <p
      v-if="showErrors && !answer.trim()"
      class="mt-1 text-sm text-red-500"
    >
      Answer is required
    </p>

    <div class="bg-foreground mx-5 my-10 h-px"></div>

    <p class="text-foreground-muted">Hint (Optional)</p>
    <input
      v-model="hint"
      class="border-border w-full rounded-sm border p-2"
      placeholder="e.g., Frontend framework"
      :disabled="loading"
    />

    <p class="text-foreground-muted mt-4">Explanation (Optional)</p>
    <textarea
      v-model="explanation"
      class="border-border w-full resize-none rounded-sm border p-2"
      rows="3"
      placeholder="e.g., Vue 3 is the latest major version with Composition API..."
      :disabled="loading"
    />
  </BaseModal>
</template>
