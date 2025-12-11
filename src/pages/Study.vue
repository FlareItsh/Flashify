
<script setup lang="ts">
import Deck from '@/components/ui/Deck.vue'
import Heading from '@/components/ui/Heading.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import DashboardCardLayout from '@/layouts/DashboardCardLayout.vue'
import { useDecks } from '@/composables/useDecks'
import { useRouter } from 'vue-router'

const { decks } = useDecks()
const router = useRouter()

function goToStudy(id: number) {
  router.push({ name: 'study-mode', params: { deckId: id } })
}
</script>

<template>
  <AppLayout>
    <Heading
      title="Study Mode"
      subtitle="Start studying your flashcards here."
    />
    <DashboardCardLayout>
      <div
        v-for="deck in decks"
        :key="deck.id"
        @click="goToStudy(deck.id)"
        class="cursor-pointer"
      >
        <Deck
          :title="deck.title"
          :description="deck.description"
          :tags="deck.tags"
          :difficulty="deck.difficulty"
          :priority="deck.priority"
          :editable="false"
        />
      </div>
    </DashboardCardLayout>


  </AppLayout>
</template>
