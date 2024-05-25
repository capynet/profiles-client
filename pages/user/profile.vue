<script setup lang="ts">
import type {FormError, FormSubmitEvent} from '#ui/types'

const supabaseUser = useSupabaseUser()
import useProductsDB from "~/composables/useProductsDB";

const {get} = useProductsDB()
const userProfile = await get(supabaseUser.value.id)

const state = reactive({
  id: userProfile?.id || undefined,
  user: userProfile?.user || undefined,
  created_at: userProfile?.created_at || undefined,
  name: userProfile?.name || undefined,
  description: userProfile?.description || '',
  published: userProfile?.published || false,
  verified: userProfile?.verified || false,
  updated_at: userProfile?.updated_at || undefined,
  location: userProfile?.location || ['', ''],
  phone: userProfile?.phone || undefined,
  phone_whatsapp: userProfile?.phone_whatsapp || undefined,
  phone_telegram: userProfile?.phone_telegram || undefined,
  image: undefined,
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({path: 'name', message: 'Required'})
  // if (!state.location) errors.push({path: 'location', message: 'Required'})
  return errors
}

async function onSubmit(e: FormSubmitEvent<any>) {
  if (userProfile === null) {
    console.log('Creating');

    const {res} = await $fetch('/api/profile', {
      method: 'post',
      body: state
    })

  } else {
    console.log('Updating');

    const {res} = await $fetch('/api/profile', {
      method: 'put',
      body: state
    })

  }

}

</script>

<template>

  <h3>Account verified: {{ state.verified }}</h3>

  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">

    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name"/>
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description"/>
    </UFormGroup>

    <UFormGroup name="published">
      <UCheckbox v-model="state.published" label="Published"/>
    </UFormGroup>

    <UFormGroup label="latitude">
      <UInput v-model="state.location[0]"/>
    </UFormGroup>

    <UFormGroup label="Longitude">
      <UInput v-model="state.location[1]"/>
    </UFormGroup>


    <UFormGroup name="phone">
      <UInput v-model="state.phone"/>
    </UFormGroup>

    <UFormGroup name="enable_whatsapp">
      <UCheckbox v-model="state.phone_whatsapp" label="This phone have WhatsApp"/>
    </UFormGroup>

    <UFormGroup name="enable_telegram">
      <UCheckbox v-model="state.phone_telegram" label="This phone have Telegram"/>
    </UFormGroup>

    <ImageUploader v-model="state.image"/>


    <UButton type="submit">Save</UButton>
  </UForm>
</template>