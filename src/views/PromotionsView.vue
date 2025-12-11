<script setup lang="ts">
import { onMounted } from 'vue'
import PromotionCard from '../components/PromotionCard.vue'
import { renderIcons } from '../icons'

const handlePromotionClick = () => {
  console.log('Promotion clicked')
}

onMounted(() => {
  setTimeout(() => renderIcons(), 100)
})

</script>

<template>
  <!-- Header -->
  <header class="pt-[60px] px-6 mb-6">
    <h1 class="text-2xl font-black italic text-[#333] mb-4 tracking-tight">PROMOTIONS</h1>
  </header>

  <!-- Main Content -->
  <main class="flex-1 w-full pb-28 px-6 overflow-y-auto no-scrollbar">
    
    <!-- Promotions Grid -->
    <div class="space-y-4">
      
      <!-- Promotion Card 1 -->
      <PromotionCard
        title="Welcome Bonus"
        description="Get up to 100% bonus on your first deposit! Maximum bonus: $500"
        icon="gift"
        badge="New members only"
        @click="handlePromotionClick"
      />

      <!-- Promotion Card 2 -->
      <PromotionCard
        title="Daily Cashback"
        description="Receive 10% cashback on all losses. No maximum limit!"
        icon="percent"
        badge="Every day"
        gradient="linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)"
        @click="handlePromotionClick"
      >
        <template #button>Learn More</template>
      </PromotionCard>

      <!-- Promotion Card 3 -->
      <PromotionCard
        title="VIP Rewards"
        description="Unlock exclusive rewards, faster withdrawals, and dedicated support!"
        icon="trophy"
        badge="Exclusive benefits"
        gradient="linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)"
        @click="handlePromotionClick"
      >
        <template #button>Join VIP</template>
      </PromotionCard>

      <!-- Promotion Card 4 -->
      <PromotionCard
        title="Refer a Friend"
        description="Invite friends and earn $50 for each successful referral!"
        icon="users"
        badge="Earn together"
        gradient="linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)"
        @click="handlePromotionClick"
      >
        <template #button>Get Link</template>
      </PromotionCard>

    </div>

    <!-- Terms & Conditions -->
    <div class="mt-8 p-4 bg-slate-100 rounded-2xl">
      <h4 class="text-xs font-bold text-slate-600 mb-2 uppercase">Terms & Conditions</h4>
      <p class="text-xs text-slate-500 leading-relaxed">
        All promotions are subject to terms and conditions. Wagering requirements apply. 
        Please read the full terms before participating in any promotion.
      </p>
    </div>

  </main>
</template>
