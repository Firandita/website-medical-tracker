/**
 * DATA MOCK — Dokter Bertugas di Wilayah 3T
 * -------------------------------------------------------
 * TODO: Replace dengan API call ke backend Laravel
 * Endpoint: GET /api/dokter
 */

export const SPESIALISASI = {
  UMUM:        'Dokter Umum',
  ANAK:        'Spesialis Anak (Sp.A)',
  DALAM:       'Penyakit Dalam (Sp.PD)',
  BEDAH:       'Bedah (Sp.B)',
  OBGIN:       'Kebidanan (Sp.OG)',
  RADIOLOGI:   'Radiologi (Sp.Rad)',
  ANESTESI:    'Anestesiologi (Sp.An)',
  JIWA:        'Jiwa (Sp.KJ)',
  THT:         'THT (Sp.THT)',
  KULIT:       'Kulit & Kelamin (Sp.KK)',
}

export const JENIS_PENUGASAN = {
  PTT:             'PTT (Pegawai Tidak Tetap)',
  NUSANTARA_SEHAT: 'Nusantara Sehat',
  INTERNSIP:       'Internsip',
  PNS:             'PNS',
  KONTRAK:         'Kontrak Daerah',
}

export const STATUS_DOKTER = {
  AKTIF:          'aktif',
  AKAN_BERAKHIR:  'akan_berakhir',   // < 60 hari
  SELESAI:        'selesai',
  CUTI:           'cuti',
}

/** @type {Array<DokterItem>} */
export const mockDokter = [
  {
    id: 'D001',
    nama: 'dr. Ahmad Rizky Pratama, Sp.PD',
    inisial: 'AR',
    sip: '3201.0023.2022',
    spesialisasi: SPESIALISASI.DALAM,
    jenisPenugasan: JENIS_PENUGASAN.PTT,
    wilayahId: 'W001',
    namaWilayah: 'Kab. Yahukimo',
    provinsi: 'Papua Pegunungan',
    tanggalMulai: '2022-04-01',
    tanggalSelesai: '2026-04-01',
    status: STATUS_DOKTER.AKAN_BERAKHIR,
    kontak: '082111223344',
    email: 'ahmad.rizky@kemenkes.go.id',
    gradientClass: 'gradient-teal',
    catatan: 'Dokter satu-satunya di wilayah ini.',
  },
  {
    id: 'D002',
    nama: 'dr. Nisa Putri Andini, Sp.A',
    inisial: 'NP',
    sip: '3301.0041.2023',
    spesialisasi: SPESIALISASI.ANAK,
    jenisPenugasan: JENIS_PENUGASAN.NUSANTARA_SEHAT,
    wilayahId: 'W008',
    namaWilayah: 'Kab. Sumba Barat',
    provinsi: 'Nusa Tenggara Timur',
    tanggalMulai: '2023-01-15',
    tanggalSelesai: '2025-01-15',
    status: STATUS_DOKTER.SELESAI,
    kontak: '081299887766',
    email: 'nisa.putri@kemenkes.go.id',
    gradientClass: 'gradient-blue',
    catatan: null,
  },
  {
    id: 'D003',
    nama: 'dr. Budi Santoso Hartono',
    inisial: 'BH',
    sip: '7101.0082.2023',
    spesialisasi: SPESIALISASI.UMUM,
    jenisPenugasan: JENIS_PENUGASAN.PTT,
    wilayahId: 'W013',
    namaWilayah: 'Kab. Kepulauan Sula',
    provinsi: 'Maluku Utara',
    tanggalMulai: '2023-05-01',
    tanggalSelesai: '2025-05-01',
    status: STATUS_DOKTER.AKAN_BERAKHIR,
    kontak: '085677889900',
    email: 'budi.hartono@kemenkes.go.id',
    gradientClass: 'gradient-purple',
    catatan: null,
  },
  {
    id: 'D004',
    nama: 'dr. Sari Melati Dewi, Sp.OG',
    inisial: 'SM',
    sip: '6101.0015.2022',
    spesialisasi: SPESIALISASI.OBGIN,
    jenisPenugasan: JENIS_PENUGASAN.NUSANTARA_SEHAT,
    wilayahId: 'W014',
    namaWilayah: 'Kab. Pulau Taliabu',
    provinsi: 'Maluku Utara',
    tanggalMulai: '2022-06-01',
    tanggalSelesai: '2025-06-01',
    status: STATUS_DOKTER.AKTIF,
    kontak: '081344556677',
    email: 'sari.melati@kemenkes.go.id',
    gradientClass: 'gradient-amber',
    catatan: null,
  },
  {
    id: 'D005',
    nama: 'dr. Eka Prasetya Wibowo',
    inisial: 'EP',
    sip: '3501.0099.2023',
    spesialisasi: SPESIALISASI.UMUM,
    jenisPenugasan: JENIS_PENUGASAN.INTERNSIP,
    wilayahId: 'W006',
    namaWilayah: 'Kab. Mappi',
    provinsi: 'Papua',
    tanggalMulai: '2023-08-01',
    tanggalSelesai: '2024-08-01',
    status: STATUS_DOKTER.SELESAI,
    kontak: '082344556677',
    email: 'eka.prasetya@kemenkes.go.id',
    gradientClass: 'gradient-red',
    catatan: null,
  },
  {
    id: 'D006',
    nama: 'dr. Rahayu Kusuma Ningrum, Sp.A',
    inisial: 'RK',
    sip: '5101.0031.2022',
    spesialisasi: SPESIALISASI.ANAK,
    jenisPenugasan: JENIS_PENUGASAN.PTT,
    wilayahId: 'W009',
    namaWilayah: 'Kab. Sumba Barat Daya',
    provinsi: 'Nusa Tenggara Timur',
    tanggalMulai: '2022-03-01',
    tanggalSelesai: '2025-03-01',
    status: STATUS_DOKTER.AKTIF,
    kontak: '081299001122',
    email: 'rahayu.kusuma@kemenkes.go.id',
    gradientClass: 'gradient-teal',
    catatan: null,
  },
  {
    id: 'D007',
    nama: 'dr. Hendra Wijaya, Sp.B',
    inisial: 'HW',
    sip: '9101.0007.2021',
    spesialisasi: SPESIALISASI.BEDAH,
    jenisPenugasan: JENIS_PENUGASAN.PNS,
    wilayahId: 'W020',
    namaWilayah: 'Kab. Natuna',
    provinsi: 'Kepulauan Riau',
    tanggalMulai: '2021-01-01',
    tanggalSelesai: '2026-12-31',
    status: STATUS_DOKTER.AKTIF,
    kontak: '085601234567',
    email: 'hendra.wijaya@kemenkes.go.id',
    gradientClass: 'gradient-blue',
    catatan: null,
  },
  {
    id: 'D008',
    nama: 'dr. Dewi Lestari Wulandari',
    inisial: 'DL',
    sip: '6501.0044.2023',
    spesialisasi: SPESIALISASI.UMUM,
    jenisPenugasan: JENIS_PENUGASAN.NUSANTARA_SEHAT,
    wilayahId: 'W018',
    namaWilayah: 'Kab. Nunukan',
    provinsi: 'Kalimantan Utara',
    tanggalMulai: '2023-02-01',
    tanggalSelesai: '2025-02-01',
    status: STATUS_DOKTER.AKTIF,
    kontak: '085788997766',
    email: 'dewi.lestari@kemenkes.go.id',
    gradientClass: 'gradient-purple',
    catatan: null,
  },
]

/**
 * Hitung statistik dokter
 * @returns {Object}
 */
export function getDokterStats() {
  return {
    total:          mockDokter.length,
    aktif:          mockDokter.filter(d => d.status === STATUS_DOKTER.AKTIF).length,
    akanBerakhir:   mockDokter.filter(d => d.status === STATUS_DOKTER.AKAN_BERAKHIR).length,
    selesai:        mockDokter.filter(d => d.status === STATUS_DOKTER.SELESAI).length,
  }
}

/**
 * Cari dokter dengan filter sederhana (client-side)
 * @param {Object} filters - { search, spesialisasi, provinsi, status, jenisPenugasan }
 */
export function filterDokter({ search = '', spesialisasi = '', provinsi = '', status = '', jenisPenugasan = '' } = {}) {
  return mockDokter.filter(d => {
    const matchSearch    = !search || d.nama.toLowerCase().includes(search.toLowerCase()) || d.sip.includes(search)
    const matchSpesialis = !spesialisasi || d.spesialisasi === spesialisasi
    const matchProvinsi  = !provinsi || d.provinsi === provinsi
    const matchStatus    = !status || d.status === status
    const matchJenis     = !jenisPenugasan || d.jenisPenugasan === jenisPenugasan
    return matchSearch && matchSpesialis && matchProvinsi && matchStatus && matchJenis
  })
}
