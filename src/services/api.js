/**
 * API SERVICE — Base Axios instance
 * -------------------------------------------------------
 * Semua request ke Laravel backend melalui file ini.
 * Ganti BASE_URL sesuai environment production.
 *
 * CARA PAKAI di service lain:
 *   import api from '@/services/api'
 *   const res = await api.get('/dokter')
 */

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,   // penting untuk Laravel Sanctum (cookie-based auth)
})

// ── Request interceptor: inject Bearer token jika ada ───────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ── Response interceptor: handle error global ───────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      // Token expired / belum login → redirect ke login
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }

    if (status === 403) {
      console.error('[API] Forbidden — tidak punya akses ke resource ini.')
    }

    if (status === 422) {
      // Validation error dari Laravel
      console.error('[API] Validation error:', error.response.data.errors)
    }

    if (status >= 500) {
      console.error('[API] Server error:', error.response?.data?.message)
    }

    return Promise.reject(error)
  },
)

export default api
