<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const question = ref('')
const answer = ref('')
const hint = ref('')

const saveCard = () => {
  if (!question.value || !answer.value) return

  console.log('Saving card:', {
    question: question.value,
    answer: answer.value,
    hint: hint.value
  })

  emit('close')
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
    <textarea v-model="question" class="border p-2 w-full resize-none" />

    <p class="text-foreground-muted mt-4">Enter Answer</p>
    <input v-model="answer" class="border p-2 w-full" />

    <div class="h-px mx-5 bg-foreground my-10"></div>

    <p class="text-foreground-muted">Enter Hint (Optional)</p>
    <input v-model="hint" class="border p-2 w-full" />
  </BaseModal>
</template>
