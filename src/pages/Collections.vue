<script setup lang="ts">
import Deck from '@/components/ui/Deck.vue'
import Heading from '@/components/ui/Heading.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import DashboardCardLayout from '@/layouts/DashboardCardLayout.vue'
import Button from '@/components/ui/Button.vue'
import { useModal } from '@/composables/useModal'
import CreateNewCollectionModal from '@/components/ui/CreateNewCollectionModal.vue'
import { useDecks } from '@/composables/useDecks'
const createNewCollModal = useModal()
const { decks } = useDecks()


</script>

<template>
  <AppLayout>
    <div class="flex flex-wrap items-center justify-between">
      <Heading
        title="Collections"
        subtitle="Manage your flashcard collections here."
      />
      <div class="mb-4">
        <Button variant="secondary" @click="createNewCollModal.open">Create New Collection</Button>
      </div>  
    </div>
    <DashboardCardLayout>
      <Deck
    v-for="(deck, index) in decks"
    :key="index"
    :id="index"
    :title="deck.title"
    :description="deck.description"
    :tags="deck.tags"
    :difficulty="deck.difficulty"
    :priority="deck.priority"
  />
    </DashboardCardLayout>
    <CreateNewCollectionModal
      :show="createNewCollModal.show.value"
      @close="createNewCollModal.close"
    />
  </AppLayout>
</template>
