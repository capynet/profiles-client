<script setup lang='ts'>
import Anonymous from "~/components/UserMenu/Anonymous.vue";
import Logged from "~/components/UserMenu/Logged.vue";

const user = useSupabaseUser()
</script>

<template>
  <Anonymous v-if="!user" />
  <Logged v-if="user" />
</template>