<script setup lang='ts'>
import {GoogleMap, Marker, InfoWindow, CustomControl} from 'vue3-google-map'

const props = defineProps<{
  profiles: Record<any, any>
}>()

const selectedMarkerId = ref<string | null>(null)

const center = computed(() => {
  if (props.profiles && props.profiles.length > 0) {
    return {
      lat: props.profiles[0].location.lat,
      lng: props.profiles[0].location.lng
    }
  }
  return {lat: 40.4168, lng: -3.7038}
})

const drawing = ref(false)
const map = ref(null)
// let drawingManager = null

const buildMarker = (profile: Profile) => {
  return {
    position: {
      lat: profile.location.lat,
      lng: profile.location.lng
    },
    title: profile.name
  }
}

const onMarkerClick = (profileId: string) => {
  if (selectedMarkerId.value === profileId) {
    selectedMarkerId.value = null
  } else {
    selectedMarkerId.value = profileId
  }
}

// const enableDrawZone = () => {
//   drawing.value = true
//   drawingManager = new google.maps.drawing.DrawingManager({
//     drawingMode: google.maps.drawing.OverlayType.POLYGON,
//     drawingControl: false
//   })
//   drawingManager.setMap(map.value?.map)
// }
//
// const disableDrawZone = () => {
//   drawing.value = false
//   drawingManager.setMap(null)
// }

const visibleProfiles = computed(() =>
  props.profiles.filter(profile => profile.display)
)
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
    :styles='[{"featureType": "poi", "stylers": [{ "visibility": "off" }]}]'
  >
    <Marker
      v-for='profile in visibleProfiles'
      :key='profile.id'
      :options='buildMarker(profile)'
      @click="() => onMarkerClick(profile.id)"
    >
      <InfoWindow :model-value="selectedMarkerId === profile.id">
        <ProductCardMap :data='profile' />
      </InfoWindow>
    </Marker>

<!--    <CustomControl position='BOTTOM_CENTER' v-if='!drawing'>-->
<!--      <UButton-->
<!--        icon='i-heroicons-pencil'-->
<!--        size='xl'-->
<!--        color='gray'-->
<!--        variant='solid'-->
<!--        label='Draw your preferred zone'-->
<!--        :trailing='false'-->
<!--        @click='enableDrawZone'-->
<!--        class='mb-4'-->
<!--      />-->
<!--    </CustomControl>-->

<!--    <CustomControl position='BOTTOM_CENTER' v-if='drawing'>-->
<!--      <div class='bg-amber-300 p-3 mb-4 text-black text-sm flex items-center'>-->
<!--        <p class='mr-2'>Mark your area of interest by clicking on the map.</p>-->
<!--        <UButton-->
<!--          icon='i-heroicons-x-mark'-->
<!--          size='sm'-->
<!--          color='gray'-->
<!--          variant='solid'-->
<!--          label='Cancel'-->
<!--          :trailing='false'-->
<!--          @click='disableDrawZone'-->
<!--        />-->
<!--      </div>-->
<!--    </CustomControl>-->
  </GoogleMap>
</template>