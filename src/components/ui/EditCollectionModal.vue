<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { ref, watch } from 'vue'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

const props = defineProps<{
  show: boolean
  collection: any
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updated'): void
}>()

const enterName = ref('')
const enterDescription = ref('')
const enterPriority = ref('medium')
const enterTags = ref('')
const loading = ref(false)

// Populate form when collection changes
watch(
  () => props.collection,
  newVal => {
    if (newVal) {
      enterName.value = newVal.name || ''
      enterDescription.value = newVal.description || ''
      enterPriority.value = newVal.priority_level || 'medium'
      enterTags.value = newVal.tags ? newVal.tags.join(', ') : ''
    }
  },
  { immediate: true }
)

const updateCollection = async () => {
  if (!enterName.value.trim()) return

  loading.value = true
  try {
    const tags = enterTags.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const response = (await api.put(
      API_ENDPOINTS.collections.update(props.collection.collection_id),
      {
        name: enterName.value.trim(),
        description: enterDescription.value.trim() || null,
        priority_level: enterPriority.value,
        tags: tags.length > 0 ? tags : null
      }
    )) as { data: any }

    console.log('Collection updated:', response.data)
    emit('updated')
    emit('close')
  } catch (error) {
    console.error('Failed to update collection:', error)
    alert('Failed to update collection. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseModal
    :show="props.show"
    title="Edit Collection"
    @close="emit('close')"
    @save="updateCollection"
  >
    <p class="text-foreground-muted">Collection Name</p>
    <input
      v-model="enterName"
      class="border-border w-full resize-none rounded-sm border p-2"
      placeholder="e.g., Vue 3 Basics"
      :disabled="loading"
    />

    <p class="text-foreground-muted mt-5">Description</p>
    <textarea
      v-model="enterDescription"
      class="border-border w-full resize-none rounded-sm border p-2"
      rows="3"
      placeholder="e.g., Learn the fundamentals of Vue 3"
      :disabled="loading"
    />

    <p class="text-foreground-muted mt-5">Priority</p>
    <div class="flex justify-between">
      <label class="flex cursor-pointer items-center gap-2">
        <input
          type="radio"
          value="low"
          v-model="enterPriority"
          class="accent-blue-500"
          :disabled="loading"
        />
        <span>Low</span>
      </label>

      <label class="flex cursor-pointer items-center gap-2">
        <input
          type="radio"
          value="medium"
          v-model="enterPriority"
          class="accent-yellow-500"
          :disabled="loading"
        />
        <span>Medium</span>
      </label>

      <label class="flex cursor-pointer items-center gap-2">
        <input
          type="radio"
          value="high"
          v-model="enterPriority"
          class="accent-red-500"
          :disabled="loading"
        />
        <span>High</span>
      </label>
    </div>

    <p class="text-foreground-muted mt-5">Tags (Optional)</p>
    <input
      v-model="enterTags"
      class="border-border w-full rounded-sm border p-2"
      placeholder="e.g., Vue, JavaScript, Frontend (comma-separated)"
      :disabled="loading"
    />
  </BaseModal>
</template>
