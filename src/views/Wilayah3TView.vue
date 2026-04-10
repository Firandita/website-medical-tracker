<template>
  <div class="space-y-5 animate-[slideIn_0.3s_ease]">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="s in summaryCards" :key="s.label" :class="['card-glass rounded-2xl p-4 shadow-card border-l-4', s.border]">
        <p :class="['font-display font-bold text-2xl', s.color]">{{ s.value }}</p>
        <p class="text-slate-500 text-xs mt-0.5">{{ s.label }}</p>
      </div>
    </div>

    <!-- Filter -->
    <div class="card-glass rounded-2xl shadow-card p-4 flex flex-wrap gap-3">
      <input v-model="search" class="input-base flex-1 min-w-48" placeholder="Cari nama kabupaten/kota..." />
      <select v-model="selProvinsi" class="select-base w-auto">
        <option value="">Semua Provinsi</option>
        <option v-for="p in provinsiList" :key="p" :value="p">{{ p }}</option>
      </select>
      <select v-model="selStatus" class="select-base w-auto">
        <option value="">Semua Status</option>
        <option value="kritis">Kritis</option>
        <option value="kurang">Kurang</option>
        <option value="cukup">Cukup</option>
        <option value="terpenuhi">Terpenuhi</option>
      </select>
      <select v-model="selJenis" class="select-base w-auto">
        <option value="">Semua Jenis 3T</option>
        <option value="tertinggal">Tertinggal</option>
        <option value="terdepan">Terdepan</option>
        <option value="terluar">Terluar</option>
      </select>
    </div>

    <!-- Cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        v-for="w in filtered"
        :key="w.id"
        class="card-glass rounded-2xl shadow-card p-4 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex-1 min-w-0">
            <h3 class="font-display font-semibold text-slate-800 text-sm leading-snug">{{ w.nama }}</h3>
            <p class="text-slate-400 text-xs mt-0.5">{{ w.provinsi }}</p>
          </div>
          <span :class="['ml-2 flex-shrink-0', getWilayahStatusInfo(w.status).class]">
            {{ getWilayahStatusInfo(w.status).label }}
          </span>
        </div>

        <!-- Rasio bar -->
        <div class="mb-3">
          <div class="flex justify-between text-xs text-slate-500 mb-1">
            <span>Rasio dokter/1.000 jiwa</span>
            <span class="font-semibold">{{ w.rasio }}</span>
          </div>
          <div class="h-1.5 bg-slate-100 rounded-full">
            <div
              :class="['h-1.5 rounded-full transition-all duration-700', rasioBarClass(w.rasio)]"
              :style="{ width: Math.min(w.rasio * 100, 100) + '%' }"
            />
          </div>
        </div>

        <!-- Stats row -->
        <div class="grid grid-cols-3 gap-2 mb-3">
          <div class="bg-slate-50 rounded-lg p-2 text-center">
            <p class="font-bold text-slate-700 text-sm">{{ w.jumlahDokter }}</p>
            <p class="text-xs text-slate-400">Dokter</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-2 text-center">
            <p class="font-bold text-slate-700 text-sm">{{ (w.populasi / 1000).toFixed(0) }}k</p>
            <p class="text-xs text-slate-400">Populasi</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-2 text-center">
            <p class="font-bold text-slate-700 text-sm">{{ w.aksesibilitas.split(' ')[0] }}</p>
            <p class="text-xs text-slate-400">Akses</p>
          </div>
        </div>

        <!-- Jenis 3T tags -->
        <div class="flex gap-1 flex-wrap">
          <span v-for="j in w.jenis" :key="j" class="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full capitalize">
            {{ j }}
          </span>
        </div>

        <!-- Catatan -->
        <p v-if="w.catatan" class="text-xs text-amber-600 bg-amber-50 rounded-lg px-2 py-1 mt-2">
          ⚠️ {{ w.catatan }}
        </p>
      </div>
    </div>

    <p v-if="filtered.length === 0" class="text-center text-slate-400 text-sm py-8">
      Tidak ada wilayah yang sesuai filter.
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useWilayahStore } from '@/stores/wilayahStore.js'
import { getWilayahStatusInfo } from '@/utils/formatters.js'

const store = useWilayahStore()
const { wilayahList, provinsiList } = storeToRefs(store)

const search      = ref('')
const selProvinsi = ref('')
const selStatus   = ref('')
const selJenis    = ref('')

const filtered = computed(() => wilayahList.value.filter(w => {
  const ms = !search.value      || w.nama.toLowerCase().includes(search.value.toLowerCase())
  const mp = !selProvinsi.value || w.provinsi === selProvinsi.value
  const mst = !selStatus.value  || w.status   === selStatus.value
  const mj = !selJenis.value    || w.jenis.includes(selJenis.value)
  return ms && mp && mst && mj
}))

const summaryCards = computed(() => {
  const s = store.stats
  return [
    { label: 'Total Wilayah 3T',  value: s?.total ?? 0,      color: 'text-slate-800',    border: 'border-slate-300' },
    { label: 'Status Kritis',      value: s?.kritis ?? 0,     color: 'text-red-600',      border: 'border-red-400' },
    { label: 'Status Kurang',      value: s?.kurang ?? 0,     color: 'text-amber-600',    border: 'border-amber-400' },
    { label: 'Terpenuhi',          value: s?.terpenuhi ?? 0,  color: 'text-emerald-600',  border: 'border-emerald-400' },
  ]
})

function rasioBarClass(r) {
  if (r < 0.05) return 'bg-red-400'
  if (r < 0.5)  return 'bg-amber-400'
  if (r < 1.0)  return 'bg-blue-400'
  return 'bg-emerald-400'
}

onMounted(() => store.init())
</script>
