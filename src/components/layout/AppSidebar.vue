<template>
  <aside class="sidebar w-64 flex-shrink-0 flex flex-col h-full overflow-y-auto z-20">

    <!-- Logo -->
    <div class="flex items-center gap-3 px-5 py-5 border-b border-white/10">
      <div class="w-9 h-9 gradient-teal rounded-xl flex items-center justify-center shadow-lg">
        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
        </svg>
      </div>
      <div>
        <p class="font-display font-bold text-white text-sm leading-tight">MedTrack 3T</p>
        <p class="text-slate-400 text-xs">Kemenkes RI</p>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-3 py-4 space-y-0.5">
      <p class="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-2 mt-1">Menu Utama</p>

      <RouterLink
        v-for="item in mainMenuItems"
        :key="item.to"
        :to="item.to"
        class="sidebar-item"
        :class="{ active: isActive(item.to) }"
      >
        <component :is="item.icon" class="sidebar-icon" />
        <span>{{ item.label }}</span>
        <span v-if="item.badge" class="ml-auto bg-brand-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
          {{ item.badge }}
        </span>
      </RouterLink>

      <p class="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-2 mt-4">Kecerdasan Buatan</p>

      <RouterLink
        v-for="item in aiMenuItems"
        :key="item.to"
        :to="item.to"
        class="sidebar-item"
        :class="{ active: isActive(item.to) }"
      >
        <component :is="item.icon" class="sidebar-icon" />
        <span>{{ item.label }}</span>
        <span v-if="item.live" class="ml-auto flex items-center gap-1">
          <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span class="text-emerald-400 text-xs">Live</span>
        </span>
      </RouterLink>

      <p class="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-2 mt-4">Sistem</p>

      <button class="sidebar-item w-full relative" @click="$emit('openNotif')">
        <BellIcon class="sidebar-icon" />
        <span>Notifikasi</span>
        <span class="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold badge-pulse">
          {{ notifCount }}
        </span>
      </button>

      <RouterLink to="/pengaturan" class="sidebar-item">
        <SettingsIcon class="sidebar-icon" />
        <span>Pengaturan</span>
      </RouterLink>
    </nav>

    <!-- User profile -->
    <div class="px-3 py-4 border-t border-white/10">
      <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition">
        <div class="w-8 h-8 gradient-teal rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          A
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-white text-sm font-medium truncate">Admin Kemenkes</p>
          <p class="text-slate-400 text-xs truncate">Pusdatin</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Lucide icons sebagai raw SVG component sederhana
const HomeIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`
}
const MapIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>`
}
const UsersIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
}
const LocationIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
}
const ChartIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`
}
const AiIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`
}
const TrendIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`
}
const BellIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>`
}
const SettingsIcon = {
  template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
}

defineEmits(['openNotif'])

const route = useRoute()
const notifCount = 7

const mainMenuItems = [
  { to: '/dashboard', label: 'Dashboard',          icon: HomeIcon,     badge: null },
  { to: '/peta',      label: 'Peta Sebaran',        icon: MapIcon,      badge: null },
  { to: '/dokter',    label: 'Data Dokter',          icon: UsersIcon,    badge: '1.240' },
  { to: '/wilayah',   label: 'Wilayah 3T',           icon: LocationIcon, badge: null },
  { to: '/analitik',  label: 'Laporan & Analitik',   icon: ChartIcon,    badge: null },
]

const aiMenuItems = [
  { to: '/ai',       label: 'AI Insights',       icon: AiIcon,   live: true },
  { to: '/prediksi', label: 'Prediksi Kebutuhan', icon: TrendIcon, live: false },
]

const isActive = (path) => route.path === path
</script>
