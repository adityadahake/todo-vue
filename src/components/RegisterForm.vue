<template>
  <!-- Registration Form -->
  <div v-if="!confirmAccount" class="card flex flex-col items-center justify-center gap-3">
    <Form
      :resolver="registrationResolver"
      @submit="onRegistrationFormSubmit"
      class="flex w-full flex-col gap-4 sm:w-56"
    >
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
  <!-- Confirm Account -->
  <div v-if="confirmAccount" class="card flex w-96 flex-col justify-center gap-3 sm:w-56">
    <div>
      <h1 class="text-lg font-bold">Confirm Your Account</h1>
      <p class="text-muted-color text-sm">
        To confirm your account, enter the code you recieved in your email.
      </p>
    </div>
    <Message v-if="invalidCode" severity="error" size="small" variant="simple">
      {{ invalidCode.message }}
    </Message>
    <Form
      :resolver="confirmationResolver"
      @submit="onConfirmationFormSubmit"
      class="flex w-full flex-col gap-4 sm:w-56"
    >
      <FormField
        v-slot="$field"
        as="section"
        name="confirmationCode"
        initialValue=""
        class="flex flex-col gap-2"
      >
        <InputText type="text" placeholder="Enter Code" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>
      <Button :disabled="disableSubmitButton" type="submit" label="Confirm Account" />
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import router from '@/router'

import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import Button from 'primevue/button'

import { Form, FormField } from '@primevue/forms'

const disableSubmitButton = ref(false)
const confirmAccount = ref(false)
const invalidCode = ref(null)
const userDetails = ref(null)

const registrationResolver = zodResolver(
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

const confirmationResolver = zodResolver(
  z.object({
    confirmationCode: z.string().min(1, { message: 'Confirmation Code is required.' }),
  }),
)

const onRegistrationFormSubmit = async ({ valid, values }) => {
  disableSubmitButton.value = true
  if (valid) {
    try {
      console.log(values)
      const { nextStep } = await signUp({
        username: values.email,
        password: values.password,
        options: {
          userAttributes: {
            email: values.email,
            name: values.name,
          },
        },
      })
      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        console.log('registered')
        userDetails.value = values
        confirmAccount.value = true
        disableSubmitButton.value = false
      }
    } catch (err) {
      console.log(err)
      disableSubmitButton.value = false
    }
  } else {
    disableSubmitButton.value = false
  }
}

const onConfirmationFormSubmit = async ({ valid, values }) => {
  disableSubmitButton.value = true
  if (valid) {
    try {
      const { nextStep } = await confirmSignUp({
        username: userDetails.value.email,
        confirmationCode: values.confirmationCode,
      })
      console.log(nextStep)
      if (nextStep.signUpStep === 'DONE') {
        console.log('confirmed')
        disableSubmitButton.value = false
        const { nextStep } = await signIn({
          username: userDetails.value.email,
          password: userDetails.value.password,
        })
        if (nextStep.signInStep === 'DONE') {
          console.log('logged In')
          disableSubmitButton.value = false
          router.push('/')
        }
      }
    } catch (err) {
      console.log(err.name)
      invalidCode.value = { message: err.message }
      disableSubmitButton.value = false
    }
  } else {
    disableSubmitButton.value = false
  }
}
</script>
