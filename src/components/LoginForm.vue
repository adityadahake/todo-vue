<template>
  <div class="card flex flex-col items-center justify-center gap-3">
    <Message v-if="invalidLogin" severity="error" size="small" variant="simple">
      {{ invalidLogin.message }}
    </Message>
    <Form :resolver @submit="onFormSubmit" class="flex w-full flex-col gap-4 sm:w-56">
      <FormField
        v-slot="$field"
        as="section"
        name="email"
        initialValue=""
        class="flex flex-col gap-2"
      >
        <InputText type="text" placeholder="Email" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>
      <FormField v-slot="$field" asChild name="password" initialValue="">
        <section class="flex flex-col gap-2">
          <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </section>
      </FormField>
      <Button :disabled="disableSubmitButton" type="submit" label="Login" />
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signIn } from 'aws-amplify/auth'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
// import { useToast } from 'primevue/usetoast'

import router from '@/router'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import Button from 'primevue/button'

import { Form, FormField } from '@primevue/forms'

// const toast = useToast()
const disableSubmitButton = ref(false)
const invalidLogin = ref(null)

const resolver = zodResolver(
  z.object({
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Invalid email address.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
  }),
)

const onFormSubmit = async ({ valid, values }) => {
  disableSubmitButton.value = true
  if (valid) {
    // toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    try {
      const { nextStep } = await signIn({
        username: values.email,
        password: values.password,
      })
      if (nextStep.signInStep === 'DONE') {
        disableSubmitButton.value = false
        router.push('/')
      }
    } catch (error) {
      if (error.name === 'NotAuthorizedException') {
        invalidLogin.value = { message: error.message }
        disableSubmitButton.value = false
      }
    }
  } else {
    disableSubmitButton.value = false
  }
}
</script>
