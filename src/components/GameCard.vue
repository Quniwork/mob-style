<script setup lang="ts">
import type { ApiGame } from '../types/game'
import { useGameStore } from '../stores/game'
import { computed } from 'vue'

interface Props {
  game: ApiGame
  showPlatformTag?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPlatformTag: false
})

const gameStore = useGameStore()

const emit = defineEmits<{
  click: [gameId: number]
}>()

const platformCode = computed(() => {
  return gameStore.getPlatformCode(props.game)
})

const handleClick = () => {
  emit('click', props.game.id)
}
</script>

<template>
  <div
    class="card-book-grid cursor-pointer group"
    @click="handleClick"
  >
    <!-- Top Image -->
    <div class="card-book-img">
      <img
        :src="gameStore.getFullImageUrl(game.img_url)"
        :alt="game.name"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <!-- 平台標籤（僅在 All Games 模式下顯示） -->
      <div
        v-if="showPlatformTag"
        class="absolute top-2 right-1.5 bg-gradient-to-br from-[#FFD166] to-[#FFC045] px-2.5 py-1 rounded-full text-[10px] text-[#1d283d] font-bold shadow-sm"
      >
        {{ platformCode }}
      </div>
      <!-- HOT 標籤 -->
      <div
        v-if="game.favorite_game > 100"
        class="absolute top-2 right-2 bg-[#FF6B6B] px-2 py-1 rounded-full text-[10px] text-white font-bold shadow-sm"
      >
        HOT
      </div>
    </div>

    <!-- Bottom Info -->
    <div class="card-book-content">
      <h3 class="text-sm font-extrabold text-[#333] mb-1 truncate">{{ game.name }}</h3>
    </div>
  </div>
</template>
