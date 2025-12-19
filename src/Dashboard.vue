<script setup lang="ts">
import DashboardCard from '@/components/ui/DashboardCard.vue'
import DashboardCardLayout from '@/layouts/DashboardCardLayout.vue'
import Heading from '@/components/ui/Heading.vue'
import HeadingSmall from '@/components/ui/HeadingSmall.vue'
import Deck from '@/components/ui/Deck.vue'
import Button from '@/components/ui/Button.vue'
import { RouterLink } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'
import { Library, BookCopy, BookOpenCheck } from 'lucide-vue-next'

const totalCollections = ref(0)
const totalFlashcards = ref(0)
const lastStudied = ref<string | null>(null)
const listOfCollections = ref<Array<any>>([])

onMounted(async () => {
  const token = api.getAuthToken()
  if (token) {
    try {
      const response = await api.get<any>(API_ENDPOINTS.collections.list)
      // Access the stats object from the response
      const stats = response.data?.stats || response.stats
      if (stats) {
        totalCollections.value = stats.collections_count || 0
        totalFlashcards.value = stats.flashcards_count || 0
      }
      // Access collections from paginated response
      const collections = response.data?.data?.data || response.data?.data || []
      listOfCollections.value = collections?.slice(0, 3) || []

      // Find the most recently studied collection
      const studiedCollections = collections.filter((c: any) => c.last_studied_at)
      if (studiedCollections.length > 0) {
        const mostRecent = studiedCollections.reduce((prev: any, current: any) => {
          return new Date(current.last_studied_at) > new Date(prev.last_studied_at) ? current : prev
        })
        lastStudied.value = mostRecent.name
      }
    } catch (error) {
      console.error('Failed to fetch Collections and Flashcards info:', error)
    }
  }
})
</script>

<template>
  <AppLayout>
    <Heading
      title="Dashboard"
      subtitle="Overview of your activity"
    />

    <DashboardCardLayout>
      <DashboardCard
        title="Total Collections"
        :value="totalCollections"
        :icon="Library"
        description="Total collections created"
      />
      <DashboardCard
        title="Total Flashcards"
        :value="totalFlashcards"
        :icon="BookCopy"
        description="Total flashcards created"
      />
      <DashboardCard
        title="Recenlty Studied"
        :value="lastStudied || 'Nothing yet'"
        :icon="BookOpenCheck"
        description="Last collection you studied"
      />
    </DashboardCardLayout>

    <HeadingSmall
      title="Recent Collections"
      subtitle="Your recently created flashcard collections"
      class="mt-4"
    />

    <DashboardCardLayout class="flex-1">
      <Deck
        v-for="collection in listOfCollections"
        :key="collection.collection_id"
        :id="collection.collection_id"
        :title="collection.name"
        :description="collection.description || 'No description'"
        :tags="collection.tags || []"
        :priority="collection.priority_level"
      />
      <div
        v-if="listOfCollections.length === 0"
        class="text-foreground-muted col-span-full py-8 text-center"
      >
        No collections yet. Create your first collection to get started!
      </div>
    </DashboardCardLayout>
    <div class="mt-4 flex justify-center">
      <RouterLink to="/collections">
        <Button variant="secondary">View All Collections</Button>
      </RouterLink>
    </div>
  </AppLayout>
</template>
