<script setup lang='ts'>
import { GoogleMap, Marker } from 'vue3-google-map'

interface Location {
  lat: number
  lng: number
}

const props = defineProps<{
  location: Location
}>()

const center = computed(() => ({
  lat: props.location.lat,
  lng: props.location.lng
}))
</script>

<template>
  <GoogleMap
    api-key="AIzaSyCs5euULwZygbgzVWHq1Dm70t5OgGRgeho"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
    gestureHandling="greedy"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>
