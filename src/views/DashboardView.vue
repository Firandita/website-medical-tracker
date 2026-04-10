<template>
  <div class="space-y-5 animate-[slideIn_0.3s_ease]">

    <!-- Alert banner -->
    <AlertBanner
      title="⚠️ Terdeteksi 12 kabupaten/kota kritis kekurangan dokter"
      subtitle="AI telah mengidentifikasi wilayah prioritas untuk penempatan dokter segera."
      action-label="Lihat Rekomendasi AI"
      @action="$router.push('/ai')"
    />

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        :value="stats?.totalDokter ?? '—'"
        label="Total Dokter Aktif"
        badge="+5.2%"
        badge-class="text-emerald-600 bg-emerald-50"
        gradient-class="gradient-teal"
        :progress="68"
        progress-label="68% dari target nasional"
        progress-bar-class="gradient-teal"
      >
        <template #icon>
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </template>
      </StatCard>

      <StatCard
        :value="wilayahStats?.total ?? '—'"
        label="Total Wilayah 3T Dipantau"
        badge="+12"
        badge-class="text-blue-600 bg-blue-50"
        gradient-class="gradient-blue"
        :progress="73"
        progress-label="dari data Perpres No. 63/2020"
        progress-bar-class="gradient-blue"
      >
        <template #icon>
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </template>
      </StatCard>

      <StatCard
        :value="wilayahStats?.ratioRerata ?? '—'"
        label="Rasio Dokter/1.000 Jiwa"
        badge="Di bawah WHO"
        badge-class="text-amber-600 bg-amber-50"
        gradient-class="gradient-amber"
        :progress="38"
        progress-label="Target WHO: 1.0 dokter/1.000 jiwa"
        progress-bar-class="gradient-amber"
      >
        <template #icon>
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </template>
      </StatCard>

      <StatCard
        :value="wilayahStats?.kritis ?? '—'"
        label="Kabupaten/Kota Kritis"
        badge="KRITIS"
        badge-class="text-red-600 bg-red-50 animate-pulse"
        gradient-class="gradient-red"
        :progress="wilayahStats ? Math.round(wilayahStats.kritis / wilayahStats.total * 100) : 0"
        progress-label="Tanpa dokter aktif atau rasio < 0.05"
        progress-bar-class="gradient-red"
      >
        <template #icon>
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </template>
      </StatCard>
    </div>

    <!-- Map + AI Panel -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">

      <!-- Map card -->
      <div class="xl:col-span-2 card-glass rounded-2xl shadow-card overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="font-display font-semibold text-slate-800">Peta Sebaran Dokter per Kabupaten 3T</h3>
            <p class="text-slate-400 text-xs mt-0.5">Klik marker untuk melihat detail kabupaten/kota</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="text-xs gradient-teal text-white px-3 py-1.5 rounded-lg shadow-sm">Cluster</button>
            <button class="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition">Heatmap</button>
          </div>
        </div>
        <div class="p-4">
          <LeafletMap :locations="mapData" height="380px" @marker-click="onMarkerClick" />
          <!-- Legend -->
          <div class="flex items-center gap-4 mt-3 flex-wrap">
            <p class="text-xs text-slate-500 font-medium">Keterangan:</p>
            <div v-for="leg in legend" :key="leg.label" class="flex items-center gap-1.5">
              <div :class="['w-3 h-3 rounded-full', leg.dot]"></div>
              <span class="text-xs text-slate-500">{{ leg.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- AI mini chat -->
      <AiChatPanel />
    </div>

    <!-- Charts + Alerts -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">

      <!-- Trend chart -->
      <div class="xl:col-span-2 card-glass rounded-2xl shadow-card p-5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="font-display font-semibold text-slate-800">Tren Sebaran Dokter (6 Bulan)</h3>
            <p class="text-slate-400 text-xs">Perkembangan jumlah dokter di kabupaten/kota wilayah 3T</p>
          </div>
        </div>
        <div style="height:220px">
          <canvas ref="trendChartRef"></canvas>
        </div>
      </div>

      <!-- Alert list -->
      <div class="card-glass rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="font-display font-semibold text-slate-800 text-sm">Peringatan Aktif</h3>
            <p class="text-slate-400 text-xs">Kabupaten/kota perlu perhatian</p>
          </div>
          <span class="bg-red-50 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-full">{{ wilayahKritis.length }} kritis</span>
        </div>
        <div class="divide-y divide-slate-50 overflow-y-auto" style="max-height:268px">
          <div
            v-for="w in wilayahKritis.slice(0,5)"
            :key="w.id"
            class="alert-critical p-3 hover:opacity-90 cursor-pointer transition"
            @click="$router.push('/wilayah')"
          >
            <div class="flex items-start gap-2">
              <span class="text-lg flex-shrink-0">🔴</span>
              <div>
                <p class="text-slate-800 text-xs font-semibold">{{ w.nama }}</p>
                <p class="text-slate-500 text-xs">{{ w.jumlahDokter }} dokter untuk {{ w.populasi.toLocaleString('id-ID') }} jiwa</p>
                <div class="flex gap-1 mt-1.5 flex-wrap">
                  <span class="badge-critical">KRITIS</span>
                  <span class="text-slate-500 bg-slate-100 text-xs px-2 py-0.5 rounded-full">{{ w.aksesibilitas }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Kurang -->
          <div
            v-for="w in wilayahKurang.slice(0,3)"
            :key="w.id"
            class="alert-warning p-3 hover:opacity-90 cursor-pointer transition"
            @click="$router.push('/wilayah')"
          >
            <div class="flex items-start gap-2">
              <span class="text-lg flex-shrink-0">🟡</span>
              <div>
                <p class="text-slate-800 text-xs font-semibold">{{ w.nama }}</p>
                <p class="text-slate-500 text-xs">{{ w.jumlahDokter }} dokter untuk {{ w.populasi.toLocaleString('id-ID') }} jiwa</p>
                <span class="badge-warning mt-1.5 inline-block">KURANG</span>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 border-t border-slate-100">
          <button class="text-brand-600 text-xs font-semibold hover:text-brand-700 transition" @click="$router.push('/wilayah')">
            Lihat semua wilayah →
          </button>
        </div>
      </div>
    </div>

    <!-- Recent doctors table -->
    <div class="card-glass rounded-2xl shadow-card overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 class="font-display font-semibold text-slate-800">Dokter Terbaru Ditugaskan</h3>
          <p class="text-slate-400 text-xs">Penugasan dokter di kabupaten/kota wilayah 3T</p>
        </div>
        <button class="btn-primary text-xs py-1.5" @click="$router.push('/dokter')">
          Lihat Semua →
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-100">
              <th class="table-header">Nama Dokter</th>
              <th class="table-header">Spesialisasi</th>
              <th class="table-header">Kabupaten/Kota</th>
              <th class="table-header">Status</th>
              <th class="table-header">Masa Tugas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in dokterList.slice(0, 5)" :key="d.id" class="table-row">
              <td class="table-cell">
                <div class="flex items-center gap-2.5">
                  <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0', d.gradientClass]">
                    {{ d.inisial }}
                  </div>
                  <div>
                    <p class="font-medium text-slate-800 text-sm">{{ d.nama }}</p>
                    <p class="text-xs text-slate-400">{{ d.sip }}</p>
                  </div>
                </div>
              </td>
              <td class="table-cell text-slate-600">{{ d.spesialisasi }}</td>
              <td class="table-cell">
                <p class="text-sm text-slate-700">{{ d.namaWilayah }}</p>
                <p class="text-xs text-slate-400">{{ d.provinsi }}</p>
              </td>
              <td class="table-cell">
                <span :class="getDokterStatusInfo(d.status).class">
                  {{ getDokterStatusInfo(d.status).label }}
                </span>
              </td>
              <td class="table-cell text-slate-600 text-xs">
                s.d. {{ formatDate(d.tanggalSelesai) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Chart from 'chart.js/auto'

import AlertBanner from '@/components/ui/AlertBanner.vue'
import StatCard    from '@/components/ui/StatCard.vue'
import LeafletMap  from '@/components/dashboard/LeafletMap.vue'
import AiChatPanel from '@/components/ai/AiChatPanel.vue'

import { useWilayahStore } from '@/stores/wilayahStore.js'
import { useDokterStore }  from '@/stores/dokterStore.js'
import { getDokterStatusInfo, formatDate } from '@/utils/formatters.js'

const wilayahStore = useWilayahStore()
const dokterStore  = useDokterStore()

const { mapData, wilayahKritis, wilayahKurang } = storeToRefs(wilayahStore)
const { dokterList } = storeToRefs(dokterStore)

const wilayahStats = ref(null)
const stats        = ref(null)
const trendChartRef = ref(null)

const legend = [
  { label: 'Kritis',    dot: 'bg-red-400' },
  { label: 'Kurang',    dot: 'bg-amber-400' },
  { label: 'Cukup',     dot: 'bg-blue-400' },
  { label: 'Terpenuhi', dot: 'bg-emerald-400' },
]

onMounted(async () => {
  await Promise.all([
    wilayahStore.init(),
    dokterStore.init(),
  ])
  wilayahStats.value = wilayahStore.stats
  stats.value        = dokterStore.stats
  buildChart()
})

function buildChart() {
  if (!trendChartRef.value) return
  new Chart(trendChartRef.value, {
    type: 'line',
    data: {
      labels: ['Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      datasets: [
        {
          label: 'Total Dokter',
          data: [1100, 1140, 1170, 1195, 1215, 1240],
          borderColor: '#14b8a6',
          backgroundColor: 'rgba(20,184,166,0.08)',
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#14b8a6',
          pointRadius: 4,
        },
        {
          label: 'Wilayah Terlayani',
          data: [16, 17, 17, 18, 19, 19],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.05)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#3b82f6',
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { family: 'DM Sans', size: 11 }, color: '#64748b' } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 11 } } },
        y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#94a3b8', font: { size: 11 } } },
      },
    },
  })
}

function onMarkerClick(wilayah) {
  console.log('Marker clicked:', wilayah)
  // TODO: buka modal detail wilayah
}
</script>
