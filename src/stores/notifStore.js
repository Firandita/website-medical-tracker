import { reactive, computed } from "vue";

export const notifStore = reactive({
  // Pindahkan data dari NotificationPanel ke sini
  items: [
    {
      id: 1,
      icon: "🔴",
      title: "Wilayah Kritis Baru Terdeteksi",
      body: "Kab. Jayawijaya tidak memiliki dokter aktif",
      time: "5 menit lalu",
      unread: true,
    },
    {
      id: 2,
      icon: "⏰",
      title: "Kontrak Dokter Akan Berakhir",
      body: "dr. Budi Hartono, Kab. Kepulauan Sula — 30 hari lagi",
      time: "1 jam lalu",
      unread: true,
    },
    {
      id: 3,
      icon: "✅",
      title: "Dokter Baru Berhasil Ditempatkan",
      body: "dr. Sari Melati ditempatkan di Kab. Pulau Taliabu",
      time: "3 jam lalu",
      unread: false,
    },
    {
      id: 4,
      icon: "🤖",
      title: "AI: Laporan Mingguan Siap",
      body: "MedAI telah membuat ringkasan laporan minggu ini",
      time: "Kemarin",
      unread: false,
    },
    {
      id: 5,
      icon: "📊",
      title: "Data Diperbarui",
      body: "Sinkronisasi data dari sistem Kemenkes selesai",
      time: "2 hari lalu",
      unread: false,
    },
  ],
  // Hitung otomatis yang belum dibaca
  unreadCount: computed(() => notifStore.items.filter((i) => !i.read).length),
});
