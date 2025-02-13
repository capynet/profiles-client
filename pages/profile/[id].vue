<script setup lang='ts'>
const route = useRoute()
const header = ref(null)
const activeImage = ref(null)

// Datos estáticos
const data = {
  name: 'Juan Pérez',
  bio: 'Soy un profesional con más de 10 años de experiencia en mi campo. Me apasiona ayudar a las personas y ofrecer soluciones creativas a sus problemas.',
  _updatedAt: '15 de octubre de 2023',
  location: {
    lat: 36.7213,
    lng: -4.4217
  }
}

const allImages = computed(() => [
  {
    thumbnail: 'https://picsum.photos/56/100', // Versión pequeña para miniatura
    fullsize: 'https://picsum.photos/648/1152', // Versión grande para imagen principal
  },
  ...Array.from({length: 10}, (_, i) => ({
    thumbnail: `https://picsum.photos/${Math.round(56 * 9 / 16)}/100?random=${i}`,
    fullsize: `https://picsum.photos/648/1152?random=${i}`
  }))
])

const setActiveImage = (image) => {
  activeImage.value = {
    ...image,
    url: image.fullsize // Usamos la versión en alta calidad
  }
}

const isActive = (image) => {
  return activeImage.value?.fullsize === image?.fullsize ||
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
    <div class="lg:w-3/5">
      <!-- Imagen principal -->
      <div class="relative aspect-[9/16] mb-4 rounded-xl shadow-lg overflow-hidden">
        <nuxt-img
          :src="activeImage?.url || allImages[0]?.fullsize"
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
      <div class="grid grid-cols-5 sm:grid-cols-6 gap-2 mb-8">
        <button
          v-for='(pic, i) in allImages'
          :key="i"
          @click="setActiveImage(pic)"
          class="relative transition-all duration-200 focus:outline-none rounded-lg overflow-hidden"
          :class="{'ring-2 ring-orange-500 ring-offset-2': isActive(pic)}"
        >
          <div class="relative aspect-[9/16] w-full">
            <nuxt-img
              :src="pic.thumbnail"
              width="56"
              height="100"
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
    <div class="lg:w-2/5 space-y-6 mt-6 lg:mt-0">
      <!-- Encabezado -->
      <div class="bg-white p-6 rounded-xl shadow-lg sticky top-4">
        <h1 class="text-3xl font-bold mb-4 text-slate-800">{{ data.name }}</h1> <!-- Usando data estática -->

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
            {{ data.bio }} <!-- Usando data estática -->
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
              <p class="text-sm text-slate-400">{{ data._updatedAt }}</p> <!-- Usando data estática -->
            </div>
          </div>
        </div>

        <!-- Mapa -->
        <div class="">
          <h2 class="text-xl font-bold mb-3 text-slate-800">¿Dónde estoy?</h2>

          <span>{{data.address}}</span>
          <a href="#" class="inline-flex items-center text-blue-600 hover:underline mb-3">
            <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-2"/>
            Ver en Google Maps
          </a>

          <div class="h-48 bg-slate-100 rounded-lg overflow-hidden">
            <suspense>
              <ProfileMap :location="data.location"/>
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

</style>