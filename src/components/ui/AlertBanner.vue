<template>
  <Transition name="fade">
    <div v-if="visible" :class="['rounded-xl px-4 py-3 flex items-center gap-3', wrapperClass]">
      <div :class="['w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', iconBgClass]">
        <slot name="icon">
          <svg class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </slot>
      </div>

      <div class="flex-1">
        <p :class="['text-sm font-medium', titleClass]">{{ title }}</p>
        <p :class="['text-xs', subtitleClass]">
          {{ subtitle }}
          <a v-if="actionLabel" href="#" :class="actionClass" @click.prevent="$emit('action')">
            {{ actionLabel }} →
          </a>
        </p>
      </div>

      <button :class="['flex-shrink-0 transition', closeClass]" @click="visible = false">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title:        { type: String, required: true },
  subtitle:     { type: String, default: '' },
  actionLabel:  { type: String, default: '' },
  wrapperClass: { type: String, default: 'bg-amber-50 border border-amber-200' },
  iconBgClass:  { type: String, default: 'bg-amber-100' },
  titleClass:   { type: String, default: 'text-amber-800' },
  subtitleClass:{ type: String, default: 'text-amber-600' },
  actionClass:  { type: String, default: 'underline font-semibold' },
  closeClass:   { type: String, default: 'text-amber-400 hover:text-amber-600' },
})

defineEmits(['action'])
const visible = ref(true)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
