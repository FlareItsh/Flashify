<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight, Home } from 'lucide-vue-next'

const route = useRoute()

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(p => p)
  const crumbs = [{ name: 'Home', path: '/dashboard' }]

  pathArray.forEach((segment, index) => {
    const path = '/' + pathArray.slice(0, index + 1).join('/')
    const name = segment.charAt(0).toUpperCase() + segment.slice(1)
    crumbs.push({ name, path })
  })

  return crumbs
})
</script>

<template>
  <nav class="border-border bg-sidebar border-b px-6 py-5.5">
    <ol class="flex items-center gap-2 text-sm">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="crumb.path"
        class="flex items-center gap-2"
      >
        <RouterLink
          v-if="index === 0"
          :to="crumb.path"
          class="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <Home class="h-4 w-4" />
          <span>{{ crumb.name }}</span>
        </RouterLink>
        <RouterLink
          v-else-if="index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="text-muted-foreground hover:text-foreground transition-colors"
        >
          {{ crumb.name }}
        </RouterLink>
        <span
          v-else
          class="text-foreground font-medium"
        >
          {{ crumb.name }}
        </span>
        <ChevronRight
          v-if="index < breadcrumbs.length - 1"
          class="text-muted-foreground h-4 w-4"
        />
      </li>
    </ol>
  </nav>
</template>
