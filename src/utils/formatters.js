/**
 * FORMATTERS — Utility functions
 */

/**
 * Format angka populasi → "200.312"
 */
export function formatNumber(n) {
  if (!n && n !== 0) return '—'
  return n.toLocaleString('id-ID')
}

/**
 * Format rasio dokter → "0.38"
 */
export function formatRasio(r) {
  if (r === undefined || r === null) return '—'
  return parseFloat(r).toFixed(2)
}

/**
 * Format tanggal ISO → "1 April 2025"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

/**
 * Format tanggal singkat → "01/04/2025"
 */
export function formatDateShort(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('id-ID')
}

/**
 * Hitung sisa hari dari hari ini ke tanggal tertentu
 * @returns {number} hari (negatif = sudah lewat)
 */
export function daysUntil(dateStr) {
  if (!dateStr) return null
  const diff = new Date(dateStr) - new Date()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Tentukan label & class badge status dokter
 */
export function getDokterStatusInfo(status) {
  const map = {
    aktif:          { label: 'Aktif',          class: 'badge-ok' },
    akan_berakhir:  { label: 'Akan Berakhir',   class: 'badge-warning' },
    selesai:        { label: 'Selesai Tugas',   class: 'badge-expired' },
    cuti:           { label: 'Cuti',            class: 'badge-info' },
  }
  return map[status] || { label: status, class: 'badge-info' }
}

/**
 * Tentukan label & class badge status wilayah
 */
export function getWilayahStatusInfo(status) {
  const map = {
    kritis:     { label: 'Kritis',     class: 'badge-critical', color: '#ef4444', dot: 'bg-red-400' },
    kurang:     { label: 'Kurang',     class: 'badge-warning',  color: '#f59e0b', dot: 'bg-amber-400' },
    cukup:      { label: 'Cukup',      class: 'badge-info',     color: '#3b82f6', dot: 'bg-blue-400' },
    terpenuhi:  { label: 'Terpenuhi',  class: 'badge-ok',       color: '#22c55e', dot: 'bg-emerald-400' },
  }
  return map[status] || { label: status, class: 'badge-info', color: '#94a3b8', dot: 'bg-slate-400' }
}

/**
 * Truncate string
 */
export function truncate(str, len = 40) {
  if (!str) return ''
  return str.length > len ? str.slice(0, len) + '…' : str
}

/**
 * Parse markdown bold (**text**) ke HTML <strong>
 */
export function parseMdBold(text) {
  if (!text) return ''
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}
