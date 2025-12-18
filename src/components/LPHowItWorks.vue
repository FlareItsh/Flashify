<script setup lang="ts">
import hiwImg from '@/assets/images/hiwImg.png';
</script>

<template>
  <section id="howItWorks" class="scroll-mt-24 text-center w-full mt-20 px-4">
    <p class="text-foreground-muted mb-5">Simple Steps</p>
    <h1 class="mb-2 text-4xl font-bold">How it Works</h1>
    <p class="text-foreground-muted max-w-3xl mx-auto">
      Create, customize, and review flashcards anytime on your device
      <br class="hidden md:inline" />
      to boost learning.
    </p>

    <div class="flex flex-col md:flex-row items-centerstify-center gap-8 lg:gap-16 mt-12 max-w-7xl mx-auto">
      <div class="order-2 md:order-1 flex-shrink-0">
        <img ju
          :src="hiwImg"
          alt="How it Works Image"
          class=" w-full md:w-96 lg:w-[520px]"
        />
      </div>

      <div class="order-1 md:order-2 flex flex-col gap-8 md:gap-12 w-full md:max-w-lg lg:max-w-xl">
        <div class="flex items-center gap-5">
          <div class="w-1 rounded-full h-24 bg-primary flex-shrink-0"></div>
          <div class="bg-secondary rounded-full w-12 h-12 md:w-14 md:h-14 text-background flex items-center justify-center text-xl md:text-2xl font-bold flex-shrink-0">
            1
          </div>
          <div class="text-left">
            <h4 class="text-lg md:text-xl font-semibold">Create A Deck/Collection</h4>
            <p class="text-foreground-muted text-sm md:text-base mt-1 max-w-md">
              Organize your study material by creating a deck or collection for any subject.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-5">
          <div class="w-1 rounded-full h-24 bg-primary flex-shrink-0"></div>
          <div class="bg-secondary rounded-full w-12 h-12 md:w-14 md:h-14 text-background flex items-center justify-center text-xl md:text-2xl font-bold flex-shrink-0">
            2
          </div>
          <div class="text-left">
            <h4 class="text-lg md:text-xl font-semibold">Add Cards</h4>
            <p class="text-foreground-muted text-sm md:text-base mt-1 max-w-md">
              Easily add and customize cards with questions, answers, and images to suit your learning style.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-5">
          <div class="w-1 rounded-full h-24 bg-primary flex-shrink-0"></div>
          <div class="bg-secondary rounded-full w-12 h-12 md:w-14 md:h-14 text-background flex items-center justify-center text-xl md:text-2xl font-bold flex-shrink-0">
            3
          </div>
          <div class="text-left">
            <h4 class="text-lg md:text-xl font-semibold">Study</h4>
            <p class="text-foreground-muted text-sm md:text-base mt-1 max-w-md">
              Review your flashcards anytime, anywhere. Flip, quiz, and reinforce your knowledge to learn faster and remember more.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
