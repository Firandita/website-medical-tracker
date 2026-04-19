<template>
  <div class="space-y-5 animate-[slideIn_0.3s_ease]">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="font-display font-bold text-slate-800 text-xl">
          Pengaturan
        </h2>
        <p class="text-slate-500 text-sm">
          Kelola profil, keamanan, dan preferensi sistem
        </p>
      </div>
      <button
        v-if="isDirty"
        class="btn-primary"
        :disabled="isSaving"
        @click="saveAll"
      >
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
        <svg
          v-else
          class="w-4 h-4"
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
        {{ isSaving ? "Menyimpan..." : "Simpan Perubahan" }}
      </button>
    </div>

    <!-- Tab nav -->
    <div class="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
          activeTab === tab.id
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-700',
        ]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- ── TAB: PROFIL ── -->
    <div
      v-if="activeTab === 'profil'"
      class="grid grid-cols-1 xl:grid-cols-3 gap-5"
    >
      <!-- Avatar card -->
      <div
        class="card-glass rounded-2xl shadow-card p-6 flex flex-col items-center text-center"
      >
        <!-- Avatar -->
        <div class="relative mb-4">
          <div
            class="w-24 h-24 rounded-2xl gradient-teal flex items-center justify-center text-white text-3xl font-bold font-display shadow-lg"
          >
            {{ initials }}
          </div>
          <button
            class="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center text-slate-500 hover:text-brand-600 transition"
            title="Ganti foto"
          >
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
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        <h3 class="font-display font-bold text-slate-800 text-lg">
          {{ profile.nama }}
        </h3>
        <p class="text-slate-500 text-sm">{{ profile.jabatan }}</p>
        <p class="text-slate-400 text-xs mt-0.5">{{ profile.unit }}</p>

        <div class="mt-4 w-full border-t border-slate-100 pt-4 space-y-2.5">
          <div class="flex items-center gap-2 text-left">
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
            <span class="text-xs text-slate-600 truncate">{{
              profile.email
            }}</span>
          </div>
          <div class="flex items-center gap-2 text-left">
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span class="text-xs text-slate-600">{{ profile.telepon }}</span>
          </div>
          <div class="flex items-center gap-2 text-left">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            <span class="text-xs text-slate-600">{{ profile.instansi }}</span>
          </div>
        </div>

        <!-- Role badge -->
        <div class="mt-4 w-full">
          <span
            class="badge-ok w-full flex items-center justify-center gap-1.5 py-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {{ profile.role }}
          </span>
        </div>
      </div>

      <!-- Edit form -->
      <div class="xl:col-span-2 space-y-4">
        <!-- Data Pribadi -->
        <div class="card-glass rounded-2xl shadow-card p-5">
          <h4
            class="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2"
          >
            <svg
              class="w-4 h-4 text-brand-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Data Pribadi
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1.5"
                >Nama Lengkap</label
              >
              <input
                v-model="form.nama"
                type="text"
                class="input-base"
                placeholder="Nama lengkap"
                @input="markDirty"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1.5"
                >NIP</label
              >
              <input
                v-model="form.nip"
                type="text"
                class="input-base"
                placeholder="Nomor Induk Pegawai"
                @input="markDirty"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1.5"
                >Jabatan</label
              >
              <input
                v-model="form.jabatan"
                type="text"
                class="input-base"
                placeholder="Jabatan"
                @input="markDirty"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1.5"
                >Unit Kerja</label
              >
              <input
                v-model="form.unit"
                type="text"
                class="input-base"
                placeholder="Unit/Divisi"
                @input="markDirty"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs font-medium text-slate-600 mb-1.5"
                >Instansi</label
              >
              <input
                v-model="form.instansi"
                type="text"
                class="input-base"
                placeholder="Nama instansi"
                @input="markDirty"
              />
            </div>
          </div>
        </div>

        <!-- Kontak -->
        <div class="card-glass rounded-2xl shadow-card p-5">
          <h4
            class="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2"
          >
            <svg
              class="w-4 h-4 text-brand-500"
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
            Kontak & Akun
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1.5"
                >Email</label
              >
              <input
                v-model="form.email"
                type="email"
                class="input-base"
                placeholder="email@kemenkes.go.id"
                @input="markDirty"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1.5"
                >No. Telepon</label
              >
              <input
                v-model="form.telepon"
                type="tel"
                class="input-base"
                placeholder="08xx-xxxx-xxxx"
                @input="markDirty"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs font-medium text-slate-600 mb-1.5"
                >Hak Akses</label
              >
              <select v-model="form.role" class="select-base" disabled>
                <option value="Admin Pusat">Admin Pusat</option>
                <option value="Admin Provinsi">Admin Provinsi</option>
                <option value="Viewer">Viewer</option>
              </select>
              <p class="text-xs text-slate-400 mt-1">
                Hak akses hanya dapat diubah oleh Super Admin.
              </p>
            </div>
          </div>
        </div>

        <!-- Tombol aksi bawah form -->
        <div class="flex justify-between items-center">
          <button
            class="btn-outline text-red-500 border-red-200 hover:bg-red-50"
            @click="resetForm"
          >
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </button>
          <div class="flex gap-2">
            <button class="btn-outline" :disabled="!isDirty" @click="resetForm">
              Batal
            </button>

            <button
              class="btn-primary"
              :disabled="isSaving || !isDirty"
              :class="{ 'opacity-50 cursor-not-allowed': isSaving || !isDirty }"
              @click="saveAll"
            >
              {{ isSaving ? "Menyimpan..." : "Simpan Profil" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── TAB: KEAMANAN ── -->
    <div v-if="activeTab === 'keamanan'" class="x-auto space-y-4">
      <div class="card-glass rounded-2xl shadow-card p-5">
        <h4
          class="font-display font-semibold text-slate-800 mb-1 flex items-center gap-2"
        >
          <svg
            class="w-4 h-4 text-brand-500"
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
          Ganti Password
        </h4>
        <p class="text-slate-400 text-xs mb-4">
          Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.
        </p>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1.5"
              >Password Lama</label
            >
            <div class="relative">
              <input
                v-model="passwordForm.lama"
                :type="showPwd.lama ? 'text' : 'password'"
                class="input-base pr-10"
                placeholder="Masukkan password lama"
              />
              <button
                class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                @click="showPwd.lama = !showPwd.lama"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="!showPwd.lama"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1.5"
              >Password Baru</label
            >
            <div class="relative">
              <input
                v-model="passwordForm.baru"
                :type="showPwd.baru ? 'text' : 'password'"
                class="input-base pr-10"
                placeholder="Minimal 8 karakter"
                @input="checkPasswordStrength"
              />
              <button
                class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                @click="showPwd.baru = !showPwd.baru"
              >
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
            <!-- Password strength bar -->
            <div v-if="passwordForm.baru" class="mt-2">
              <div class="flex gap-1 mb-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  :class="[
                    'h-1 flex-1 rounded-full transition-all',
                    i <= pwStrength.score ? pwStrength.color : 'bg-slate-200',
                  ]"
                ></div>
              </div>
              <p :class="['text-xs', pwStrength.textColor]">
                {{ pwStrength.label }}
              </p>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1.5"
              >Konfirmasi Password Baru</label
            >
            <div class="relative">
              <input
                v-model="passwordForm.konfirmasi"
                :type="showPwd.konfirmasi ? 'text' : 'password'"
                class="input-base pr-10"
                :class="
                  passwordForm.konfirmasi &&
                  passwordForm.baru !== passwordForm.konfirmasi
                    ? 'border-red-300 ring-1 ring-red-300'
                    : ''
                "
                placeholder="Ulangi password baru"
              />
              <button
                class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                @click="showPwd.konfirmasi = !showPwd.konfirmasi"
              >
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
            <p
              v-if="
                passwordForm.konfirmasi &&
                passwordForm.baru !== passwordForm.konfirmasi
              "
              class="text-xs text-red-500 mt-1"
            >
              Password tidak cocok
            </p>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <div @click="handleDisabledClick" class="cursor-pointer">
            <button
              class="btn-primary"
              :disabled="!canSavePassword"
              :class="{
                'opacity-50 cursor-not-allowed pointer-events-none':
                  !canSavePassword,
              }"
              @click="savePassword"
            >
              Perbarui Password
            </button>
          </div>
        </div>
      </div>

      <!-- Sesi aktif -->
      <div class="card-glass rounded-2xl shadow-card p-5">
        <h4
          class="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2"
        >
          <svg
            class="w-4 h-4 text-brand-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"
            />
          </svg>
          Sesi Aktif
        </h4>
        <div class="space-y-3">
          <div
            v-for="sesi in sesiAktif"
            :key="sesi.id"
            class="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-slate-700">
                  {{ sesi.device }}
                </p>
                <p class="text-xs text-slate-400">
                  {{ sesi.lokasi }} · {{ sesi.waktu }}
                </p>
              </div>
            </div>
            <span v-if="sesi.current" class="badge-ok text-xs">Sesi ini</span>
            <button
              v-else
              class="text-xs text-red-500 hover:text-red-600 font-medium transition"
            >
              Akhiri
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── TAB: NOTIFIKASI ── -->
    <div v-if="activeTab === 'notifikasi'" class="x-auto space-y-4">
      <div class="card-glass rounded-2xl shadow-card p-5">
        <h4
          class="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2"
        >
          <svg
            class="w-4 h-4 text-brand-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          Preferensi Notifikasi
        </h4>
        <div class="divide-y divide-slate-100">
          <div
            v-for="notif in notifSettings"
            :key="notif.id"
            class="py-3.5 flex items-center justify-between"
          >
            <div>
              <p class="text-sm font-medium text-slate-700">
                {{ notif.label }}
              </p>
              <p class="text-xs text-slate-400">{{ notif.desc }}</p>
            </div>
            <!-- Toggle switch -->
            <button
              :class="[
                'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200',
                notif.enabled ? 'bg-brand-500' : 'bg-slate-200',
              ]"
              @click="
                notif.enabled = !notif.enabled;
                markDirty();
              "
            >
              <span
                :class="[
                  'inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200',
                  notif.enabled ? 'translate-x-4' : 'translate-x-1',
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <div class="card-glass rounded-2xl shadow-card p-5">
        <h4 class="font-display font-semibold text-slate-800 mb-4">
          Frekuensi Laporan Otomatis
        </h4>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="freq in ['Harian', 'Mingguan', 'Bulanan']"
            :key="freq"
            :class="[
              'py-2.5 rounded-xl text-sm font-medium border transition',
              notifFreq === freq
                ? 'gradient-teal text-white border-transparent shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100',
            ]"
            @click="
              notifFreq = freq;
              markDirty();
            "
          >
            {{ freq }}
          </button>
        </div>
        <p class="text-xs text-slate-400 mt-3">
          Laporan ringkasan akan dikirim ke email terdaftar sesuai frekuensi
          yang dipilih.
        </p>
      </div>
    </div>

    <!-- ── TAB: SISTEM ── -->
    <div v-if="activeTab === 'sistem'" class="x-auto space-y-4">
      <div class="card-glass rounded-2xl shadow-card p-5">
        <h4
          class="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2"
        >
          <svg
            class="w-4 h-4 text-brand-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Preferensi Tampilan
        </h4>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1.5"
              >Bahasa Antarmuka</label
            >
            <select
              v-model="sistemPref.bahasa"
              class="select-base"
              @change="markDirty"
            >
              <option>Bahasa Indonesia</option>
              <option>English</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1.5"
              >Zona Waktu</label
            >
            <select
              v-model="sistemPref.zona"
              class="select-base"
              @change="markDirty"
            >
              <option>WIB (UTC+7)</option>
              <option>WITA (UTC+8)</option>
              <option>WIT (UTC+9)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1.5"
              >Tampilan Default Data</label
            >
            <select
              v-model="sistemPref.tampilan"
              class="select-base"
              @change="markDirty"
            >
              <option>Tabel</option>
              <option>Kartu</option>
              <option>Peta</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Info versi -->
      <div class="card-glass rounded-2xl shadow-card p-5">
        <h4 class="font-display font-semibold text-slate-800 mb-3">
          Informasi Sistem
        </h4>
        <div class="space-y-2 text-sm">
          <div
            v-for="info in systemInfo"
            :key="info.label"
            class="flex justify-between"
          >
            <span class="text-slate-500">{{ info.label }}</span>
            <span class="text-slate-700 font-medium">{{ info.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast notifikasi -->
    <Transition name="toast">
      <div
        v-if="toast.show"
        :class="[
          'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium',
          toast.type === 'success'
            ? 'bg-emerald-500 text-white'
            : 'bg-red-500 text-white',
        ]"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="toast.type === 'success'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

// ── Tabs ─────────────────────────────────────────────────────────
const tabs = [
  { id: "profil", label: "Profil" },
  { id: "keamanan", label: "Keamanan" },
  { id: "notifikasi", label: "Notifikasi" },
  { id: "sistem", label: "Sistem" },
];
const activeTab = ref("profil");

// ── State profil (mock, nanti dari authStore/userStore) ──────────
const profile = reactive({
  nama: "Admin Kemenkes",
  nip: "198804122010121001",
  jabatan: "Analis Kebijakan",
  unit: "Pusdatin",
  instansi: "Kementerian Kesehatan RI",
  email: "admin.kemenkes@kemkes.go.id",
  telepon: "021-5201590",
  role: "Admin Pusat",
});

const form = reactive({ ...profile });

const initials = computed(() => {
  return form.nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
});

// ── Dirty tracking ───────────────────────────────────────────────
const isDirty = ref(false);
const isSaving = ref(false);
function markDirty() {
  isDirty.value = true;
}

function resetForm() {
  Object.assign(form, profile);
  isDirty.value = false;
}

async function saveAll() {
  isSaving.value = true;
  await new Promise((r) => setTimeout(r, 800)); // simulasi API call
  Object.assign(profile, form);
  isDirty.value = false;
  isSaving.value = false;
  showToast("Profil berhasil disimpan", "success");
}

// ── Password ──────────────────────────────────────────────────────
const passwordForm = reactive({ lama: "", baru: "", konfirmasi: "" });
const showPwd = reactive({ lama: false, baru: false, konfirmasi: false });

const pwStrength = reactive({
  score: 0,
  label: "",
  color: "bg-slate-200",
  textColor: "text-slate-400",
});

function checkPasswordStrength() {
  const p = passwordForm.baru;
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;

  const levels = [
    { label: "Terlalu lemah", color: "bg-red-400", textColor: "text-red-500" },
    { label: "Lemah", color: "bg-amber-400", textColor: "text-amber-500" },
    { label: "Sedang", color: "bg-yellow-400", textColor: "text-yellow-600" },
    { label: "Kuat", color: "bg-emerald-400", textColor: "text-emerald-600" },
    {
      label: "Sangat kuat",
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
    },
  ];
  Object.assign(pwStrength, { score, ...levels[score] });
}

const canSavePassword = computed(
  () =>
    passwordForm.lama &&
    passwordForm.baru.length >= 8 &&
    passwordForm.baru === passwordForm.konfirmasi,
);

async function savePassword() {
  await new Promise((r) => setTimeout(r, 600));
  Object.assign(passwordForm, { lama: "", baru: "", konfirmasi: "" });
  showToast("Password berhasil diperbarui", "success");
}

// ── Sesi aktif ────────────────────────────────────────────────────
const sesiAktif = ref([
  {
    id: 1,
    device: "Chrome di Windows 11",
    lokasi: "Jakarta, ID",
    waktu: "Aktif sekarang",
    current: true,
  },
  {
    id: 2,
    device: "Firefox di macOS",
    lokasi: "Bandung, ID",
    waktu: "2 jam lalu",
    current: false,
  },
  {
    id: 3,
    device: "Chrome Mobile (Android)",
    lokasi: "Surabaya, ID",
    waktu: "Kemarin 14:32",
    current: false,
  },
]);

// ── Notifikasi ────────────────────────────────────────────────────
const notifSettings = ref([
  {
    id: "kritis",
    label: "Wilayah Status Kritis",
    desc: "Notifikasi ketika wilayah baru masuk status kritis",
    enabled: true,
  },
  {
    id: "berakhir",
    label: "Kontrak Akan Berakhir",
    desc: "Peringatan 60 hari sebelum masa tugas dokter berakhir",
    enabled: true,
  },
  {
    id: "laporan",
    label: "Laporan Otomatis",
    desc: "Kirim laporan ringkasan ke email",
    enabled: false,
  },
  {
    id: "import",
    label: "Import Selesai",
    desc: "Notifikasi ketika proses import data selesai",
    enabled: true,
  },
  {
    id: "ai",
    label: "Rekomendasi AI Baru",
    desc: "Notifikasi ketika AI menghasilkan rekomendasi baru",
    enabled: false,
  },
]);
const notifFreq = ref("Mingguan");

// ── Sistem ────────────────────────────────────────────────────────
const sistemPref = reactive({
  bahasa: "Bahasa Indonesia",
  zona: "WIB (UTC+7)",
  tampilan: "Tabel",
});

const systemInfo = [
  { label: "Versi Aplikasi", value: "MedTrack 3T v1.0.0" },
  { label: "Backend", value: "Laravel 11 (coming soon)" },
  { label: "Database", value: "Mock Data (dev mode)" },
  {
    label: "Terakhir Update",
    value: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  },
];

// ── Toast ─────────────────────────────────────────────────────────
const toast = reactive({ show: false, message: "", type: "success" });

function showToast(message, type = "success") {
  Object.assign(toast, { show: true, message, type });
  setTimeout(() => {
    toast.show = false;
  }, 3000);
}

function handleDisabledClick() {
  if (!canSavePassword.value) {
    if (!passwordForm.lama) {
      showToast("Password lama harus diisi", "error");
    } else if (passwordForm.baru.length < 8) {
      showToast("Password baru minimal harus 8 karakter", "error");
    } else if (passwordForm.baru !== passwordForm.konfirmasi) {
      showToast("Konfirmasi password tidak cocok", "error");
    }
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
