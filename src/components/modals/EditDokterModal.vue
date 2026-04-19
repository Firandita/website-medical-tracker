<template>
  <BaseModal v-model="isOpen" title="Edit Data Dokter" size="lg">
    <div class="space-y-4">
      <!-- Info dokter (readonly header) -->
      <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0',
            form.gradientClass,
          ]"
        >
          {{ form.inisial }}
        </div>
        <div>
          <p class="font-semibold text-slate-800 text-sm">{{ form.nama }}</p>
          <p class="text-slate-400 text-xs">SIP: {{ form.sip }}</p>
        </div>
      </div>

      <!-- Form grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Nama Lengkap</label
          >
          <input
            v-model="form.nama"
            type="text"
            class="input-base"
            placeholder="Nama lengkap dokter"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Nomor SIP</label
          >
          <input
            v-model="form.sip"
            type="text"
            class="input-base"
            placeholder="xxxx.xxxx.xxxx"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Spesialisasi</label
          >
          <select v-model="form.spesialisasi" class="select-base">
            <option v-for="s in spesialisasiList" :key="s" :value="s">
              {{ s }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Jenis Penugasan</label
          >
          <select v-model="form.jenisPenugasan" class="select-base">
            <option v-for="j in jenisList" :key="j" :value="j">{{ j }}</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Status</label
          >
          <select v-model="form.status" class="select-base">
            <option value="aktif">Aktif</option>
            <option value="akan_berakhir">Akan Berakhir</option>
            <option value="selesai">Selesai Tugas</option>
            <option value="cuti">Cuti</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Kabupaten/Kota</label
          >
          <input
            v-model="form.namaWilayah"
            type="text"
            class="input-base"
            placeholder="Nama kabupaten/kota"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Provinsi</label
          >
          <input
            v-model="form.provinsi"
            type="text"
            class="input-base"
            placeholder="Nama provinsi"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Tanggal Mulai</label
          >
          <input v-model="form.tanggalMulai" type="date" class="input-base" />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Tanggal Selesai</label
          >
          <input v-model="form.tanggalSelesai" type="date" class="input-base" />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >No. Kontak</label
          >
          <input
            v-model="form.kontak"
            type="tel"
            class="input-base"
            placeholder="08xx-xxxx-xxxx"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Email</label
          >
          <input
            v-model="form.email"
            type="email"
            class="input-base"
            placeholder="email@kemenkes.go.id"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-xs font-medium text-slate-600 mb-1.5"
            >Catatan</label
          >
          <textarea
            v-model="form.catatan"
            rows="2"
            class="input-base resize-none"
            placeholder="Catatan tambahan (opsional)"
          />
        </div>
      </div>

      <!-- Error -->
      <p
        v-if="error"
        class="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg"
      >
        {{ error }}
      </p>
    </div>

    <template #footer>
      <button class="btn-outline" @click="close">Batal</button>
      <button class="btn-primary" :disabled="isSaving" @click="save">
        <svg
          v-if="isSaving"
          class="w-4 h-4 animate-spin"
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
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, reactive } from "vue";
import BaseModal from "@/components/modals/BaseModal.vue";
import { useDokterStore } from "@/stores/dokterStore.js";
import { SPESIALISASI, JENIS_PENUGASAN } from "@/data/mockDokter.js";

const dokterStore = useDokterStore();

const isOpen = ref(false);
const isSaving = ref(false);
const error = ref("");

const spesialisasiList = Object.values(SPESIALISASI);
const jenisList = Object.values(JENIS_PENUGASAN);

const form = reactive({
  id: "",
  nama: "",
  inisial: "",
  sip: "",
  spesialisasi: "",
  jenisPenugasan: "",
  status: "aktif",
  namaWilayah: "",
  provinsi: "",
  wilayahId: "",
  tanggalMulai: "",
  tanggalSelesai: "",
  kontak: "",
  email: "",
  catatan: "",
  gradientClass: "gradient-teal",
});

// Dipanggil dari parent: editModal.open(dokterObj)
function open(dokter) {
  Object.assign(form, { ...dokter });
  error.value = "";
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

async function save() {
  if (!form.nama.trim()) {
    error.value = "Nama tidak boleh kosong.";
    return;
  }
  if (!form.sip.trim()) {
    error.value = "SIP tidak boleh kosong.";
    return;
  }

  isSaving.value = true;
  error.value = "";

  try {
    const result = await dokterStore.updateDokter(form.id, { ...form });
    if (result.success) {
      isOpen.value = false;
    } else {
      error.value = result.message || "Gagal menyimpan data.";
    }
  } catch (e) {
    error.value = "Terjadi kesalahan. Coba lagi.";
  } finally {
    isSaving.value = false;
  }
}

defineExpose({ open, close });
</script>
