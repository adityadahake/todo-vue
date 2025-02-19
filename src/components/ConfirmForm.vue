<template>
  <div class="card flex w-96 flex-col justify-center gap-3 sm:w-56">
    <div>
      <h1 class="text-lg font-bold">Confirm Your Account</h1>
      <p class="text-muted-color text-sm">
        To confirm your account, enter the code you recieved in your email.
      </p>
    </div>
    <Message v-if="invalidCode" severity="error" size="small" variant="simple">
      {{ invalidCode.message }}
    </Message>
    <Form :resolver @submit="onFormSubmit" class="flex w-full flex-col gap-4 sm:w-56">
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
// import { confirmSignUp } from 'aws-amplify/auth'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Button from 'primevue/button'

import { Form, FormField } from '@primevue/forms'

const disableSubmitButton = ref(false)
const invalidCode = ref(null)

const resolver = zodResolver(
  z.object({
    confirmationCode: z.string().min(6, { message: 'Confirmation Code is required.' }),
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
