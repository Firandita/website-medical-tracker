<template>
  <BaseModal v-model="isOpen" title="Import Data Dokter" size="md">
    <!-- Drop zone -->
    <div
      :class="[
        'border-2 border-dashed rounded-xl p-8 text-center mb-4 transition cursor-pointer',
        isDragging ? 'border-brand-400 bg-brand-50' : 'border-slate-200 hover:border-brand-300'
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
      @click="fileInputRef.click()"
    >
      <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
        <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
        </svg>
      </div>
      <p v-if="!selectedFile" class="text-slate-600 text-sm font-medium">
        {{ isDragging ? 'Lepas file di sini' : 'Drag & drop file atau klik untuk upload' }}
      </p>
      <p v-else class="text-brand-600 text-sm font-semibold">📄 {{ selectedFile.name }}</p>
      <p class="text-slate-400 text-xs mt-1">Mendukung: .xlsx, .csv, .json</p>
    </div>

    <input ref="fileInputRef" type="file" class="hidden" accept=".xlsx,.csv,.json" @change="handleFileChange" />

    <!-- Result message -->
    <div v-if="result" :class="['rounded-xl p-3 mb-4 text-sm', result.success ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600']">
      {{ result.message }}
    </div>

    <!-- Template download -->
    <p class="text-xs text-slate-400 mb-4">
      Belum punya template?
      <a href="#" class="text-brand-600 underline font-medium" @click.prevent>Download template Excel</a>
    </p>

    <!-- Actions -->
    <div class="flex gap-3">
      <button class="btn-outline flex-1" @click="isOpen = false">Batal</button>
      <button class="btn-primary flex-1" :disabled="!selectedFile || isSaving" @click="handleImport">
        <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        {{ isSaving ? 'Mengimport...' : 'Import Sekarang' }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { useDokterStore } from '@/stores/dokterStore.js'
import { storeToRefs } from 'pinia'

const isOpen       = ref(false)
const isDragging   = ref(false)
const selectedFile = ref(null)
const fileInputRef = ref(null)
const result       = ref(null)

const store = useDokterStore()
const { isSaving } = storeToRefs(store)

function handleFileChange(e) {
  selectedFile.value = e.target.files[0] || null
}

function handleDrop(e) {
  isDragging.value = false
  selectedFile.value = e.dataTransfer.files[0] || null
}

async function handleImport() {
  if (!selectedFile.value) return
  result.value = null
  const res = await store.importFile(selectedFile.value)
  result.value = res
  if (res.success) selectedFile.value = null
}

function open()  { isOpen.value = true; result.value = null }
function close() { isOpen.value = false }
defineExpose({ open, close })
</script>
