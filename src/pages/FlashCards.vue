<script setup lang="ts">
import Heading from '@/components/ui/Heading.vue'
import Button from '@/components/ui/Button.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import Flashcard from '@/components/ui/Flashcard.vue'
import CreateNewCard from '@/components/ui/CreateNewCard.vue'
import { useModal } from '@/composables/useModal'
import { defineProps, ref } from 'vue'

const props = defineProps<{ id: string }>()
const deckIndex = Number(props.id)

const createNewCardModal = useModal()

const decks = ref([
    {
        title: "What is Vue 3?",
        description: "A progressive JavaScript framework",
        cards: [
            { question: "What is Vue?", answer: "A JS framework", hint: "Frontend" },
            { question: "What is reactivity?", answer: "Automatic updates", hint: "Ref" },
            { question: "What is reactivity?", answer: "Automatic updates", hint: "Ref" },
            { question: "What is reactivity?", answer: "Automatic updates", hint: "Ref" },
            { question: "What is reactivity?", answer: "Automatic updates", hint: "Ref" },
            { question: "What is reactivity?", answer: "Automatic updates", hint: "Ref" },
            { question: "What is reactivity?", answer: "Automatic updates", hint: "Ref" },
            { question: "What is reactivity?", answer: "Automatic updates", hint: "Ref" },
        ]
    },
    {
        title: "TypeScript Basics",
        description: "Understanding types and interfaces",
        cards: [
            { question: "What is TS?", answer: "A superset of JS", hint: "Better than JS" }
        ]
    },
    {
        title: "Advanced CSS Techniques",
        description: "Explore modern CSS features",
        cards: []
    }
])

const selectedDeck = decks.value[deckIndex]
</script>

<template>
    <AppLayout>
        <div class="flex flex-wrap items-center justify-between">
            <Heading title="Flash Cards" subtitle="Manage your flashcards here." />
            <div class="mb-4">
                <Button variant="secondary" @click="createNewCardModal.open">
                    Create New Card
                </Button>
            </div>
        </div>

        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Flashcard
                v-for="(card, idx) in selectedDeck.cards"
                :key="idx"
                :question="card.question"
                :answer="card.answer"
                :hint="card.hint"
            />
        </div>
        <CreateNewCard
          :show="createNewCardModal.show.value"
          @close="createNewCardModal.close"
        />
    </AppLayout>
</template>
