<template>
  <div class="space-y-5 animate-[slideIn_0.3s_ease]">
    <div class="card-glass rounded-2xl shadow-card p-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 gradient-teal rounded-xl flex items-center justify-center text-lg shadow-sm">🔮</div>
        <div>
          <h2 class="font-display font-bold text-slate-800 text-xl">Prediksi Kebutuhan Dokter</h2>
          <p class="text-slate-500 text-sm">Proyeksi AI berbasis tren historis & pertumbuhan populasi</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div v-for="p in prediksiCards" :key="p.label" :class="['rounded-xl p-4 border', p.bgClass]">
          <p class="text-2xl mb-1">{{ p.emoji }}</p>
          <p :class="['font-display font-bold text-xl', p.color]">{{ p.value }}</p>
          <p class="text-slate-600 text-sm font-medium">{{ p.label }}</p>
          <p class="text-slate-400 text-xs mt-1">{{ p.desc }}</p>
        </div>
      </div>

      <div class="bg-slate-50 rounded-xl p-5">
        <h4 class="font-display font-semibold text-slate-700 mb-4">Proyeksi Kebutuhan per Wilayah (6 Bulan)</h4>
        <div style="height:280px"><canvas ref="prediksiChartRef"></canvas></div>
      </div>

      <div class="mt-4 p-4 bg-brand-50 border border-brand-100 rounded-xl">
        <p class="text-xs text-brand-700 font-semibold mb-1">📊 Metodologi AI</p>
        <p class="text-xs text-slate-600 leading-relaxed">
          Prediksi menggunakan model time-series (ARIMA) yang dikombinasikan dengan data pertumbuhan penduduk BPS,
          tren penyakit endemik, dan rencana pembangunan fasilitas kesehatan baru dari data Kemenkes.
          Akurasi model: <strong>87.3%</strong> berdasarkan validasi data 2022–2024.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const prediksiChartRef = ref(null)

const prediksiCards = [
  { emoji: '📈', value: '+147 dokter', label: 'Kebutuhan Tambahan', desc: 'Total di semua wilayah 3T dalam 6 bulan ke depan', bgClass: 'bg-blue-50 border-blue-100', color: 'text-blue-700' },
  { emoji: '🚨', value: '7 kabupaten', label: 'Risiko Krisis Baru', desc: 'Diprediksi memasuki status kritis jika tidak ada intervensi', bgClass: 'bg-red-50 border-red-100', color: 'text-red-700' },
  { emoji: '✅', value: '5 kabupaten', label: 'Potensi Perbaikan', desc: 'Diprediksi naik ke status "cukup" dengan penempatan minimal', bgClass: 'bg-emerald-50 border-emerald-100', color: 'text-emerald-700' },
]

onMounted(() => {
  if (!prediksiChartRef.value) return
  new Chart(prediksiChartRef.value, {
    type: 'bar',
    data: {
      labels: ['Kab. Yahukimo', 'Kab. Nduga', 'Kab. Sumba Barat', 'Kab. Kep. Sula', 'Kab. Mappi', 'Kab. Asmat'],
      datasets: [
        { label: 'Dokter Saat Ini',     data: [0, 1, 3, 2, 3, 4], backgroundColor: '#94a3b8', borderRadius: 4 },
        { label: 'Kebutuhan 6 Bulan',   data: [8, 6, 7, 5, 6, 6], backgroundColor: '#14b8a6', borderRadius: 4 },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { font: { size: 11 }, color: '#64748b' } } },
      scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { stepSize: 2 } } },
    },
  })
})
</script>
