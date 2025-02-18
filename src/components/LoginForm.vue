<template>
  <div class="card flex justify-center">
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
      <Button type="submit" label="Login" />
    </Form>
  </div>
</template>

<script setup>
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
// import { useToast } from 'primevue/usetoast'

// import { Amplify } from 'aws-amplify'
import { signIn } from 'aws-amplify/auth'

import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import Button from 'primevue/button'

import { Form, FormField } from '@primevue/forms'

// const toast = useToast()

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
  if (valid) {
    // toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    console.log(values)
    try {
      const { nextStep, isSignedIn } = await signIn({
        username: values.email,
        password: values.password,
      })
      console.log(nextStep)
      // TODO:
      // - Handle Incorrect Username or Password ==> NotAuthorizedException: Incorrect username or password.
      // - Handle Confirm Sign up ==> nextStep.signInStep: "CONFIRM_SIGN_UP"
      // - Handle Successful login ==> nextStep.signInStep: "DONE"
      console.log(isSignedIn)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
