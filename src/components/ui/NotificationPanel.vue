<template>
  <Teleport to="body">
    <Transition name="slide-down">
      <div
        v-if="isOpen"
        class="fixed top-16 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        <!-- Header -->
        <div class="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <h4 class="font-display font-semibold text-slate-800 text-sm">Notifikasi</h4>
          <button class="text-xs text-brand-600 font-medium hover:text-brand-700">Tandai semua dibaca</button>
        </div>

        <!-- List -->
        <div class="divide-y divide-slate-50 max-h-80 overflow-y-auto">
          <div
            v-for="notif in notifications"
            :key="notif.id"
            :class="['p-4 cursor-pointer transition', notif.unread ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50']"
          >
            <div class="flex gap-3">
              <span class="text-lg flex-shrink-0">{{ notif.icon }}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-800">{{ notif.title }}</p>
                <p class="text-xs text-slate-500 mt-0.5">{{ notif.body }}</p>
                <p class="text-xs text-slate-400 mt-1">{{ notif.time }}</p>
              </div>
              <div v-if="notif.unread" class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 py-3 border-t border-slate-100">
          <button class="text-brand-600 text-xs font-semibold hover:text-brand-700">Lihat semua notifikasi →</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

// State panel bisa diakses dari luar via defineExpose jika perlu
const isOpen = ref(false)

const notifications = ref([
  { id: 1, icon: '🔴', title: 'Wilayah Kritis Baru Terdeteksi', body: 'Kab. Jayawijaya tidak memiliki dokter aktif', time: '5 menit lalu', unread: true },
  { id: 2, icon: '⏰', title: 'Kontrak Dokter Akan Berakhir', body: 'dr. Budi Hartono, Kab. Kepulauan Sula — 30 hari lagi', time: '1 jam lalu', unread: true },
  { id: 3, icon: '✅', title: 'Dokter Baru Berhasil Ditempatkan', body: 'dr. Sari Melati ditempatkan di Kab. Pulau Taliabu', time: '3 jam lalu', unread: false },
  { id: 4, icon: '🤖', title: 'AI: Laporan Mingguan Siap', body: 'MedAI telah membuat ringkasan laporan minggu ini', time: 'Kemarin', unread: false },
  { id: 5, icon: '📊', title: 'Data Diperbarui', body: 'Sinkronisasi data dari sistem Kemenkes selesai', time: '2 hari lalu', unread: false },
])

function toggle() { isOpen.value = !isOpen.value }
function close()  { isOpen.value = false }

defineExpose({ toggle, close, isOpen })
</script>

<style scoped>
.slide-down-enter-active { animation: slideDown 0.2s ease; }
.slide-down-leave-active { animation: slideDown 0.15s ease reverse; }
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
