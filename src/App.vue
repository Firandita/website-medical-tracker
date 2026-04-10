<template>
  <div class="flex h-screen overflow-hidden bg-slate-100 font-dm">

    <!-- Sidebar -->
    <AppSidebar @open-notif="notifPanel?.toggle()" />

    <!-- Main area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <AppHeader
        @open-import="importModal?.open()"
        @open-notif="notifPanel?.toggle()"
      />

      <!-- Page content with transition -->
      <main class="flex-1 overflow-y-auto p-6">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>

    <!-- Global: Notification Panel -->
    <NotificationPanel ref="notifPanel" />

    <!-- Global: Import Modal -->
    <ImportModal ref="importModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar        from '@/components/layout/AppSidebar.vue'
import AppHeader         from '@/components/layout/AppHeader.vue'
import NotificationPanel from '@/components/ui/NotificationPanel.vue'
import ImportModal       from '@/components/modals/ImportModal.vue'

const notifPanel  = ref(null)
const importModal = ref(null)
</script>
