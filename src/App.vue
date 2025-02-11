<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <header class="container mx-auto p-3">
    <NavBar />
  </header>
  <main class="container mx-auto p-3">
    <RouterView />
  </main>
  <footer class="text-muted-color container mx-auto mt-auto p-3 text-sm">
    Copyright &copy; {{ new Date().getFullYear() }} To Do
  </footer>
</template>

<style scoped></style>
