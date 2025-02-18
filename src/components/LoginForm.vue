<template>
  <div class="card flex justify-center">
    <Form
      v-slot="$form"
      :resolver="resolver"
      :initialValues="initialValues"
      @submit="onFormSubmit"
      class="flex w-full flex-col gap-4 sm:w-56"
    >
      <div class="flex flex-col gap-1">
        <InputText name="email" type="text" placeholder="Email" fluid />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
          {{ $form.email.error?.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <Password
          name="pass"
          type="text"
          placeholder="Password"
          :feedback="false"
          fluid
          toggleMask
        />
        <Message v-if="$form.pass?.invalid" severity="error" size="small" variant="simple">
          {{ $from.pass.error?.message }}
        </Message>
      </div>
      <Button type="submit" label="Login" />
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
// import { useToast } from 'primevue/usetoast'

import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import Button from 'primevue/button'

import { Form } from '@primevue/forms'

// const toast = useToast()
const initialValues = ref({
  email: '',
  pass: '',
})

const resolver = ref(
  zodResolver(
    z.object({
      email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
      pass: z.string().min(1, { message: 'Email is required.' }),
    }),
  ),
)

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    // toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    console.log(values)
  }
}
</script>
