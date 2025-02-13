<script setup lang="ts">
import Header from "~/components/misc/Header.vue";
</script>

<template>
  <Header/>
  <UContainer class="pt-8">
    <suspense>
      <NuxtPage/>
    </suspense>
  </UContainer>
</template>
