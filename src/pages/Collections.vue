<script setup lang="ts">
import Deck from '@/components/ui/Deck.vue'
import Heading from '@/components/ui/Heading.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import DashboardCardLayout from '@/layouts/DashboardCardLayout.vue'
</script>

<template>
  <AppLayout>
    <Heading
      title="Collections"
      subtitle="Manage your flashcard collections here."
    />
    <DashboardCardLayout>
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
        priority="medium"
      />
      <Deck
        title="Advanced CSS Techniques"
        description="Explore modern CSS features and methodologies"
        :tags="['CSS', 'Web Design']"
        difficulty="hard"
      />
      <Deck
        title="Advanced CSS Techniques"
        description="Explore modern CSS features and methodologies"
        :tags="['CSS', 'Web Design']"
        difficulty="hard"
      />
      <Deck
        title="Advanced CSS Techniques"
        description="Explore modern CSS features and methodologies"
        :tags="['CSS', 'Web Design']"
        difficulty="hard"
      />
      <Deck
        title="Advanced CSS Techniques"
        description="Explore modern CSS features and methodologies"
        :tags="['CSS', 'Web Design']"
        difficulty="hard"
      />
    </DashboardCardLayout>
  </AppLayout>
</template>
