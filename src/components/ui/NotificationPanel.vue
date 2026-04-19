<template>
  <Teleport to="body">
    <Transition name="slide-down">
      <div
        v-if="isOpen"
        ref="notificationBox"
        class="fixed top-16 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        <div
          class="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between"
        >
          <h4 class="font-display font-semibold text-slate-800 text-sm">
            Notifikasi
          </h4>
          <button
            @click="markAllAsRead"
            class="text-xs text-brand-600 font-medium hover:text-brand-700"
          >
            Tandai semua dibaca
          </button>
        </div>

        <div
          :class="[
            'divide-y divide-slate-50 overflow-y-auto transition-all duration-300',
            showAll ? 'max-h-[none]' : 'max-h-80',
          ]"
        >
          <div
            v-for="notif in notifications"
            :key="notif.id"
            :class="[
              'p-4 cursor-pointer transition',
              notif.unread
                ? 'bg-blue-50/50 hover:bg-blue-50'
                : 'hover:bg-slate-50',
            ]"
          >
            <div class="flex gap-3">
              <span class="text-lg flex-shrink-0">{{ notif.icon }}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-800">
                  {{ notif.title }}
                </p>
                <p class="text-xs text-slate-500 mt-0.5">{{ notif.body }}</p>
                <p class="text-xs text-slate-400 mt-1">{{ notif.time }}</p>
              </div>
              <div
                v-if="notif.unread"
                class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"
              ></div>
            </div>
          </div>
        </div>

        <div class="px-4 py-3 border-t border-slate-100">
          <button
            v-if="!showAll"
            @click="showAll = true"
            class="text-brand-600 text-xs font-semibold hover:text-brand-700"
          >
            Lihat semua notifikasi →
          </button>
          <button
            v-else
            @click="showAll = false"
            class="text-brand-600 text-xs font-semibold hover:text-brand-700"
          >
            ↑ Lihat lebih sedikit
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"; // Pastikan computed di-import
import { notifStore } from "@/stores/notifStore";

const isOpen = ref(false);
const showAll = ref(false);
const notificationBox = ref(null);

// Ambil data langsung dari store
const notifications = computed(() => notifStore.items);

// Fungsi untuk menandai semua dibaca
const markAllAsRead = () => {
  notifStore.items.forEach((item) => {
    item.read = true; // Sesuai dengan properti di store (pastikan di sidebar pakai unreadCount)
    item.unread = false; // Jika di store pakai 'unread', ubah ini
  });
}; // Tadi kamu kurang penutup kurung di sini

function handleClickOutside(event) {
  if (
    isOpen.value &&
    notificationBox.value &&
    !notificationBox.value.contains(event.target)
  ) {
    close();
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

function toggle() {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) showAll.value = false;
}

function close() {
  isOpen.value = false;
  showAll.value = false;
}

defineExpose({ toggle, close, isOpen });
</script>
