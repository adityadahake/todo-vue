<template>
  <nav class="flex items-center gap-3">
    <RouterLink to="/" class="hover:text-primary text-xl font-black">ToDo</RouterLink>
    <ThemeToggle class="ms-auto" />
    <Button
      v-if="$route.name === 'home'"
      @click="handleSignout"
      size="small"
      class="text-sm font-semibold"
    >
      <i class="pi pi-sign-out !text-sm"></i>Log Out
    </Button>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { signOut } from 'aws-amplify/auth'

import router from '@/router'
import ThemeToggle from '@/components/ThemeToggle.vue'
import Button from 'primevue/button'

const handleSignout = async () => {
  await signOut()
  router.push('/login')
}
</script>
