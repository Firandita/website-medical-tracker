<template>
  <div class="space-y-5 animate-[slideIn_0.3s_ease]">
    <div class="card-glass rounded-2xl shadow-card overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 class="font-display font-bold text-slate-800 text-xl">Peta Sebaran Interaktif</h2>
          <p class="text-slate-400 text-sm">Visualisasi geografis dokter per kabupaten/kota wilayah 3T</p>
        </div>
        <div class="flex gap-2 flex-wrap">
          <select v-model="filterProvinsi" class="select-base w-auto text-xs" @change="applyFilter">
            <option value="">Semua Provinsi</option>
            <option v-for="p in provinsiList" :key="p" :value="p">{{ p }}</option>
          </select>
          <select v-model="filterStatus" class="select-base w-auto text-xs" @change="applyFilter">
            <option value="">Semua Status</option>
            <option value="kritis">Kritis</option>
            <option value="kurang">Kurang</option>
            <option value="cukup">Cukup</option>
            <option value="terpenuhi">Terpenuhi</option>
          </select>
        </div>
      </div>

      <div class="p-4">
        <LeafletMap :locations="filteredLocations" height="560px" @marker-click="onMarkerClick" />

        <!-- Legend -->
        <div class="flex items-center gap-6 mt-4 flex-wrap">
          <p class="text-xs text-slate-500 font-semibold">Keterangan:</p>
          <div v-for="leg in legend" :key="leg.label" class="flex items-center gap-1.5">
            <div :class="['w-3 h-3 rounded-full', leg.dot]"></div>
            <span class="text-xs text-slate-500">{{ leg.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail panel (muncul saat marker di-klik) -->
    <Transition name="fade">
      <div v-if="selected" class="card-glass rounded-2xl shadow-card p-5">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="font-display font-bold text-slate-800 text-lg">{{ selected.nama }}</h3>
            <p class="text-slate-400 text-sm">{{ selected.provinsi }}</p>
          </div>
          <span :class="getWilayahStatusInfo(selected.status).class + ' text-sm px-3 py-1'">
            {{ getWilayahStatusInfo(selected.status).label }}
          </span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-slate-50 rounded-xl p-3 text-center">
            <p class="font-display font-bold text-xl text-slate-800">{{ selected.jumlahDokter }}</p>
            <p class="text-xs text-slate-500 mt-0.5">Dokter Aktif</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-3 text-center">
            <p class="font-display font-bold text-xl text-slate-800">{{ selected.populasi.toLocaleString('id-ID') }}</p>
            <p class="text-xs text-slate-500 mt-0.5">Populasi</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-3 text-center">
            <p class="font-display font-bold text-xl text-slate-800">{{ selected.rasio }}</p>
            <p class="text-xs text-slate-500 mt-0.5">Rasio/1.000 jiwa</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-3 text-center">
            <p class="font-display font-bold text-lg text-slate-800">{{ selected.aksesibilitas }}</p>
            <p class="text-xs text-slate-500 mt-0.5">Aksesibilitas</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import LeafletMap from '@/components/dashboard/LeafletMap.vue'
import { useWilayahStore } from '@/stores/wilayahStore.js'
import { getWilayahStatusInfo } from '@/utils/formatters.js'

const store = useWilayahStore()
const { mapData, provinsiList } = storeToRefs(store)

const filterProvinsi = ref('')
const filterStatus   = ref('')
const selected       = ref(null)

const filteredLocations = computed(() => {
  return mapData.value.filter(w => {
    const mp = !filterProvinsi.value || w.provinsi === filterProvinsi.value
    const ms = !filterStatus.value   || w.status   === filterStatus.value
    return mp && ms
  })
})

const legend = [
  { label: 'Kritis',    dot: 'bg-red-400' },
  { label: 'Kurang',    dot: 'bg-amber-400' },
  { label: 'Cukup',     dot: 'bg-blue-400' },
  { label: 'Terpenuhi', dot: 'bg-emerald-400' },
]

onMounted(() => store.init())

function applyFilter() { /* filteredLocations is computed */ }
function onMarkerClick(w) { selected.value = w }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; transform: translateY(6px); }
</style>
