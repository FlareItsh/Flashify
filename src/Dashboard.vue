<script setup lang="ts">
import DashboardCard from './components/ui/DashboardCard.vue'
import DashboardCardLayout from './layouts/DashboardCardLayout.vue'
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-3xl font-bold">Dashboard</h1>

    <DashboardCardLayout>
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
    </DashboardCardLayout>
  </div>
</template>
