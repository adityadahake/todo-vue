<template>
  <div class="grid gap-3">
    <div class="grid gap-1">
      <h2 class="text-primary-500 font-semibold">Active</h2>
      <h3 class="text-sm text-orange-300">Flagged</h3>
      <TodoItem v-for="item in todoItemGroups.active.flagged" :key="item.id" :item="item" />
      <div class="w-6">
        <Divider />
      </div>
      <TodoItem v-for="item in todoItemGroups.active.unflagged" :key="item.id" :item="item" />
    </div>
    <div class="grid gap-1 opacity-75">
      <h2 class="font-semibold text-teal-600">Completed</h2>
      <TodoItem v-for="item in todoItemGroups.completed" :key="item.id" :item="item" />
    </div>
    <div class="grid gap-1 opacity-50">
      <h2 class="font-semibold text-gray-400">Cancelled</h2>
      <TodoItem v-for="item in todoItemGroups.cancelled" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup>
import Divider from 'primevue/divider'
import TodoItem from '@/components/TodoItem.vue'

const { todoItemGroups } = defineProps(['todoItemGroups'])
</script>
