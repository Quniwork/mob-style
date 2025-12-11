<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGameStore } from '../stores/game'
import GameCard from '../components/GameCard.vue'
import type { GameCategory } from '../types/game'
import { renderIcons } from '../icons'


const gameStore = useGameStore()
const isScrolled = ref(false)

// 分類對應表
const TYPE_MAPPING: Record<string, GameCategory> = {
  'slots': 'slot',
  'fishing': 'fish',
  'poker': 'poker',
}

const handleCategoryClick = (category: string) => {
  const apiCategory = TYPE_MAPPING[category] || category as GameCategory
  gameStore.setCategory(apiCategory)
}

const handleFilterClick = (filter: string) => {
  gameStore.setFilter(filter as any)
}

const handleGameClick = (gameId: number) => {
  console.log('Game clicked:', gameId)
}

// 監聽滾動事件
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  const scrollTop = target.scrollTop
  console.log('Scroll position:', scrollTop) // 調試用
  isScrolled.value = scrollTop > 10 // 降低閾值到 10px
}

onMounted(() => {
  gameStore.fetchGames('slot')
  setTimeout(() => renderIcons(), 100)
})
</script>

<template>
  <div class="flex-1 flex flex-col overflow-y-auto" @scroll="handleScroll">
    <!-- Header & Search -->
    <header class="pt-[60px] px-6 mb-6">
      <h1 class="text-2xl font-black italic text-[#333] mb-4 tracking-tight">ENJOY WINNING</h1>

      <!-- Search Pill -->
      <div class="search-pill">
        <i data-lucide="search" class="w-5 h-5 opacity-50"></i>
        <span>Search for games</span>
      </div>
    </header>

  <!-- Main Content -->
  <main class="flex-1 w-full pb-28 px-6">

    <!-- Hero Card (Yellow) -->
    <div class="hero-book mb-8 flex justify-between items-center group cursor-pointer">
      <div class="flex-1 z-10">
        <h2 class="text-2xl font-extrabold mb-1 group-hover:translate-x-1 transition-transform">Big Win<br>Casino</h2>
        <div class="opacity-70 font-medium text-xs mb-3">Popular Games Collection</div>
        <button class="hero-btn group-active:scale-95 transition-transform">click to enter</button>
      </div>

      <!-- Decoration Image (Right) -->
      <div class="w-24 h-24 relative">
        <div class="absolute right-0 bottom-0 w-20 h-24 bg-[#FF9F1C] rounded-t-full rounded-bl-3xl z-0 transform rotate-6"></div>
        <div class="absolute right-8 bottom-4 w-12 h-16 bg-white rounded-lg shadow-sm z-10 transform -rotate-12 flex items-center justify-center">
          <i data-lucide="spade" class="w-6 h-6 text-slate-800 fill-slate-800"></i>
        </div>
      </div>
    </div>

    <!-- Main Categories (Styled Icons) -->
    <div class="flex justify-around items-end mb-8 px-2">
      <!-- Slots -->
      <div class="cat-item-main" @click="handleCategoryClick('slots')">
        <div class="cat-icon-styled">
          <div class="cat-icon-bg"></div>
          <div class="cat-icon-content slot-reel">7</div>
        </div>
        <span class="text-sm font-bold text-[#333]">Slots</span>
      </div>

      <!-- Fishing -->
      <div class="cat-item-main" @click="handleCategoryClick('fishing')">
        <div class="cat-icon-styled">
          <div class="cat-icon-bg" style="background: #Aee1FF; transform: rotate(5deg);"></div>
          <div class="cat-icon-content">
            <i data-lucide="fish" class="w-8 h-8 stroke-[2.5] fish-jump"></i>
          </div>
        </div>
        <span class="text-sm font-bold text-[#333]">Fishing</span>
      </div>

      <!-- Cards -->
      <div class="cat-item-main" @click="handleCategoryClick('poker')">
        <div class="cat-icon-styled">
          <div class="cat-icon-bg" style="background: #FFADAD; transform: rotate(-2deg);"></div>
          <div class="cat-icon-content card-stack">
            <div class="card-1"><i data-lucide="clover" class="w-3 h-3 text-slate-800 fill-slate-800"></i></div>
            <div class="card-2"><i data-lucide="heart" class="w-3 h-3 text-red-500 fill-red-500"></i></div>
          </div>
        </div>
        <span class="text-sm font-bold text-[#333]">Card Game</span>
      </div>
    </div>

    <!-- Secondary Actions (Horizontal Scroll) - Sticky -->
    <div 
      class="sticky top-0 z-10 bg-white py-3 -mx-6 px-6 transition-shadow duration-300"
      :class="{ 'shadow-md': isScrolled }"
    >      <div class="action-row">
        <div
          class="action-pill cursor-pointer"
          :class="{ active: gameStore.currentFilter === 'all' }"
          @click="handleFilterClick('all')"
        >
          <i data-lucide="layout-grid" class="w-3 h-3"></i>
          <span>All Games</span>
        </div>
        <div
          class="action-pill cursor-pointer"
          :class="{ active: gameStore.currentFilter === 'Favorites' }"
          @click="handleFilterClick('Favorites')"
        >
          <i data-lucide="heart" class="w-3 h-3"></i>
          <span>Favorites</span>
        </div>
        <!-- 動態平台按鈕 -->
        <div
          v-for="platform in gameStore.availablePlatforms"
          :key="platform"
          class="action-pill cursor-pointer"
          :class="{ active: gameStore.currentFilter === platform }"
          @click="handleFilterClick(platform)"
        >
          <i data-lucide="tag" class="w-3 h-3"></i>
          <span>{{ platform }}</span>
        </div>
      </div>
    </div>

    <!-- Section Header: Recommend -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-5 bg-[#FFD166] rounded-full"></div>
        <h3 class="font-extrabold text-lg text-[#333] uppercase">Recommend</h3>
      </div>
      <button class="text-xs text-slate-400 font-bold flex items-center gap-1 hover:text-slate-600 transition-colors">
        see all <i data-lucide="chevron-right" class="w-3 h-3"></i>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="gameStore.isLoading" class="col-span-2 py-12 flex justify-center items-center">
      <i data-lucide="loader-2" class="animate-spin w-8 h-8 text-[#FFD700]"></i>
    </div>

    <!-- Error State -->
    <div v-else-if="gameStore.error" class="col-span-2 py-12 text-center">
      <p class="text-red-400 font-bold mb-2">{{ gameStore.error }}</p>
      <button
        class="px-4 py-2 bg-slate-800 rounded-full text-xs font-bold text-white"
        @click="gameStore.fetchGames(gameStore.currentCategory)"
      >
        Retry
      </button>
    </div>

    <!-- Content List (Grid - 2 Columns) -->
    <TransitionGroup
      v-else
      name="game-list"
      tag="div"
      class="grid grid-cols-2 gap-4"
    >
      <GameCard
        v-for="game in gameStore.filteredGames"
        :key="game.id"
        :game="game"
        :show-platform-tag="gameStore.currentFilter === 'all'"
        @click="handleGameClick"
      />
    </TransitionGroup>

    <!-- Empty State -->
    <div v-if="!gameStore.isLoading && gameStore.filteredGames.length === 0" class="col-span-2 py-16 text-center">
      <!-- Favorites 空狀態 -->
      <div v-if="gameStore.currentFilter === 'Favorites'" class="flex flex-col items-center gap-3">
        <svg class="w-8 h-8 text-[#ccc] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <div>
          <p class="text-xs text-[#aaa]">目前沒有收藏</p>
        </div>
      </div>
      <!-- 一般空狀態 -->
      <div v-else class="flex flex-col items-center gap-3">
        <svg class="w-16 h-16 text-[#FFD166] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="font-extrabold text-base text-[#888]">找不到遊戲...</p>
      </div>
    </div>

    <!-- Load More -->
    <div class="mt-6 text-center pb-4">
      <div class="inline-flex items-center gap-2 text-xs font-bold text-slate-300">
        <span class="w-1 h-1 rounded-full bg-slate-200"></span>
        <span class="w-1 h-1 rounded-full bg-slate-200"></span>
        <span class="w-1 h-1 rounded-full bg-slate-200"></span>
      </div>
    </div>
  </main>
  </div>
</template>

<style scoped>
.game-list-move,
.game-list-enter-active,
.game-list-leave-active {
  transition: opacity 0.5s cubic-bezier(0.55, 0.09, 0.68, 0.53), transform 0.8s cubic-bezier(0.55, 0.09, 0.68, 0.53);
}

.game-list-enter-from,
.game-list-leave-to {
  opacity: 0;
  transform: scale(0.3) translateX(50px);
}

.game-list-leave-active {
  position: absolute;
  width: calc((100% - 1rem) / 2); /* Grid 2列，gap 為 1rem */
}
</style>
