<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { renderIcons } from './icons'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}

// 路由變更後重新渲染圖標
router.afterEach(() => {
  // 使用 nextTick 確保 DOM 已更新
  setTimeout(() => {
    renderIcons()
  }, 50)
})

onMounted(() => {
  // 初始圖標渲染
  setTimeout(() => {
    renderIcons()
  }, 100)

  // 定期重新渲染以捕捉任何遺漏的圖標
  setInterval(() => {
    renderIcons()
  }, 1000)
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-neon-bg text-white pb-safe">
    <!-- Decoration -->
    <div class="blob-decoration"></div>

    <!-- Dynamic Page Container -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" class="flex-1 flex flex-col" />
      </transition>
    </router-view>

    <!-- Bottom Nav (Clean White) -->
    <div class="fixed bottom-0 left-0 right-0 z-50">
      <nav class="nav-clean">
        <button
          class="nav-item-clean"
          :class="{ active: $route.path === '/home' }"
          @click="navigateTo('/home')"
        >
          <div class="nav-icon"><i data-lucide="home" class="w-3.5 h-3.5 fill-current"></i></div>
          <span>Home</span>
        </button>

        <button
          class="nav-item-clean"
          :class="{ active: $route.path === '/promotions' }"
          @click="navigateTo('/promotions')"
        >
          <div class="nav-icon"><i data-lucide="gift" class="w-3.5 h-3.5"></i></div>
          <span>Promotions</span>
        </button>

        <button
          class="nav-item-clean"
          :class="{ active: $route.path === '/profile' }"
          @click="navigateTo('/profile')"
        >
          <div class="nav-icon"><i data-lucide="user" class="w-3.5 h-3.5"></i></div>
          <span>Personal</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
