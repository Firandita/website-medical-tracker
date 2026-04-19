<template>
  <div
    ref="mapContainer"
    :style="{ height: height }"
    class="map-container w-full"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import L from "leaflet";
import { getWilayahStatusInfo } from "@/utils/formatters.js";

const props = defineProps({
  locations: { type: Array, default: () => [] },
  height: { type: String, default: "380px" },
  center: { type: Array, default: () => [-2.5, 118] },
  zoom: { type: Number, default: 4 },
  mode: { type: String, default: "cluster" }, // 'cluster' | 'heatmap'
});

const emit = defineEmits(["markerClick"]);

const mapContainer = ref(null);
let mapInstance = null;
let markers = [];
let heatLayer = null;

onMounted(() => initMap());
onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});

watch(
  () => props.locations,
  () => renderMode(),
  { deep: true },
);
watch(
  () => props.mode,
  () => renderMode(),
);

function initMap() {
  if (!mapContainer.value) return;

  mapInstance = L.map(mapContainer.value, {
    center: props.center,
    zoom: props.zoom,
    zoomControl: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(mapInstance);

  renderMode();
}

function renderMode() {
  if (!mapInstance) return;
  clearAll();
  if (props.mode === "heatmap") {
    renderHeatmap();
  } else {
    renderMarkers();
  }
}

// ── CLUSTER MODE ─────────────────────────────────────────────────
function renderMarkers() {
  props.locations.forEach((loc) => {
    const statusInfo = getWilayahStatusInfo(loc.status);
    const radius = loc.status === "kritis" ? 13 : 10;

    const marker = L.circleMarker([loc.koordinat.lat, loc.koordinat.lng], {
      radius,
      fillColor: statusInfo.color,
      color: "#fff",
      weight: 2.5,
      opacity: 1,
      fillOpacity: 0.85,
    }).addTo(mapInstance);

    marker.bindPopup(buildPopup(loc, statusInfo), { maxWidth: 220 });
    marker.on("click", () => emit("markerClick", loc));
    markers.push(marker);
  });
}

// ── HEATMAP MODE ─────────────────────────────────────────────────
function renderHeatmap() {
  // Intensitas berdasarkan kebalikan rasio — rasio rendah = lebih "panas" (butuh perhatian)
  const maxPop = Math.max(...props.locations.map((l) => l.populasi), 1);

  props.locations.forEach((loc) => {
    const intensity =
      loc.status === "kritis"
        ? 1
        : loc.status === "kurang"
          ? 0.7
          : loc.status === "cukup"
            ? 0.35
            : 0.1;

    const radius = 30 + (loc.populasi / maxPop) * 50;

    // Warna sesuai status
    const colors = {
      kritis: { fill: "rgba(239,68,68,", stroke: "#ef4444" },
      kurang: { fill: "rgba(245,158,11,", stroke: "#f59e0b" },
      cukup: { fill: "rgba(59,130,246,", stroke: "#3b82f6" },
      terpenuhi: { fill: "rgba(34,197,94,", stroke: "#22c55e" },
    };
    const c = colors[loc.status] || colors.cukup;

    // Lingkaran besar semi-transparan = efek heatmap
    const heat = L.circle([loc.koordinat.lat, loc.koordinat.lng], {
      radius: radius * 8000,
      fillColor: c.fill + intensity * 0.35 + ")",
      color: c.stroke,
      weight: 1,
      fillOpacity: 1,
    }).addTo(mapInstance);

    // Titik kecil di tengah agar tetap bisa di-klik
    const dot = L.circleMarker([loc.koordinat.lat, loc.koordinat.lng], {
      radius: 5,
      fillColor: c.stroke,
      color: "#fff",
      weight: 1.5,
      fillOpacity: 1,
    }).addTo(mapInstance);

    dot.bindPopup(buildPopup(loc, getWilayahStatusInfo(loc.status)), {
      maxWidth: 220,
    });
    dot.on("click", () => emit("markerClick", loc));

    markers.push(heat, dot);
  });
}

// ── HELPERS ──────────────────────────────────────────────────────
function clearAll() {
  markers.forEach((m) => m.remove());
  markers = [];
}

function buildPopup(loc, statusInfo) {
  return `
    <div style="font-family:'DM Sans',sans-serif;min-width:190px;padding:2px 0">
      <p style="font-weight:700;color:#1e293b;margin:0 0 6px;font-size:13px">${loc.nama}</p>
      <p style="color:#64748b;font-size:11px;margin:2px 0"><b>Provinsi:</b> ${loc.provinsi}</p>
      <p style="color:#64748b;font-size:11px;margin:2px 0">👨‍⚕️ <b>Dokter aktif:</b> ${loc.jumlahDokter}</p>
      <p style="color:#64748b;font-size:11px;margin:2px 0">👥 <b>Populasi:</b> ${loc.populasi.toLocaleString("id-ID")}</p>
      <p style="color:#64748b;font-size:11px;margin:2px 0">📊 <b>Rasio:</b> ${loc.rasio}/1.000 jiwa</p>
      <p style="color:#64748b;font-size:11px;margin:2px 0">🚗 <b>Aksesibilitas:</b> ${loc.aksesibilitas}</p>
      <span style="display:inline-block;margin-top:6px;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:600;
        background:${statusInfo.color}22;color:${statusInfo.color}">
        ${statusInfo.label.toUpperCase()}
      </span>
    </div>
  `;
}
</script>
