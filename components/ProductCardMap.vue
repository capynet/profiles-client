<script setup lang='ts'>
interface ProfileData {
  id: string
  name: string
  image: string
}

const props = defineProps<{
  data: ProfileData
}>()
</script>

<template>
  <div>
    <NuxtLink :to="`/profile/${data.id}`">
      <img
        :src="data.image"
        :alt="data.name"
        class="w-[162px] h-[288px] object-cover"
      />

      <div class="pt-3 pb-1 text-center">
        <h5 class="text-gray-900">{{ data.name }}</h5>
      </div>
    </NuxtLink>
  </div>
</template>

