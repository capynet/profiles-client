<script setup lang='ts'>
import ProfileMap from '~/components/ProfileMap.vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

const route = useRoute()
const query = `*[_id == '${route.params.id}'][0]`
const sanity = useSanity()
const {data} = await useAsyncData<Record<any, any>>('profile', () => sanity.fetch(query))

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};

</script>

<template>
  <div class='flex flex-col sm:flex-row'>

    <div class='left w-full sm:w-6/12 p-6 order-1 sm:order-0'>
      <h1 class='mb-6'>{{ data?.name }}</h1>


      <swiper
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
      </swiper>

      <div class='mb-6'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur explicabo molestias natus possimus soluta unde! Atque consequatur est expedita labore placeat quae recusandae. At dignissimos impedit incidunt ipsa nisi quisquam!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, repudiandae!</p>
      </div>
      <suspense>
        <ProfileMap :id='route.params.id as String' />

        <template #fallback>
          Loading map...
        </template>
      </suspense>

      <p>Last update: {{ data?._updatedAt }}</p>
    </div>

    <div class='right w-full sm:w-6/12 order-0 sm:order-1'>
      <SanityImage
        :asset-id='data?.main_picture.asset._ref'
        auto='format'
        :w='648'
        :h='1152'
        fit='crop'
        crop='center'
        class='mb-1'
      />

      <ul class=''>
        <li v-for='(pic, i) in data?.gallery?.pictures' :key='i' class='inline-block'>
          <SanityImage
            :asset-id='pic.asset._ref'
            auto='format'
            :w='162'
            :h='288'
            fit='crop'
            crop='center'
            class=''
          />
        </li>
      </ul>
    </div>
  </div>

</template>