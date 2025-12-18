  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Flashcard from '@/components/ui/Flashcard.vue'
  import AppLayout from '@/layouts/AppLayout.vue'
  import Heading from '@/components/ui/Heading.vue'
  import Button from '@/components/ui/Button.vue'
  import { Shuffle, ArrowLeft } from 'lucide-vue-next'
  import { useRouter } from 'vue-router'
  import api from '@/services/api'
  import { API_ENDPOINTS } from '@/config/api'

  const props = defineProps<{ deckId: string }>()
  const collectionId = props.deckId

  const router = useRouter()
  const collection = ref<any>(null)
  const flashcards = ref<Array<any>>([])
  const loading = ref(true)
  const currentIndex = ref(0)

  function next() {
    if (flashcards.value.length === 0) return
    currentIndex.value = (currentIndex.value + 1) % flashcards.value.length
  }

  function prev() {
    if (flashcards.value.length === 0) return
    currentIndex.value = (currentIndex.value - 1 + flashcards.value.length) % flashcards.value.length
  }

  function goTo(index: number) {
    currentIndex.value = index
  }

  function shuffle() {
    if (flashcards.value.length === 0) return
    const shuffled = [...flashcards.value]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    flashcards.value = shuffled
    currentIndex.value = 0
  }

  function goBack() {
    router.push({ name: 'study-list' })
  }

  onMounted(async () => {
    const token = api.getAuthToken()
    if (token) {
      try {
        const collectionResponse = await api.get<any>(API_ENDPOINTS.collections.get(collectionId))
        collection.value = collectionResponse.data?.data || collectionResponse.data

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

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })
</script>

  <template>
    <AppLayout>
      <div class="mb-2">
        <button @click="goBack" class="flex items-center gap-2 px-2">
          <ArrowLeft class="h-4 w-4" />
          Back to Study
        </button>
      </div>

      <div v-if="loading" class="text-foreground-muted text-center text-lg">
        Loading flashcards...
      </div>

      <div v-else-if="collection" class="flex h-full flex-col">
        <Heading :title="collection.name"
          :subtitle="`${flashcards.length} flashcard${flashcards.length !== 1 ? 's' : ''}`" />

        <div v-if="flashcards.length > 0" class=" relative flex flex-col items-center flex-1">
          <!-- Shuffle Button - raised above cards on mobile -->
          <div class="relative mb-20 z-10 my-4 flex w-full justify-center px-4 sm:my-6">
            <Button @click="shuffle" variant="secondary" size="default">
              <Shuffle class="h-5 w-5" />
            </Button>
          </div>

          <!-- Coverflow Container - only affects mobile (pointer-events fix) -->
          <div class="coverflow-container mx-auto w-full max-w-7xl flex-1 mt-42 sm:mt-5 pointer-events-none md:pointer-events-auto">
            <div v-for="(card, index) in flashcards" :key="card.flashcard_id" class="coverflow-item pointer-events-auto"
              :style="{
                transform: `
                translateX(${(index - currentIndex) * 100}px)
                translateY(${Math.abs(index - currentIndex) * 10}px)
                translateZ(${-Math.abs(index - currentIndex) * 100}px)
                scale(${index === currentIndex ? 1 : 0.92})
              `,
                zIndex: flashcards.length - Math.abs(index - currentIndex),
                opacity: Math.abs(index - currentIndex) > 3 ? 0 : 1
              }" @click="goTo(index)">
              <Flashcard :question="card.front" :answer="card.back" :hint="card.hint"
                :explanation="card.explaination" />
            </div>
          </div>

          <!-- Navigation Controls - always clickable -->
          <div
            class="relative z-10 mt-25 grid grid-cols-3 items-center gap-3 px-4 pb-4 sm:mt-8 sm:gap-4 sm:pb-6 w-full max-w-md">
            <Button @click="prev" size="lg" variant="outline" class="w-full">
              Previous
            </Button>

            <div class="text-center">
              <p class="text-lg font-semibold sm:text-xl">
                {{ currentIndex + 1 }} / {{ flashcards.length }}
              </p>
            </div>

            <Button @click="next" size="lg" variant="outline" class="w-full">
              Next
            </Button>
          </div>
        </div>

        <div v-else class="text-foreground-muted mt-20 text-center text-lg">
          This collection has no flashcards yet.
        </div>
      </div>

      <div v-else class="text-foreground-muted mt-20 text-center text-lg">
        Collection not found.
      </div>
    </AppLayout>
  </template>

<style scoped>
.coverflow-container {
  position: relative;
  width: 90%;
  height: 520px;
  perspective: 1090px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  padding-left: 50px;
  padding-right: 50px;
}

.coverflow-item {
  position: absolute;
  width: 320px;
  height: 520px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  transform-style: preserve-3d;
}

@media (min-width: 640px) {
  .coverflow-container {
    padding-left: 80px;
    padding-right: 80px;
  }

  .coverflow-item {
    width: 380px;
  }
}

@media (min-width: 768px) {
  .coverflow-container {
    height: 480px;
    padding-left: 120px;
    padding-right: 120px;
  }

  .coverflow-item {
    width: 420px;
    height: 480px;
  }
}
</style>
