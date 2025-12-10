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


// Create CYBER GAME CARD
const createGameCard = (game: Game): string => {
  // Badges (Neon Tags)
  const badgeHtml = game.isHot
    ? '<div class="absolute top-0 right-0 px-2 py-0.5 bg-pink-600 text-white text-[9px] font-mono font-bold z-10 border-l border-b border-black">HOT</div>'
    : game.isNew
      ? '<div class="absolute top-0 right-0 px-2 py-0.5 bg-cyan-600 text-black text-[9px] font-mono font-bold z-10 border-l border-b border-black">NEW</div>'
      : ''

  return `
    <div class="card-tech group h-32 w-full flex flex-col justify-end relative" data-game-id="${game.id}">
      ${badgeHtml}
      <!-- Image Background -->
      <img src="${game.imageUrl}" alt="${game.name}" loading="lazy" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      
      <!-- Tech Overlay Content -->
      <div class="relative z-10 p-2 border-t border-white/10 bg-black/60 backdrop-blur-sm">
         <h3 class="text-cyan-400 font-bold text-xs truncate font-mono">${game.name}</h3>
         <div class="flex items-center justify-between mt-1">
           <span class="text-[9px] text-pink-500 uppercase tracking-tight">${game.provider}</span>
           <i data-lucide="play-circle" class="w-3 h-3 text-white/50 group-hover:text-neon-cyan transition-colors"></i>
         </div>
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
      <div class="col-span-2 text-center py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded">
        <i data-lucide="alert-triangle" class="w-8 h-8 text-pink-500 mb-2 animate-pulse"></i>
        <p class="text-cyan-800 font-mono text-xs">NO_DATA_FOUND</p>
      </div>
    `
    renderIcons()
    return
  }

  gamesGrid.innerHTML = games.map(createGameCard).join('')
  renderIcons()

  // Re-attach listeners (simplified for brevity)
  gamesGrid.querySelectorAll('.card-tech').forEach(card => {
    card.addEventListener('click', () => {
      const id = (card as HTMLElement).dataset.gameId
      console.log('INIT_GAME:', id)
    })
  })
}

// Initialize category tabs (Cyberpunk Style)
const initCategoryTabs = (): void => {
  const container = document.getElementById('categoryTabs')
  if (!container) return

  const categories = [
    { id: 'slots', icon: 'zap', label: 'SLOTS' },
    { id: 'fishing', icon: 'anchor', label: 'FISH' },
    { id: 'poker', icon: 'diamond', label: 'POKER' },
    { id: 'live', icon: 'video', label: 'LIVE' },
    { id: 'sports', icon: 'trophy', label: 'SPORT' },
  ]

  container.innerHTML = categories.map(cat => `
    <button class="flex flex-col items-center justify-center min-w-[4rem] h-16 bg-white/5 border border-white/10 rounded-sm hover:border-cyan-500/50 transition-colors ${currentCategory === cat.id ? 'border-cyan-500 bg-cyan-950/30' : ''}" 
      data-id="${cat.id}">
      <i data-lucide="${cat.icon}" class="w-5 h-5 mb-1 ${currentCategory === cat.id ? 'text-neon-cyan' : 'text-slate-500'}"></i>
      <span class="text-[9px] font-mono font-bold ${currentCategory === cat.id ? 'text-white' : 'text-slate-500'}">${cat.label}</span>
    </button>
  `).join('')

  renderIcons()

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = (btn as HTMLElement).dataset.id || 'slots'
      initCategoryTabs() // Re-render to update active class easily
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

// Update Filter Visuals
const updateFilterVisuals = () => {
  const filterTabs = document.getElementById('filterTabs')
  if (!filterTabs) return

  filterTabs.querySelectorAll('button').forEach(tab => {
    const filter = (tab as HTMLElement).dataset.filter
    if (filter === currentFilter) {
      // Active State (Cyberpunk)
      tab.className = 'px-4 py-1.5 rounded-none border border-cyan-500 bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold transition-all shadow-[0_0_10px_rgba(0,243,255,0.4)]'
    } else {
      // Inactive State
      tab.className = 'px-4 py-1.5 rounded-none border border-white/10 text-slate-400 text-xs font-mono hover:border-pink-500 hover:text-pink-500 transition-colors flex items-center gap-1'
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
