/**
 * DATA MOCK — Kabupaten/Kota Wilayah 3T Indonesia
 * -------------------------------------------------------
 * Sumber referensi: Perpres No. 63 Tahun 2020 tentang Penetapan Daerah Tertinggal
 * dan SK Menteri PDTT tentang daerah 3T (Terdepan, Terluar, Tertinggal).
 *
 * TODO: Ganti dengan API call ke backend Laravel
 * Endpoint: GET /api/wilayah
 */

export const JENIS_3T = {
  TERTINGGAL: 'tertinggal',
  TERDEPAN:   'terdepan',
  TERLUAR:    'terluar',
}

export const STATUS_WILAYAH = {
  KRITIS:  'kritis',    // 0 dokter aktif
  KURANG:  'kurang',    // rasio < 0.5 / 1.000 jiwa
  CUKUP:   'cukup',     // rasio 0.5–1.0 / 1.000 jiwa
  TERPENUHI: 'terpenuhi', // rasio > 1.0 / 1.000 jiwa
}

/** @type {Array<WilayahItem>} */
export const mockWilayah3T = [
  // ============================================================
  // PAPUA PEGUNUNGAN
  // ============================================================
  {
    id: 'W001',
    kode: '9407',
    nama: 'Kab. Yahukimo',
    provinsi: 'Papua Pegunungan',
    jenis: [JENIS_3T.TERTINGGAL, JENIS_3T.TERPENCIL],
    koordinat: { lat: -4.0, lng: 139.0 },
    populasi: 200_312,
    jumlahDokter: 0,
    rasio: 0.00,
    status: STATUS_WILAYAH.KRITIS,
    luasKm2: 17_152,
    aksesibilitas: 'Sangat Sulit',   // udara / jalan kaki
    catatan: 'Tidak ada jalan darat. Akses hanya via pesawat perintis.',
  },
  {
    id: 'W002',
    kode: '9408',
    nama: 'Kab. Nduga',
    provinsi: 'Papua Pegunungan',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -3.8, lng: 138.3 },
    populasi: 113_480,
    jumlahDokter: 1,
    rasio: 0.01,
    status: STATUS_WILAYAH.KRITIS,
    luasKm2: 12_941,
    aksesibilitas: 'Sangat Sulit',
    catatan: null,
  },
  {
    id: 'W003',
    kode: '9409',
    nama: 'Kab. Puncak',
    provinsi: 'Papua Pegunungan',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -3.9, lng: 136.5 },
    populasi: 145_703,
    jumlahDokter: 1,
    rasio: 0.01,
    status: STATUS_WILAYAH.KRITIS,
    luasKm2: 8_055,
    aksesibilitas: 'Sangat Sulit',
    catatan: null,
  },
  {
    id: 'W004',
    kode: '9404',
    nama: 'Kab. Puncak Jaya',
    provinsi: 'Papua Pegunungan',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -3.5, lng: 137.2 },
    populasi: 132_090,
    jumlahDokter: 2,
    rasio: 0.02,
    status: STATUS_WILAYAH.KRITIS,
    luasKm2: 8_034,
    aksesibilitas: 'Sulit',
    catatan: null,
  },
  {
    id: 'W005',
    kode: '9410',
    nama: 'Kab. Mamberamo Tengah',
    provinsi: 'Papua Pegunungan',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -3.6, lng: 138.9 },
    populasi: 52_000,
    jumlahDokter: 1,
    rasio: 0.02,
    status: STATUS_WILAYAH.KRITIS,
    luasKm2: 6_490,
    aksesibilitas: 'Sangat Sulit',
    catatan: null,
  },

  // ============================================================
  // PAPUA
  // ============================================================
  {
    id: 'W006',
    kode: '9105',
    nama: 'Kab. Mappi',
    provinsi: 'Papua',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -6.5, lng: 139.4 },
    populasi: 92_120,
    jumlahDokter: 3,
    rasio: 0.03,
    status: STATUS_WILAYAH.KRITIS,
    luasKm2: 23_120,
    aksesibilitas: 'Sulit',
    catatan: null,
  },
  {
    id: 'W007',
    kode: '9106',
    nama: 'Kab. Asmat',
    provinsi: 'Papua',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -5.6, lng: 138.4 },
    populasi: 107_000,
    jumlahDokter: 4,
    rasio: 0.04,
    status: STATUS_WILAYAH.KRITIS,
    luasKm2: 23_453,
    aksesibilitas: 'Sulit',
    catatan: 'Kasus gizi buruk berulang.',
  },

  // ============================================================
  // NUSA TENGGARA TIMUR (NTT)
  // ============================================================
  {
    id: 'W008',
    kode: '5306',
    nama: 'Kab. Sumba Barat',
    provinsi: 'Nusa Tenggara Timur',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -9.6, lng: 119.4 },
    populasi: 123_780,
    jumlahDokter: 3,
    rasio: 0.24,
    status: STATUS_WILAYAH.KURANG,
    luasKm2: 737,
    aksesibilitas: 'Sedang',
    catatan: null,
  },
  {
    id: 'W009',
    kode: '5320',
    nama: 'Kab. Sumba Barat Daya',
    provinsi: 'Nusa Tenggara Timur',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -9.4, lng: 119.1 },
    populasi: 302_000,
    jumlahDokter: 8,
    rasio: 0.26,
    status: STATUS_WILAYAH.KURANG,
    luasKm2: 1_445,
    aksesibilitas: 'Sedang',
    catatan: null,
  },
  {
    id: 'W010',
    kode: '5316',
    nama: 'Kab. Manggarai Timur',
    provinsi: 'Nusa Tenggara Timur',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -8.6, lng: 120.8 },
    populasi: 263_000,
    jumlahDokter: 10,
    rasio: 0.38,
    status: STATUS_WILAYAH.KURANG,
    luasKm2: 2_506,
    aksesibilitas: 'Sedang',
    catatan: null,
  },
  {
    id: 'W011',
    kode: '5309',
    nama: 'Kab. Alor',
    provinsi: 'Nusa Tenggara Timur',
    jenis: [JENIS_3T.TERLUAR],
    koordinat: { lat: -8.2, lng: 124.5 },
    populasi: 207_000,
    jumlahDokter: 7,
    rasio: 0.34,
    status: STATUS_WILAYAH.KURANG,
    luasKm2: 2_864,
    aksesibilitas: 'Sedang',
    catatan: 'Wilayah kepulauan, akses antar-pulau terbatas.',
  },
  {
    id: 'W012',
    kode: '5321',
    nama: 'Kab. Sabu Raijua',
    provinsi: 'Nusa Tenggara Timur',
    jenis: [JENIS_3T.TERLUAR, JENIS_3T.TERTINGGAL],
    koordinat: { lat: -10.5, lng: 121.8 },
    populasi: 81_000,
    jumlahDokter: 4,
    rasio: 0.49,
    status: STATUS_WILAYAH.KURANG,
    luasKm2: 460,
    aksesibilitas: 'Sulit',
    catatan: 'Pulau terluar berbatasan dengan Australia.',
  },

  // ============================================================
  // MALUKU & MALUKU UTARA
  // ============================================================
  {
    id: 'W013',
    kode: '8201',
    nama: 'Kab. Kepulauan Sula',
    provinsi: 'Maluku Utara',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -1.8, lng: 127.0 },
    populasi: 98_300,
    jumlahDokter: 2,
    rasio: 0.20,
    status: STATUS_WILAYAH.KURANG,
    luasKm2: 9_734,
    aksesibilitas: 'Sulit',
    catatan: null,
  },
  {
    id: 'W014',
    kode: '8206',
    nama: 'Kab. Pulau Taliabu',
    provinsi: 'Maluku Utara',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -1.8, lng: 124.8 },
    populasi: 56_000,
    jumlahDokter: 4,
    rasio: 0.71,
    status: STATUS_WILAYAH.CUKUP,
    luasKm2: 3_195,
    aksesibilitas: 'Sedang',
    catatan: null,
  },
  {
    id: 'W015',
    kode: '8107',
    nama: 'Kab. Maluku Barat Daya',
    provinsi: 'Maluku',
    jenis: [JENIS_3T.TERLUAR, JENIS_3T.TERTINGGAL],
    koordinat: { lat: -7.5, lng: 128.2 },
    populasi: 87_000,
    jumlahDokter: 4,
    rasio: 0.46,
    status: STATUS_WILAYAH.KURANG,
    luasKm2: 8_648,
    aksesibilitas: 'Sulit',
    catatan: 'Kepulauan terluar berbatasan Timor Leste.',
  },
  {
    id: 'W016',
    kode: '8108',
    nama: 'Kab. Kepulauan Tanimbar',
    provinsi: 'Maluku',
    jenis: [JENIS_3T.TERLUAR],
    koordinat: { lat: -7.9, lng: 131.3 },
    populasi: 108_000,
    jumlahDokter: 6,
    rasio: 0.56,
    status: STATUS_WILAYAH.CUKUP,
    luasKm2: 10_102,
    aksesibilitas: 'Sedang',
    catatan: null,
  },
  {
    id: 'W017',
    kode: '8103',
    nama: 'Kab. Seram Bagian Barat',
    provinsi: 'Maluku',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -3.1, lng: 128.2 },
    populasi: 212_000,
    jumlahDokter: 9,
    rasio: 0.42,
    status: STATUS_WILAYAH.KURANG,
    luasKm2: 6_090,
    aksesibilitas: 'Sedang',
    catatan: null,
  },

  // ============================================================
  // KALIMANTAN UTARA
  // ============================================================
  {
    id: 'W018',
    kode: '6508',
    nama: 'Kab. Nunukan',
    provinsi: 'Kalimantan Utara',
    jenis: [JENIS_3T.TERDEPAN],
    koordinat: { lat: 4.0, lng: 117.7 },
    populasi: 196_000,
    jumlahDokter: 18,
    rasio: 0.92,
    status: STATUS_WILAYAH.CUKUP,
    luasKm2: 14_263,
    aksesibilitas: 'Sedang',
    catatan: 'Berbatasan langsung dengan Malaysia (Sabah).',
  },
  {
    id: 'W019',
    kode: '6504',
    nama: 'Kab. Malinau',
    provinsi: 'Kalimantan Utara',
    jenis: [JENIS_3T.TERDEPAN, JENIS_3T.TERTINGGAL],
    koordinat: { lat: 3.6, lng: 116.6 },
    populasi: 81_000,
    jumlahDokter: 12,
    rasio: 1.48,
    status: STATUS_WILAYAH.TERPENUHI,
    luasKm2: 42_620,
    aksesibilitas: 'Sedang',
    catatan: null,
  },

  // ============================================================
  // KEPULAUAN RIAU
  // ============================================================
  {
    id: 'W020',
    kode: '2104',
    nama: 'Kab. Natuna',
    provinsi: 'Kepulauan Riau',
    jenis: [JENIS_3T.TERLUAR, JENIS_3T.TERDEPAN],
    koordinat: { lat: 3.8, lng: 108.2 },
    populasi: 95_000,
    jumlahDokter: 8,
    rasio: 0.84,
    status: STATUS_WILAYAH.CUKUP,
    luasKm2: 2_001,
    aksesibilitas: 'Sedang',
    catatan: 'Kepulauan di Laut China Selatan.',
  },
  {
    id: 'W021',
    kode: '2105',
    nama: 'Kab. Kepulauan Anambas',
    provinsi: 'Kepulauan Riau',
    jenis: [JENIS_3T.TERLUAR],
    koordinat: { lat: 3.3, lng: 106.1 },
    populasi: 43_000,
    jumlahDokter: 4,
    rasio: 0.93,
    status: STATUS_WILAYAH.CUKUP,
    luasKm2: 590,
    aksesibilitas: 'Sedang',
    catatan: null,
  },

  // ============================================================
  // NUSA TENGGARA BARAT
  // ============================================================
  {
    id: 'W022',
    kode: '5204',
    nama: 'Kab. Dompu',
    provinsi: 'Nusa Tenggara Barat',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -8.5, lng: 118.5 },
    populasi: 248_000,
    jumlahDokter: 14,
    rasio: 0.56,
    status: STATUS_WILAYAH.CUKUP,
    luasKm2: 2_321,
    aksesibilitas: 'Mudah',
    catatan: null,
  },

  // ============================================================
  // SULAWESI TENGAH
  // ============================================================
  {
    id: 'W023',
    kode: '7208',
    nama: 'Kab. Tojo Una-Una',
    provinsi: 'Sulawesi Tengah',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -1.5, lng: 121.9 },
    populasi: 145_000,
    jumlahDokter: 5,
    rasio: 0.34,
    status: STATUS_WILAYAH.KURANG,
    luasKm2: 5_712,
    aksesibilitas: 'Sedang',
    catatan: null,
  },
  {
    id: 'W024',
    kode: '7213',
    nama: 'Kab. Morowali Utara',
    provinsi: 'Sulawesi Tengah',
    jenis: [JENIS_3T.TERTINGGAL],
    koordinat: { lat: -1.8, lng: 121.1 },
    populasi: 110_000,
    jumlahDokter: 6,
    rasio: 0.55,
    status: STATUS_WILAYAH.CUKUP,
    luasKm2: 10_004,
    aksesibilitas: 'Sedang',
    catatan: null,
  },
]

/**
 * Hitung statistik ringkasan dari data wilayah
 * @returns {Object} summary stats
 */
export function getWilayahStats() {
  const total        = mockWilayah3T.length
  const kritis       = mockWilayah3T.filter(w => w.status === STATUS_WILAYAH.KRITIS).length
  const kurang       = mockWilayah3T.filter(w => w.status === STATUS_WILAYAH.KURANG).length
  const cukup        = mockWilayah3T.filter(w => w.status === STATUS_WILAYAH.CUKUP).length
  const terpenuhi    = mockWilayah3T.filter(w => w.status === STATUS_WILAYAH.TERPENUHI).length
  const totalDokter  = mockWilayah3T.reduce((sum, w) => sum + w.jumlahDokter, 0)
  const totalPop     = mockWilayah3T.reduce((sum, w) => sum + w.populasi, 0)
  const ratioRerata  = totalPop > 0 ? ((totalDokter / totalPop) * 1000).toFixed(2) : 0

  return { total, kritis, kurang, cukup, terpenuhi, totalDokter, totalPop, ratioRerata }
}

/**
 * Ambil wilayah berdasarkan status
 * @param {string} status
 */
export function getWilayahByStatus(status) {
  return mockWilayah3T.filter(w => w.status === status)
}

/**
 * Ambil wilayah berdasarkan provinsi
 * @param {string} provinsi
 */
export function getWilayahByProvinsi(provinsi) {
  return mockWilayah3T.filter(w => w.provinsi === provinsi)
}

/** Daftar provinsi unik */
export const PROVINSI_LIST = [...new Set(mockWilayah3T.map(w => w.provinsi))].sort()
