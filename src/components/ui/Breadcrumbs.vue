<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'
import { useDecks } from '@/composables/useDecks'

const route = useRoute()
const { decks } = useDecks() 

const breadcrumbs = computed(() => {
  const crumbs = [{ name: 'Home', path: '/dashboard' }]

  if (route.path.includes('/collections') || route.path.includes('/flashcard')) {
    crumbs.push({ name: 'Collections', path: '/collections' })
  }

  if (route.name === 'flashcard' && route.params.id !== undefined) {
    const deckIndex = Number(route.params.id)
    if (!isNaN(deckIndex) && decks.value[deckIndex]) {
      crumbs.push({ name: decks.value[deckIndex].title, path: route.fullPath })
    }
  }

  return crumbs
})
</script>


<template>
  <nav class="border-border bg-sidebar border-b px-6 py-5.5">
    <ol class="flex items-center gap-2 text-sm">
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.path" class="flex items-center gap-2">
        <RouterLink
          v-if="index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>{{ crumb.name }}</span>
        </RouterLink>

        <span v-else class="text-foreground font-medium">
          {{ crumb.name }}
        </span>

        <ChevronRight v-if="index < breadcrumbs.length - 1" class="text-muted-foreground h-4 w-4" />
      </li>
    </ol>
  </nav>
</template>
