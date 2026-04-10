/**
 * DOKTER SERVICE
 * -------------------------------------------------------
 * Abstraksi layer antara Store ↔ API backend.
 * Saat ini menggunakan mock data. Ketika backend Laravel
 * sudah siap, cukup uncomment baris api.xxx() dan hapus
 * baris mock-nya.
 *
 * Endpoint Laravel yang dibutuhkan:
 *   GET    /api/dokter               → index (list + filter)
 *   GET    /api/dokter/:id           → show
 *   POST   /api/dokter               → store
 *   PUT    /api/dokter/:id           → update
 *   DELETE /api/dokter/:id           → destroy
 *   GET    /api/dokter/stats         → statistik ringkasan
 *   POST   /api/dokter/import        → bulk import dari Excel/CSV
 */

import api from '@/services/api.js'
import { mockDokter, filterDokter, getDokterStats } from '@/data/mockDokter.js'

// Toggle ini ke false ketika backend sudah siap
const USE_MOCK = true

export const dokterService = {

  /**
   * Ambil semua dokter dengan filter opsional
   * @param {Object} params - query params: search, spesialisasi, provinsi, status, page, per_page
   */
  async getAll(params = {}) {
    if (USE_MOCK) {
      await simulateDelay()
      const data = filterDokter(params)
      return { data, total: data.length, page: 1, per_page: data.length }
    }
    const res = await api.get('/dokter', { params })
    return res.data
  },

  /**
   * Ambil satu dokter berdasarkan ID
   * @param {string} id
   */
  async getById(id) {
    if (USE_MOCK) {
      await simulateDelay(300)
      return mockDokter.find(d => d.id === id) || null
    }
    const res = await api.get(`/dokter/${id}`)
    return res.data
  },

  /**
   * Tambah dokter baru
   * @param {Object} payload
   */
  async create(payload) {
    if (USE_MOCK) {
      await simulateDelay(500)
      const newDoc = { ...payload, id: `D${Date.now()}`, createdAt: new Date().toISOString() }
      mockDokter.unshift(newDoc)
      return newDoc
    }
    const res = await api.post('/dokter', payload)
    return res.data
  },

  /**
   * Update data dokter
   * @param {string} id
   * @param {Object} payload
   */
  async update(id, payload) {
    if (USE_MOCK) {
      await simulateDelay(400)
      const idx = mockDokter.findIndex(d => d.id === id)
      if (idx !== -1) {
        mockDokter[idx] = { ...mockDokter[idx], ...payload }
        return mockDokter[idx]
      }
      throw new Error('Dokter tidak ditemukan')
    }
    const res = await api.put(`/dokter/${id}`, payload)
    return res.data
  },

  /**
   * Hapus dokter
   * @param {string} id
   */
  async delete(id) {
    if (USE_MOCK) {
      await simulateDelay(300)
      const idx = mockDokter.findIndex(d => d.id === id)
      if (idx !== -1) mockDokter.splice(idx, 1)
      return { success: true }
    }
    const res = await api.delete(`/dokter/${id}`)
    return res.data
  },

  /**
   * Statistik ringkasan dokter
   */
  async getStats() {
    if (USE_MOCK) {
      await simulateDelay(200)
      return getDokterStats()
    }
    const res = await api.get('/dokter/stats')
    return res.data
  },

  /**
   * Import bulk dari file (kirim FormData)
   * @param {File} file
   */
  async importFile(file) {
    if (USE_MOCK) {
      await simulateDelay(1500)
      return { imported: 0, errors: [], message: 'Mock: import tidak memproses file sungguhan.' }
    }
    const form = new FormData()
    form.append('file', file)
    const res = await api.post('/dokter/import', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  },
}

// Helper: simulasi network latency pada mock mode
function simulateDelay(ms = 400) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
