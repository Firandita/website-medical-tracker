<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
        >
          <!-- Header -->
          <div
            class="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-gradient-to-r from-teal-50 to-emerald-50"
          >
            <div
              class="w-9 h-9 gradient-teal rounded-xl flex items-center justify-center text-lg shadow-sm"
            >
              🎯
            </div>
            <div class="flex-1">
              <h3 class="font-display font-bold text-slate-800">
                Draft Usulan Penugasan
              </h3>
              <p class="text-emerald-600 text-xs">
                Dibuat otomatis oleh MedAI · {{ today }}
              </p>
            </div>
            <button
              class="text-slate-400 hover:text-slate-600 transition"
              @click="close"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
            <!-- Status info -->
            <div
              class="flex gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700"
            >
              <svg
                class="w-4 h-4 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span
                >Draft ini berisi usulan penugasan berdasarkan rekomendasi AI.
                Dokumen ini dapat di-export dan dikirim ke tim SDM untuk
                ditindaklanjuti.</span
              >
            </div>

            <!-- Tabel rekomendasi -->
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-slate-100">
                  <th class="table-header text-left w-6">#</th>
                  <th class="table-header text-left">Wilayah</th>
                  <th class="table-header text-left">Kebutuhan Dokter</th>
                  <th class="table-header text-left">Urgensi</th>
                  <th class="table-header text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(rec, i) in draftItems"
                  :key="rec.wilayah"
                  class="border-b border-slate-50"
                >
                  <td class="table-cell text-slate-400 font-medium">
                    {{ i + 1 }}
                  </td>
                  <td class="table-cell">
                    <p class="font-medium text-slate-800">{{ rec.wilayah }}</p>
                  </td>
                  <td class="table-cell text-slate-600 text-xs">
                    {{ rec.kebutuhan }}
                  </td>
                  <td class="table-cell">
                    <div class="flex items-center gap-1.5">
                      <div class="h-1.5 w-16 bg-slate-100 rounded-full">
                        <div
                          :class="['h-1.5 rounded-full', rec.barClass]"
                          :style="{ width: rec.score + '%' }"
                        ></div>
                      </div>
                      <span :class="['text-xs font-bold', rec.scoreClass]"
                        >{{ rec.score }}%</span
                      >
                    </div>
                  </td>
                  <td class="table-cell">
                    <select
                      v-model="rec.statusDraft"
                      class="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-400"
                    >
                      <option value="diusulkan">Diusulkan</option>
                      <option value="disetujui">Disetujui</option>
                      <option value="ditunda">Ditunda</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Catatan -->
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1.5"
                >Catatan untuk Tim SDM</label
              >
              <textarea
                v-model="catatan"
                rows="3"
                class="input-base resize-none text-sm"
                placeholder="Tambahkan catatan atau instruksi tambahan untuk tim SDM..."
              />
            </div>
          </div>

          <!-- Footer -->
          <div
            class="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50"
          >
            <div class="text-xs text-slate-400">
              {{
                draftItems.filter((d) => d.statusDraft === "disetujui").length
              }}
              disetujui ·
              {{
                draftItems.filter((d) => d.statusDraft === "diusulkan").length
              }}
              diusulkan ·
              {{
                draftItems.filter((d) => d.statusDraft === "ditunda").length
              }}
              ditunda
            </div>
            <div class="flex gap-2">
              <button class="btn-outline text-xs" @click="close">Tutup</button>
              <button class="btn-secondary text-xs" @click="exportCSV">
                <svg
                  class="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export CSV
              </button>
              <button class="btn-primary text-xs" @click="exportCSV">
                <svg
                  class="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Simpan & Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive } from "vue";

const isOpen = ref(false);
const catatan = ref("");

const today = new Date().toLocaleDateString("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Data rekomendasi — sama persis dengan yang di AiInsightsView
const draftItems = reactive([
  {
    wilayah: "Kab. Yahukimo",
    kebutuhan: "8 Dokter Umum + 2 Sp.A",
    score: 95,
    barClass: "bg-red-400",
    scoreClass: "text-red-500",
    statusDraft: "diusulkan",
  },
  {
    wilayah: "Kab. Nduga",
    kebutuhan: "5 Dokter + 2 Sp.A",
    score: 88,
    barClass: "bg-red-400",
    scoreClass: "text-red-500",
    statusDraft: "diusulkan",
  },
  {
    wilayah: "Kab. Sumba Barat",
    kebutuhan: "4 Dokter Umum + 1 Sp.OG",
    score: 76,
    barClass: "bg-amber-400",
    scoreClass: "text-amber-500",
    statusDraft: "diusulkan",
  },
  {
    wilayah: "Kab. Kepulauan Sula",
    kebutuhan: "3 Sp.PD",
    score: 71,
    barClass: "bg-amber-400",
    scoreClass: "text-amber-500",
    statusDraft: "diusulkan",
  },
  {
    wilayah: "Kab. Maluku Barat Daya",
    kebutuhan: "6 Dokter Umum",
    score: 65,
    barClass: "bg-blue-400",
    scoreClass: "text-blue-500",
    statusDraft: "diusulkan",
  },
]);

function open() {
  isOpen.value = true;
}
function close() {
  isOpen.value = false;
}

function exportCSV() {
  const headers = [
    "No",
    "Wilayah",
    "Kebutuhan Dokter",
    "Skor Urgensi (%)",
    "Status Draft",
    "Catatan",
  ];

  const rows = draftItems.map((d, i) => [
    i + 1,
    d.wilayah,
    d.kebutuhan,
    d.score,
    d.statusDraft.charAt(0).toUpperCase() + d.statusDraft.slice(1),
    i === 0 ? catatan.value : "",
  ]);

  const meta = [
    [],
    ["INFORMASI DOKUMEN"],
    ["Dibuat oleh", "MedAI — MedTrack 3T"],
    ["Tanggal", today],
    ["Total usulan", draftItems.length],
    [
      "Disetujui",
      draftItems.filter((d) => d.statusDraft === "disetujui").length,
    ],
    [
      "Diusulkan",
      draftItems.filter((d) => d.statusDraft === "diusulkan").length,
    ],
    ["Ditunda", draftItems.filter((d) => d.statusDraft === "ditunda").length],
  ];

  const csv = [headers, ...rows, ...meta]
    .map((row) =>
      row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `draft-usulan-penugasan_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);

  close();
}

defineExpose({ open, close });
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
