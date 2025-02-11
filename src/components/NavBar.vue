<script setup>
import { RouterLink } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <nav class="flex items-center">
    <RouterLink to="/" class="hover:text-primary text-xl font-black">ToDo</RouterLink>
    <ThemeToggle class="ms-auto" />
  </nav>
</template>
