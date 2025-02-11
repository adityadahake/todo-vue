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
    <div class="flex gap-1">
      <span>Copyright &copy; {{ new Date().getFullYear() }} To Do</span>
      <RouterLink to="/about" class="ms-auto hover:underline">About</RouterLink>
      <span>&bullet;</span>
      <a
        href="https://github.com/adityadahake/todo-vue"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
      >
        <span>Source <i class="pi pi-github !text-xs"></i></span>
      </a>
    </div>
    <div class="flex gap-0.5">
      <i class="pi pi-check !text-xs"></i>
      <i class="pi pi-times !text-xs"></i>
      <i class="pi pi-delete-left !text-xs"></i>
      <i class="pi pi-flag !text-xs"></i>
      <i class="pi pi-flag-fill !text-xs"></i>
      <i class="pi pi-trash !text-xs"></i>
    </div>
  </footer>
</template>

<style scoped></style>
