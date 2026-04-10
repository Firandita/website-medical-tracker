<template>
  <div class="card-glass rounded-2xl shadow-card flex flex-col overflow-hidden" style="max-height:500px">

    <!-- Header -->
    <div class="px-4 py-3.5 border-b border-slate-100 flex items-center gap-3">
      <div class="relative flex-shrink-0">
        <div class="w-8 h-8 gradient-teal rounded-full flex items-center justify-center">
          🤖
        </div>
        <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white"></span>
      </div>
      <div>
        <p class="font-display font-semibold text-slate-800 text-sm">MedAI Assistant</p>
        <p class="text-emerald-500 text-xs">Aktif • Analisis Real-time</p>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="px-4 py-2.5 bg-slate-50 border-b border-slate-100">
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="qa in quickActions"
          :key="qa"
          class="text-xs bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full
                 hover:border-brand-400 hover:text-brand-600 transition"
          @click="sendQuick(qa)"
        >
          {{ qa.label }}
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div ref="messagesEl" class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
      <div v-for="msg in miniMessages" :key="msg.id">
        <!-- AI message -->
        <div v-if="msg.role === 'assistant'" class="flex gap-2 ai-chat-bubble">
          <div class="w-6 h-6 gradient-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">🤖</div>
          <div class="chat-ai-bubble max-w-xs">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="text-slate-700 text-xs leading-relaxed" v-html="formatMsg(msg.content)" />
            <p class="text-slate-400 text-xs mt-1.5">{{ formatTime(msg.timestamp) }}</p>
          </div>
        </div>

        <!-- User message -->
        <div v-else class="flex justify-end">
          <div class="chat-user-bubble max-w-xs">
            <p class="text-xs">{{ msg.content }}</p>
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isMiniTyping" class="flex gap-2">
        <div class="w-6 h-6 gradient-teal rounded-full flex items-center justify-center flex-shrink-0 text-xs">🤖</div>
        <div class="chat-ai-bubble flex items-center gap-1 px-3 py-2">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="px-4 py-3 border-t border-slate-100">
      <div class="flex gap-2">
        <input
          v-model="input"
          type="text"
          placeholder="Tanya MedAI..."
          class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700
                 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          @keydown.enter="sendMessage"
        />
        <button
          class="gradient-teal text-white rounded-xl px-3 py-2 flex-shrink-0 hover:opacity-90 transition"
          @click="sendMessage"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useAiStore } from '@/stores/aiStore.js'
import { parseMdBold } from '@/utils/formatters.js'

const store = useAiStore()
const { miniMessages, isMiniTyping } = storeToRefs(store)

const input      = ref('')
const messagesEl = ref(null)

const quickActions = [
  { label: '🔴 Wilayah kritis',  prompt: 'Wilayah mana yang paling kritis saat ini?' },
  { label: '📍 Rekomendasi',     prompt: 'Rekomendasi penempatan dokter bulan ini' },
  { label: '📈 Prediksi',        prompt: 'Prediksi kebutuhan dokter 6 bulan ke depan' },
]

async function sendMessage() {
  const text = input.value.trim()
  if (!text) return
  input.value = ''
  await store.sendMiniMessage(text)
  scrollToBottom()
}

function sendQuick(qa) {
  store.sendMiniMessage(qa.prompt)
  scrollToBottom()
}

function formatMsg(text) {
  return parseMdBold(text).replace(/\n/g, '<br/>')
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight
    }
  })
}

watch(miniMessages, scrollToBottom, { deep: true })
</script>
