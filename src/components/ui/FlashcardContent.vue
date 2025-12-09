<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    tags?: string[]
    difficulty?: 'easy' | 'medium' | 'hard'
  }>(),
  {
    title: 'Flashcard Title',
    description: 'Flashcard description or content',
    tags: () => [],
    difficulty: 'medium'
  }
)
</script>

<template>
  <div>
    <h3 class="mb-2 text-lg font-semibold">{{ title }}</h3>
    <p class="text-muted-foreground mb-3">{{ description }}</p>
    <div class="flex items-center gap-2">
      <span
        v-for="tag in tags"
        :key="tag"
        class="bg-primary/10 text-primary rounded px-2 py-1 text-xs"
      >
        {{ tag }}
      </span>
      <span
        v-if="difficulty"
        class="ml-auto text-xs font-medium"
        :class="{
          'text-green-500': difficulty === 'easy',
          'text-yellow-500': difficulty === 'medium',
          'text-red-500': difficulty === 'hard'
        }"
      >
        {{ difficulty }}
      </span>
    </div>
  </div>
</template>
