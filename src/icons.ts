
import { createIcons, icons } from 'lucide';

// 圖標名稱對應到 Lucide 圖標的對照表
// 這裡使用寬鬆的類型以便於在這個 vanilla 設置中使用
export const renderIcons = () => {
  createIcons({
    icons
  });
};

// 獲取圖標 SVG 字串的輔助函數（如果需要直接注入到 HTML 字串中）
// 注意：Lucide 並沒有原生導出 "getSvgString"，需要創建元素，
// 所以我們可能需要一個輔助函數，或者只依賴 <i data-lucide="..."></i> 並在渲染後呼叫 createIcons()。
// data-lucide 方法是這個架構的最佳選擇。
