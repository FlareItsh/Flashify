<script setup lang="ts">
import { SquarePen } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    title?: string
    description?: string
    tags?: string[]
    priority?: 'low' | 'medium' | 'high'
    editable?: boolean
  }>(),
  {
    title: 'Deck Title',
    description: 'Deck description or content',
    tags: () => [],
    difficulty: 'medium',
    priority: 'low',
    editable: true
  }
)
</script>

<template>
  <div class="flex h-full flex-col">
    <div
      class="flex items-center justify-between"
      :class="{ 'mb-2': !editable }"
    >
      <!-- Priority Badge -->
      <span
        v-if="priority"
        class="rounded-full px-3 py-1 text-xs font-semibold uppercase"
        :class="{
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300': priority === 'low',
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300':
            priority === 'medium',
          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300': priority === 'high'
        }"
      >
        {{ priority }}
      </span>
      <div class="bg-secondary rounded-full p-2"> 
        <SquarePen class="h-5 w-5 text-white" />
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-center">
      <h3 class="mb-2 text-center text-xl font-semibold">{{ title }}</h3>
      <p class="text-muted-foreground mb-3 text-center">{{ description }}</p>
    </div>
    <hr class="border-border" />
    <div class="mt-4 flex items-center gap-2">
      <span
        v-for="tag in tags"
        :key="tag"
        class="bg-primary/20 text-secondary rounded px-2 py-1 text-xs font-medium"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>
