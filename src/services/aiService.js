/**
 * AI SERVICE
 * -------------------------------------------------------
 * Menangani komunikasi dengan AI backend.
 *
 * Opsi integrasi AI:
 *  A) Via Laravel backend (RECOMMENDED untuk produksi):
 *     POST /api/ai/chat    → Laravel memanggil OpenAI/Claude API
 *     Keuntungan: API key aman di server, bisa logging, rate-limit
 *
 *  B) Direct ke Anthropic/OpenAI (hanya dev/prototype):
 *     Tidak aman untuk produksi karena expose API key ke client
 *
 * Saat ini: mock responses untuk development
 */

import api from '@/services/api.js'

const USE_MOCK = true

/** Respons mock AI berdasarkan keyword dalam pesan */
const MOCK_RESPONSES = [
  {
    keywords: ['kritis', 'darurat', 'paling kritis'],
    response: `📍 **Analisis Wilayah Kritis (per April 2025)**\n\nSaya mendeteksi **7 kabupaten** dengan status KRITIS:\n\n1. **Kab. Yahukimo** — 0 dokter / 200.312 jiwa (rasio: 0.00)\n2. **Kab. Nduga** — 1 dokter / 113.480 jiwa (rasio: 0.01)\n3. **Kab. Puncak** — 1 dokter / 145.703 jiwa (rasio: 0.01)\n4. **Kab. Puncak Jaya** — 2 dokter / 132.090 jiwa (rasio: 0.02)\n5. **Kab. Mamberamo Tengah** — 1 dokter / 52.000 jiwa (rasio: 0.02)\n\n⚠️ Semua wilayah ini berada jauh di bawah standar WHO (1 dokter/1.000 jiwa). Diperlukan **tindakan darurat** dalam waktu 30 hari.`,
  },
  {
    keywords: ['rekomendasi', 'prioritas', 'penempatan'],
    response: `🎯 **Top 5 Rekomendasi Penempatan Dokter (Bulan Ini)**\n\nBerdasarkan analisis rasio dokter-penduduk, aksesibilitas, dan urgensi kasus:\n\n1. **Kab. Yahukimo** → 8 Dokter Umum + 2 Sp.A (skor urgensi: 95%)\n2. **Kab. Nduga** → 5 Dokter Umum + 2 Sp.A (skor: 88%)\n3. **Kab. Sumba Barat** → 4 Dokter Umum + 1 Sp.OG (skor: 76%)\n4. **Kab. Kepulauan Sula** → 3 Sp.PD + 2 Dokter Umum (skor: 71%)\n5. **Kab. Maluku Barat Daya** → 6 Dokter Umum (skor: 65%)\n\n📋 Total kebutuhan bulan ini: **47 dokter** di 12 wilayah.`,
  },
  {
    keywords: ['prediksi', '6 bulan', '1 tahun', 'proyeksi'],
    response: `📈 **Prediksi Kebutuhan Dokter — 6 Bulan ke Depan**\n\nModel prediktif (berdasarkan tren historis + pertumbuhan penduduk):\n\n• **Papua & Papua Pegunungan**: Kebutuhan naik +18% karena pertumbuhan penduduk dan ekspansi puskesmas baru\n• **NTT**: Stabil, tapi 8 kontrak PTT berakhir → defisit 8 dokter jika tidak diperpanjang\n• **Maluku Utara**: Kebutuhan turun -5% setelah 4 dokter PTT baru ditugaskan\n\n🔮 Secara nasional: kebutuhan dokter wilayah 3T akan meningkat **12%** pada Q3 2025.`,
  },
  {
    keywords: ['laporan', 'ringkasan', 'summary', 'minggu'],
    response: `📊 **Ringkasan Laporan Mingguan (Minggu ke-3 April 2025)**\n\n✅ **Pencapaian:**\n- 5 dokter baru berhasil ditempatkan di wilayah kritis\n- Rasio rata-rata naik dari 0.36 → 0.38/1.000 jiwa\n- Kab. Asmat berhasil capai rasio minimum 0.5\n\n⚠️ **Perhatian:**\n- 3 kontrak dokter PTT berakhir bulan depan (Manggarai, Flores Timur)\n- Kab. Yahukimo masih 0 dokter aktif\n- Laporan gizi buruk meningkat di Kab. Mappi\n\n📋 **Dokumen laporan lengkap** tersedia di menu Laporan & Analitik.`,
  },
]

export const aiService = {

  /**
   * Kirim pesan ke AI dan dapat respons
   * @param {string} message - pesan dari user
   * @param {Array}  history - riwayat percakapan [{role, content}]
   * @returns {Promise<string>} - respons AI dalam markdown
   */
  async chat(message, history = []) {
    if (USE_MOCK) {
      await delay(1200 + Math.random() * 800)
      return getMockResponse(message)
    }

    /**
     * Ketika USE_MOCK = false, uncomment ini:
     *
     * const res = await api.post('/ai/chat', {
     *   message,
     *   history,
     *   context: 'medtrack-3t-monitoring',
     * })
     * return res.data.response
     */
  },

  /**
   * Generate laporan otomatis dari data wilayah
   * @param {Object} data - data statistik untuk context AI
   */
  async generateReport(data) {
    if (USE_MOCK) {
      await delay(2000)
      return `📄 **Laporan AI Otomatis**\n\nDibuat: ${new Date().toLocaleDateString('id-ID')}\n\nTotal dokter: ${data.totalDokter}, Wilayah kritis: ${data.kritis}. Analisis lengkap memerlukan koneksi ke backend AI.`
    }
    const res = await api.post('/ai/generate-report', { data })
    return res.data.report
  },

  /**
   * Analisis wilayah spesifik
   * @param {string} wilayahId
   */
  async analyzeWilayah(wilayahId) {
    if (USE_MOCK) {
      await delay(1000)
      return `🔍 Analisis wilayah ${wilayahId}: Berdasarkan data yang tersedia, wilayah ini membutuhkan perhatian segera. Rekomendasi penempatan minimal 3 dokter umum dan 1 dokter spesialis anak dalam 60 hari ke depan.`
    }
    const res = await api.post(`/ai/analyze-wilayah/${wilayahId}`)
    return res.data.analysis
  },
}

// ─── Helpers ────────────────────────────────────────────────────

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getMockResponse(message) {
  const lower = message.toLowerCase()
  for (const item of MOCK_RESPONSES) {
    if (item.keywords.some(kw => lower.includes(kw))) {
      return item.response
    }
  }
  return `🤖 Terima kasih atas pertanyaan Anda tentang "${message}".\n\nBerdasarkan data terkini, saya merekomendasikan untuk memeriksa:\n1. Status wilayah kritis di Papua Pegunungan\n2. Kontrak dokter yang akan berakhir dalam 60 hari\n3. Rasio dokter/penduduk di bawah standar WHO\n\nApakah ada yang ingin saya analisis lebih detail?`
}
