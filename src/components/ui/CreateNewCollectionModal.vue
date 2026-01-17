<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { ref, watch, computed } from 'vue'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'created'): void
}>()

const enterName = ref('')
const enterDescription = ref('')
const enterPriority = ref('medium')
const enterTags = ref('')
const loading = ref(false)
const showErrors = ref(false)

const isValid = computed(() => enterName.value.trim().length > 0)

interface CollectionResponse {
  data: {
    id: number
    name: string
    [key: string]: any
  }
}

// Reset form when modal closes
watch(
  () => props.show,
  newVal => {
    if (!newVal) {
      enterName.value = ''
      enterDescription.value = ''
      enterPriority.value = 'medium'
      enterTags.value = ''
      showErrors.value = false
    }
  }
)

const saveCollection = async () => {
  showErrors.value = true
  if (!isValid.value) return

  loading.value = true
  try {
    const tags = enterTags.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const response = (await api.post(API_ENDPOINTS.collections.create, {
      name: enterName.value.trim(),
      description: enterDescription.value.trim() || null,
      priority_level: enterPriority.value,
      tags: tags.length > 0 ? tags : null
    })) as CollectionResponse

    // console.log('Collection created:', response.data)
    emit('created')
    emit('close')
  } catch (error) {
    // console.error('Failed to create collection:', error)
    alert('Failed to create collection. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseModal
    :show="props.show"
    title="Add Collection"
    @close="emit('close')"
    @save="saveCollection"
  >
    <p class="text-foreground-muted">
      Enter Collection Name
      <span class="text-red-500">*</span>
    </p>
    <input
      v-model="enterName"
      :class="[
        'w-full resize-none rounded-sm border p-2',
        showErrors && !enterName.trim() ? 'border-red-500' : 'border-border'
      ]"
      placeholder="e.g., Vue 3 Basics"
      :disabled="loading"
    />
    <p
      v-if="showErrors && !enterName.trim()"
      class="mt-1 text-sm text-red-500"
    >
      Collection name is required
    </p>

    <p class="text-foreground-muted mt-5">Enter Description</p>
    <textarea
      v-model="enterDescription"
      class="border-border w-full resize-none rounded-sm border p-2"
      rows="3"
      placeholder="e.g., Learn the fundamentals of Vue 3"
      :disabled="loading"
    />

    <p class="text-foreground-muted mt-5">Enter Priority</p>
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

    <p class="text-foreground-muted mt-5">Enter Tags (Optional)</p>
    <input
      v-model="enterTags"
      class="border-border w-full rounded-sm border p-2"
      placeholder="e.g., Vue, JavaScript, Frontend (comma-separated)"
      :disabled="loading"
    />
  </BaseModal>
</template>
