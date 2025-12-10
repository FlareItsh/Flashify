<script setup lang="ts">
import Heading from '@/components/ui/Heading.vue'
import Button from '@/components/ui/Button.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useModal } from '@/composables/useModal'
import { defineProps } from 'vue'

// Get the deck index/id from the route
const props = defineProps<{ id: string }>()
const deckIndex = Number(props.id)

const createNewCollModal = useModal()

// Example decks array (should match the one from your dashboard)
const decks = [
    { title: "What is Vue 3?", description: "A progressive JavaScript framework" },
    { title: "TypeScript Basics", description: "Understanding types and interfaces" },
    { title: "Advanced CSS Techniques", description: "Explore modern CSS features" }
]

// Get the selected deck
const selectedDeck = decks[deckIndex]
</script>

<template>
    <AppLayout>
        <div class="flex flex-wrap items-center justify-between">
            <Heading title="Flash Cards" subtitle="Manage your flashcards here." />
            <div class="mb-4">
                <Button variant="secondary" @click="createNewCollModal.open">Create New Card</Button>
            </div>
        </div>
        <!-- Example: list of flashcards for this deck -->
        <div class="mt-6 space-y-4">
            <div class="border p-4 rounded shadow" v-for="(card, idx) in selectedDeck.cards || []" :key="idx">
                {{ card.question }}
            </div>
        </div>
    </AppLayout>
</template>
