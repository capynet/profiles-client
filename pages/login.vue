<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const signInWithOtp = async () => {
  const {error} = await supabase.auth.signInWithOtp({
    email: email.value,
  })

  if (error) {
    console.log(error)
  }
}

const signInWithGoogle = async () => {
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google'
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
    <p>Just put your email and access from link sent to your account.</p>
    <UInput v-model="email" size="xl" type="email" class="mb-4"/>
    <UButton color="primary" variant="solid" @click="signInWithOtp" size="xl">Button</UButton>

    <UButton color="primary" variant="solid" @click="signInWithGoogle" size="xl">Google!!!!</UButton>
  </div>
</template>