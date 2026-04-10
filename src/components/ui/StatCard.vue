<template>
  <div class="stat-card card-glass rounded-2xl p-4 shadow-card">
    <!-- Top row -->
    <div class="flex items-start justify-between mb-3">
      <div :class="['w-10 h-10 rounded-xl flex items-center justify-center shadow-sm', gradientClass]">
        <slot name="icon" />
      </div>
      <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', badgeClass]">
        {{ badge }}
      </span>
    </div>

    <!-- Value -->
    <p class="font-display font-bold text-slate-800 text-2xl">{{ value }}</p>
    <p class="text-slate-500 text-xs mt-0.5">{{ label }}</p>

    <!-- Progress bar -->
    <div v-if="progress !== null" class="mt-3">
      <div class="h-1 bg-slate-100 rounded-full">
        <div
          :class="['h-1 rounded-full transition-all duration-700', progressBarClass]"
          :style="{ width: progress + '%' }"
        />
      </div>
      <p class="text-slate-400 text-xs mt-1">{{ progressLabel }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  value:            { type: [String, Number], required: true },
  label:            { type: String, required: true },
  badge:            { type: String, default: '' },
  badgeClass:       { type: String, default: 'text-slate-500 bg-slate-100' },
  gradientClass:    { type: String, default: 'gradient-teal' },
  progress:         { type: Number, default: null },
  progressLabel:    { type: String, default: '' },
  progressBarClass: { type: String, default: 'gradient-teal' },
})
</script>
