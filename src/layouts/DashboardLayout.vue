<script setup lang="ts">
import AppSidebar from '@/components/ui/AppSidebar.vue'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content Area -->
    <main class="bg-background flex flex-1 flex-col overflow-hidden">
      <!-- Breadcrumb Navbar -->
      <div class="hidden md:block">
        <Breadcrumbs />
      </div>

      <!-- Page Content with padding-top for mobile navbar -->
      <div class="flex-1 overflow-y-auto pt-14 md:pt-0">
        <RouterView />
      </div>
    </main>
  </div>
</template>
