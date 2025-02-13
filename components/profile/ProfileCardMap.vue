<script setup lang='ts'>
import type Profile from "~/Models/Profile";

const props = defineProps<{
  profile: Profile
}>()
</script>

<template>
  <div>
    <NuxtLink :to="`/profile/${profile.id}`">
      <img
        :src="profile.image"
        :alt="profile.name"
        class="w-[162px] h-[288px] object-cover"
      />

      <div class="pt-3 pb-1 text-center">
        <h5 class="text-gray-900">{{ profile.name }}</h5>
      </div>
    </NuxtLink>
  </div>
</template>

