/// <reference types="vite/client" />

declare const __APP_NAME__: string
declare const __APP_VERSION__: string

// Vue 模組宣告
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
