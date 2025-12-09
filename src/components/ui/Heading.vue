<script setup lang="ts">
//Props for the Header
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
  <h3>{{ title }}</h3>
  <p>{{ subtitle }}</p>
</template>
