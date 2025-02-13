<script setup lang='ts'>
import { useFilters } from '~/composables/useFilters'

const data = [
  {
    id: '1',
    name: 'Lola - Peluquería Canina',
    price: 25,
    age: 18,
    paymentMethods: ['cash', 'creditCard', 'bizum'],
    languages: ['spanish', 'english'],
    image: 'https://picsum.photos/seed/1/800/1000',
    description: 'Peluquería canina profesional con más de 15 años de experiencia. Especialistas en razas pequeñas y medianas. Servicio de recogida a domicilio.',
    location: { name: 'Centro Histórico, Málaga', lat: 36.7213, lng: -4.4217 },
    updatedAt: '2024-02-06'
  },
  {
    id: '2',
    name: 'Hotel Mascotas Happy Tails',
    price: 45,
    age: 21,
    paymentMethods: ['creditCard', 'bizum'],
    languages: ['spanish', 'english', 'germany'],
    image: 'https://picsum.photos/seed/2/800/1000',
    description: 'Residencia de lujo para mascotas con instalaciones climatizadas, cámaras 24/7 y personal veterinario permanente. Jardín amplio y actividades diarias.',
    location: { name: 'Teatinos, Málaga', lat: 36.7320, lng: -4.4753 },
    updatedAt: '2024-02-05'
  },
  {
    id: '3',
    name: 'Veterinaria El Palo',
    price: 35,
    age: 50,
    paymentMethods: ['cash', 'creditCard', 'bizum'],
    languages: ['spanish', 'english', 'catalan'],
    image: 'https://picsum.photos/seed/3/800/1000',
    description: 'Clínica veterinaria con servicio de urgencias 24h. Equipamiento de última generación y especialistas en cirugía y traumatología animal.',
    location: { name: 'El Palo, Málaga', lat: 36.7214, lng: -4.3601 },
    updatedAt: '2024-02-04'
  },
  {
    id: '4',
    name: 'Paseador Profesional Carlos',
    price: 15,
    age: 30,
    paymentMethods: ['cash', 'bizum'],
    languages: ['spanish', 'english', 'germany'],
    image: 'https://picsum.photos/seed/4/800/1000',
    description: 'Servicio personalizado de paseos para perros. Grupos reducidos, rutas adaptadas y fotos diarias de la actividad. Experiencia con todas las razas.',
    location: { name: 'Huelin, Málaga', lat: 36.7141, lng: -4.4428 },
    updatedAt: '2024-02-04'
  },
  {
    id: '5',
    name: 'Tienda Natural PetFood',
    price: 30,
    age: 40,
    paymentMethods: ['cash', 'creditCard'],
    languages: ['spanish', 'english', 'italian'],
    image: 'https://picsum.photos/seed/5/800/1000',
    description: 'Alimentación natural y orgánica para mascotas. Asesoramiento nutricional personalizado y dietas BARF. Productos frescos y locales.',
    location: { name: 'Carretera de Cádiz, Málaga', lat: 36.7062, lng: -4.4405 },
    updatedAt: '2024-02-04'
  },
  {
    id: '6',
    name: 'Adiestramiento Canino K9',
    price: 40,
    age: 60,
    paymentMethods: ['cash', 'creditCard', 'bizum'],
    languages: ['spanish', 'english', 'germany'],
    image: 'https://picsum.photos/seed/6/800/1000',
    description: 'Centro de adiestramiento especializado en modificación de conducta. Clases individuales y grupales. Preparación para competiciones deportivas caninas.',
    location: { name: 'Ciudad Jardín, Málaga', lat: 36.7368, lng: -4.4063 },
    updatedAt: '2024-02-04'
  },
  {
    id: '7',
    name: 'Spa & Grooming VIP Pets',
    price: 70,
    age: 18,
    paymentMethods: ['creditCard'],
    languages: ['spanish', 'english', 'italian'],
    image: 'https://picsum.photos/seed/7/800/1000',
    description: 'Centro de belleza y bienestar para mascotas. Tratamientos spa, aromaterapia y peluquería de lujo. Productos premium y atención personalizada.',
    location: { name: 'Puerto de la Torre, Málaga', lat: 36.7447, lng: -4.4605 },
    updatedAt: '2024-02-04'
  },
  {
    id: '8',
    name: 'Centro Veterinario Costa del Sol',
    price: 50,
    age: 21,
    paymentMethods: ['creditCard', 'bizum'],
    languages: ['spanish', 'english', 'germany', 'italian'],
    image: 'https://picsum.photos/seed/8/800/1000',
    description: 'Centro veterinario especializado en animales exóticos. Servicio de hospitalización, laboratorio propio y diagnóstico por imagen avanzado. Equipo internacional.',
    location: { name: 'Torremolinos, Málaga', lat: 36.6240, lng: -4.4994 },
    updatedAt: '2024-02-06'
  },
  {
    id: '9',
    name: 'Mascoting - Cuidado a Domicilio',
    price: 20,
    age: 18,
    paymentMethods: ['cash', 'bizum'],
    languages: ['spanish', 'catalan'],
    image: 'https://picsum.photos/seed/9/800/1000',
    description: 'Servicio de cuidadores profesionales a domicilio. Cuidamos de tu mascota en tu propia casa. Visitas diarias, administración de medicamentos y mucho mimo.',
    location: { name: 'Cerrado de Calderón, Málaga', lat: 36.7283, lng: -4.3921 },
    updatedAt: '2024-02-05'
  },
  {
    id: '10',
    name: 'Fisioterapia Animal FisioVet',
    price: 45,
    age: 21,
    paymentMethods: ['creditCard', 'bizum'],
    languages: ['spanish', 'english', 'germany'],
    image: 'https://picsum.photos/seed/10/800/1000',
    description: 'Centro de rehabilitación y fisioterapia animal. Tratamientos de hidroterapia, electroestimulación y terapia manual. Especialistas en recuperación postoperatoria.',
    location: { name: 'La Paz, Málaga', lat: 36.7266, lng: -4.4394 },
    updatedAt: '2024-02-06'
  }
]

const isOpen = ref(false)
const resViewMode = ref('list')
const sortOptions = [
  {value: 'newest', label: 'Newest', icon: 'i-heroicons-inbox-stack-20-solid'},
  {value: 'near', label: 'Nearest', icon: 'i-heroicons-map-pin-20-solid'},
  {value: 'price', label: 'Price', icon: 'i-heroicons-banknotes-20-solid'}
]

const sortOptionsSelected = ref('newest')
const { filters, filteredData } = useFilters(data)
// Provide filters to SearchFilters component
provide('filters', filters)
</script>

<template>
  <USlideover v-model='isOpen' :overlay='false'>
    <UCard class='flex flex-col flex-1' :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <UButton
          @click='isOpen = false'
          icon='i-heroicons-x-mark-20-solid'
          size='xl'
          color='primary'
          square
          variant='solid'
        />
      </template>

      <div>
        <SearchFilters />
      </div>
    </UCard>
  </USlideover>

  <div class='sm:flex'>
    <div class='left w-full sm:w-3/12 p-6' v-if='$device.isDesktop'>
      <h2 class='mb-4'>Filter</h2>
      <SearchFilters />
    </div>

    <div class='right w-full sm:w-9/12'>
      <div class="flex flex-col sm:flex-row gap-4 mb-2">
        <div class="flex gap-2">
          <UButton
            label='Filters'
            icon='i-heroicons-funnel-20-solid'
            @click='isOpen = true'
            v-if='$device.isMobile'
            size='xl'
            :trailing="false"
          />

          <UButton
            icon='i-heroicons-list-bullet-20-solid'
            size='xl'
            :color='resViewMode === "list" ? "primary" : "gray"'
            variant='solid'
            label='List'
            :trailing='false'
            @click='resViewMode = "list"'
          />

          <UButton
            icon='i-heroicons-map-20-solid'
            size='xl'
            :color='resViewMode === "map" ? "primary" : "gray"'
            variant='solid'
            label='Map'
            :trailing='false'
            @click='resViewMode = "map"'
          />
        </div>

        <URadioGroup
          v-model='sortOptionsSelected'
          :options='sortOptions'
          class='sort-options sm:ml-auto'
          v-if='resViewMode === "list"'
        >
          <template #label='{ option }'>
            <p class='italic'>
              <UIcon :name='option.icon' />
              {{ option.label }}
            </p>
          </template>
        </URadioGroup>
      </div>

      <ProductsGrid
        v-if='resViewMode === "list"'
        :profiles='filteredData'
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:p-4"
      />
      <ProductsMap v-if='resViewMode === "map"' :profiles='data' />
    </div>
  </div>
</template>

<style>
.sort-options > fieldset {
  @apply flex;
}

.sort-options > fieldset > * {
  @apply mr-3;
}

.sort-options > fieldset > *:last-child {
  @apply mr-0;
}

/* Estilos para las tarjetas del grid */
.products-grid > div {
  @apply w-full h-full transition-transform duration-200 hover:scale-[1.02];
}

.products-grid img {
  @apply w-full h-48 object-cover rounded-t-lg;
}

.products-grid .card-content {
  @apply p-4 bg-white rounded-b-lg;
}
</style>