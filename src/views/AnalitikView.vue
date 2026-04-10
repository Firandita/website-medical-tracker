<template>
  <div class="space-y-5 animate-[slideIn_0.3s_ease]">
    <div class="card-glass rounded-2xl shadow-card p-6">
      <h2 class="font-display font-bold text-slate-800 text-xl mb-2">Laporan & Analitik</h2>
      <p class="text-slate-500 text-sm mb-6">Statistik dan tren sebaran dokter di kabupaten/kota wilayah 3T</p>

      <!-- Charts grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-slate-50 rounded-xl p-4">
          <h4 class="font-display font-semibold text-slate-700 text-sm mb-3">Distribusi Status Wilayah 3T</h4>
          <div style="height:220px"><canvas ref="donutRef"></canvas></div>
        </div>
        <div class="bg-slate-50 rounded-xl p-4">
          <h4 class="font-display font-semibold text-slate-700 text-sm mb-3">Sebaran Dokter per Provinsi</h4>
          <div style="height:220px"><canvas ref="barRef"></canvas></div>
        </div>
        <div class="bg-slate-50 rounded-xl p-4 lg:col-span-2">
          <h4 class="font-display font-semibold text-slate-700 text-sm mb-3">Tren Rasio Dokter/1.000 jiwa (12 Bulan)</h4>
          <div style="height:200px"><canvas ref="lineRef"></canvas></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const donutRef = ref(null)
const barRef   = ref(null)
const lineRef  = ref(null)

onMounted(() => {
  new Chart(donutRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Kritis', 'Kurang', 'Cukup', 'Terpenuhi'],
      datasets: [{ data: [7, 10, 5, 2], backgroundColor: ['#ef4444','#f59e0b','#3b82f6','#22c55e'], borderWidth: 3, borderColor: '#f8fafc' }],
    },
    options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, color: '#64748b' } } } },
  })

  new Chart(barRef.value, {
    type: 'bar',
    data: {
      labels: ['Papua Peg.', 'Papua', 'NTT', 'Maluku Ut.', 'Maluku', 'Kalut', 'Kepri'],
      datasets: [{ label: 'Dokter', data: [5, 7, 45, 6, 19, 30, 12], backgroundColor: '#14b8a6', borderRadius: 6 }],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(0,0,0,0.04)' } } } },
  })

  new Chart(lineRef.value, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
      datasets: [{ label: 'Rasio rata-rata', data: [0.31,0.32,0.33,0.33,0.34,0.35,0.35,0.36,0.37,0.37,0.38,0.38], borderColor: '#14b8a6', backgroundColor: 'rgba(20,184,166,0.08)', borderWidth: 2, tension: 0.4, fill: true, pointRadius: 3 }],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { font: { size: 11 }, color: '#64748b' } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(0,0,0,0.04)' } } } },
  })
})
</script>
