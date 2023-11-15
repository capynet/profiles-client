<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const signInWithOtp = async () => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })


  if (error) {
    console.log(error)
  } else {
    return navigateTo('/confirm')
  }
}
</script>

<template>
  <div>
    <UInput v-model="email" size="xl" type="email" class="mb-4"/>
    <UInput v-model="password" size="xl" type="password" class="mb-4"/>
    <UButton color="primary" variant="solid" @click="signInWithOtp" size="xl">Button</UButton>
  </div>
</template>