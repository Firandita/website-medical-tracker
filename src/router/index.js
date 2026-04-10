import { createRouter, createWebHistory } from 'vue-router'

// Lazy-load semua views untuk performa optimal
const DashboardView    = () => import('@/views/DashboardView.vue')
const PetaSebaranView  = () => import('@/views/PetaSebaranView.vue')
const DataDokterView   = () => import('@/views/DataDokterView.vue')
const Wilayah3TView    = () => import('@/views/Wilayah3TView.vue')
const AnalitikView     = () => import('@/views/AnalitikView.vue')
const AiInsightsView   = () => import('@/views/AiInsightsView.vue')
const PrediksiView     = () => import('@/views/PrediksiView.vue')
const NotFoundView     = () => import('@/views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { title: 'Dashboard Monitoring', subtitle: 'Ringkasan sebaran dokter wilayah 3T' },
  },
  {
    path: '/peta',
    name: 'peta',
    component: PetaSebaranView,
    meta: { title: 'Peta Sebaran Interaktif', subtitle: 'Visualisasi geografis dokter per kabupaten 3T' },
  },
  {
    path: '/dokter',
    name: 'dokter',
    component: DataDokterView,
    meta: { title: 'Manajemen Data Dokter', subtitle: 'Data lengkap dokter yang bertugas di wilayah 3T' },
  },
  {
    path: '/wilayah',
    name: 'wilayah',
    component: Wilayah3TView,
    meta: { title: 'Wilayah 3T', subtitle: 'Kabupaten/kota tertinggal, terdepan, dan terluar' },
  },
  {
    path: '/analitik',
    name: 'analitik',
    component: AnalitikView,
    meta: { title: 'Laporan & Analitik', subtitle: 'Tren dan statistik sebaran dokter' },
  },
  {
    path: '/ai',
    name: 'ai',
    component: AiInsightsView,
    meta: { title: 'AI Insights & Assistant', subtitle: 'Analisis cerdas berbasis kecerdasan buatan' },
  },
  {
    path: '/prediksi',
    name: 'prediksi',
    component: PrediksiView,
    meta: { title: 'Prediksi Kebutuhan', subtitle: 'Proyeksi kebutuhan dokter 6–12 bulan ke depan' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Update document title dari meta route
router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} — MedTrack 3T`
    : 'MedTrack 3T | Kemenkes RI'
})

export default router
