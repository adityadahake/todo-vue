<template>
  <h1 class="text-primary text-xl font-semibold">{{ userName && `${userName}'s List` }}</h1>
  <Divider />
  <TodoList
    :todo-item-groups="groupedTodos"
    @update-status="updateTodoStatus"
    @toggle-flag="toggleFlag"
    @delete-todo="deleteTodo"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { fetchUserAttributes } from 'aws-amplify/auth'

import Divider from 'primevue/divider'
import TodoList from '@/components/TodoList.vue'

const userName = ref(undefined)
fetchUserAttributes()
  .then((user) => {
    userName.value = user.name
  })
  .catch((err) => {
    console.log(err)
  })

const todoItems = ref([
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
])

const sortByDueDate = (tasks) => {
  return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
}

const groupedTodos = computed(() => {
  const activeTodos = todoItems.value.filter((task) => task.status === 'active')

  return {
    active: {
      flagged: sortByDueDate(activeTodos.filter((task) => task.flagged)),
      unflagged: sortByDueDate(activeTodos.filter((task) => !task.flagged)),
    },
    completed: sortByDueDate(todoItems.value.filter((task) => task.status === 'completed')),
    cancelled: sortByDueDate(todoItems.value.filter((task) => task.status === 'cancelled')),
  }
})

const updateTodoStatus = (taskId, newStatus) => {
  const task = todoItems.value.find((t) => t.id === taskId)
  if (task) {
    task.status = newStatus
  }
}
const toggleFlag = (taskId, newState) => {
  const task = todoItems.value.find((t) => t.id === taskId)
  if (task) {
    task.flagged = newState
  }
}
const deleteTodo = (taskId) => {
  const taskIndex = todoItems.value.findIndex((task) => task.id === taskId)
  if (taskIndex !== -1) {
    todoItems.value.splice(taskIndex, 1)
  }
}
</script>
