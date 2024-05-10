<script setup lang='ts'>
import Anonymous from "~/components/UserMenu/Anonymous.vue";
import Logged from "~/components/UserMenu/Logged.vue";

const isAuthenticated = ref(false)

onMounted(() => {
  const user = useSupabaseUser()

  if (user.value?.email) {
    isAuthenticated.value = true
  }

})
</script>

<template>
  <Anonymous v-if="!isAuthenticated"/>
  <Logged v-if="isAuthenticated"/>
</template>