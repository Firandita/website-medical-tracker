import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { wilayahService } from '@/services/wilayahService.js'
import { STATUS_WILAYAH } from '@/data/mockWilayah3T.js'

export const useWilayahStore = defineStore('wilayah', () => {

  // ── State ──────────────────────────────────────────────────────
  const wilayahList  = ref([])
  const mapData      = ref([])
  const stats        = ref(null)
  const provinsiList = ref([])
  const isLoading    = ref(false)
  const error        = ref(null)

  // Filters
  const filterProvinsi = ref('')
  const filterStatus   = ref('')
  const filterSearch   = ref('')

  // ── Computed ───────────────────────────────────────────────────
  const wilayahFiltered = computed(() => {
    return wilayahList.value.filter(w => {
      const matchProvinsi = !filterProvinsi.value || w.provinsi === filterProvinsi.value
      const matchStatus   = !filterStatus.value   || w.status   === filterStatus.value
      const matchSearch   = !filterSearch.value   || w.nama.toLowerCase().includes(filterSearch.value.toLowerCase())
      return matchProvinsi && matchStatus && matchSearch
    })
  })

  const wilayahKritis   = computed(() => wilayahList.value.filter(w => w.status === STATUS_WILAYAH.KRITIS))
  const wilayahKurang   = computed(() => wilayahList.value.filter(w => w.status === STATUS_WILAYAH.KURANG))
  const wilayahTerpenuhi = computed(() => wilayahList.value.filter(w => w.status === STATUS_WILAYAH.TERPENUHI))

  // ── Actions ────────────────────────────────────────────────────
  async function fetchAll() {
    isLoading.value = true
    error.value = null
    try {
      const res = await wilayahService.getAll()
      wilayahList.value = res.data
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  async function fetchMapData() {
    try {
      mapData.value = await wilayahService.getMapData()
    } catch (e) {
      error.value = e.message
    }
  }

  async function fetchStats() {
    try {
      stats.value = await wilayahService.getStats()
    } catch (e) {
      error.value = e.message
    }
  }

  async function fetchProvinsiList() {
    try {
      provinsiList.value = await wilayahService.getProvinsiList()
    } catch (e) {
      error.value = e.message
    }
  }

  async function init() {
    await Promise.all([fetchAll(), fetchMapData(), fetchStats(), fetchProvinsiList()])
  }

  function setFilter(key, value) {
    if (key === 'provinsi') filterProvinsi.value = value
    if (key === 'status')   filterStatus.value   = value
    if (key === 'search')   filterSearch.value   = value
  }

  function clearFilters() {
    filterProvinsi.value = ''
    filterStatus.value   = ''
    filterSearch.value   = ''
  }

  return {
    // state
    wilayahList, mapData, stats, provinsiList, isLoading, error,
    filterProvinsi, filterStatus, filterSearch,
    // computed
    wilayahFiltered, wilayahKritis, wilayahKurang, wilayahTerpenuhi,
    // actions
    fetchAll, fetchMapData, fetchStats, fetchProvinsiList, init, setFilter, clearFilters,
  }
})
