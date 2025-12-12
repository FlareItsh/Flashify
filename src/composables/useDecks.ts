import { ref } from 'vue'

interface Deck {
  id: number
  title: string
  description: string
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  priority: 'low' | 'medium' | 'high'
}

const decks = ref<Deck[]>([
  {
    id: 1,
    title: "What is Vue 3?",
    description: "A progressive JavaScript framework for building user interfaces",
    tags: ["Vue", "JavaScript", "Frontend"],
    difficulty: "medium",
    priority: "high",
  },
  {
    id: 2,
    title: "TypeScript Basics",
    description: "Understanding types and interfaces in TypeScript",
    tags: ["TypeScript", "Programming"],
    difficulty: "easy",
    priority: "medium",
  },
  {
    id: 3,
    title: "Advanced CSS Techniques",
    description: "Explore modern CSS features and methodologies",
    tags: ["CSS", "Web Design"],
    difficulty: "hard",
    priority: "low",
  },

])

export function useDecks() {
  return { decks }
}
