<template>
  <div class="bg-surface-900 flex items-start gap-3 rounded-md p-3 md:w-3xl">
    <!-- Checkbox -->
    <div class="mt-1.5">
      <div
        v-show="item.status === 'active'"
        class="hover:border-primary border-surface-500 flex size-5 cursor-pointer items-center justify-center rounded-md border"
      ></div>
      <div
        v-show="item.status === 'completed'"
        class="border-primary bg-primary text-surface-900 flex size-5 cursor-pointer items-center justify-center rounded-md border"
      >
        <i class="pi pi-check !text-xs"></i>
      </div>
    </div>
    <!-- Title and due -->
    <div>
      <h3 class="font-semibold">{{ item.title }}</h3>
      <p>{{ item.dueDate }}</p>
    </div>
    <!-- Actions -->
    <div class="ms-auto flex items-center gap-1 self-end">
      <Button
        v-show="!item.flagged"
        icon="pi pi-flag"
        text
        size="small"
        severity="contrast"
        class="!w-fit !px-2 !py-1"
      />
      <Button
        v-show="item.flagged"
        icon="pi pi-flag-fill"
        text
        size="small"
        severity="warn"
        class="!w-fit !px-2 !py-1"
      />
      <Button
        v-show="item.status !== 'cancelled'"
        icon="pi pi-times"
        text
        size="small"
        severity="danger"
        class="!w-fit !px-2 !py-1"
      />
      <Button
        v-show="item.status === 'cancelled'"
        icon="pi pi-plus"
        text
        size="small"
        class="!w-fit !px-2 !py-1"
      />
      <Button
        icon="pi pi-trash"
        text
        size="small"
        severity="secondary"
        class="!w-fit !px-2 !py-1"
      />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'

const { item } = defineProps(['item'])
</script>

<style scoped></style>
