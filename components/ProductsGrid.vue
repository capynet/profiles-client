<script setup lang='ts'>
const props = defineProps<{
  profiles: Record<any, any>
}>()
</script>

<template>
  <div class='grid grid-cols-2 md:grid-cols-3 gap-6'>
    <div v-for='(profile, i) in profiles' :key='i'>
      <ProductCard :data='profile' />
    </div>
  </div>
</template>

