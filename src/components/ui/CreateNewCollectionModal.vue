<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const collectionName = ref('')

const closeModal = () => emit('close')

const saveCollection = () => {
    if (!collectionName.value) return
    console.log('Saving collection:', collectionName.value)
    closeModal()
}
</script>

<template>
    <div v-if="props.show" class="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-13 w-11/12 max-w-md relative">
            <button variant="" @click="closeModal" class="absolute top-3 right-4 text-gray-500 hover:text-gray-700">
                ✕
            </button>

            <h2 class="text-lg font-bold mb-4">Add Collection</h2>

            <p class="text-foreground-muted">Enter Question</p>
            <textarea type="text" v-model="collectionName" class="border resize-none border p-2 w-full" />

            <p class="text-foreground-muted">Enter Answer</p>
            <input type="text" v-model="collectionName" class="border resize-none border p-2 w-full " />

            <div class="h-px bg-black my-12 mx-5"></div>

            <p class="text-foreground-muted -mt-4">Enter Hint (Optional)</p>
            <input type="text" v-model="collectionName" class="border resize-none border p-2 w-full  mb-5" />
            <div class="flex justify-center">
                <Button variant="secondary" @click="saveCollection" class="flex justify-center">
                    Save
                </Button>
            </div>

        </div>
    </div>
</template>
