<template>
  <Card>
    <template #content>
      <div class="flex items-start gap-3 rounded-md p-3 md:w-3xl">
        <!-- Checkbox -->
        <div class="mt-1.5">
          <div
            @click="handleUpdateStatus('completed')"
            v-show="item.status === 'active'"
            class="hover:border-primary border-surface-500 flex size-5 cursor-pointer items-center justify-center rounded-md border"
          ></div>
          <div
            @click="handleUpdateStatus('active')"
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
            severity="warn"
            class="!w-fit !px-2 !py-1"
            @click="toggleFlag(true)"
          />
          <Button
            v-show="item.flagged"
            icon="pi pi-flag-fill"
            text
            size="small"
            severity="warn"
            class="!w-fit !px-2 !py-1"
            @click="toggleFlag(false)"
          />
          <Button
            v-show="item.status !== 'cancelled'"
            icon="pi pi-times"
            text
            size="small"
            severity="danger"
            class="!w-fit !px-2 !py-1"
            @click="handleUpdateStatus('cancelled')"
          />
          <Button
            v-show="item.status === 'cancelled'"
            icon="pi pi-plus"
            text
            size="small"
            class="!w-fit !px-2 !py-1"
            @click="handleUpdateStatus('active')"
          />
          <Button
            icon="pi pi-trash"
            text
            size="small"
            severity="secondary"
            class="!w-fit !px-2 !py-1"
            @click="handleDelete"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'

const { item } = defineProps(['item'])

const emit = defineEmits(['update-status', 'toggle-flag', 'delete-todo'])

const handleUpdateStatus = (newStatus) => {
  emit('update-status', item.id, newStatus)
}
const toggleFlag = (newState) => {
  emit('toggle-flag', item.id, newState)
}
const handleDelete = () => {
  emit('delete-todo', item.id)
}
</script>

<style>
.p-card,
.p-card-header,
.p-card-body,
.p-card-caption,
.p-card-title,
.p-card-subtitle,
.p-card-content,
.p-card-footer {
  padding: 0 !important;
  width: fit-content;
}
</style>
