<script setup lang="ts">
import LPCards from './ui/LPCards.vue';
import LPHeadline from './ui/LPHeadline.vue';
</script>

<template>
  <section id="home" class="w-full mt-5"> <!-- changed w-screen → w-full -->
    <!-- Mobile: stacked -->
    <div class="md:hidden">
      <div class="pb-10 min-h-[620px] flex flex-col justify-center">
        <LPHeadline />
      </div>
      <LPCards />
    </div>

    <!-- Desktop: overlay -->
    <div class="hidden md:block relative overflow-hidden">
      <div class="absolute inset-0 z-10 pointer-events-none flex items-center">
        <div class="w-full">
          <LPHeadline />
        </div>
      </div>
      <LPCards />
    </div>
  </section>
</template>
