<template>
  <header class="top-header px-6 py-3 flex items-center gap-4 flex-shrink-0 bg-white/95 backdrop-blur border-b border-slate-200">

    <!-- Page title (dari route meta) -->
    <div class="flex-1">
      <h1 class="font-display font-bold text-slate-800 text-lg leading-tight">{{ route.meta.title || 'MedTrack 3T' }}</h1>
      <p class="text-slate-400 text-xs">{{ route.meta.subtitle || '' }}</p>
    </div>

    <!-- Search bar -->
    <div class="relative hidden md:block">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari dokter, wilayah, kabupaten..."
        class="w-72 bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700
               focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
        @keydown.enter="handleSearch"
      />
      <svg class="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </div>

    <!-- Import button -->
    <button class="btn-secondary hidden md:flex" @click="$emit('openImport')">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
      </svg>
      Import Data
    </button>

    <!-- Export button -->
    <button class="btn-primary hidden md:flex">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
      </svg>
      Export Laporan
    </button>

    <!-- Notification bell -->
    <button class="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition" @click="$emit('openNotif')">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
      <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
    </button>

    <!-- Avatar -->
    <div class="w-8 h-8 gradient-teal rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer">
      A
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineEmits(['openImport', 'openNotif'])

const route  = useRoute()
const router = useRouter()
const searchQuery = ref('')

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/dokter', query: { search: searchQuery.value } })
  }
}
</script>
