<template>
  <div class="card flex flex-col items-center justify-center gap-3">
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
      <FormField
        v-slot="$field"
        as="section"
        name="name"
        initialValue=""
        class="flex flex-col gap-2"
      >
        <InputText type="text" placeholder="Name" />
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
      <FormField v-slot="$field" asChild name="passwordConf" initialValue="">
        <section class="flex flex-col gap-2">
          <Password type="text" placeholder="Confirm Password" :feedback="false" toggleMask fluid />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </section>
      </FormField>
      <Button :disabled="disableSubmitButton" type="submit" label="Register" />
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { signUp } from 'aws-amplify/auth'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import Button from 'primevue/button'

import { Form, FormField } from '@primevue/forms'

// const toast = useToast()
const disableSubmitButton = ref(false)

const resolver = zodResolver(
  z
    .object({
      email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
      name: z.string().min(1, { message: 'Name is required.' }),
      password: z
        .string()
        .min(1, { message: 'Password is required.' })
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
      passwordConf: z.string().min(1, { message: 'Please confirm your password.' }),
    })
    .refine((data) => data.password === data.passwordConf, {
      message: "Passwords don't match",
      path: ['passwordConf'],
    }),
)

const onFormSubmit = async ({ valid, values }) => {
  disableSubmitButton.value = true
  if (valid) {
    try {
      console.log(values)
      disableSubmitButton.value = false
    } catch (err) {
      console.log(err)
      disableSubmitButton.value = false
    }
  } else {
    disableSubmitButton.value = false
  }
}
</script>
