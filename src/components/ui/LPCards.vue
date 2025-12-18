<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import Img1 from '@/assets/images/img1.jpg'
import Img2 from '@/assets/images/img2.jpg'
import Img3 from '@/assets/images/img3.jpg'
import Img4 from '@/assets/images/img4.jpg'

const cards = ref([
  { id: 1, type: 'image', content: Img1, alt: 'Flashcards Image' },
  { id: 2, type: 'text1', contentFront: 'What are the benefits of using flashcards?', contentBack: 'Flashcards boost memorization, strengthen retention, and support active learning.' },
  { id: 3, type: 'image', content: Img2, alt: 'Flashcards Image' },
  { id: 4, type: 'image', content: Img3, alt: 'Flashcards Image' },
  { id: 5, type: 'text2', contentFront: 'How do flashcards differ from study notes?', contentBack: 'Flashcards promote active recall; notes are passive review.' },
  { id: 6, type: 'image', content: Img4, alt: 'Flashcards Image' },
])

const displayCards = ref([...cards.value, ...cards.value])

const carouselRef = ref<HTMLElement | null>(null)
const speed = 1
let animationId: number | null = null

const isPaused = ref(false)


const flippedCards = ref<Set<number>>(new Set())

const pauseScroll = () => { isPaused.value = true }
const resumeScroll = () => { isPaused.value = false }

const toggleFlip = (id: number) => {
  if (flippedCards.value.has(id)) {
    flippedCards.value.delete(id)
  } else {
    flippedCards.value.add(id)
  }
}


const isTouchDevice = ref(false)

onMounted(() => {

  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  nextTick(() => {
    const carousel = carouselRef.value
    if (!carousel) return

    let scrollPos = 0
    const step = () => {
      if (!isPaused.value) {
        scrollPos += speed
        if (scrollPos >= carousel.scrollWidth / 2) {
          scrollPos = 0
        }
        carousel.scrollLeft = scrollPos
      }
      animationId = requestAnimationFrame(step)
    }
    animationId = requestAnimationFrame(step)
  })
})

onUnmounted(() => {
  if (animationId !== null) cancelAnimationFrame(animationId)
})
</script>

<template>
  <div ref="carouselRef" class="w-screen overflow-x-hidden overflow-y-hidden -mt-55 scrollbar-hidden sm:mt-0"
    style="height: 620px;">
    <div class="flex gap-5 h-full items-center px-5 md:gap-8 lg:gap-5">
      <div v-for="card in displayCards" :key="card.id"
        class="flex-shrink-0 h-full perspective w-[380px] md:w-[380px] lg:w-[420px] group"
        @mouseenter="card.type.startsWith('text') ? pauseScroll() : null"
        @mouseleave="card.type.startsWith('text') ? resumeScroll() : null">

        <div v-if="card.type.startsWith('text')" class="relative w-full h-full"
          :class="{ 'cursor-pointer': isTouchDevice }" @click="isTouchDevice ? toggleFlip(card.id) : null">
          <div class="w-full h-full transition-transform duration-700 transform-style-preserve-3d" :class="{
            'rotate-y-180': isTouchDevice && flippedCards.has(card.id),
            'hover:rotate-y-180': !isTouchDevice
          }">

            <div class="absolute inset-0 backface-hidden flex items-center justify-center rounded-2xl p-6 md:p-"
              :class="card.type === 'text1' ? 'bg-secondary' : 'border-2 border-secondary bg-background'">
              <h1 class="font-semibold text-justify leading-[160px] text-5xl" :class="[
                card.type === 'text1'
                  ? 'text-background md:text-4xl lg:text-5xl'
                  : 'text-foreground md:text-4xl lg:text-5xl'

              ]">
                {{ card.contentFront }}
              </h1>
            </div>

            <div class="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center rounded-2xl p-8"
              :class="[
                card.type === 'text1'
                  ? 'bg-background border-2 border-secondary text-foreground'
                  : 'bg-secondary text-background'
              ]">
              <p class="text-lg md:text-xl lg:text-2xl text-center">
                {{ card.contentBack }}
              </p>
            </div>
          </div>
        </div>


        <div v-else class="w-full h-full overflow-hidden rounded-2xl shadow-xl">
          <img :src="card.content" :alt="card.alt" class="w-full h-full object-cover object-center" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}

.backface-hidden {
  backface-visibility: hidden;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}


.hover\:rotate-y-180:hover {
  transform: rotateY(180deg);
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>
