
import { createIcons, icons } from 'lucide';

// Map of icon names to Lucide icons
// We'll use a loose type here for flexibility in this vanilla setup
export const renderIcons = () => {
  createIcons({
    icons
  });
};

// Helper to get SVG string for an icon (if we need to inject it directly into HTML strings)
// Note: Lucide doesn't natively export a "getSvgString" easily without creating an element, 
// so we might need a helper, or just rely on <i data-lucide="..."></i> and calling createIcons() after render.
// The data-lucide approach is best for this architecture.
