<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { renderIcons } from '../icons'

const userStore = useUserStore()

const handleMenuClick = (item: string) => {
  console.log('Menu item clicked:', item)
}

const handleLogout = () => {
  userStore.logout()
  console.log('User logged out')
}

onMounted(() => {
  setTimeout(() => renderIcons(), 100)
})

</script>

<template>
  <!-- Header -->
  <header class="pt-[60px] px-6 mb-6">
    <h1 class="text-2xl font-black italic text-[#333] mb-4 tracking-tight">MEMBER CENTER</h1>
  </header>

  <!-- Main Content -->
  <main class="flex-1 w-full pb-28 px-6 overflow-y-auto no-scrollbar">
    
    <!-- User Info Card -->
    <div class="hero-book p-6 mb-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
          <i data-lucide="user" class="w-8 h-8 text-white"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-extrabold text-[#333]">{{ userStore.username }}</h3>
          <p class="text-xs text-slate-500 font-medium">VIP Level: {{ userStore.vipLevel }}</p>
        </div>
      </div>
      
      <!-- Balance Info -->
      <div class="grid grid-cols-2 gap-3 mt-4">
        <div class="bg-white/50 rounded-xl p-3">
          <p class="text-xs text-slate-500 font-bold mb-1">Balance</p>
          <p class="text-lg font-extrabold text-[#333]">${{ userStore.balance.toFixed(2) }}</p>
        </div>
        <div class="bg-white/50 rounded-xl p-3">
          <p class="text-xs text-slate-500 font-bold mb-1">Points</p>
          <p class="text-lg font-extrabold text-[#333]">{{ userStore.points }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 gap-3 mb-6">
      <button class="hero-btn py-4 flex items-center justify-center gap-2">
        <i data-lucide="wallet" class="w-4 h-4"></i>
        <span>Deposit</span>
      </button>
      <button class="hero-btn py-4 flex items-center justify-center gap-2">
        <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
        <span>Withdraw</span>
      </button>
    </div>

    <!-- Menu List -->
    <div class="space-y-2">
      
      <!-- Menu Item -->
      <div 
        class="bg-white rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
        @click="handleMenuClick('history')"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <i data-lucide="history" class="w-5 h-5 text-slate-600"></i>
          </div>
          <span class="font-bold text-slate-800">Transaction History</span>
        </div>
        <i data-lucide="chevron-right" class="w-5 h-5 text-slate-400"></i>
      </div>

      <!-- Menu Item -->
      <div 
        class="bg-white rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
        @click="handleMenuClick('vip')"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <i data-lucide="trophy" class="w-5 h-5 text-slate-600"></i>
          </div>
          <span class="font-bold text-slate-800">VIP Benefits</span>
        </div>
        <i data-lucide="chevron-right" class="w-5 h-5 text-slate-400"></i>
      </div>

      <!-- Menu Item -->
      <div 
        class="bg-white rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
        @click="handleMenuClick('settings')"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <i data-lucide="settings" class="w-5 h-5 text-slate-600"></i>
          </div>
          <span class="font-bold text-slate-800">Account Settings</span>
        </div>
        <i data-lucide="chevron-right" class="w-5 h-5 text-slate-400"></i>
      </div>

      <!-- Menu Item -->
      <div 
        class="bg-white rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
        @click="handleMenuClick('support')"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <i data-lucide="headphones" class="w-5 h-5 text-slate-600"></i>
          </div>
          <span class="font-bold text-slate-800">Customer Support</span>
        </div>
        <i data-lucide="chevron-right" class="w-5 h-5 text-slate-400"></i>
      </div>

      <!-- Menu Item -->
      <div 
        class="bg-white rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
        @click="handleMenuClick('about')"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <i data-lucide="info" class="w-5 h-5 text-slate-600"></i>
          </div>
          <span class="font-bold text-slate-800">About</span>
        </div>
        <i data-lucide="chevron-right" class="w-5 h-5 text-slate-400"></i>
      </div>

    </div>

    <!-- Logout Button -->
    <div class="mt-8">
      <button 
        class="w-full py-4 bg-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-300 transition-colors"
        @click="handleLogout"
      >
        <i data-lucide="log-out" class="w-4 h-4 inline mr-2"></i>
        Logout
      </button>
    </div>

  </main>
</template>
