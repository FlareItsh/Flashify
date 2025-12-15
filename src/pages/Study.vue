<script setup lang="ts">
import Deck from '@/components/ui/Deck.vue'
import Heading from '@/components/ui/Heading.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import DashboardCardLayout from '@/layouts/DashboardCardLayout.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

const router = useRouter()
const listOfCollections = ref<Array<any>>([])
const loading = ref(true)

function goToStudy(id: number) {
  router.push({ name: 'study-mode', params: { deckId: id } })
}

onMounted(async () => {
  const token = api.getAuthToken()
  if (token) {
    try {
      const response = await api.get<any>(API_ENDPOINTS.collections.list)
      const collections = response.data?.data?.data || response.data?.data || []
      listOfCollections.value = collections
    } catch (error) {
      console.error('Failed to fetch Collections:', error)
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <AppLayout>
    <Heading
      title="Study Mode"
      subtitle="Start studying your flashcards here."
    />

    <div
      v-if="loading"
      class="text-foreground-muted mt-6 text-center"
    >
      Loading collections...
    </div>

    <DashboardCardLayout v-else>
      <div
        v-for="collection in listOfCollections"
        :key="collection.collection_id"
        @click="goToStudy(collection.collection_id)"
        class="cursor-pointer"
      >
        <Deck
          :id="collection.collection_id"
          :title="collection.name"
          :description="collection.description || 'No description'"
          :tags="collection.tags || []"
          :priority="collection.priority_level"
          :editable="false"
        />
      </div>
      <div
        v-if="listOfCollections.length === 0"
        class="text-foreground-muted col-span-full py-8 text-center"
      >
        No collections yet. Create your first collection to get started!
      </div>
    </DashboardCardLayout>
  </AppLayout>
</template>
