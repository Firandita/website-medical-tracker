<template>
  <div ref="mapContainer" :style="{ height: height }" class="map-container w-full" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import L from 'leaflet'
import { getWilayahStatusInfo } from '@/utils/formatters.js'

const props = defineProps({
  locations: { type: Array, default: () => [] },  // array of WilayahMapData
  height:    { type: String, default: '380px' },
  center:    { type: Array,  default: () => [-2.5, 118] },
  zoom:      { type: Number, default: 4 },
})

const emit = defineEmits(['markerClick'])

const mapContainer = ref(null)
let mapInstance    = null
let markers        = []

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
})

watch(() => props.locations, () => {
  updateMarkers()
}, { deep: true })

function initMap() {
  if (!mapContainer.value) return

  mapInstance = L.map(mapContainer.value, {
    center: props.center,
    zoom:   props.zoom,
    zoomControl: true,
  })

  // Tile layer OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(mapInstance)

  updateMarkers()
}

function updateMarkers() {
  if (!mapInstance) return

  // Hapus marker lama
  markers.forEach(m => m.remove())
  markers = []

  props.locations.forEach(loc => {
    const statusInfo = getWilayahStatusInfo(loc.status)
    const radius     = loc.status === 'kritis' ? 13 : 10

    const marker = L.circleMarker([loc.koordinat.lat, loc.koordinat.lng], {
      radius,
      fillColor:   statusInfo.color,
      color:       '#fff',
      weight:      2.5,
      opacity:     1,
      fillOpacity: 0.85,
    }).addTo(mapInstance)

    marker.bindPopup(buildPopup(loc, statusInfo), { maxWidth: 220 })
    marker.on('click', () => emit('markerClick', loc))

    markers.push(marker)
  })
}

function buildPopup(loc, statusInfo) {
  return `
    <div style="font-family:'DM Sans',sans-serif;min-width:190px;padding:2px 0">
      <p style="font-weight:700;color:#1e293b;margin:0 0 6px;font-size:13px">${loc.nama}</p>
      <p style="color:#64748b;font-size:11px;margin:2px 0"><b>Provinsi:</b> ${loc.provinsi}</p>
      <p style="color:#64748b;font-size:11px;margin:2px 0">👨‍⚕️ <b>Dokter aktif:</b> ${loc.jumlahDokter}</p>
      <p style="color:#64748b;font-size:11px;margin:2px 0">👥 <b>Populasi:</b> ${loc.populasi.toLocaleString('id-ID')}</p>
      <p style="color:#64748b;font-size:11px;margin:2px 0">📊 <b>Rasio:</b> ${loc.rasio}/1.000 jiwa</p>
      <p style="color:#64748b;font-size:11px;margin:2px 0">🚗 <b>Aksesibilitas:</b> ${loc.aksesibilitas}</p>
      <span style="display:inline-block;margin-top:6px;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:600;
        background:${statusInfo.color}22;color:${statusInfo.color}">
        ${statusInfo.label.toUpperCase()}
      </span>
    </div>
  `
}
</script>
