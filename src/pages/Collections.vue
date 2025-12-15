<script setup lang="ts">
import Deck from '@/components/ui/Deck.vue'
import Heading from '@/components/ui/Heading.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import DashboardCardLayout from '@/layouts/DashboardCardLayout.vue'
import Button from '@/components/ui/Button.vue'
import { useModal } from '@/composables/useModal'
import CreateNewCollectionModal from '@/components/ui/CreateNewCollectionModal.vue'
import EditCollectionModal from '@/components/ui/EditCollectionModal.vue'
import { useDecks } from '@/composables/useDecks'

const createNewCollModal = useModal()
const editCollModal = useModal()
const { decks } = useDecks()
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

const listOfCollections = ref<Array<any>>([])
const selectedCollection = ref<any>(null)

const fetchCollections = async () => {
  const token = api.getAuthToken()
  if (token) {
    try {
      const response = await api.get<any>(API_ENDPOINTS.collections.list)
      const collections = response.data?.data?.data || response.data?.data || []
      listOfCollections.value = collections
    } catch (error) {
      console.error('Failed to fetch Collections and Flashcards info:', error)
    }
  }
}

const handleCollectionCreated = () => {
  fetchCollections() // Refresh the list
}

const handleCollectionUpdated = () => {
  fetchCollections() // Refresh the list
}

const openEditModal = (collection: any) => {
  selectedCollection.value = collection
  editCollModal.open()
}

onMounted(() => {
  fetchCollections()
})
</script>

<template>
  <AppLayout>
    <div class="flex flex-wrap items-center justify-between">
      <Heading
        title="Collections"
        subtitle="Manage your flashcard collections here."
      />
      <div class="mb-4">
        <Button
          variant="secondary"
          @click="createNewCollModal.open"
        >
          Create New Collection
        </Button>
      </div>
    </div>
    <DashboardCardLayout>
      <Deck
        v-for="collection in listOfCollections"
        :key="collection.collection_id"
        :id="collection.collection_id"
        :title="collection.name"
        :description="collection.description || 'No description'"
        :tags="collection.tags || []"
        :priority="collection.priority_level"
        :editable="true"
        @edit="openEditModal(collection)"
      />
      <div
        v-if="listOfCollections.length === 0"
        class="text-foreground-muted col-span-full py-8 text-center"
      >
        No collections yet. Create your first collection to get started!
      </div>
    </DashboardCardLayout>
    <CreateNewCollectionModal
      :show="createNewCollModal.show.value"
      @close="createNewCollModal.close"
      @created="handleCollectionCreated"
    />
    <EditCollectionModal
      :show="editCollModal.show.value"
      :collection="selectedCollection"
      @close="editCollModal.close"
      @updated="handleCollectionUpdated"
    />
  </AppLayout>
</template>
