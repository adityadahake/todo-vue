<template>
  <ToggleSwitch v-model="checked" @value-change="toggleTheme">
    <template #handle="{ checked }">
      <i :class="['pi !text-xs', { 'pi-moon': checked, 'pi-sun': !checked }]" />
    </template>
  </ToggleSwitch>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'

import ToggleSwitch from 'primevue/toggleswitch'

onBeforeMount(() => {
  var localTheme = localStorage.getItem('theme')
  if (!localTheme) {
    localStorage.setItem(
      'theme',
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    )
    localTheme = localStorage.getItem('theme')
  }
  checked.value = localTheme === 'dark' ? true : false
  if (checked.value) document.documentElement.classList.add('app-dark')
  else document.documentElement.classList.remove('app-dark')
})

function toggleTheme() {
  if (checked.value) {
    document.documentElement.classList.add('app-dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('app-dark')
    localStorage.setItem('theme', 'light')
  }
}

const checked = ref(false)
</script>
