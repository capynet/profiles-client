<script setup lang='ts'>
import {GoogleMap, Marker} from 'vue3-google-map'

const props = defineProps<{
  id: String
}>()

const query = `*[_id == '${props.id}'][0]{location}`
const sanity = useSanity()
const {data} = await useAsyncData<Record<any, any>>('profileMap', () => sanity.fetch(query))
const center = {lat: Number(data.value?.location.lat), lng: Number(data.value?.location.lng)}

</script>

<template>
  <GoogleMap
    api-key='AIzaSyCs5euULwZygbgzVWHq1Dm70t5OgGRgeho'
    style='width: 100%; height: 500px'
    :center='center'
    :zoom='15'
    gestureHandling='greedy'
  >
    <Marker :options='{ position: center}' />
  </GoogleMap>
</template>
