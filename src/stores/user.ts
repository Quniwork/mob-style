import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 狀態
  const username = ref('Guest User')
  const vipLevel = ref('Bronze')
  const balance = ref(0)
  const points = ref(0)
  const isLoggedIn = ref(false)

  // 動作
  function login(user: { username: string; balance: number }) {
    username.value = user.username
    balance.value = user.balance
    isLoggedIn.value = true
  }

  function logout() {
    username.value = 'Guest User'
    vipLevel.value = 'Bronze'
    balance.value = 0
    points.value = 0
    isLoggedIn.value = false
  }

  function updateBalance(amount: number) {
    balance.value = amount
  }

  return {
    // 狀態
    username,
    vipLevel,
    balance,
    points,
    isLoggedIn,
    // 動作
    login,
    logout,
    updateBalance,
  }
})
