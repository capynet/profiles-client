<script setup lang='ts'>
import { ref, computed, onMounted, nextTick } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

interface Location {
  lat: number
  lng: number
}

const props = defineProps<{
  location: Location
}>()

const map = ref(null)

const center = computed(() => ({
  lat: props.location.lat,
  lng: props.location.lng
}))

const fitBounds = () => {
  if (!map.value?.map) return

  const bounds = new google.maps.LatLngBounds()
  bounds.extend({
    lat: props.location.lat,
    lng: props.location.lng
  })

  map.value.map.fitBounds(bounds)
  // Ajustamos el zoom para un solo marker
  map.value.map.setZoom(15)
}

onMounted(() => {
  nextTick(() => {
    fitBounds()
  })
})
</script>

<template>
  <GoogleMap
    ref="map"
    api-key="AIzaSyCs5euULwZygbgzVWHq1Dm70t5OgGRgeho"
    style="width: 100%; height: 100%"
    :center="center"
    :zoom="15"
    gestureHandling="greedy"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>