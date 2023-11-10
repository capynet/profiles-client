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
  const observer = new IntersectionObserver(callback, {
    rootMargin: '-1px 0px 0px 0px',
    threshold: [1],
  });

  observer.observe(header.value);
})
</script>

<template>
  <div class='flex flex-col sm:flex-row'>

    <header ref="header" class="pb-6 sticky top-0 bg-white duration-300">
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

    <div class='left w-full sm:w-6/12 p-6 order-1 sm:order-0'>

      <div>
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

        <p>Cuando me contactes dime que me has visto en [[prifiles]]</p>

        <div>
          <p>[[Check]] Verificada</p>
          <p>mas pequeño: Esta parsona se le verificaron las fotos bla bla bla</p>
        </div>
      </div>

      <div class='mb-6'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur explicabo molestias natus possimus soluta unde! Atque consequatur est expedita labore placeat quae recusandae. At dignissimos impedit incidunt ipsa nisi quisquam!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, repudiandae!</p>
      </div>

      <div>
        <h2>Skills???????</h2>
        .....
      </div>

      <div>
        <h2>¿Dónde estoy?</h2>
        <a href="#" title="ver en google maps">Ver en google maps</a>
        <suspense>
          <ProfileMap :id='route.params.id as String'/>

          <template #fallback>
            Loading map...
          </template>
        </suspense>
      </div>

      <p>Last update: {{ data?._updatedAt }}</p>
    </div>

    <div class='right w-full sm:w-6/12 order-0 sm:order-1'>

      <ul>
        <li class="mb-6">
          <SanityImage
            :asset-id='data?.main_picture.asset._ref'
            auto='format'
            :w='648'
            :h='1152'
            fit='crop'
            crop='center'
            class='mb-1'
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
            class=''
          />
        </li>
      </ul>
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