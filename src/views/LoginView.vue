<template>
  <div class="flex grow items-center justify-center">
    <Card>
      <template #content>
        <Tabs value="0" class="h-[30rem] w-96">
          <TabList>
            <Tab value="0" class="grow !p-3 text-center">Login</Tab>
            <Tab value="1" class="grow !p-3 text-center">Register</Tab>
          </TabList>
          <TabPanels class="grow">
            <TabPanel value="0" class="flex h-full items-center justify-center">
              <LoginForm />
            </TabPanel>
            <TabPanel value="1">
              <div>Register Form</div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

import LoginForm from '@/components/LoginForm.vue'
</script>
