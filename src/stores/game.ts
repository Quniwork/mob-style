import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ApiGame, GameCategory, GameFilter } from '../types/game'

const IMAGE_BASE_URL = 'https://apx.111ya.cc'

export const useGameStore = defineStore('game', () => {
  // 狀態
  const games = ref<ApiGame[]>([])
  const currentCategory = ref<GameCategory>('slot')
  const currentFilter = ref<GameFilter>('all')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const filteredGames = computed(() => {
    // 1. 依狀態篩選（僅顯示啟用的）
    let filtered = games.value.filter(game => game.status === 1)

    // 2. 套用篩選條件
    if (currentFilter.value === 'hot') {
      // 只顯示 favorite_game >= 1 的遊戲，並由大到小排序
      filtered = filtered
        .filter(game => game.favorite_game >= 1)
        .sort((a, b) => b.favorite_game - a.favorite_game)
    } else if (currentFilter.value !== 'all') {
      // 如果是平台篩選（非 'all' 和 'hot'）
      const platform = currentFilter.value.toUpperCase()
      filtered = filtered.filter(game => {
        const gamePlatform = game.game_platforms_code?.replace(/^sl/i, '').toUpperCase()
        return gamePlatform === platform
      })
    }

    return filtered
  })

  const activeGamesCount = computed(() => filteredGames.value.length)

  // 獲取所有可用的平台（從 game_platforms_code 提取，移除 "sl" 前綴）
  const availablePlatforms = computed(() => {
    const platforms = new Set<string>()
    games.value.forEach(game => {
      if (game.game_platforms_code && game.status === 1) {
        // 移除 "sl" 前綴，轉換為大寫
        const platform = game.game_platforms_code.replace(/^sl/i, '').toUpperCase()
        if (platform) {
          platforms.add(platform)
        }
      }
    })
    return Array.from(platforms).sort()
  })

  // 從 game_platforms_code 提取平台代碼
  function getPlatformCode(game: ApiGame): string {
    if (!game.game_platforms_code) return ''
    return game.game_platforms_code.replace(/^sl/i, '').toUpperCase()
  }

  // 動作
  async function fetchGames(category: GameCategory = 'slot', page: number = 1) {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/games/list?type=${category}&page=${page}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      // 處理不同的回應結構
      if (result.data && Array.isArray(result.data.data)) {
        games.value = result.data.data // Laravel 分頁
      } else if (result.data && Array.isArray(result.data)) {
        games.value = result.data
      } else if (Array.isArray(result)) {
        games.value = result
      } else {
        console.warn('Unexpected API response format:', result)
        games.value = []
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch games'
      console.error('Error fetching games:', err)
    } finally {
      isLoading.value = false
    }
  }

  function setCategory(category: GameCategory) {
    currentCategory.value = category
    fetchGames(category)
  }

  function setFilter(filter: GameFilter) {
    currentFilter.value = filter
  }

  function getFullImageUrl(imgUrl: string): string {
    return `${IMAGE_BASE_URL}${imgUrl}`
  }

  return {
    // 狀態
    games,
    currentCategory,
    currentFilter,
    isLoading,
    error,
    // Getters
    filteredGames,
    activeGamesCount,
    availablePlatforms,
    // 動作
    fetchGames,
    setCategory,
    setFilter,
    getFullImageUrl,
    getPlatformCode,
  }
})
