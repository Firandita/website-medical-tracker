import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dokterService } from '@/services/dokterService.js'
import { STATUS_DOKTER } from '@/data/mockDokter.js'

export const useDokterStore = defineStore('dokter', () => {

  // ── State ──────────────────────────────────────────────────────
  const dokterList  = ref([])
  const stats       = ref(null)
  const isLoading   = ref(false)
  const isSaving    = ref(false)
  const error       = ref(null)
  const currentPage = ref(1)
  const perPage     = ref(10)
  const totalItems  = ref(0)

  // Filters
  const filterSearch        = ref('')
  const filterSpesialisasi  = ref('')
  const filterProvinsi      = ref('')
  const filterStatus        = ref('')
  const filterJenisPenugasan = ref('')

  // ── Computed ───────────────────────────────────────────────────
  const dokterAktif       = computed(() => dokterList.value.filter(d => d.status === STATUS_DOKTER.AKTIF))
  const dokterAkanBerakhir = computed(() => dokterList.value.filter(d => d.status === STATUS_DOKTER.AKAN_BERAKHIR))

  // ── Actions ────────────────────────────────────────────────────
  async function fetchAll() {
    isLoading.value = true
    error.value = null
    try {
      const params = {
        search:         filterSearch.value,
        spesialisasi:   filterSpesialisasi.value,
        provinsi:       filterProvinsi.value,
        status:         filterStatus.value,
        jenisPenugasan: filterJenisPenugasan.value,
        page:           currentPage.value,
        per_page:       perPage.value,
      }
      const res       = await dokterService.getAll(params)
      dokterList.value = res.data
      totalItems.value = res.total
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  async function fetchStats() {
    try {
      stats.value = await dokterService.getStats()
    } catch (e) {
      error.value = e.message
    }
  }

  async function addDokter(payload) {
    isSaving.value = true
    try {
      const newDoc = await dokterService.create(payload)
      dokterList.value.unshift(newDoc)
      totalItems.value++
      await fetchStats()
      return { success: true, data: newDoc }
    } catch (e) {
      return { success: false, message: e.message }
    } finally {
      isSaving.value = false
    }
  }

  async function updateDokter(id, payload) {
    isSaving.value = true
    try {
      const updated = await dokterService.update(id, payload)
      const idx = dokterList.value.findIndex(d => d.id === id)
      if (idx !== -1) dokterList.value[idx] = updated
      return { success: true, data: updated }
    } catch (e) {
      return { success: false, message: e.message }
    } finally {
      isSaving.value = false
    }
  }

  async function deleteDokter(id) {
    try {
      await dokterService.delete(id)
      dokterList.value = dokterList.value.filter(d => d.id !== id)
      totalItems.value--
      await fetchStats()
      return { success: true }
    } catch (e) {
      return { success: false, message: e.message }
    }
  }

  async function importFile(file) {
    isSaving.value = true
    try {
      const res = await dokterService.importFile(file)
      await fetchAll()
      return { success: true, ...res }
    } catch (e) {
      return { success: false, message: e.message }
    } finally {
      isSaving.value = false
    }
  }

  function setFilter(key, value) {
    const map = {
      search:         filterSearch,
      spesialisasi:   filterSpesialisasi,
      provinsi:       filterProvinsi,
      status:         filterStatus,
      jenisPenugasan: filterJenisPenugasan,
    }
    if (map[key]) map[key].value = value
    currentPage.value = 1
  }

  function clearFilters() {
    filterSearch.value = ''
    filterSpesialisasi.value = ''
    filterProvinsi.value = ''
    filterStatus.value = ''
    filterJenisPenugasan.value = ''
    currentPage.value = 1
  }

  async function init() {
    await Promise.all([fetchAll(), fetchStats()])
  }

  return {
    // state
    dokterList, stats, isLoading, isSaving, error,
    currentPage, perPage, totalItems,
    filterSearch, filterSpesialisasi, filterProvinsi, filterStatus, filterJenisPenugasan,
    // computed
    dokterAktif, dokterAkanBerakhir,
    // actions
    fetchAll, fetchStats, addDokter, updateDokter, deleteDokter, importFile,
    setFilter, clearFilters, init,
  }
})
