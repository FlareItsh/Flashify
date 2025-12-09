<script setup lang="ts">
import AppSidebar from '@/components/ui/AppSidebar.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content Area -->
    <main class="bg-background flex-1 overflow-y-auto">
      <!-- Add padding-top for mobile navbar -->
      <div class="h-full pt-14 md:pt-0">
        <RouterView />
      </div>
    </main>
  </div>
</template>
