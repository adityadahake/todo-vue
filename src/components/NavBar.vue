<script setup>
import { RouterLink } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <nav class="flex items-center">
    <div class="nav-title text-xl font-black">To Do</div>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <ThemeToggle class="ms-auto" />
  </nav>
</template>
