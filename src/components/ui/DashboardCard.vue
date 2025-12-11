<script setup lang="ts">
import type { Component } from 'vue'
import { Component as ComponentIcon } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    title?: string
    value?: string | number
    icon?: Component
    description?: string
  }>(),
  {
    title: 'Dashboard Card',
    value: '0',
    icon: () => ComponentIcon,
    description: 'Dashboard Card description'
  }
)
</script>

<template>
  <div class="bg-card border-border bg-primary/10 rounded-lg border p-6 shadow-md">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-semibold">{{ title }}</h2>
      <component
        :is="icon"
        class="text-primary h-8 w-8"
      />
    </div>
    <p class="text-primary mb-4 text-center text-4xl font-bold">{{ value }}</p>
    <p class="text-foreground-subtle text-sm">{{ description }}</p>
  </div>
</template>
