<script setup lang="ts">
defineProps({
  lgrid: {
    type: Number,
    required: false,
    default: 3
  },
  mgrid: {
    type: Number,
    required: false,
    default: 2
  }
})
</script>

<template>
  <div :class="`grid grid-cols-1 gap-6 md:grid-cols-${mgrid} lg:grid-cols-${lgrid}`">
    <slot />
  </div>
</template>
