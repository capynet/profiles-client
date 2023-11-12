<script setup lang='ts'>

const route = useRoute()
const query = `*[_id == '${route.params.id}'][0]`
const sanity = useSanity()
const {data} = await useAsyncData<Record<any, any>>('profile', () => sanity.fetch(query))
const header = ref(null)

const callback = (entry) => {
  let visiblePct = Math.floor(entry[0].intersectionRatio * 100);

  if (visiblePct === 99) {
    setTimeout(() => {
      header.value.classList.add('compact')
    }, 500)

  } else {
    setTimeout(() => {
      header.value.classList.remove('compact')
    }, 500)
  }

}

onMounted(() => {
  if (header.value !== null) {
    const observer = new IntersectionObserver(callback, {
      rootMargin: '-1px 0px 0px 0px',
      threshold: [1],
    });

    observer.observe(header.value as HTMLElement);
  }

})
</script>

<template>
  <div class='flex flex-col sm:flex-row'>

    <header
      v-if='$device.isMobile'
      ref="header"
      class="pb-6 sticky top-0 bg-white duration-300"
    >
      <h1 class='mb-6 text-3xl duration-300'>{{ data?.name }}</h1>


      <h3 class="mb-4 text-2xl flex duration-300">
        <span class="mr-2 duration-300">Phone:</span>
        <a href="tel:661111222" title="Call!" class="font-bold">661-111-222</a>
      </h3>

      <h3 class="messengers mb-4 text-2xl duration-300">
        <p class="mr-2">Pincha aquí para usar:</p>

        <div class="flex">
          <a href="tel:661111222" title="Call!" class="mr-4">
            <img src="/logos/whatsapp/digital_Inline_Green.svg" alt="Usar WhatsApp" class="w-40">
          </a>

          <a href="tel:661111222" title="Call!">
            <img src="/logos/telegram/logo.svg" alt="Usar Telegram" class="w-9">
          </a>
        </div>
      </h3>
    </header>

    <SanityImage
      v-if='$device.isMobile'
      :asset-id='data?.main_picture.asset._ref'
      auto='format'
      :w='648'
      :h='1152'
      fit='crop'
      crop='center'
      class='mb-6 rounded-lg'
    />

    <template v-if='$device.isDesktop'>
      <h1 class='mb-6'>{{ data?.name }}</h1>
      <h3>
        <UIcon name="i-heroicons-phone" class="w-8 h-8"/>
        <span>Phone call</span>
        <a href="tel:661111222" title="Call!">661-111-222</a>
      </h3>

      <h3>
        <UIcon name="i-heroicons-phone" class="w-8 h-8"/>
        <span>Whatsapp</span>
        <a href="tel:661111222" title="Call!">661-111-222</a>
      </h3>

      <h3>
        <UIcon name="i-heroicons-phone" class="w-8 h-8"/>
        <span>Telegram</span>
        <a href="tel:661111222" title="Call!">661-111-222</a>
      </h3>
    </template>

    <div class="text-sm flex items-center mb-4 p-2 bg-amber-200 rounded-sm">
      <UIcon name="i-heroicons-sparkles" class="w-8 h-8 mr-2 bg-amber-600"/>
      Cuando me contactes dime que me has visto en [[perfiles]]
    </div>

    <p class="flex items-center mb-2">
      <UIcon name="i-heroicons-eye" class="w-5 h-5 mr-2"/>
      <strong>400 visitas</strong> &nbsp; <span>el día de hoy.</span>
    </p>

    <div class="mb-2">
      <p class="flex items-center">
        <UIcon name="i-heroicons-shield-check" class="w-5 h-5 mr-2 bg-lime-900"/>
        <span class="text-lime-900">Fotos verificadas.</span>
      </p>
      <p class="text-sm text-slate-400 ml-6">Las fotos han sido verificadas y son reales.</p>
    </div>

    <p class="flex items-center">
      <UIcon name="i-heroicons-calendar" class="w-5 h-5 mr-2"/>
      Perfil actualizado el {{ data?._updatedAt }}
    </p>


    <ul>
      <li class="mb-6">
        <SanityImage
          v-if='$device.isDesktop'
          :asset-id='data?.main_picture.asset._ref'
          auto='format'
          :w='648'
          :h='1152'
          fit='crop'
          crop='center'
          class='mb-1 rounded-lg'
        />
      </li>

      <li v-for='(pic, i) in data?.gallery?.pictures' :key='i' class="mb-6">
        <SanityImage
          :asset-id='pic.asset._ref'
          auto='format'
          :w='648'
          :h='1152'
          fit='crop'
          crop='center'
          class='rounded-lg'
        />
      </li>
    </ul>


    <div class="bg-slate-50 py-4 mb-6">
      <h2 class="text-2xl font-bold mb-2">Sobre mi</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur explicabo molestias natus possimus soluta unde! Atque consequatur est expedita labore placeat quae recusandae. At dignissimos impedit incidunt ipsa nisi quisquam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, repudiandae!</p>
    </div>

    <div class="mb-6">
      <UIcon name="i-heroicons-phone" class="w-10 h-10"/>
      <UIcon name="i-heroicons-phone" class="w-10 h-10"/>
      <UIcon name="i-heroicons-phone" class="w-10 h-10"/>
      <UIcon name="i-heroicons-phone" class="w-10 h-10"/>
      <UIcon name="i-heroicons-phone" class="w-10 h-10"/>
      <UIcon name="i-heroicons-phone" class="w-10 h-10"/>
    </div>

    <div class="bg-slate-50 py-4">
      <h2 class="text-2xl font-bold mb-2">¿Dónde estoy?</h2>
      <a href="#" title="ver en google maps" class="underline text-blue-900 mb-2 block">Ver en google maps</a>

      <suspense>
        <ProfileMap :id='route.params.id as String'/>

        <template #fallback>
          Loading map...
        </template>
      </suspense>
    </div>

  </div>

</template>

<style>

.compact {
  padding-top: 10px;
}

.compact > h1, .compact > h3 {
  margin-bottom: 0;
}

.compact > .messengers > p {
  display: none;
}

.compact > h3 > span {
  font-size: 20px;
}
</style>