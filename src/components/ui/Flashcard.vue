<script setup lang="ts">
import { ref } from 'vue'
import { SquarePen, Trash2 } from 'lucide-vue-next'

defineProps<{
  question: string
  answer: string
  hint?: string
  explanation?: string
  editable?: boolean
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const flipped = ref(false)
const showHint = ref(false)

const flipCard = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  // Prevent flip when clicking buttons or edit icon
  if (target.closest('button') || target.closest('.edit-icon')) return

  flipped.value = !flipped.value
}

const handleEdit = (event: Event) => {
  event.stopPropagation()
  emit('edit')
}

const handleDelete = (event: Event) => {
  event.stopPropagation()
  emit('delete')
}
</script>

<template>
  <div
    class="perspective mt-5 cursor-pointer"
    @click="flipCard"
  >
    <div
      class="transform-style-preserve-3d relative h-[300px] w-full transition-transform duration-500 sm:h-[350px] md:h-[400px]"
      :class="{ 'rotate-y-180': flipped }"
    >
      <div
        class="bg-secondary border-border absolute inset-0 flex flex-col rounded-xl border p-6 shadow-sm backface-hidden"
      >
        <div
          v-if="editable"
          class="edit-icon absolute top-4 right-4 z-10 flex items-center gap-2"
        >
          <div
            class="bg-primary hover:bg-primary/80 cursor-pointer rounded-full p-2 transition"
            @click.stop="handleEdit"
          >
            <SquarePen class="h-4 w-4 text-white" />
          </div>
          <div
            class="cursor-pointer rounded-full bg-red-500 p-2 transition hover:bg-red-600"
            @click.stop="handleDelete"
          >
            <Trash2 class="h-4 w-4 text-white" />
          </div>
        </div>

        <div class="flex flex-1 items-center justify-center text-center">
          <h3 class="text-lg leading-relaxed font-semibold sm:text-xl md:text-2xl">
            {{ question }}
          </h3>
        </div>

        <div class="absolute bottom-4 left-4">
          <button
            v-if="hint && !showHint"
            @click.stop="showHint = true"
            class="text-primary bg-tertiary hover:bg-tertiary/80 rounded-full px-4 py-2 text-sm font-medium shadow"
          >
            Hint
          </button>

          <p
            v-else-if="showHint"
            class="text-sm"
          >
            <span class="font-medium">Hint:</span>
            {{ hint }}
          </p>
        </div>
      </div>

      <div
        class="bg-background border-secondary absolute inset-0 flex rotate-y-180 items-center justify-center rounded-xl border-2 p-6 text-center shadow-sm backface-hidden"
      >
        <div class="space-y-4">
          <h5 class="text-lg font-semibold sm:text-xl md:text-2xl">
            {{ answer }}
          </h5>

          <p
            v-if="explanation"
            class="text-muted-foreground mx-auto max-w-prose text-sm italic"
          >
            <span class="font-semibold not-italic">Explanation:</span>
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
