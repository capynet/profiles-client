<script setup lang='ts'>

const isAuthenticated = ref(false)

onMounted(() => {
  const user = useSupabaseUser()

  if (user.value?.email) {
    isAuthenticated.value = true
  }

})

const options = computed(() => {
  const loggedOptions = [[{
    label: 'My profile',
    icon: 'i-heroicons-adjustments-horizontal',
    click: () => navigateTo('/user')
  }, {
    label: 'Cerrar sesión',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    click: () => logOut()
  }]]
  return isAuthenticated.value ? loggedOptions : []
})

const logOut = async () => {
  const supabase = useSupabaseClient()
  const {error} = supabase.auth.signOut()
  if (error) console.log(error)
  isAuthenticated.value = false
  navigateTo('/')
}
</script>

<template>
  <div>
    <UDropdown
      class="mr-2"
      :items="options"
      mode="hover">
      <NuxtLink to="/login" title="Login" v-if="!isAuthenticated">
        <UButton trailing-icon="i-heroicons-user-circle"/>
      </NuxtLink>
      <UButton trailing-icon="i-heroicons-user-circle" color="white" v-if="isAuthenticated"/>
    </UDropdown>
  </div>
</template>