<template>
  <div class="grid gap-1">
    <div class="grid gap-1">
      <h2 class="font-semibold">Todos</h2>
      <TodoItem v-for="item in todoItems" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup>
import TodoItem from '@/components/TodoItem.vue'

const { todoItems } = defineProps(['todoItems'])
</script>
