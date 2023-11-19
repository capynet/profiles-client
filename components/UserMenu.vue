<script setup lang='ts'>
const user = useSupabaseUser()

const options = [[{
  label: 'My profile',
  icon: 'i-heroicons-adjustments-horizontal',
  click: () => navigateTo('/user')
}, {
  label: 'Cerrar sesión',
  icon: 'i-heroicons-arrow-right-on-rectangle',
  click: () => logOut()
}]]

const logOut = async () => {
  const supabase = useSupabaseClient()
  const {error} = supabase.auth.signOut()
  if (error) console.log(error)
  navigateTo('/')
}
</script>

<template>
  <div v-if="user">
    <UDropdown
      class="mr-2"
      :items="options"
      mode="hover">
      <NuxtImg
        :src="user.user_metadata?.avatar_url"
        class="rounded-full w-10 h-10"
      />
    </UDropdown>
  </div>

  <div v-if="!user">
    <NuxtLink to="/login" title="Login">
      <UButton trailing-icon="i-heroicons-user-circle" size='xl'/>
    </NuxtLink>
  </div>
</template>
