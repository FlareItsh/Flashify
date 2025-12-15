<script setup lang="ts">
import { ref } from 'vue'
import { SquarePen } from 'lucide-vue-next'

defineProps<{
  question: string
  answer: string
  hint?: string
  explanation?: string
  editable?: boolean
}>()

const emit = defineEmits<{
  (e: 'edit'): void
}>()

const flipped = ref(false)
const showHint = ref(false)

const flipCard = (event: MouseEvent) => {
  // Only flip if the click was NOT on the hint button or edit icon
  const target = event.target as HTMLElement
  if (target.tagName !== 'BUTTON' && !target.closest('.edit-icon')) {
    flipped.value = !flipped.value
  }
}

const handleEdit = (event: Event) => {
  event.stopPropagation()
  emit('edit')
}
</script>

<template>
  <div
    class="perspective flex h-full w-full cursor-pointer"
    @click="flipCard"
  >
    <div
      class="transform-style-preserve-3d relative h-95 w-full duration-500"
      :class="{ 'rotate-y-180': flipped }"
    >
      <!-- FRONT -->
      <div
        class="bg-secondary border-border absolute inset-0 flex flex-col justify-between rounded-xl border p-6 shadow-sm backface-hidden"
      >
        <div
          v-if="editable"
          class="edit-icon bg-primary hover:bg-primary/80 absolute top-4 right-4 cursor-pointer rounded-full p-2 transition-colors"
          @click="handleEdit"
        >
          <SquarePen class="h-4 w-4 text-white" />
        </div>

        <div class="flex flex-9 items-center justify-center">
          <h3 class="text-foreground p-2 text-center font-semibold">
            {{ question }}
          </h3>
        </div>

        <div class="mt-4 flex flex-1 justify-start">
          <button
            v-if="hint && !showHint"
            @click.stop="showHint = true"
            class="bg-tertiary text-border-accent cursor-pointer rounded-full px-4 py-2 text-xs shadow transition"
          >
            Hint
          </button>
          <h5
            v-else-if="showHint"
            class="px-2 text-center"
          >
            <span class="font-light">Hint:</span>
            {{ hint }}
          </h5>
        </div>
      </div>

      <!-- BACK -->
      <div
        class="bg-secondary border-border absolute inset-0 flex rotate-y-180 flex-col items-center justify-center rounded-xl border p-6 text-left shadow-sm backface-hidden"
      >
        <div class="flex flex-col items-center justify-center gap-3">
          <h5 class="font-semibold">{{ answer }}</h5>
          <p
            v-if="explanation"
            class="mt-2 text-center text-sm italic"
          >
            <span class="font-bold">Explaination</span>
            {{ explanation }}
          </p>
        </div>
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
