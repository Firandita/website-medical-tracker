<template>
  <BaseModal v-model="isOpen" title="Tambah Dokter Baru" size="lg">
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1.5">Nama Lengkap *</label>
          <input v-model="form.nama" class="input-base" placeholder="dr. Nama Dokter, Sp.XX" required />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1.5">Nomor SIP *</label>
          <input v-model="form.sip" class="input-base" placeholder="XXXX.XXXX.XXXX" required />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1.5">Spesialisasi *</label>
          <select v-model="form.spesialisasi" class="select-base" required>
            <option value="">Pilih spesialisasi</option>
            <option v-for="s in spesialisasiList" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1.5">Jenis Penugasan *</label>
          <select v-model="form.jenisPenugasan" class="select-base" required>
            <option value="">Pilih jenis penugasan</option>
            <option v-for="j in jenisList" :key="j" :value="j">{{ j }}</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Kabupaten/Kota Penugasan *</label>
        <select v-model="form.wilayahId" class="select-base" required>
          <option value="">Pilih wilayah 3T</option>
          <option v-for="w in wilayahList" :key="w.id" :value="w.id">
            {{ w.nama }} — {{ w.provinsi }}
          </option>
        </select>
        <p class="text-xs text-slate-400 mt-1">Hanya menampilkan kabupaten/kota yang masuk kategori 3T</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1.5">Tanggal Mulai *</label>
          <input v-model="form.tanggalMulai" type="date" class="input-base" required />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1.5">Tanggal Selesai *</label>
          <input v-model="form.tanggalSelesai" type="date" class="input-base" required />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1.5">No. Kontak</label>
          <input v-model="form.kontak" type="tel" class="input-base" placeholder="08xxxxxxxxxx" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1.5">Email Dinas</label>
          <input v-model="form.email" type="email" class="input-base" placeholder="nama@kemenkes.go.id" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Catatan</label>
        <textarea v-model="form.catatan" class="input-base resize-none" rows="2" placeholder="Informasi tambahan..."></textarea>
      </div>

      <!-- Error -->
      <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>

      <!-- Actions -->
      <div class="flex gap-3 pt-2">
        <button type="button" class="btn-outline flex-1" @click="isOpen = false">Batal</button>
        <button type="submit" class="btn-primary flex-1" :disabled="isSaving">
          <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ isSaving ? 'Menyimpan...' : 'Simpan Dokter' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseModal from './BaseModal.vue'
import { useDokterStore } from '@/stores/dokterStore.js'
import { useWilayahStore } from '@/stores/wilayahStore.js'
import { SPESIALISASI, JENIS_PENUGASAN } from '@/data/mockDokter.js'
import { storeToRefs } from 'pinia'

const isOpen = ref(false)
const error  = ref('')

const dokterStore  = useDokterStore()
const wilayahStore = useWilayahStore()
const { isSaving }    = storeToRefs(dokterStore)
const { wilayahList } = storeToRefs(wilayahStore)

const spesialisasiList = Object.values(SPESIALISASI)
const jenisList        = Object.values(JENIS_PENUGASAN)

const form = reactive({
  nama: '', sip: '', spesialisasi: '', jenisPenugasan: '',
  wilayahId: '', tanggalMulai: '', tanggalSelesai: '',
  kontak: '', email: '', catatan: '',
})

async function handleSubmit() {
  error.value = ''
  const result = await dokterStore.addDokter({ ...form })
  if (result.success) {
    isOpen.value = false
    Object.keys(form).forEach(k => form[k] = '')
  } else {
    error.value = result.message || 'Gagal menyimpan data.'
  }
}

function open()  { isOpen.value = true }
function close() { isOpen.value = false }
defineExpose({ open, close })
</script>
