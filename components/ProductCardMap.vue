<script setup lang='ts'>
const props = defineProps<{
  data: Record<any, any>
}>()
</script>

<template>
  <div>
    <NuxtLink :to='`/profile/${data._id}`'>
      <SanityImage
        :asset-id='data.main_picture.asset._ref'
        auto='format'
        :w='162'
        :h='288'
        fit='crop'
        crop='center'
        class='w-full'
      />

      <div class='pt-3 pb-1 text-center'>
        <h5 class='text-gray-900'>{{ data.name }}</h5>
      </div>
    </NuxtLink>
  </div>

</template>

