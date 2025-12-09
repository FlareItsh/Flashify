<script setup lang="ts">
import DashboardCard from './components/ui/DashboardCard.vue'
import DashboardCardLayout from './layouts/DashboardCardLayout.vue'
import Heading from './components/ui/Heading.vue'
import HeadingSmall from './components/ui/HeadingSmall.vue'
import Deck from './components/ui/Deck.vue'
import Button from './components/ui/Button.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex h-screen flex-col overflow-y-auto p-6">
    <Heading
      title="Dashboard"
      description="Overview of your activity"
    />

    <DashboardCardLayout>
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
    </DashboardCardLayout>

    <HeadingSmall
      title="Recent Activity"
      subtitle="Your latest actions"
      class="mt-4"
    />

    <DashboardCardLayout class="flex-1">
      <Deck
        title="What is Vue 3?"
        description="A progressive JavaScript framework for building user interfaces"
        :tags="['Vue', 'JavaScript', 'Frontend']"
        difficulty="medium"
        priority="high"
      />
      <Deck
        title="TypeScript Basics"
        description="Understanding types and interfaces in TypeScript"
        :tags="['TypeScript', 'Programming']"
        difficulty="easy"
      />
      <Deck
        title="TypeScript Basics"
        description="Understanding types and interfaces in TypeScript"
        :tags="['TypeScript', 'Programming']"
        difficulty="easy"
        priority="low"
      />
    </DashboardCardLayout>
    <div class="mt-4 flex justify-center">
      <RouterLink to="/collections">
        <Button variant="secondary">View All Activities</Button>
      </RouterLink>
    </div>
  </div>
</template>
