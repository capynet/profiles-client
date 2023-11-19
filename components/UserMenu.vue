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
      class="flex items-center"
      :items="options"
      mode="hover">
      <UAvatar
        :src="user.user_metadata?.avatar_url"
        size="md"
      />

    </UDropdown>
  </div>

  <div v-if="!user">
    <NuxtLink to="/login" title="Login">
      <UAvatar
        icon="i-heroicons-user-circle"
        size="md"
        class="border"
      />
    </NuxtLink>
  </div>
</template>
