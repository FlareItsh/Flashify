<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
    default: 'Title Text'
  },
  subtitle: {
    type: String,
    required: false,
    default: 'Sub Title Text'
  }
})
</script>

<template>
  <div class="mb-4 space-y-1">
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <p class="text-foreground-muted text-xs">{{ subtitle }}</p>
  </div>
</template>
