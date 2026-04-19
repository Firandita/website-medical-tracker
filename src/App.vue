<template>
  <div class="flex h-screen overflow-hidden bg-slate-100">
    <!-- Mobile overlay backdrop -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-30 bg-black/50 lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <Transition name="slide-sidebar">
      <AppSidebar
        v-show="sidebarOpen || isDesktop"
        :class="[
          'fixed inset-y-0 left-0 z-40 lg:relative lg:z-auto lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ]"
        :notif-count="notifCount"
        @open-notif="notifPanel?.toggle()"
        @close-sidebar="sidebarOpen = false"
      />
    </Transition>

    <!-- Main area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <AppHeader
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        @open-import="importModal?.open()"
        @open-notif="notifPanel?.toggle()"
      />

      <main class="flex-1 overflow-y-auto p-4 lg:p-6">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>

    <!-- Global: Notification Panel -->
    <NotificationPanel
      ref="notifPanel"
      @update:unreadCount="notifCount = $event"
    />

    <!-- Global: Import Modal -->
    <ImportModal ref="importModal" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import NotificationPanel from "@/components/ui/NotificationPanel.vue";
import ImportModal from "@/components/modals/ImportModal.vue";

const notifPanel = ref(null);
const importModal = ref(null);
const sidebarOpen = ref(false);
const notifCount = ref(0);
const isDesktop = ref(window.innerWidth >= 1024);

function onResize() {
  isDesktop.value = window.innerWidth >= 1024;
  if (isDesktop.value) sidebarOpen.value = false;
}

onMounted(() => window.addEventListener("resize", onResize));
onUnmounted(() => window.removeEventListener("resize", onResize));
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-sidebar-enter-active,
.slide-sidebar-leave-active {
  transition: transform 0.25s ease;
}
.slide-sidebar-enter-from,
.slide-sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
