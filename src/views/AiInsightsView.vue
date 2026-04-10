<template>
  <div class="space-y-5 animate-[slideIn_0.3s_ease]">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">

      <!-- Full chat (3/5 kolom) -->
      <div class="lg:col-span-3 card-glass rounded-2xl shadow-card overflow-hidden flex flex-col" style="height:640px">
        <!-- Header -->
        <div class="px-5 py-4 border-b border-slate-100 flex items-center gap-3 bg-gradient-to-r from-teal-50 to-emerald-50">
          <div class="w-10 h-10 gradient-teal rounded-xl flex items-center justify-center shadow-sm text-lg">🤖</div>
          <div>
            <h3 class="font-display font-bold text-slate-800">MedAI Full Assistant</h3>
            <p class="text-emerald-600 text-xs">Analisis cerdas sebaran dokter wilayah 3T</p>
          </div>
          <button class="ml-auto btn-outline text-xs py-1" @click="store.clearMessages()">Bersihkan</button>
        </div>

        <!-- Messages -->
        <div ref="chatEl" class="flex-1 overflow-y-auto p-5 space-y-4">
          <div v-for="msg in messages" :key="msg.id">
            <!-- AI -->
            <div v-if="msg.role === 'assistant'" class="flex gap-3">
              <div class="w-8 h-8 gradient-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">🤖</div>
              <div class="chat-ai-bubble max-w-lg">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p class="text-slate-700 text-sm leading-relaxed" v-html="formatMsg(msg.content)" />
                <p class="text-slate-400 text-xs mt-2">{{ formatTime(msg.timestamp) }}</p>
              </div>
            </div>
            <!-- User -->
            <div v-else class="flex justify-end gap-3">
              <div class="chat-user-bubble max-w-lg">
                <p class="text-sm">{{ msg.content }}</p>
              </div>
              <div class="w-8 h-8 gradient-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs font-bold">A</div>
            </div>
          </div>

          <!-- Typing -->
          <div v-if="isTyping" class="flex gap-3">
            <div class="w-8 h-8 gradient-teal rounded-full flex items-center justify-center flex-shrink-0 text-sm">🤖</div>
            <div class="chat-ai-bubble flex items-center gap-1 px-4 py-3">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        </div>

        <!-- Quick prompts -->
        <div class="px-5 py-3 bg-slate-50 border-t border-slate-100">
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="q in quickPrompts"
              :key="q.prompt"
              class="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-brand-400 hover:text-brand-600 transition"
              @click="sendQuick(q.prompt)"
            >
              {{ q.label }}
            </button>
          </div>
        </div>

        <!-- Input -->
        <div class="px-5 py-4 border-t border-slate-100">
          <div class="flex gap-3">
            <input
              v-model="input"
              type="text"
              placeholder="Tanya MedAI tentang sebaran dokter wilayah 3T..."
              class="input-base flex-1"
              @keydown.enter="send"
            />
            <button class="btn-primary px-5" :disabled="isTyping" @click="send">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Right panel: Insights + Recommendations (2/5 kolom) -->
      <div class="lg:col-span-2 space-y-4">

        <!-- AI Insights today -->
        <div class="card-glass rounded-2xl shadow-card p-5">
          <h3 class="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span class="w-6 h-6 gradient-teal rounded-lg flex items-center justify-center text-white text-xs">AI</span>
            Insight Hari Ini
          </h3>
          <div class="space-y-3">
            <div v-for="i in insights" :key="i.title" :class="['flex gap-3 p-3 rounded-xl border', i.bgClass]">
              <span class="text-xl flex-shrink-0">{{ i.emoji }}</span>
              <div>
                <p class="text-sm font-semibold text-slate-800">{{ i.title }}</p>
                <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">{{ i.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Top 5 recommendations -->
        <div class="card-glass rounded-2xl shadow-card p-5">
          <h3 class="font-display font-semibold text-slate-800 mb-4">🎯 Top Rekomendasi AI</h3>
          <div class="space-y-3">
            <div v-for="(rec, i) in recommendations" :key="rec.wilayah" class="flex items-center gap-3">
              <div :class="['w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0', rec.numClass]">
                {{ i + 1 }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-800 truncate">{{ rec.wilayah }}</p>
                <p class="text-xs text-slate-500">{{ rec.kebutuhan }}</p>
                <div class="h-1.5 bg-slate-100 rounded-full mt-1">
                  <div :class="['h-1.5 rounded-full', rec.barClass]" :style="{ width: rec.score + '%' }"></div>
                </div>
              </div>
              <span :class="['text-xs font-bold flex-shrink-0', rec.scoreClass]">{{ rec.score }}%</span>
            </div>
          </div>
          <button class="btn-primary w-full mt-4 justify-center">Terapkan Semua Rekomendasi</button>
        </div>
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
const { messages, isTyping } = storeToRefs(store)

const input  = ref('')
const chatEl = ref(null)

const quickPrompts = [
  { label: '🔴 Wilayah paling kritis',      prompt: 'Wilayah mana yang paling kritis saat ini?' },
  { label: '🎯 Rekomendasi prioritas',       prompt: 'Berikan rekomendasi 10 prioritas penempatan dokter bulan ini' },
  { label: '📈 Prediksi 6 bulan',            prompt: 'Prediksi kebutuhan dokter 6 bulan ke depan' },
  { label: '📋 Ringkasan laporan',           prompt: 'Buat ringkasan laporan sebaran dokter minggu ini' },
]

const insights = [
  { emoji: '🚨', title: '7 Kabupaten Status KRITIS', desc: 'Rasio di bawah 0.05/1.000 jiwa. Diperlukan penempatan darurat dalam 30 hari.', bgClass: 'bg-red-50 border-red-100' },
  { emoji: '⏰', title: '3 Kontrak Dokter Berakhir', desc: 'Kab. Kepulauan Sula dan 2 wilayah lain perlu perpanjangan segera.', bgClass: 'bg-amber-50 border-amber-100' },
  { emoji: '✅', title: '2 Wilayah Berhasil Terpenuhi', desc: 'Kab. Malinau dan Kab. Natuna berhasil capai rasio > 0.8 bulan ini.', bgClass: 'bg-emerald-50 border-emerald-100' },
]

const recommendations = [
  { wilayah: 'Kab. Yahukimo',         kebutuhan: '8 Dokter Umum + 2 Sp.A', score: 95, numClass: 'bg-red-100 text-red-600',    barClass: 'bg-red-400',    scoreClass: 'text-red-500' },
  { wilayah: 'Kab. Nduga',            kebutuhan: '5 Dokter + 2 Sp.A',       score: 88, numClass: 'bg-red-100 text-red-600',    barClass: 'bg-red-400',    scoreClass: 'text-red-500' },
  { wilayah: 'Kab. Sumba Barat',      kebutuhan: '4 Dokter Umum + 1 Sp.OG', score: 76, numClass: 'bg-amber-100 text-amber-600', barClass: 'bg-amber-400',  scoreClass: 'text-amber-500' },
  { wilayah: 'Kab. Kepulauan Sula',   kebutuhan: '3 Sp.PD',                 score: 71, numClass: 'bg-amber-100 text-amber-600', barClass: 'bg-amber-400',  scoreClass: 'text-amber-500' },
  { wilayah: 'Kab. Maluku Barat Daya',kebutuhan: '6 Dokter Umum',           score: 65, numClass: 'bg-blue-100 text-blue-600',   barClass: 'bg-blue-400',   scoreClass: 'text-blue-500' },
]

async function send() {
  const text = input.value.trim()
  if (!text || isTyping.value) return
  input.value = ''
  await store.sendMessage(text)
  scrollDown()
}

function sendQuick(p) { input.value = p; send() }

function formatMsg(text) {
  return parseMdBold(text)
    .replace(/\n/g, '<br/>')
    .replace(/^• /gm, '&nbsp;&nbsp;• ')
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
}

function scrollDown() {
  nextTick(() => { if (chatEl.value) chatEl.value.scrollTop = chatEl.value.scrollHeight })
}

watch(messages, scrollDown, { deep: true })
</script>
