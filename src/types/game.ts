// API 遊戲介面
export interface ApiGame {
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

// API 回應介面
export interface ApiResponse {
  data: {
    data: ApiGame[]
    current_page?: number
    last_page?: number
    total?: number
  }
}

// 遊戲分類類型
export type GameCategory = 'slot' | 'fish' | 'poker' | 'live' | 'sport'

// 篩選類型
export type GameFilter = 'all' | 'hot' | 'space' | 'more'
