<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const enterName = ref('')
const enterDifficulty = ref('')
const enterPriority = ref('')
const enterDescription = ref('')

const saveCollection = () => {
  if (!enterName.value || !enterDifficulty.value) return

  console.log('Saving collection:', {
    name: enterName.value,
    difficulty: enterDifficulty.value,
    priority: enterPriority.value,
    enterDescription: enterDescription.value,
  })

  emit('close')
}
</script>

<template>
  <BaseModal
    :show="props.show"
    title="Add Collection"
    @close="emit('close')"
    @save="saveCollection"
  >
    <p class="text-foreground-muted">Enter Collection Name</p>
    <input v-model="enterName" class="border p-2 w-full resize-none" />

    <p class="text-foreground-muted mt-5">Enter Difficulty</p>
    <div class="flex justify-between">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="low"
          v-model="enterDifficulty"
          class="accent-blue-500"
        />
        <span>Easy</span>
      </label>

      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="medium"
          v-model="enterDifficulty"
          class="accent-yellow-500"
        />
        <span>Medium</span>
      </label>

      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="high"
          v-model="enterDifficulty"
          class="accent-red-500"
        />
        <span>Hard</span>
      </label>
    </div>


    <p class="text-foreground-muted mt-5">Enter Priority</p>
    <div class="flex justify-between">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="low"
          v-model="enterPriority"
          class="accent-blue-500"
        />
        <span>Low</span>
      </label>

      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="medium"
          v-model="enterPriority"
          class="accent-yellow-500"
        />
        <span>Medium</span>
      </label>

      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="high"
          v-model="enterPriority"
          class="accent-red-500"
        />
        <span>High</span>
      </label>
    </div>

    <p class="text-foreground-muted mt-5">Enter Description</p>
    <textarea v-model="enterDescription" class="border p-2 w-full resize-none" />
  </BaseModal>
</template>
