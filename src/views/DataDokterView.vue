<template>
  <div class="space-y-5 animate-[slideIn_0.3s_ease]">

    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="font-display font-bold text-slate-800 text-xl">Manajemen Data Dokter</h2>
        <p class="text-slate-500 text-sm">Data dokter yang bertugas di kabupaten/kota wilayah 3T</p>
      </div>
      <div class="flex gap-2">
        <button class="btn-secondary" @click="importModal.open()">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
          </svg>
          Import
        </button>
        <button class="btn-primary" @click="addModal.open()">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Tambah Dokter
        </button>
      </div>
    </div>

    <!-- Stats mini -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div v-for="s in miniStats" :key="s.label" class="card-glass rounded-xl p-4 shadow-card text-center">
        <p :class="['font-display font-bold text-2xl', s.colorClass]">{{ s.value }}</p>
        <p class="text-slate-500 text-xs mt-0.5">{{ s.label }}</p>
      </div>
    </div>

    <!-- Filter bar -->
    <div class="card-glass rounded-2xl shadow-card p-4">
      <div class="flex flex-wrap gap-3">
        <div class="relative flex-1 min-w-48">
          <input
            v-model="filterSearch"
            type="text"
            placeholder="Cari nama atau nomor SIP..."
            class="input-base pl-9"
            @input="applyFilter('search', filterSearch)"
          />
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <select v-model="filterProvinsi" class="select-base w-auto" @change="applyFilter('provinsi', filterProvinsi)">
          <option value="">Semua Provinsi</option>
          <option v-for="p in provinsiList" :key="p" :value="p">{{ p }}</option>
        </select>

        <select v-model="filterSpesialisasi" class="select-base w-auto" @change="applyFilter('spesialisasi', filterSpesialisasi)">
          <option value="">Semua Spesialisasi</option>
          <option v-for="s in spesialisasiList" :key="s" :value="s">{{ s }}</option>
        </select>

        <select v-model="filterStatus" class="select-base w-auto" @change="applyFilter('status', filterStatus)">
          <option value="">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="akan_berakhir">Akan Berakhir</option>
          <option value="selesai">Selesai Tugas</option>
        </select>

        <button class="btn-outline" @click="clearFilters">Reset Filter</button>
      </div>
    </div>

    <!-- Table -->
    <div class="card-glass rounded-2xl shadow-card overflow-hidden">
      <!-- Loading state -->
      <div v-if="isLoading" class="flex items-center justify-center py-16">
        <div class="text-center">
          <svg class="w-8 h-8 animate-spin text-brand-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p class="text-slate-400 text-sm">Memuat data dokter...</p>
        </div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-100">
              <th class="table-header">Nama Dokter</th>
              <th class="table-header">Spesialisasi</th>
              <th class="table-header">Jenis Penugasan</th>
              <th class="table-header">Kabupaten/Kota</th>
              <th class="table-header">Provinsi</th>
              <th class="table-header">Status</th>
              <th class="table-header">Berakhir</th>
              <th class="table-header">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="dokterList.length === 0">
              <td colspan="8" class="text-center py-12 text-slate-400 text-sm">
                Tidak ada data dokter yang sesuai filter
              </td>
            </tr>
            <tr v-for="d in dokterList" :key="d.id" class="table-row">
              <td class="table-cell">
                <div class="flex items-center gap-2.5">
                  <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0', d.gradientClass]">
                    {{ d.inisial }}
                  </div>
                  <div>
                    <p class="font-medium text-slate-800 text-sm">{{ d.nama }}</p>
                    <p class="text-xs text-slate-400">{{ d.sip }}</p>
                  </div>
                </div>
              </td>
              <td class="table-cell text-slate-600 text-xs">{{ d.spesialisasi }}</td>
              <td class="table-cell text-slate-500 text-xs">{{ d.jenisPenugasan }}</td>
              <td class="table-cell text-slate-700 text-sm font-medium">{{ d.namaWilayah }}</td>
              <td class="table-cell text-slate-500 text-xs">{{ d.provinsi }}</td>
              <td class="table-cell">
                <span :class="getDokterStatusInfo(d.status).class">
                  {{ getDokterStatusInfo(d.status).label }}
                </span>
              </td>
              <td class="table-cell">
                <span :class="d.status === 'akan_berakhir' ? 'text-red-500 font-semibold text-xs' : 'text-slate-500 text-xs'">
                  {{ formatDate(d.tanggalSelesai) }}
                </span>
              </td>
              <td class="table-cell">
                <div class="flex items-center gap-1">
                  <button
                    class="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition"
                    title="Edit"
                    @click="editDokter(d)"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Hapus"
                    @click="confirmDelete(d)"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
        <p class="text-slate-400 text-xs">Menampilkan {{ dokterList.length }} dokter</p>
        <div class="flex gap-1">
          <button class="btn-outline text-xs py-1.5 px-3">← Prev</button>
          <button class="btn-primary text-xs py-1.5 px-3">1</button>
          <button class="btn-outline text-xs py-1.5 px-3">2</button>
          <button class="btn-outline text-xs py-1.5 px-3">Next →</button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AddDokterModal ref="addModal" />
    <ImportModal    ref="importModal" />

    <!-- Delete confirm modal -->
    <BaseModal v-model="showDeleteModal" title="Hapus Data Dokter" size="sm">
      <p class="text-slate-600 text-sm mb-1">Yakin ingin menghapus data:</p>
      <p class="font-semibold text-slate-800 text-sm mb-4">{{ selectedDokter?.nama }}</p>
      <p class="text-slate-400 text-xs mb-4">Data yang dihapus tidak dapat dikembalikan.</p>
      <template #footer>
        <button class="btn-outline" @click="showDeleteModal = false">Batal</button>
        <button class="btn-primary bg-red-500 hover:bg-red-600" @click="doDelete">Hapus</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDokterStore }  from '@/stores/dokterStore.js'
import { useWilayahStore } from '@/stores/wilayahStore.js'
import { getDokterStatusInfo, formatDate } from '@/utils/formatters.js'
import { SPESIALISASI } from '@/data/mockDokter.js'
import AddDokterModal from '@/components/modals/AddDokterModal.vue'
import ImportModal    from '@/components/modals/ImportModal.vue'
import BaseModal      from '@/components/modals/BaseModal.vue'

const dokterStore  = useDokterStore()
const wilayahStore = useWilayahStore()
const { dokterList, isLoading, stats } = storeToRefs(dokterStore)
const { provinsiList } = storeToRefs(wilayahStore)
const spesialisasiList = Object.values(SPESIALISASI)

// Refs
const addModal        = ref(null)
const importModal     = ref(null)
const showDeleteModal = ref(false)
const selectedDokter  = ref(null)

// Local filter state (synced to store)
const filterSearch       = ref('')
const filterProvinsi     = ref('')
const filterSpesialisasi = ref('')
const filterStatus       = ref('')

const miniStats = computed(() => [
  { label: 'Total Dokter',      value: stats.value?.total ?? 0,         colorClass: 'text-slate-800' },
  { label: 'Aktif',             value: stats.value?.aktif ?? 0,          colorClass: 'text-emerald-600' },
  { label: 'Akan Berakhir',     value: stats.value?.akanBerakhir ?? 0,   colorClass: 'text-amber-600' },
  { label: 'Selesai Tugas',     value: stats.value?.selesai ?? 0,        colorClass: 'text-slate-400' },
])

onMounted(async () => {
  await Promise.all([dokterStore.init(), wilayahStore.fetchProvinsiList()])
})

function applyFilter(key, value) {
  dokterStore.setFilter(key, value)
  dokterStore.fetchAll()
}

function clearFilters() {
  filterSearch.value       = ''
  filterProvinsi.value     = ''
  filterSpesialisasi.value = ''
  filterStatus.value       = ''
  dokterStore.clearFilters()
  dokterStore.fetchAll()
}

function editDokter(d) {
  console.log('Edit:', d)
  // TODO: buka modal edit dengan data pre-filled
}

function confirmDelete(d) {
  selectedDokter.value = d
  showDeleteModal.value = true
}

async function doDelete() {
  if (!selectedDokter.value) return
  await dokterStore.deleteDokter(selectedDokter.value.id)
  showDeleteModal.value = false
  selectedDokter.value  = null
}
</script>
