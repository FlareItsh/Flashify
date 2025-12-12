<script setup lang="ts">
import { ref, defineProps } from 'vue'

defineProps<{
  question: string
  answer: string
  hint?: string
}>()

const flipped = ref(false)
const showHint = ref(false)

const flipCard = (event: MouseEvent) => {
  // Only flip if the click was NOT on the hint button
  const target = event.target as HTMLElement
  if (target.tagName !== 'BUTTON') {
    flipped.value = !flipped.value
  }
}

</script>

<template>
  <div class="w-full flex h-full cursor-pointer perspective" @click="flipCard">
    <div
      class="relative w-full h-95 duration-500 transform-style-preserve-3d"
      :class="{ 'rotate-y-180': flipped }"
    >
      <!-- FRONT -->
      <div
        class="absolute inset-0 bg-primary rounded-xl flex flex-col justify-between p-6 shadow-sm backface-hidden"
      >
        <div class="flex-9 flex justify-center items-center">
          <h3 class="text-foreground text-center font-semibold p-2">
            {{ question }}
          </h3>
        </div>


        <div class="flex flex-1 justify-start mt-4">
          <button
            v-if="hint && !showHint"
            @click.stop="showHint = true"
            class="px-4 py-2 text-xs bg-tertiary text-border-accent cursor-pointer rounded-full shadow transition"
          >
            Hint
          </button>
          <h5
            v-else-if="showHint"
            class="text-background text-center px-2"
          >
            <span class="text-foreground-subtle">Hint:</span> {{ hint }}
          </h5>
        </div>
      </div>


      <!-- BACK -->
      <div
        class="absolute inset-0 bg-primary items-center text-left flex flex-col justify-center rounded-xl p-6 shadow-sm rotate-y-180 backface-hidden"
      >
        <h5 class="text-background font-semibold mb-2">{{ answer }}</h5>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
