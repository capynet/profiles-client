<script setup lang='ts'>
import type Profile from "~/Models/Profile";

const props = defineProps<{
  profiles: Profile[]
}>()
</script>

<template>
  <div class='grid grid-cols-1 md:grid-cols-3 gap-6'>
    <div v-for='(profile, i) in profiles' :key='i' v-show='profile.display'>
      <ProfileCard :profile='profile' />
    </div>
  </div>
</template>

