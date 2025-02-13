<script setup lang='ts'>
import type Profile from "~/Models/Profile";

const props = defineProps<{
  profile: Profile
}>()
</script>

<template>
  <div class='bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow duration-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden'>
    <NuxtLink :to='`/profile/${profile.id}`'>
      <!-- Contenedor de imagen con aspect ratio 9:16 -->
      <div class="relative aspect-[9/16]">
        <img
          :src="profile.image"
          :alt="profile.name"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div class='p-4'>
        <h5 class='text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2'>{{ profile.name }}</h5>

        <p class='text-sm text-gray-600 dark:text-gray-400 line-clamp-3'>
          {{ profile.price }}€
        </p>

        <div class="flex items-center mt-3 text-xs text-gray-500">
          <UIcon name="i-heroicons-calendar-20-solid" class="w-4 h-4 mr-1"/>
          {{ profile.updatedAt }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>