<template>
  <BaseModal
    :model-value="isOpen"
    title="Export Hasil Analisis"
    size="md"
    @update:modelValue="$emit('close')"
  >
    <div class="space-y-4">
      <p class="text-sm text-slate-500">
        Pilih format dokumen untuk mengunduh data analisis wilayah
        <b>{{ locations?.length || 0 }} lokasi</b> yang terpilih.
      </p>

      <div class="space-y-3">
        <button
          @click="handleExport('pdf')"
          class="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 group transition-all"
        >
          <div class="flex items-center gap-4 text-left">
            <div
              class="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium text-slate-700">Dokumen PDF (.pdf)</p>
              <p class="text-xs text-slate-400">
                Cocok untuk laporan resmi & presentasi
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-slate-300 group-hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <button
          @click="handleExport('xlsx')"
          class="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-green-500 hover:bg-green-50 group transition-all"
        >
          <div class="flex items-center gap-4 text-left">
            <div
              class="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium text-slate-700">
                Spreadsheet Excel (.xlsx)
              </p>
              <p class="text-xs text-slate-400">
                Terbaik untuk pengolahan data lanjut
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-slate-300 group-hover:text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <template #footer>
      <button
        class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition"
        @click="$emit('close')"
      >
        Batal
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from "./BaseModal.vue";

const props = defineProps({
  isOpen: Boolean, // Mengikuti logika AppHeader kamu yang pakai :is-open
  locations: Array,
});

const emit = defineEmits(["close", "export"]);

function handleExport(format) {
  emit("export", { format, data: props.locations });
  // Emit close agar sinkron dengan state di AppHeader
  emit("close");
}
</script>
