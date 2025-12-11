<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Flashcard from '@/components/ui/Flashcard.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import Heading from '@/components/ui/Heading.vue'
import Button from '@/components/ui/Button.vue'

const props = defineProps<{ deckId: string }>()

const decks = ref([
  {
    id: 1,
    title: "What is Vue 3?",
    description: "A progressive JavaScript framework",
    cards: [
      { question: "What is Vue?", answer: "A JavaScript framework for building UIs", hint: "Frontend framework" },
      { question: "What is the Composition API?", answer: "A way to organize logic using functions", hint: "New in Vue 3" },
      { question: "What is a ref?", answer: "A reactive reference to a value", hint: "use ref() in Vue" },
      { question: "What does computed() do?", answer: "Creates a cached reactive value", hint: "Derived state" },
      { question: "When to use watchEffect?", answer: "To track reactive changes automatically", hint: "Side effects" },
      { question: "What is provide/inject?", answer: "A way to pass data through component hierarchy", hint: "Alternative to props" },
      { question: "What is a Teleport in Vue?", answer: "Moves a component to another DOM location", hint: "DOM manipulation" },
      { question: "How do you define a component in Vue 3?", answer: "Using defineComponent() or SFC syntax", hint: "Single File Component" },
    ]
  },
  {
    id: 2,
    title: "TypeScript Basics",
    description: "Understanding types and interfaces",
    cards: [
      { question: "What is TypeScript?", answer: "A typed superset of JavaScript", hint: "Adds types to JS" },
      { question: "What is an interface?", answer: "A way to define object shapes", hint: "Type contracts" },
      { question: "What is a type alias?", answer: "A custom name for a type", hint: "type MyType = ..." },
      { question: "What is the difference between any and unknown?", answer: "unknown is safer, any disables type checks", hint: "Type safety" },
      { question: "What is a union type?", answer: "A variable that can hold multiple types", hint: "e.g., string | number" },
      { question: "What is type inference?", answer: "TypeScript automatically determines the type", hint: "No explicit type needed" },
    ]
  },
  {
    id: 3,
    title: "Advanced CSS Techniques",
    description: "Explore modern CSS features",
    cards: [
      { question: "What is Flexbox?", answer: "A layout module for flexible boxes", hint: "display: flex" },
      { question: "What is CSS Grid?", answer: "A layout system with rows and columns", hint: "display: grid" },
      { question: "What are CSS variables?", answer: "Custom properties for reusability", hint: "--my-color: red;" },
      { question: "What is the difference between relative and absolute positioning?", answer: "Absolute positions relative to nearest positioned ancestor", hint: "position property" },
      { question: "What is a pseudo-class?", answer: "Selectors like :hover or :focus", hint: "States of elements" },
      { question: "What is a pseudo-element?", answer: "Selectors like ::before or ::after", hint: "Virtual elements" },
    ]
  }
])



const selectedDeck = decks.value.find(d => d.id === Number(props.deckId))
const currentIndex = ref(0)

function next() {
  if (!selectedDeck) return
  currentIndex.value = (currentIndex.value + 1) % selectedDeck.cards.length
}

function prev() {
  if (!selectedDeck) return
  currentIndex.value = (currentIndex.value - 1 + selectedDeck.cards.length) % selectedDeck.cards.length
}

function goTo(index: number) {
  currentIndex.value = index
}

onMounted(() => {
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
    <div v-if="selectedDeck">
      <Heading :title="selectedDeck.title" :subtitle="selectedDeck.description" />

      <div v-if="selectedDeck.cards.length > 0" class="flex flex-col items-center">
        <div class="coverflow-container">
          <div
            v-for="(card, index) in selectedDeck.cards"
            :key="index"
            class="coverflow-item"
            :style="{
              transform: `
                translateX(${(index - currentIndex) * 95}px)
                translateY(${Math.abs(index - currentIndex) * 18}px)
                translateZ(${-Math.abs(index - currentIndex) * 110}px)
                scale(${index === currentIndex ? 1 : 0.9})
              `,
              zIndex: selectedDeck.cards.length - Math.abs(index - currentIndex),
              opacity: Math.abs(index - currentIndex) > 3 ? 0 : 1
            }"
            @click="goTo(index)"
          >
            <Flashcard
              :question="card.question"
              :answer="card.answer"
              :hint="card.hint"
            />
          </div>
        </div>

        <div class="mt-12 flex items-center gap-12">
          <Button @click="prev" size="lg" variant="outline">Previous</Button>

          <div class="text-center min-w-96">
            <p class="text-xl font-semibold text-gray-800">
              {{ currentIndex + 1 }} / {{ selectedDeck.cards.length }}
            </p>
          </div>

          <Button @click="next" size="lg" variant="outline">Next</Button>
        </div>
      </div>

      <div v-else class="mt-20 text-center text-gray-500 text-lg">
        This deck has no cards yet.
      </div>
    </div>

    <div v-else class="mt-20 text-center text-gray-500 text-lg">
      Deck not found.
    </div>
  </AppLayout>
</template>

<style scoped>
.coverflow-container {
  position: relative;
  width: 100%;
  height: 520px;
  perspective: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.coverflow-item {
  position: absolute;
  width: 360px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  transform-style: preserve-3d;
}
</style>
