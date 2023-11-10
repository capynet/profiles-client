<script setup lang='ts'>
import {GoogleMap, Marker, InfoWindow, CustomControl} from 'vue3-google-map'

const props = defineProps<{
  profiles: Record<any, any>
}>()

const center = {lat: 36.72032627623469, lng: -4.44038552678008}
const drawing = ref(false)
const map = ref(null)
let drawingManager = null

const buildMarker = (profile: Record<any, any>) => {
  return {
    position: {
      lat: Number(profile.location.lat),
      lng: Number(profile.location.lng)
    },
    title: profile.name
  }
}

const enableDrawZone = () => {
  drawing.value = true

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: false
  })

  drawingManager.setMap(map.value?.map)
}
const disableDrawZone = () => {
  drawing.value = false
  drawingManager.setMap(null)
}

</script>

<template>
  <GoogleMap
    ref='map'
    api-key='AIzaSyCs5euULwZygbgzVWHq1Dm70t5OgGRgeho'
    style='width: 100%; height: 700px'
    :center='center'
    :zoom='13'
    gestureHandling='greedy'
    :libraries="['drawing']"
    :styles='[{"featureType": "poi", "stylers": [{ "visibility": "off" }]},
  ]'
  >
    <Marker v-for='(profile, i) in profiles' :key='i' :options='buildMarker(profile)'>
      <InfoWindow>
        <ProductCardMap :data='profile' />
      </InfoWindow>
    </Marker>

    <CustomControl position='BOTTOM_CENTER' v-if='!drawing'>
      <UButton
        icon='i-heroicons-pencil'
        size='xl'
        color='gray'
        variant='solid'
        label='Draw your preferred zone'
        :trailing='false'
        @click='enableDrawZone'
        class='mb-4'
      />
    </CustomControl>

    <CustomControl position='BOTTOM_CENTER' v-if='drawing'>
      <div class='bg-amber-300 p-3 mb-4 text-black text-sm flex items-center'>
        <p class='mr-2'>Mark your area of interest by clicking on the map.</p>
        <UButton
          icon='i-heroicons-x-mark'
          size='sm'
          color='gray'
          variant='solid'
          label='Cancel'
          :trailing='false'
          @click='disableDrawZone'
        />
      </div>

    </CustomControl>

  </GoogleMap>
</template>
