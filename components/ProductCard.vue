<script setup lang='ts'>
const props = defineProps<{
  data: Record<any, any>
}>()
</script>

<template>

  <div class='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
    <NuxtLink :to='`/profile/${data._id}`'>
      <SanityImage
        :asset-id='data.main_picture.asset._ref'
        auto='format'
        :w='324'
        :h='576'
        fit='crop'
        crop='center'
        class='w-full'
      />

      <div class='p-5'>
        <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{{ data.name }}</h5>
        <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </div>
    </NuxtLink>
  </div>

</template>

