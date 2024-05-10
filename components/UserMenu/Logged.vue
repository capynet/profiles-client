<script setup lang='ts'>

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
  <div>
    <UDropdown
      class="mr-2"
      :items="options"
      mode="hover">
      <UButton trailing-icon="i-heroicons-user-circle" color="white" />
    </UDropdown>
  </div>
</template>