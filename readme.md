# 🎰 Casino H5 遊戲大廳

一個基於 Vue 3 + TypeScript + Tailwind CSS v4 的現代化 H5 賭場遊戲大廳應用。

## 📋 專案資訊

- **專案名稱**: Casino H5 Game Lobby
- **技術棧**: Vue 3 + TypeScript + Vite + Tailwind CSS v4
- **開發模式**: SPA (Single Page Application)
- **UI 風格**: 現代化、動態互動、流暢動畫

## 🛠️ 技術棧

### 核心框架
- **Vue 3.5.25** - 使用 Composition API (`<script setup>`)
- **TypeScript 5.9.3** - 類型安全
- **Vite 7.2.7** - 快速開發構建工具

### 路由與狀態管理
- **Vue Router 4.6.4** - 路由管理（Hash 模式）
- **Pinia 3.0.4** - 狀態管理

### 樣式與 UI
- **Tailwind CSS 4.0.0 (Beta)** - CSS 框架
- **@tailwindcss/vite 4.0.0** - Tailwind CSS v4 Vite 插件
- **@vitejs/plugin-vue 6.0.2** - Vue 3 Vite 插件
- **Lucide Icons 0.559.0** - 圖標庫（動態渲染）

## 💻 環境需求

### Node.js 版本
- **推薦**: Node.js v22.21.1 (LTS)
- **最低**: Node.js v18.0.0+
- **當前使用**: Node.js v22.21.1

### 套件管理器
- npm 10.9.4+

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```

### 構建生產版本
```bash
npm run build
```

### 預覽生產構建
```bash
npm run preview
```

## 📁 專案結構

```
111ya/
├── src/
│   ├── components/          # Vue 組件
│   │   ├── GameCard.vue    # 遊戲卡片組件
│   │   └── PromotionCard.vue # 促銷卡片組件
│   ├── stores/             # Pinia 狀態管理
│   │   ├── game.ts         # 遊戲狀態
│   │   └── user.ts         # 用戶狀態
│   ├── types/              # TypeScript 類型定義
│   │   └── game.ts         # 遊戲相關類型
│   ├── views/              # 頁面組件
│   │   ├── HomeView.vue    # 首頁
│   │   ├── PromotionsView.vue # 促銷頁
│   │   └── ProfileView.vue # 個人頁
│   ├── router/             # 路由配置
│   │   └── index.ts        # 路由定義
│   ├── App.vue             # 根組件
│   ├── main.ts             # 應用入口
│   ├── index.css           # 全局樣式
│   ├── icons.ts            # 圖標渲染工具
│   └── vite-env.d.ts       # Vite 環境類型
├── index.html              # HTML 入口
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
├── package.json            # 專案依賴
└── .env                    # 環境變數
```

## 🎨 功能特性

### ✅ 已完成功能

#### 核心功能
- [x] Vue 3 遷移完成（Composition API）
- [x] Vue Router 路由管理（Hash 模式）
- [x] Pinia 狀態管理
- [x] TypeScript 類型安全
- [x] Tailwind CSS v4 升級

#### 遊戲功能
- [x] 遊戲列表展示（Grid 2列佈局）
- [x] 遊戲分類切換（Slots, Fishing, Poker）
- [x] 遊戲篩選功能
  - [x] All Games - 顯示所有遊戲
  - [x] Favorites - 顯示收藏遊戲（favorite_game >= 1）
  - [x] 動態平台篩選（從 API 自動提取平台代碼）
- [x] 平台標籤顯示（All Games 模式下）
- [x] HOT 標籤（favorite_game > 100）

#### UI/UX 優化
- [x] 響應式設計（移動端優先）
- [x] 流暢的過渡動畫
  - [x] 遊戲列表切換動畫（淡入淡出 + 縮放 + 滑動）
  - [x] 篩選按鈕互動動畫（懸停、點擊、波紋效果）
  - [x] 遊戲卡片互動動畫（懸停、光暈效果）
- [x] 動態圖標渲染（Lucide）
- [x] 空狀態設計（SVG 圖標 + 提示文字）

#### 樣式系統
- [x] Tailwind CSS v4 CSS 變數配置
- [x] 自定義主題色（品牌黃 #FFD166）
- [x] 漸層背景效果
- [x] 陰影與圓角系統

#### 國際化
- [x] 所有註解改為繁體中文

### 🚧 進行中功能

- [ ] 篩選按鈕區塊 Sticky 定位
  - [ ] 滾動時固定在頂部
  - [ ] 滾動後動態顯示陰影
  - ⚠️ 目前滾動事件監聽需要調試

### 📝 待開發功能

- [ ] 遊戲搜尋功能
- [ ] 遊戲詳情頁
- [ ] 用戶登入/登出
- [ ] 收藏遊戲功能
- [ ] 遊戲啟動功能
- [ ] 促銷活動詳情
- [ ] 個人資料編輯
- [ ] 更多頁面（Profile, Promotions）

## 🔧 配置說明

### 環境變數 (.env)
```env
APP_NAME=Casino
APP_VERSION=v1.0.0
API_URL=https://apx.111ya.cc
```

### Tailwind CSS v4 主題配置
主題配置位於 `src/index.css` 的 `@theme` 區塊：

```css
@theme {
  --color-brand: #FFD166;
  --color-accent: #06FFA5;
}
```

## 🎯 API 端點

- **遊戲列表**: `/api/games/list?game_type={category}&page={page}`
- **圖片基礎 URL**: `https://apx.111ya.cc`

### 遊戲分類
- `slot` - 老虎機
- `fish` - 捕魚遊戲
- `poker` - 撲克遊戲
- `live` - 真人遊戲
- `sport` - 體育博彩

## 📊 資料結構

### 遊戲物件 (ApiGame)
```typescript
interface ApiGame {
  id: number
  name: string
  game_type: string
  game_platforms_code: string  // 平台代碼（如 "slrg", "slgp"）
  status: number               // 1: 啟用, 0: 停用
  favorite_game: number        // 收藏數
  img_url: string             // 圖片路徑
}
```

## 🐛 已知問題

### CSS Linter 警告
- `@theme` at-rule 警告 - 這是 Tailwind CSS v4 的新功能，CSS linter 尚未支援，不影響運行

### TypeScript 警告
- `process` 未定義 - 需要安裝 `@types/node`（可選）

### Node.js 版本警告
- 部分套件建議 Node.js 18+，目前使用 v22.21.1 已解決

## 🎨 設計規範

### 顏色系統
- **主色**: #FFD166 (品牌黃)
- **輔色**: #06FFA5 (霓虹綠)
- **背景**: #0A0E27 (深藍黑)
- **文字**: #333 (深灰)

### 動畫時間
- **快速**: 0.2s - 0.3s（按鈕點擊、淡入淡出）
- **中等**: 0.5s - 0.8s（卡片移動、過渡）
- **緩慢**: 1s+（複雜動畫）

### 圓角
- **小**: 0.5rem (8px)
- **中**: 1rem (16px)
- **大**: 1.5rem (24px)
- **圓形**: 9999px

## 📝 開發筆記

### Tailwind CSS v4 遷移重點
1. 移除 `tailwind.config.js` 和 `postcss.config.js`
2. 使用 `@import "tailwindcss"` 替代 `@tailwind` 指令
3. 使用 `@theme` 定義自定義主題
4. 使用 `@tailwindcss/vite` 插件

### Vue 3 最佳實踐
1. 使用 `<script setup>` 語法
2. 使用 Composition API
3. 使用 TypeScript 類型定義
4. 組件懶加載（路由層級）

### 動畫優化
1. 使用 `TransitionGroup` 實現列表動畫
2. 使用 CSS `transition` 而非 `animation`
3. 使用 `cubic-bezier` 自定義緩動函數
4. 避免 `position: absolute` 造成的佈局跳動

## 👥 貢獻者

- 開發者: Quni

## 📄 授權

Private Project

---

**最後更新**: 2025-12-12  
**Node.js 版本**: v22.21.1  
**專案狀態**: 開發中 🚧