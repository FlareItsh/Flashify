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
  const target = event.target as HTMLElement

  // Prevent flip when clicking buttons or edit icon
  if (target.closest('button') || target.closest('.edit-icon')) return

  flipped.value = !flipped.value
}


const handleEdit = (event: Event) => {
  event.stopPropagation()
  emit('edit')
}
</script>

<template>

  <div class="perspective cursor-pointer mt-5" @click="flipCard">
    <div class="relative h-[300px] sm:h-[350px] md:h-[400px] w-full
             transform-style-preserve-3d transition-transform duration-500" :class="{ 'rotate-y-180': flipped }">
      <div class="absolute inset-0 backface-hidden
               bg-secondary border border-border shadow-sm
               rounded-xl p-6 flex flex-col">

        <div v-if="editable" class="edit-icon absolute right-4 top-4 rounded-full bg-primary p-2
                 transition hover:bg-primary/80 z-10" @click.stop="handleEdit">
          <SquarePen class="h-4 w-4 text-white" />
        </div>


        <div class="flex flex-1 items-center justify-center text-center">
          <h3 class="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed">
            {{ question }}
          </h3>
        </div>


        <div class="absolute bottom-4 left-4">
          <button v-if="hint && !showHint" @click.stop="showHint = true"
            class="rounded-full text-primary bg-tertiary px-4 py-2 text-sm font-medium shadow hover:bg-tertiary/80">
            Hint
          </button>

          <p v-else-if="showHint" class="text-sm">
            <span class="font-medium">Hint:</span> {{ hint }}
          </p>
        </div>
      </div>


      <div class="absolute inset-0 backface-hidden rotate-y-180
               bg-background border-2 border-secondary shadow-sm
               rounded-xl p-6 flex items-center justify-center text-center">
        <div class="space-y-4">
          <h5 class="text-lg sm:text-xl md:text-2xl font-semibold">
            {{ answer }}
          </h5>

          <p v-if="explanation" class="text-sm italic text-muted-foreground max-w-prose mx-auto">
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
