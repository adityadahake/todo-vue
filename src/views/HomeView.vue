<template>
  <h1 class="text-xl font-semibold">My List</h1>
  <Divider />
  <TodoList :todo-items="todoItems" />
</template>

<script setup>
import Divider from 'primevue/divider'
import TodoList from '@/components/TodoList.vue'

const todoItems = [
  {
    id: 1,
    title: 'Schedule dentist appointment',
    status: 'active',
    flagged: true,
    dueDate: '2025-03-01',
  },
  {
    id: 2,
    title: 'Buy groceries',
    status: 'completed',
    flagged: false,
    dueDate: '2025-02-12',
    items: ['milk', 'bread', 'eggs', 'vegetables'],
  },
  {
    id: 3,
    title: 'Review project proposal',
    status: 'cancelled',
    flagged: true,
    dueDate: '2025-02-15',
  },
  {
    id: 4,
    title: 'Call mom',
    status: 'active',
    flagged: false,
    dueDate: '2025-02-11',
  },
  {
    id: 5,
    title: 'Fix kitchen sink',
    status: 'cancelled',
    flagged: false,
    dueDate: '2025-02-20',
  },
]
</script>
