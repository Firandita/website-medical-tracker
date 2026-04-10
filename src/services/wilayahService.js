/**
 * WILAYAH SERVICE
 * -------------------------------------------------------
 * Endpoint Laravel yang dibutuhkan:
 *   GET /api/wilayah               → index
 *   GET /api/wilayah/:id           → show
 *   GET /api/wilayah/stats         → ringkasan statistik
 *   GET /api/wilayah/map-data      → data untuk peta (koordinat + status)
 */

import api from '@/services/api.js'
import {
  mockWilayah3T,
  getWilayahStats,
  getWilayahByStatus,
  getWilayahByProvinsi,
  PROVINSI_LIST,
} from '@/data/mockWilayah3T.js'

const USE_MOCK = true

export const wilayahService = {

  async getAll(params = {}) {
    if (USE_MOCK) {
      await delay()
      let data = [...mockWilayah3T]
      if (params.provinsi)  data = getWilayahByProvinsi(params.provinsi)
      if (params.status)    data = getWilayahByStatus(params.status)
      if (params.search)    data = data.filter(w => w.nama.toLowerCase().includes(params.search.toLowerCase()))
      return { data, total: data.length }
    }
    const res = await api.get('/wilayah', { params })
    return res.data
  },

  async getById(id) {
    if (USE_MOCK) {
      await delay(250)
      return mockWilayah3T.find(w => w.id === id) || null
    }
    const res = await api.get(`/wilayah/${id}`)
    return res.data
  },

  async getStats() {
    if (USE_MOCK) {
      await delay(200)
      return getWilayahStats()
    }
    const res = await api.get('/wilayah/stats')
    return res.data
  },

  /** Data untuk Leaflet map (ringan, hanya koordinat + status + tooltip) */
  async getMapData() {
    if (USE_MOCK) {
      await delay(300)
      return mockWilayah3T.map(w => ({
        id:            w.id,
        nama:          w.nama,
        provinsi:      w.provinsi,
        koordinat:     w.koordinat,
        status:        w.status,
        jumlahDokter:  w.jumlahDokter,
        populasi:      w.populasi,
        rasio:         w.rasio,
        aksesibilitas: w.aksesibilitas,
      }))
    }
    const res = await api.get('/wilayah/map-data')
    return res.data
  },

  async getProvinsiList() {
    if (USE_MOCK) {
      await delay(100)
      return PROVINSI_LIST
    }
    const res = await api.get('/wilayah/provinsi')
    return res.data
  },
}

function delay(ms = 400) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
