import { defineStore } from 'pinia'
import { ref } from 'vue'
import { aiService } from '@/services/aiService.js'

export const useAiStore = defineStore('ai', () => {

  // ── State ──────────────────────────────────────────────────────
  const messages    = ref([
    {
      id: 'init-1',
      role: 'assistant',
      content: 'Halo! Saya **MedAI**, asisten cerdas untuk monitoring sebaran dokter di wilayah 3T. Saya bisa membantu Anda menganalisis data, memberikan rekomendasi penempatan dokter, dan memprediksi kebutuhan ke depan. Ada yang ingin Anda tanyakan?',
      timestamp: new Date().toISOString(),
    },
  ])
  const isTyping    = ref(false)
  const error       = ref(null)

  // Mini chat (sidebar dashboard)
  const miniMessages = ref([
    {
      id: 'mini-init',
      role: 'assistant',
      content: 'Selamat pagi! Saya mendeteksi **12 wilayah kritis** di Papua dan NTT yang membutuhkan penempatan dokter segera. Ada yang ingin ditanyakan?',
      timestamp: new Date().toISOString(),
    },
  ])
  const isMiniTyping = ref(false)

  // ── Actions ────────────────────────────────────────────────────
  async function sendMessage(content) {
    if (!content.trim() || isTyping.value) return

    // Tambah pesan user
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content, timestamp: new Date().toISOString() }
    messages.value.push(userMsg)
    isTyping.value = true
    error.value = null

    try {
      const history = messages.value.map(m => ({ role: m.role, content: m.content }))
      const response = await aiService.chat(content, history)

      const aiMsg = { id: `a-${Date.now()}`, role: 'assistant', content: response, timestamp: new Date().toISOString() }
      messages.value.push(aiMsg)
    } catch (e) {
      error.value = 'Gagal terhubung ke AI. Coba lagi.'
    } finally {
      isTyping.value = false
    }
  }

  async function sendMiniMessage(content) {
    if (!content.trim() || isMiniTyping.value) return

    const userMsg = { id: `mu-${Date.now()}`, role: 'user', content, timestamp: new Date().toISOString() }
    miniMessages.value.push(userMsg)
    isMiniTyping.value = true

    try {
      const response = await aiService.chat(content, [])
      const aiMsg = { id: `ma-${Date.now()}`, role: 'assistant', content: response, timestamp: new Date().toISOString() }
      miniMessages.value.push(aiMsg)
    } catch {
      // Silent fail untuk mini chat
    } finally {
      isMiniTyping.value = false
    }
  }

  function clearMessages() {
    messages.value = []
  }

  function clearMiniMessages() {
    miniMessages.value = []
  }

  return {
    messages, isTyping, error,
    miniMessages, isMiniTyping,
    sendMessage, sendMiniMessage,
    clearMessages, clearMiniMessages,
  }
})
