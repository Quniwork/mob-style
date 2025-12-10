import './index.css'
import { renderIcons } from './icons'

// Type Definitions
interface Game {
  id: string
  name: string
  provider: string
  category: 'slots' | 'fishing' | 'poker' | 'live' | 'sports'
  imageUrl: string
  isHot: boolean
  isNew: boolean
  isFavorite: boolean
}

// Game Data
const gamesData: Game[] = [
  // Slots Games
  { id: 's1', name: '財神到', provider: 'PG Soft', category: 'slots', imageUrl: 'https://picsum.photos/seed/slot1/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 's2', name: '麻將胡了', provider: 'PG Soft', category: 'slots', imageUrl: 'https://picsum.photos/seed/slot2/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 's3', name: '龍虎爭霸', provider: 'JILI', category: 'slots', imageUrl: 'https://picsum.photos/seed/slot3/400/400', isHot: false, isNew: true, isFavorite: false },
  { id: 's4', name: '招財貓', provider: 'Pragmatic', category: 'slots', imageUrl: 'https://picsum.photos/seed/slot4/400/400', isHot: false, isNew: false, isFavorite: false },
  { id: 's5', name: '金龍獻瑞', provider: 'PG Soft', category: 'slots', imageUrl: 'https://picsum.photos/seed/slot5/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 's6', name: '幸運七', provider: 'JILI', category: 'slots', imageUrl: 'https://picsum.photos/seed/slot6/400/400', isHot: false, isNew: true, isFavorite: false },
  { id: 's7', name: '寶石傳奇', provider: 'Pragmatic', category: 'slots', imageUrl: 'https://picsum.photos/seed/slot7/400/400', isHot: false, isNew: false, isFavorite: false },
  { id: 's8', name: '大富翁', provider: 'PG Soft', category: 'slots', imageUrl: 'https://picsum.photos/seed/slot8/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 's9', name: '花開富貴', provider: 'JILI', category: 'slots', imageUrl: 'https://picsum.photos/seed/slot9/400/400', isHot: false, isNew: true, isFavorite: false },

  // Fishing Games
  { id: 'f1', name: '捕魚達人', provider: 'JILI', category: 'fishing', imageUrl: 'https://picsum.photos/seed/fish1/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 'f2', name: '深海獵人', provider: 'PG Soft', category: 'fishing', imageUrl: 'https://picsum.photos/seed/fish2/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 'f3', name: '海王捕魚', provider: 'FC', category: 'fishing', imageUrl: 'https://picsum.photos/seed/fish3/400/400', isHot: false, isNew: true, isFavorite: false },
  { id: 'f4', name: '黃金捕魚', provider: 'JILI', category: 'fishing', imageUrl: 'https://picsum.photos/seed/fish4/400/400', isHot: false, isNew: false, isFavorite: false },
  { id: 'f5', name: '龍王捕魚', provider: 'PG Soft', category: 'fishing', imageUrl: 'https://picsum.photos/seed/fish5/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 'f6', name: '3D 捕魚王', provider: 'FC', category: 'fishing', imageUrl: 'https://picsum.photos/seed/fish6/400/400', isHot: false, isNew: true, isFavorite: false },

  // Poker Games
  { id: 'p1', name: '德州撲克', provider: 'KA Gaming', category: 'poker', imageUrl: 'https://picsum.photos/seed/poker1/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 'p2', name: '21點', provider: 'Evolution', category: 'poker', imageUrl: 'https://picsum.photos/seed/poker2/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 'p3', name: '百家樂', provider: 'SA Gaming', category: 'poker', imageUrl: 'https://picsum.photos/seed/poker3/400/400', isHot: true, isNew: false, isFavorite: false },

  // Live Games
  { id: 'l1', name: '真人百家樂', provider: 'Evolution', category: 'live', imageUrl: 'https://picsum.photos/seed/live1/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 'l2', name: '真人輪盤', provider: 'Evolution', category: 'live', imageUrl: 'https://picsum.photos/seed/live2/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 'l3', name: '真人龍虎', provider: 'SA Gaming', category: 'live', imageUrl: 'https://picsum.photos/seed/live3/400/400', isHot: false, isNew: true, isFavorite: false },

  // Sports
  { id: 'sp1', name: '足球競彩', provider: 'CMD', category: 'sports', imageUrl: 'https://picsum.photos/seed/sports1/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 'sp2', name: '籃球投注', provider: 'CMD', category: 'sports', imageUrl: 'https://picsum.photos/seed/sports2/400/400', isHot: true, isNew: false, isFavorite: false },
  { id: 'sp3', name: '電競賽事', provider: 'IM', category: 'sports', imageUrl: 'https://picsum.photos/seed/sports3/400/400', isHot: false, isNew: true, isFavorite: false },
]

// State
let currentCategory: string = 'slots'
let currentFilter: string = 'all'
let favorites: Set<string> = new Set()

// Load favorites from localStorage
const loadFavorites = (): void => {
  const saved = localStorage.getItem('favorites')
  if (saved) {
    favorites = new Set(JSON.parse(saved))
    gamesData.forEach(game => {
      game.isFavorite = favorites.has(game.id)
    })
  }
}

// Filter games based on current state
const getFilteredGames = (): Game[] => {
  let games = gamesData.filter(game => game.category === currentCategory)

  switch (currentFilter) {
    case 'hot':
      games = games.filter(game => game.isHot)
      break
    case 'new':
      games = games.filter(game => game.isNew)
      break
    case 'favorite':
      games = games.filter(game => favorites.has(game.id))
      break
  }

  return games
}


// Create MASCOT TRUMP GAME CARD
const createGameCard = (game: Game): string => {
  // Badges (Stamps)
  const badgeHtml = game.isHot
    ? '<div class="absolute -top-2 -right-2 bg-[#E31D2B] text-white w-10 h-10 rounded-full border-2 border-[#0C2D48] flex items-center justify-center shadow-md z-10 animate-bounce-soft"><i data-lucide="flame" class="w-5 h-5 fill-yellow-400 text-yellow-400"></i></div>'
    : game.isNew
      ? '<div class="absolute -top-2 -right-2 bg-[#FFD700] text-[#0C2D48] w-10 h-10 rounded-full border-2 border-[#0C2D48] flex items-center justify-center shadow-md z-10"><i data-lucide="star" class="w-5 h-5 fill-white text-white"></i></div>'
      : ''

  return `
    <div class="card-chip group h-44 w-full flex flex-col cursor-pointer" data-game-id="${game.id}">
      ${badgeHtml}
      <!-- Image Area -->
      <div class="h-28 w-full relative overflow-hidden bg-[#e0efff]">
        <img src="${game.imageUrl}" alt="${game.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1" />
      </div>
      
      <!-- Info Area -->
      <div class="flex-1 w-full p-3 bg-white flex flex-col justify-between relative">
         <div class="absolute -top-4 left-3 w-8 h-8 rounded-full bg-white border-2 border-[#0C2D48] flex items-center justify-center">
             <i data-lucide="play" class="w-4 h-4 text-[#0C2D48] fill-[#0C2D48]"></i>
         </div>
         <h3 class="text-[#0C2D48] font-toon font-extrabold text-sm truncate mt-2">${game.name}</h3>
         <span class="text-[0.65rem] text-slate-400 font-bold uppercase tracking-wide">${game.provider}</span>
      </div>
    </div>
  `
}

// Render games grid
const renderGames = (): void => {
  const gamesGrid = document.getElementById('gamesGrid')
  if (!gamesGrid) return

  const games = getFilteredGames()

  if (games.length === 0) {
    gamesGrid.innerHTML = `
      <div class="col-span-2 text-center py-20 flex flex-col items-center justify-center opacity-70">
        <i data-lucide="smile" class="w-16 h-16 text-[#FFD700] mb-2"></i>
        <p class="text-[#0C2D48] font-bold text-lg">Oops! No games here!</p>
      </div>
    `
    renderIcons()
    return
  }

  gamesGrid.innerHTML = games.map(createGameCard).join('')
  renderIcons()

  gamesGrid.querySelectorAll('.card-chip').forEach(card => {
    card.addEventListener('click', () => {
      const id = (card as HTMLElement).dataset.gameId
      console.log('PLAY_FUN_GAME:', id)
    })
  })
}

// Initialize category tabs (Fun Style)
const initCategoryTabs = (): void => {
  const container = document.getElementById('categoryTabs')
  if (!container) return

  const categories = [
    { id: 'slots', icon: 'zap', label: 'Slots' },
    { id: 'fishing', icon: 'anchor', label: 'Fishing' },
    { id: 'poker', icon: 'club', label: 'Poker' },
    { id: 'live', icon: 'video', label: 'Live' },
    { id: 'sports', icon: 'trophy', label: 'Sports' },
  ]

  container.innerHTML = categories.map(cat => `
    <button class="flex items-center gap-1.5 px-4 py-2.5 border-2 border-[#0C2D48] bg-white text-[#0C2D48] rounded-[10px] shadow-[0_3px_0_#0C2D48] active:translate-y-[2px] active:shadow-none transition-all mr-1 whitespace-nowrap group ${currentCategory === cat.id ? 'bg-[#FFD700] border-[#0C2D48]' : ''}" 
      data-id="${cat.id}">
      <i data-lucide="${cat.icon}" class="w-4 h-4 ${currentCategory === cat.id ? 'text-[#0C2D48]' : 'text-[#94A3B8] group-hover:text-[#0C2D48]'}"></i>
      <span class="text-xs font-extrabold uppercase">${cat.label}</span>
    </button>
  `).join('')

  renderIcons()

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = (btn as HTMLElement).dataset.id || 'slots'
      initCategoryTabs()
      renderGames()
    })
  })
}

// Initialize filter tabs
const initFilterTabs = (): void => {
  const filterTabs = document.getElementById('filterTabs')
  if (!filterTabs) return

  filterTabs.querySelectorAll('button').forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = (tab as HTMLElement).dataset.filter
      if (filter) {
        currentFilter = filter
        updateFilterVisuals()
        renderGames()
      }
    })
  })
}

// Update Filter Visuals (Fun Smiles)
const updateFilterVisuals = () => {
  const filterTabs = document.getElementById('filterTabs')
  if (!filterTabs) return

  filterTabs.querySelectorAll('button').forEach(tab => {
    const filter = (tab as HTMLElement).dataset.filter
    if (filter === currentFilter) {
      // Active State
      tab.className = 'btn-toon text-xs px-4 py-1 shadow-[0_2px_0_#B8860B] active:shadow-none transition-all'
    } else {
      // Inactive State
      tab.className = 'px-4 py-1.5 bg-white border-2 border-[#0C2D48] text-[#0C2D48] font-bold rounded-full text-xs shadow-[0_2px_0_#0C2D48] hover:bg-[#FFD700] transition-colors cursor-pointer active:translate-y-[2px] active:shadow-none'
    }
  })
}


// Initialize Sticky Header Effect
const initScrollEffect = (): void => {
  const header = document.getElementById('mainHeader')

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header?.classList.add('scrolled')
    } else {
      header?.classList.remove('scrolled')
    }
  })
}

// Initialize Load More
const initLoadMoreBtn = (): void => {
  const loadMoreBtn = document.getElementById('loadMoreBtn')
  if (!loadMoreBtn) return

  loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin w-4 h-4"></i> 載入中...'
    renderIcons()

    setTimeout(() => {
      loadMoreBtn.innerHTML = '<span class="text-slate-600">已經到底了</span>'
      loadMoreBtn.classList.add('cursor-not-allowed')
    }, 800)
  })
}

// Initialize Bottom Nav
const initBottomNav = (): void => {
  const navItems = document.querySelectorAll('.mobile-nav-item')

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active from all
      navItems.forEach(nav => nav.classList.remove('active'))
      // Add active to current
      item.classList.add('active')

      const navTarget = (item as HTMLElement).dataset.nav
      console.log(`Navigate to: ${navTarget}`)

      // Dynamic icon handling for "Home" (just visual feedback)
      if (navTarget === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  })
}

// Initialize app
const init = (): void => {
  loadFavorites()
  initCategoryTabs()
  initFilterTabs()
  initScrollEffect()
  initLoadMoreBtn()
  initBottomNav()
  updateFilterVisuals() // Set initial filter state
  renderGames()

  console.log('🎰 Premium Casino initialized!')
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init)
