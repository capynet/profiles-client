<script setup lang="ts">
import type {FormError, FormSubmitEvent} from '#ui/types'
import useUser from "~/composables/useUser";

const {getFullUser} = useUser()
const user = await getFullUser()

const state = reactive({
  name: user?.extended?.name || undefined,
  location: user?.extended?.location || undefined,
  mainPicture: user?.extended?.mainPicture || undefined,
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({path: 'name', message: 'Required'})
  if (!state.location) errors.push({path: 'location', message: 'Required'})
  return errors
}

async function onSubmit(e: FormSubmitEvent<any>) {
  console.log("?");
  console.log(e.data);

  const {res} = await $fetch('/api/profile', {
    method: 'post',
    body: e.data
  })


}

</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name"/>
    </UFormGroup>

    <UFormGroup label="location" name="location">
      <UInput v-model="state.location"/>
    </UFormGroup>

    <ImageUploader/>


    <UButton type="submit">
      Save
    </UButton>
  </UForm>
</template>