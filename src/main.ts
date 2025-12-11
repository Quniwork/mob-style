import './index.css'
import { renderIcons } from './icons'

// API Interfaces
interface ApiGame {
  id: number
  name: string
  code: string
  status: number
  game_types_code: string
  game_platforms_code: string
  favorite_game: number
  img_code: string
  img_url: string
}

// State
let currentCategory: string = 'slot'
let currentFilter: string = 'all'
let gamesData: ApiGame[] = []


const IMAGE_BASE_URL = 'https://apx.111ya.cc'

// Type Mapping (HTML data-category -> API type)
const TYPE_MAPPING: Record<string, string> = {
  'slots': 'slot',
  'fishing': 'fish',
  'poker': 'poker',
  'live': 'live',
  'sports': 'sport'
}

// Fetch Games from API
const fetchGames = async (type: string = 'slot', page: number = 1): Promise<void> => {
  renderLoadingState()

  try {
    const response = await fetch(`/api/games/list?type=${type}&page=${page}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()

    // Handle response structure
    if (result.data && Array.isArray(result.data.data)) {
      gamesData = result.data.data // Laravel pagination
    } else if (result.data && Array.isArray(result.data)) {
      gamesData = result.data
    } else if (Array.isArray(result)) {
      gamesData = result
    } else {
      console.warn('Unexpected API response format, checking custom paths...')
      // Fallback or debug
      gamesData = []
    }

    renderGames()
  } catch (error) {
    console.error('Error fetching games:', error)
    renderErrorState()
  }
}

// Create Game Card HTML
const createGameCard = (game: ApiGame): string => {
  const fullImgUrl = `${IMAGE_BASE_URL}${game.img_url}`

  return `
    <div class="card-book-grid cursor-pointer group" data-game-id="${game.id}">
      <!-- Top Image -->
      <div class="card-book-img">
         <img src="${fullImgUrl}" alt="${game.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
         ${game.favorite_game > 100 ? '<div class="absolute top-2 right-2 bg-[#FF6B6B] px-2 py-0.5 rounded-full text-[10px] text-white font-bold shadow-sm">HOT</div>' : ''}
      </div>
      
      <!-- Bottom Info -->
      <div class="card-book-content">
         <h3 class="text-sm font-extrabold text-[#333] mb-1 truncate">${game.name}</h3>
         <button class="card-book-btn">Start</button>
      </div>
    </div>
  `
}

const renderLoadingState = (): void => {
  const gamesGrid = document.getElementById('gamesGrid')
  if (!gamesGrid) return

  gamesGrid.innerHTML = `
    <div class="col-span-2 py-12 flex justify-center items-center">
       <i data-lucide="loader-2" class="animate-spin w-8 h-8 text-[#FFD700]"></i>
    </div>
  `
  renderIcons()
}

const renderErrorState = (): void => {
  const gamesGrid = document.getElementById('gamesGrid')
  if (!gamesGrid) return

  gamesGrid.innerHTML = `
    <div class="col-span-2 py-12 text-center">
       <p class="text-red-400 font-bold mb-2">Failed to load games</p>
       <button id="retryBtn" class="px-4 py-2 bg-slate-800 rounded-full text-xs font-bold text-white">Retry</button>
    </div>
  `
  document.getElementById('retryBtn')?.addEventListener('click', () => fetchGames(currentCategory))
}

const renderGames = (): void => {
  const gamesGrid = document.getElementById('gamesGrid')
  if (!gamesGrid) return

  // 1. Filter Active Games
  let displayGames = gamesData.filter(game => game.status === 1)

  // 2. Apply Quick Action Filters
  if (currentFilter === 'hot') {
    // Sort by favorite count descending
    displayGames = displayGames.sort((a, b) => b.favorite_game - a.favorite_game)
  }

  if (displayGames.length === 0) {
    gamesGrid.innerHTML = `
      <div class="col-span-2 py-12 text-center opacity-50">
        <p class="font-bold text-slate-400">No games found...</p>
      </div>
    `
    renderIcons()
    return
  }

  gamesGrid.innerHTML = displayGames.map(createGameCard).join('')
  renderIcons()

  gamesGrid.querySelectorAll('.card-book-grid').forEach(card => {
    card.addEventListener('click', () => {
      const id = (card as HTMLElement).dataset.gameId
      console.log('GAME_CLICK:', id)
    })
  })
}

// Category Tabs
const initCategoryTabs = (): void => {
  const categories = document.getElementById('mainCategories')
  if (!categories) return

  categories.querySelectorAll('.cat-item-main').forEach(item => {
    item.addEventListener('click', () => {
      const rawCategory = (item as HTMLElement).dataset.category || 'slots'
      const apiCategory = TYPE_MAPPING[rawCategory] || rawCategory

      if (apiCategory !== currentCategory) {
        currentCategory = apiCategory
        // Visual Update - can be enhanced if 'active' class exists
        item.classList.add('scale-95')
        setTimeout(() => item.classList.remove('scale-95'), 150)

        fetchGames(currentCategory)
      }
    })
  })
}

// Quick Actions (Filtering)
const initQuickActions = (): void => {
  const quickActions = document.getElementById('quickActions')
  if (!quickActions) return

  quickActions.querySelectorAll('.action-pill').forEach(item => {
    item.addEventListener('click', () => {
      // Visual Update
      quickActions.querySelectorAll('.action-pill').forEach(p => p.classList.remove('active'))
      item.classList.add('active')

      const action = (item as HTMLElement).dataset.action || 'all'
      currentFilter = action
      console.log('Refiltering:', currentFilter)

      renderGames()
    })
  })
}



// Bottom Navigation Reference
const initBottomNav = (): void => {
  const navItems = document.querySelectorAll('.nav-item-clean') // Updated selector from previous HTML (was .nav-item-clean, previous TS said .mobile-nav-item? Let's check HTML)
  // HTML Line 144: <button class="nav-item-clean active" data-nav="home">

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(nav => nav.classList.remove('active'))
      item.classList.add('active')
      const target = (item as HTMLElement).dataset.nav
      if (target === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  })
}

// Header Scroll Effect
const initScrollEffect = (): void => {
  const header = document.querySelector('header')
  if (!header) return

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      // header.classList.add('scrolled') // Add style if defined
      // Logic stubbed for now
    }
  })
}

const init = (): void => {
  initCategoryTabs()
  initQuickActions()
  initBottomNav()
  initScrollEffect()
  // initLoadMoreBtn() // Logic empty currently, uncomment if implemented

  fetchGames('slot')

  // Use Environmental Variables
  document.title = `${__APP_NAME__} | 頂級線上遊戲平台`
  console.log(`🚀 ${__APP_NAME__} ${__APP_VERSION__} Initialized`)
  console.log('⚡️ Game API Integrated')
}

document.addEventListener('DOMContentLoaded', init)

