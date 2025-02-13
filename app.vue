<script setup lang="ts">
import Header from "~/components/misc/Header.vue";
</script>

<template>
  <Header/>
  <UContainer class="lg:p-0">
    <suspense>
      <NuxtPage/>
    </suspense>
  </UContainer>
</template>
