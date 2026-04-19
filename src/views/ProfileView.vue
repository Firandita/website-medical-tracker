<template>
  <div class="space-y-5 animate-[slideIn_0.3s_ease]">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="font-display font-bold text-slate-800 text-xl">
          Profil Akun
        </h2>
        <p class="text-slate-500 text-sm">
          Kelola informasi akun dan preferensi Anda
        </p>
      </div>
      <button v-if="!isEditing" class="btn-primary" @click="startEdit">
        <svg
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Edit Profil
      </button>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <!-- Kolom kiri: Avatar & info singkat -->
      <div class="space-y-4">
        <!-- Avatar card -->
        <div
          class="card-glass rounded-2xl shadow-card p-6 flex flex-col items-center text-center"
        >
          <!-- Avatar -->
          <div class="relative mb-4">
            <div
              class="w-24 h-24 gradient-teal rounded-full flex items-center justify-center text-white text-3xl font-bold font-display shadow-lg"
            >
              {{ initials }}
            </div>
            <!-- Badge online -->
            <span
              class="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"
            ></span>
          </div>

          <h3
            class="font-display font-bold text-slate-800 text-lg leading-tight"
          >
            {{ profile.nama }}
          </h3>
          <p class="text-slate-500 text-sm mt-0.5">{{ profile.jabatan }}</p>
          <p class="text-slate-400 text-xs mt-0.5">{{ profile.unit }}</p>

          <!-- Role badge -->
          <span
            class="mt-3 bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full border border-teal-100"
          >
            {{ profile.role }}
          </span>

          <!-- Divider -->
          <div class="w-full border-t border-slate-100 my-4"></div>

          <!-- Info singkat -->
          <div class="w-full space-y-2.5 text-left">
            <div class="flex items-center gap-2.5 text-sm text-slate-600">
              <svg
                class="w-4 h-4 text-slate-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span class="truncate">{{ profile.email }}</span>
            </div>
            <div class="flex items-center gap-2.5 text-sm text-slate-600">
              <svg
                class="w-4 h-4 text-slate-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {{ profile.telepon }}
            </div>
            <div class="flex items-center gap-2.5 text-sm text-slate-600">
              <svg
                class="w-4 h-4 text-slate-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Bergabung {{ formatDate(profile.tanggalBergabung) }}
            </div>
          </div>
        </div>

        <!-- Aktivitas terakhir -->
        <div class="card-glass rounded-2xl shadow-card p-5">
          <h4 class="font-display font-semibold text-slate-800 text-sm mb-3">
            Aktivitas Terakhir
          </h4>
          <div class="space-y-3">
            <div v-for="log in activityLog" :key="log.id" class="flex gap-3">
              <div
                :class="[
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0',
                  log.iconBg,
                ]"
              >
                {{ log.icon }}
              </div>
              <div>
                <p class="text-slate-700 text-xs font-medium">{{ log.aksi }}</p>
                <p class="text-slate-400 text-xs">{{ log.waktu }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kolom kanan: Form detail -->
      <div class="xl:col-span-2 space-y-4">
        <!-- Form informasi pribadi -->
        <div class="card-glass rounded-2xl shadow-card p-6">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h4 class="font-display font-semibold text-slate-800">
                Informasi Pribadi
              </h4>
              <p class="text-slate-400 text-xs mt-0.5">
                Data identitas dan kontak Anda
              </p>
            </div>
            <!-- Save/Cancel saat editing -->
            <div v-if="isEditing" class="flex gap-2">
              <button class="btn-outline text-xs py-1.5" @click="cancelEdit">
                Batal
              </button>
              <button
                class="btn-primary text-xs py-1.5"
                :disabled="isSaving"
                @click="saveProfile"
              >
                <svg
                  v-if="isSaving"
                  class="w-3.5 h-3.5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {{ isSaving ? "Menyimpan..." : "Simpan Perubahan" }}
              </button>
            </div>
          </div>

          <!-- Success alert -->
          <div
            v-if="saveSuccess"
            class="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2"
          >
            <svg
              class="w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Profil berhasil diperbarui.
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Nama lengkap -->
            <div class="md:col-span-2">
              <label class="block text-xs font-semibold text-slate-600 mb-1.5"
                >Nama Lengkap</label
              >
              <input
                v-if="isEditing"
                v-model="form.nama"
                type="text"
                class="input-base"
                placeholder="Nama lengkap"
              />
              <p
                v-else
                class="text-slate-800 text-sm py-2.5 px-3 bg-slate-50 rounded-xl"
              >
                {{ profile.nama }}
              </p>
            </div>

            <!-- NIP -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5"
                >NIP</label
              >
              <input
                v-if="isEditing"
                v-model="form.nip"
                type="text"
                class="input-base"
                placeholder="Nomor Induk Pegawai"
              />
              <p
                v-else
                class="text-slate-800 text-sm py-2.5 px-3 bg-slate-50 rounded-xl"
              >
                {{ profile.nip }}
              </p>
            </div>

            <!-- Jabatan -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5"
                >Jabatan</label
              >
              <input
                v-if="isEditing"
                v-model="form.jabatan"
                type="text"
                class="input-base"
                placeholder="Jabatan"
              />
              <p
                v-else
                class="text-slate-800 text-sm py-2.5 px-3 bg-slate-50 rounded-xl"
              >
                {{ profile.jabatan }}
              </p>
            </div>

            <!-- Unit/Direktorat -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5"
                >Unit / Direktorat</label
              >
              <input
                v-if="isEditing"
                v-model="form.unit"
                type="text"
                class="input-base"
                placeholder="Unit kerja"
              />
              <p
                v-else
                class="text-slate-800 text-sm py-2.5 px-3 bg-slate-50 rounded-xl"
              >
                {{ profile.unit }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5"
                >Email</label
              >
              <input
                v-if="isEditing"
                v-model="form.email"
                type="email"
                class="input-base"
                placeholder="nama@kemenkes.go.id"
              />
              <p
                v-else
                class="text-slate-800 text-sm py-2.5 px-3 bg-slate-50 rounded-xl"
              >
                {{ profile.email }}
              </p>
            </div>

            <!-- Telepon -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5"
                >Nomor Telepon</label
              >
              <input
                v-if="isEditing"
                v-model="form.telepon"
                type="tel"
                class="input-base"
                placeholder="08xx-xxxx-xxxx"
              />
              <p
                v-else
                class="text-slate-800 text-sm py-2.5 px-3 bg-slate-50 rounded-xl"
              >
                {{ profile.telepon }}
              </p>
            </div>

            <!-- Role (read-only) -->
            <div class="md:col-span-2">
              <label class="block text-xs font-semibold text-slate-600 mb-1.5">
                Hak Akses / Role
                <span class="text-slate-400 font-normal ml-1"
                  >(hanya dapat diubah oleh Admin)</span
                >
              </label>
              <p
                class="text-slate-800 text-sm py-2.5 px-3 bg-slate-50 rounded-xl flex items-center gap-2"
              >
                <span class="w-2 h-2 bg-teal-400 rounded-full"></span>
                {{ profile.role }}
              </p>
            </div>
          </div>
        </div>

        <!-- Ubah password -->
        <div class="card-glass rounded-2xl shadow-card p-6">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h4 class="font-display font-semibold text-slate-800">
                Keamanan Akun
              </h4>
              <p class="text-slate-400 text-xs mt-0.5">
                Ubah kata sandi akun Anda
              </p>
            </div>
            <button
              class="text-teal-600 text-xs font-semibold hover:text-teal-700 transition"
              @click="showPasswordForm = !showPasswordForm"
            >
              {{ showPasswordForm ? "Tutup" : "Ubah Password →" }}
            </button>
          </div>

          <div v-if="showPasswordForm" class="space-y-4">
            <!-- Password lama -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5"
                >Password Saat Ini</label
              >
              <input
                v-model="passwordForm.lama"
                type="password"
                class="input-base"
                placeholder="••••••••"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Password baru -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5"
                  >Password Baru</label
                >
                <input
                  v-model="passwordForm.baru"
                  type="password"
                  class="input-base"
                  placeholder="Min. 8 karakter"
                />
              </div>
              <!-- Konfirmasi -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5"
                  >Konfirmasi Password Baru</label
                >
                <input
                  v-model="passwordForm.konfirmasi"
                  type="password"
                  class="input-base"
                  placeholder="Ulangi password baru"
                />
              </div>
            </div>
            <!-- Error password -->
            <p v-if="passwordError" class="text-red-500 text-xs">
              {{ passwordError }}
            </p>
            <div class="flex justify-end">
              <button class="btn-primary text-xs py-1.5" @click="savePassword">
                Simpan Password Baru
              </button>
            </div>
          </div>

          <div
            v-else
            class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
          >
            <svg
              class="w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p class="text-slate-500 text-xs">
              Password terakhir diubah:
              <span class="font-medium text-slate-700">{{
                formatDate(profile.passwordUpdatedAt)
              }}</span>
            </p>
          </div>
        </div>

        <!-- Preferensi notifikasi -->
        <div class="card-glass rounded-2xl shadow-card p-6">
          <div class="mb-5">
            <h4 class="font-display font-semibold text-slate-800">
              Preferensi Notifikasi
            </h4>
            <p class="text-slate-400 text-xs mt-0.5">
              Atur jenis notifikasi yang ingin Anda terima
            </p>
          </div>
          <div class="space-y-3">
            <div
              v-for="pref in notifPrefs"
              :key="pref.key"
              class="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
            >
              <div>
                <p class="text-slate-700 text-sm font-medium">
                  {{ pref.label }}
                </p>
                <p class="text-slate-400 text-xs">{{ pref.desc }}</p>
              </div>
              <button
                type="button"
                :class="[
                  'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0',
                  profile.notifPrefs[pref.key]
                    ? 'bg-brand-500'
                    : 'bg-slate-200',
                ]"
                @click="toggleNotifPref(pref.key)"
              >
                <span
                  :class="[
                    'inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200',
                    profile.notifPrefs[pref.key]
                      ? 'translate-x-4'
                      : 'translate-x-1',
                  ]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProfileStore } from "@/stores/profileStore.js";
import { formatDate } from "@/utils/formatters.js";
import { storeToRefs } from "pinia";

const profileStore = useProfileStore();
const { profile, isSaving } = storeToRefs(profileStore);

// UI state
const isEditing = ref(false);
const showPasswordForm = ref(false);
const saveSuccess = ref(false);
const passwordError = ref("");

// Form lokal — salinan data profil saat edit
const form = ref({});

// Form password
const passwordForm = ref({ lama: "", baru: "", konfirmasi: "" });

// Inisial nama untuk avatar
const initials = computed(() => {
  if (!profile.value?.nama) return "?";
  return profile.value.nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
});

// Preferensi notifikasi
const notifPrefs = [
  {
    key: "wilayahKritis",
    label: "Wilayah Kritis",
    desc: "Notifikasi saat ada kabupaten/kota baru berstatus kritis",
  },
  {
    key: "kontrakBerakhir",
    label: "Kontrak Akan Berakhir",
    desc: "Pengingat 60 hari sebelum kontrak dokter berakhir",
  },
  {
    key: "laporanMingguan",
    label: "Laporan Mingguan",
    desc: "Ringkasan mingguan dikirim setiap Senin pagi",
  },
  {
    key: "sistemUpdate",
    label: "Pembaruan Sistem",
    desc: "Info pembaruan fitur dan maintenance MedTrack 3T",
  },
];

// Log aktivitas
const activityLog = [
  {
    id: 1,
    icon: "📤",
    iconBg: "bg-blue-50",
    aksi: "Export laporan dokter Papua",
    waktu: "2 jam lalu",
  },
  {
    id: 2,
    icon: "➕",
    iconBg: "bg-emerald-50",
    aksi: "Tambah data dokter baru",
    waktu: "Kemarin, 14:22",
  },
  {
    id: 3,
    icon: "🔍",
    iconBg: "bg-amber-50",
    aksi: "Analisis AI wilayah kritis NTT",
    waktu: "2 hari lalu",
  },
  {
    id: 4,
    icon: "🗑️",
    iconBg: "bg-red-50",
    aksi: "Hapus data dokter (D005)",
    waktu: "3 hari lalu",
  },
];

onMounted(() => {
  profileStore.fetchProfile();
});

function startEdit() {
  // Salin data profil ke form lokal
  form.value = { ...profile.value };
  isEditing.value = true;
  saveSuccess.value = false;
}

function cancelEdit() {
  isEditing.value = false;
  form.value = {};
}

async function saveProfile() {
  const result = await profileStore.updateProfile(form.value);
  if (result.success) {
    isEditing.value = false;
    saveSuccess.value = true;
    setTimeout(() => (saveSuccess.value = false), 3000);
  }
}

function savePassword() {
  passwordError.value = "";
  if (!passwordForm.value.lama) {
    passwordError.value = "Masukkan password saat ini.";
    return;
  }
  if (passwordForm.value.baru.length < 8) {
    passwordError.value = "Password baru minimal 8 karakter.";
    return;
  }
  if (passwordForm.value.baru !== passwordForm.value.konfirmasi) {
    passwordError.value = "Konfirmasi password tidak cocok.";
    return;
  }
  // TODO: panggil profileStore.updatePassword(passwordForm.value)
  alert("Password berhasil diubah! (mock)");
  showPasswordForm.value = false;
  passwordForm.value = { lama: "", baru: "", konfirmasi: "" };
}

function toggleNotifPref(key) {
  // Panggil store langsung, jangan di-toggle di sini
  profileStore.toggleNotifPref(key);
}
</script>
