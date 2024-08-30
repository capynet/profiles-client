<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const globalConfig = useRuntimeConfig();

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
    provider: 'google',
    options: {redirectTo: globalConfig.public.siteUrl}
  })

  if (error) {
    console.log(error)
  } else {
    return navigateTo('/confirm')
  }
}

</script>

<template>
  <div class="flex flex-col w-96 items-center m-auto">
    <div class="flex flex-col items-center">
      <p class="mb-3">Just put your email and access from link sent to your account.</p>
      <UInput v-model="email" size="xl" type="email" class="mb-4 w-96"/>
      <UButton icon="i-heroicons-at-symbol" color="primary" variant="solid" @click="signInWithOtp" size="xl">Send magic link to my email</UButton>
    </div>

    <div class="my-6">--------------------- Or ---------------------</div>

    <div>
      <UButton icon="i-heroicons-user-circle" color="primary" variant="solid" @click="signInWithGoogle" size="xl">Sign in with Google</UButton>
    </div>
  </div>
</template>