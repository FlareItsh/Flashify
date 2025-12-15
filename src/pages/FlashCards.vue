<script setup lang="ts">
import Heading from '@/components/ui/Heading.vue'
import Button from '@/components/ui/Button.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import Flashcard from '@/components/ui/Flashcard.vue'
import CreateNewCard from '@/components/ui/CreateNewCard.vue'
import EditFlashcardModal from '@/components/ui/EditFlashcardModal.vue'
import { useModal } from '@/composables/useModal'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'
import { ArrowLeft } from 'lucide-vue-next'

const props = defineProps<{ id: string }>()
const collectionId = props.id

const router = useRouter()
const createNewCardModal = useModal()
const editCardModal = useModal()

const collection = ref<any>(null)
const flashcards = ref<Array<any>>([])
const selectedFlashcard = ref<any>(null)
const loading = ref(true)

const fetchFlashcards = async () => {
  const token = api.getAuthToken()
  if (token) {
    try {
      // Fetch collection details
      const collectionResponse = await api.get<any>(API_ENDPOINTS.collections.get(collectionId))
      collection.value = collectionResponse.data?.data || collectionResponse.data

      // Fetch flashcards for this collection
      const flashcardsResponse = await api.get<any>(API_ENDPOINTS.flashcards.list(collectionId))
      const flashcardsData =
        flashcardsResponse.data?.data?.data || flashcardsResponse.data?.data || []
      flashcards.value = flashcardsData
    } catch (error) {
      console.error('Failed to fetch collection or flashcards:', error)
    } finally {
      loading.value = false
    }
  }
}

const handleCardCreated = () => {
  fetchFlashcards() // Refresh the list
}

const handleCardUpdated = () => {
  fetchFlashcards() // Refresh the list
}

const openEditModal = (flashcard: any) => {
  selectedFlashcard.value = flashcard
  editCardModal.open()
}

const goBack = () => {
  router.push({ name: 'collections' })
}

onMounted(() => {
  fetchFlashcards()
})
</script>

<template>
  <AppLayout>
    <div class="mb-2">
      <button
        @click="goBack"
        class="flex items-center gap-2 px-2"
      >
        <ArrowLeft class="h-4 w-4" />
        Back to Study
      </button>
    </div>

    <div class="flex flex-wrap items-center justify-between">
      <Heading
        :title="collection?.name || 'Flash Cards'"
        :subtitle="`${flashcards.length} flashcard${flashcards.length !== 1 ? 's' : ''}`"
      />
      <div class="mb-4">
        <Button
          variant="secondary"
          @click="createNewCardModal.open"
        >
          Create New Card
        </Button>
      </div>
    </div>

    <div
      v-if="loading"
      class="text-foreground-muted mt-6 text-center"
    >
      Loading flashcards...
    </div>

    <div
      v-else-if="flashcards.length === 0"
      class="text-foreground-muted mt-6 text-center"
    >
      No flashcards yet. Create your first flashcard to get started!
    </div>

    <div
      v-else
      class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <Flashcard
        v-for="card in flashcards"
        :key="card.flashcard_id"
        :question="card.front"
        :answer="card.back"
        :hint="card.hint"
        :explanation="card.explaination"
        :editable="true"
        @edit="openEditModal(card)"
      />
    </div>
    <CreateNewCard
      :show="createNewCardModal.show.value"
      :collection-id="collectionId"
      @close="createNewCardModal.close"
      @created="handleCardCreated"
    />
    <EditFlashcardModal
      :show="editCardModal.show.value"
      :flashcard="selectedFlashcard"
      :collection-id="collectionId"
      @close="editCardModal.close"
      @updated="handleCardUpdated"
    />
  </AppLayout>
</template>
