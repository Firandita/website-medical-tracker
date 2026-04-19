/**
 * PROFILE STORE
 * -------------------------------------------------------
 * Menyimpan data profil pengguna yang sedang login.
 *
 * Saat ini menggunakan mock data.
 * Ketika backend Laravel siap, set USE_MOCK = false dan
 * uncomment baris api.xxx().
 *
 * Endpoint Laravel yang dibutuhkan:
 *   GET  /api/profile            → ambil profil user login
 *   PUT  /api/profile            → update profil
 *   PUT  /api/profile/password   → ganti password
 *   PUT  /api/profile/notif      → update preferensi notifikasi
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api.js";

const USE_MOCK = true;

/** Data profil default (mock) */
const DEFAULT_PROFILE = {
  id: "USR001",
  nama: "Admin Kemenkes",
  nip: "19850312 200903 1 002",
  jabatan: "Analis Kebijakan Ahli Muda",
  unit: "Pusdatin — Kemenkes RI",
  email: "admin@kemenkes.go.id",
  telepon: "0812-3456-7890",
  role: "Administrator Sistem",
  tanggalBergabung: "2023-01-10",
  passwordUpdatedAt: "2024-11-01",
  notifPrefs: {
    wilayahKritis: true,
    kontrakBerakhir: true,
    laporanMingguan: false,
    sistemUpdate: true,
  },
};

export const useProfileStore = defineStore("profile", () => {
  // ── State ──────────────────────────────────────────────────────
  const profile = ref({ ...DEFAULT_PROFILE });
  const isSaving = ref(false);
  const isLoading = ref(false);
  const error = ref(null);

  // ── Actions ────────────────────────────────────────────────────

  /** Ambil profil user yang sedang login */
  async function fetchProfile() {
    if (USE_MOCK) {
      await delay(300);
      // Data sudah ada di state default, tidak perlu fetch
      return;
    }
    isLoading.value = true;
    try {
      const res = await api.get("/profile");
      profile.value = res.data;
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Update informasi profil
   * @param {Object} payload - { nama, nip, jabatan, unit, email, telepon }
   */
  async function updateProfile(payload) {
    isSaving.value = true;
    try {
      if (USE_MOCK) {
        await delay(600);
        // Merge perubahan ke state
        profile.value = { ...profile.value, ...payload };
        return { success: true };
      }
      const res = await api.put("/profile", payload);
      profile.value = res.data;
      return { success: true };
    } catch (e) {
      error.value = e.message;
      return { success: false, message: e.message };
    } finally {
      isSaving.value = false;
    }
  }

  /**
   * Ganti password
   * @param {Object} payload - { lama, baru, konfirmasi }
   */
  async function updatePassword(payload) {
    isSaving.value = true;
    try {
      if (USE_MOCK) {
        await delay(500);
        profile.value.passwordUpdatedAt = new Date().toISOString().slice(0, 10);
        return { success: true };
      }
      await api.put("/profile/password", payload);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    } finally {
      isSaving.value = false;
    }
  }

  async function toggleNotifPref(key) {
    // Lakukan toggle di sini (di dalam store)
    profile.value.notifPrefs[key] = !profile.value.notifPrefs[key];

    if (USE_MOCK) {
      await delay(200);
      return;
    }

    try {
      await api.put("/profile/notif", {
        key,
        value: profile.value.notifPrefs[key],
      });
    } catch (err) {
      // Balikkan jika gagal
      profile.value.notifPrefs[key] = !profile.value.notifPrefs[key];
    }
  }

  return {
    profile,
    isSaving,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    updatePassword,
    toggleNotifPref,
  };
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
