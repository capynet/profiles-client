<script setup lang='ts'>
interface ProfileData {
  id: string
  name: string
  image: string
  description: string
  location: string
  updatedAt: string
}

const props = defineProps<{
  data: ProfileData
}>()
</script>

<template>
  <div class='bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow duration-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden'>
    <NuxtLink :to='`/profile/${data.id}`'>
      <!-- Contenedor de imagen con aspect ratio 9:16 -->
      <div class="relative aspect-[9/16]">
        <nuxt-img
          :src="data.image"
          width="648"
          height="1152"
          fit="cover"
          position="center"
          class="w-full h-full object-cover"
          format="webp"
          quality="80"
        />
      </div>

      <div class='p-4'>
        <div class="flex items-center justify-between mb-2">
          <h5 class='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>{{ data.name }}</h5>
          <span class="text-sm text-gray-500">{{ data.location }}</span>
        </div>

        <p class='text-sm text-gray-600 dark:text-gray-400 line-clamp-3'>
          {{ data.description }}
        </p>

        <div class="flex items-center mt-3 text-xs text-gray-500">
          <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-1"/>
          {{ data.updatedAt }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>