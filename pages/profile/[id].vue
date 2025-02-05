<script setup lang='ts'>
const route = useRoute()
const query = `*[_id == '${route.params.id}'][0]`
const sanity = useSanity()
const { data } = await useAsyncData<Record<any, any>>('profile', () => sanity.fetch(query))
const header = ref(null)
const activeImage = ref(null)

// Placeholders con relación 9:16 (648x1152 = 9:16 ratio)
const allImages = computed(() => [
  { url: 'https://picsum.photos/648/1152' }, // Principal
  ...Array.from({ length: 5 }, (_, i) => ({
    url: `https://picsum.photos/${Math.round(100 * 9/16)}/100?random=${i}`
  })) // Miniaturas
])

const setActiveImage = (image) => {
  activeImage.value = image
}

const isActive = (image) => {
  return activeImage.value?.url === image?.url ||
    (!activeImage.value && image === allImages.value[0])
}

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
  <div class="flex flex-col lg:flex-row lg:gap-8 lg:p-8 max-w-7xl mx-auto">
    <!-- Columna izquierda - Galería -->
    <div class="lg:w-2/3">
      <!-- Imagen principal -->
      <div class="relative aspect-[9/16] mb-4 rounded-xl shadow-lg overflow-hidden">
        <nuxt-img
          :src="activeImage?.url || allImages[0]?.url"
          width="648"
          height="1152"
          fit="cover"
          position="center"
          class="w-full h-full object-cover"
          format="webp"
          quality="80"
        />
      </div>

      <!-- Miniaturas -->
      <div class="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scroll">
        <button
          v-for='(pic, i) in allImages'
          :key="i"
          @click="setActiveImage(pic)"
          class="shrink-0 relative transition-all duration-200 focus:outline-none"
          :class="{'ring-2 ring-blue-500': isActive(pic)}"
        >
          <div class="relative aspect-[9/16] w-[75px] sm:w-[100px]">
            <nuxt-img
              :src="pic.url"
              width="100"
              height="175"
              fit="cover"
              position="center"
              class="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
              format="webp"
              quality="60"
            />
            <div
              v-if="isActive(pic)"
              class="absolute inset-0 bg-black/20 rounded-lg pointer-events-none"
            ></div>
          </div>
        </button>
      </div>




    </div>

    <!-- Columna derecha - Información -->
    <div class="lg:w-1/3 space-y-6 mt-6 lg:mt-0">
      <!-- Encabezado -->
      <div class="bg-white p-6 rounded-xl shadow-lg sticky top-4">
        <h1 class="text-3xl font-bold mb-4 text-slate-800">{{ data?.name }}</h1>

        <!-- Bloque de contacto -->
        <div class="space-y-3 mb-6">
          <div class="flex items-center p-3 bg-slate-50 rounded-lg">
            <UIcon name="i-heroicons-phone" class="w-6 h-6 mr-3 text-blue-600"/>
            <div>
              <p class="text-sm text-slate-500">Teléfono principal</p>
              <a href="tel:661111222" class="font-semibold text-blue-600 hover:underline">661-111-222</a>
            </div>
          </div>

          <div class="flex items-center p-3 bg-slate-50 rounded-lg">
            <UIcon name="i-simple-icons-whatsapp" class="w-6 h-6 mr-3 text-green-600"/>
            <div>
              <p class="text-sm text-slate-500">WhatsApp</p>
              <a href="tel:661111222" class="font-semibold text-green-600 hover:underline">Enviar mensaje</a>
            </div>
          </div>

          <div class="flex items-center p-3 bg-slate-50 rounded-lg">
            <UIcon name="i-simple-icons-telegram" class="w-6 h-6 mr-3 text-blue-400"/>
            <div>
              <p class="text-sm text-slate-500">Telegram</p>
              <a href="tel:661111222" class="font-semibold text-blue-400 hover:underline">Contactar</a>
            </div>
          </div>
        </div>

        <!-- Sección sobre mí -->
        <div class="mb-6">
          <h2 class="text-xl font-bold mb-3 text-slate-800">Sobre mí</h2>
          <p class="text-slate-600 leading-relaxed">
            {{ data?.bio || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum voluptatem dolores nemo temporibus dignissimos.' }}
          </p>
        </div>

        <!-- Destacado -->
        <div class="bg-amber-100 p-4 rounded-lg border border-amber-200 mb-6">
          <div class="flex items-center">
            <UIcon name="i-heroicons-sparkles" class="w-5 h-5 mr-2 text-amber-600"/>
            <span class="text-sm font-medium">Cuando me contactes, dime que me has visto en [[perfiles]]</span>
          </div>
        </div>

        <!-- Estadísticas -->
        <div class="space-y-4 mb-6">
          <div class="flex items-center">
            <UIcon name="i-heroicons-eye" class="w-5 h-5 mr-3 text-slate-400"/>
            <div>
              <p class="font-semibold">400 visitas</p>
              <p class="text-sm text-slate-400">en las últimas 24 horas</p>
            </div>
          </div>

          <div class="flex items-center">
            <UIcon name="i-heroicons-shield-check" class="w-5 h-5 mr-3 text-green-600"/>
            <div>
              <p class="font-semibold text-green-700">Verificación completa</p>
              <p class="text-sm text-slate-400">Fotos y datos verificados</p>
            </div>
          </div>

          <div class="flex items-center">
            <UIcon name="i-heroicons-calendar" class="w-5 h-5 mr-3 text-slate-400"/>
            <div>
              <p class="font-semibold">Última actualización</p>
              <p class="text-sm text-slate-400">{{ data?._updatedAt }}</p>
            </div>
          </div>
        </div>

        <!-- Mapa -->
        <div class="">
          <h2 class="text-xl font-bold mb-3 text-slate-800">¿Dónde estoy?</h2>
          <a href="#" class="inline-flex items-center text-blue-600 hover:underline mb-3">
            <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-2"/>
            Ver en Google Maps
          </a>
          <div class="h-48 bg-slate-100 rounded-lg overflow-hidden">
            <suspense>
              <ProfileMap :id='route.params.id as String'/>
              <template #fallback>
                <div class="flex items-center justify-center h-full text-slate-400">
                  Cargando mapa...
                </div>
              </template>
            </suspense>
          </div>
        </div>
      </div>
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

.custom-scroll::-webkit-scrollbar {
  height: 4px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>