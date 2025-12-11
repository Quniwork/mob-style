<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
  badge?: string
  gradient?: string
}

const props = withDefaults(defineProps<Props>(), {
  gradient: 'linear-gradient(135deg, #FFE5B4 0%, #FFD700 100%)'
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div 
    class="hero-book p-6 cursor-pointer group" 
    :style="{ background: gradient }"
    @click="emit('click')"
  >
    <div class="flex items-center gap-3 mb-3">
      <div class="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
        <i :data-lucide="icon" class="w-6 h-6 text-slate-900"></i>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-extrabold text-[#333]">{{ title }}</h3>
        <p v-if="badge" class="text-xs text-slate-500 font-medium">{{ badge }}</p>
      </div>
    </div>
    <p class="text-sm text-slate-600 mb-4">{{ description }}</p>
    <button class="hero-btn w-full group-active:scale-95 transition-transform">
      <slot name="button">Claim Now</slot>
    </button>
  </div>
</template>
