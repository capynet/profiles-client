<script setup lang='ts'>
// Datos estáticos en lugar de Sanity
const data = [
  {
    id: '1',
    name: 'Lola - Peluquería Canina',
    image: 'https://picsum.photos/seed/1/800/1000',
    description: 'Peluquería canina profesional con más de 15 años de experiencia. Especialistas en razas pequeñas y medianas. Servicio de recogida a domicilio.',
    location: {
      name: 'Centro Histórico, Málaga',
      lat: 36.7213,
      lng: -4.4217
    },
    updatedAt: '2024-02-06'
  },
  {
    id: '2',
    name: 'Hotel Mascotas Happy Tails',
    image: 'https://picsum.photos/seed/2/800/1000',
    description: 'Residencia de lujo para mascotas con instalaciones climatizadas, cámaras 24/7 y personal veterinario permanente. Jardín amplio y actividades diarias.',
    location: {
      name: 'Teatinos, Málaga',
      lat: 36.7320,
      lng: -4.4753
    },
    updatedAt: '2024-02-05'
  },
  {
    id: '3',
    name: 'Veterinaria El Palo',
    image: 'https://picsum.photos/seed/3/800/1000',
    description: 'Clínica veterinaria con servicio de urgencias 24h. Equipamiento de última generación y especialistas en cirugía y traumatología animal.',
    location: {
      name: 'El Palo, Málaga',
      lat: 36.7214,
      lng: -4.3601
    },
    updatedAt: '2024-02-04'
  },
  {
    id: '4',
    name: 'Paseador Profesional Carlos',
    image: 'https://picsum.photos/seed/4/800/1000',
    description: 'Servicio personalizado de paseos para perros. Grupos reducidos, rutas adaptadas y fotos diarias de la actividad. Experiencia con todas las razas.',
    location: {
      name: 'Huelin, Málaga',
      lat: 36.7141,
      lng: -4.4428
    },
    updatedAt: '2024-02-04'
  },
  {
    id: '5',
    name: 'Tienda Natural PetFood',
    image: 'https://picsum.photos/seed/5/800/1000',
    description: 'Alimentación natural y orgánica para mascotas. Asesoramiento nutricional personalizado y dietas BARF. Productos frescos y locales.',
    location: {
      name: 'Carretera de Cádiz, Málaga',
      lat: 36.7062,
      lng: -4.4405
    },
    updatedAt: '2024-02-04'
  },
  {
    id: '6',
    name: 'Adiestramiento Canino K9',
    image: 'https://picsum.photos/seed/6/800/1000',
    description: 'Centro de adiestramiento especializado en modificación de conducta. Clases individuales y grupales. Preparación para competiciones deportivas caninas.',
    location: {
      name: 'Ciudad Jardín, Málaga',
      lat: 36.7368,
      lng: -4.4063
    },
    updatedAt: '2024-02-04'
  },
  {
    id: '7',
    name: 'Spa & Grooming VIP Pets',
    image: 'https://picsum.photos/seed/7/800/1000',
    description: 'Centro de belleza y bienestar para mascotas. Tratamientos spa, aromaterapia y peluquería de lujo. Productos premium y atención personalizada.',
    location: {
      name: 'Puerto de la Torre, Málaga',
      lat: 36.7447,
      lng: -4.4605
    },
    updatedAt: '2024-02-04'
  },
]

const isOpen = ref(false)
const resViewMode = ref('list')
const sortOptions = [
  {value: 'newest', label: 'Newest', icon: 'i-heroicons-inbox-arrow-down'},
  {value: 'near', label: 'Nearest', icon: 'i-heroicons-map-pin'},
  {value: 'price', label: 'Price', icon: 'i-heroicons-card'}
]

const sortOptionsSelected = ref('newest')
</script>

<template>
  <USlideover v-model='isOpen' :overlay='false'>
    <UCard class='flex flex-col flex-1' :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <UButton
          @click='isOpen = false'
          icon='i-heroicons-x-mark'
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
            icon='i-heroicons-funnel'
            @click='isOpen = true'
            v-if='$device.isMobile'
            size='xl'
            :trailing="false"
          />

          <UButton
            icon='i-heroicons-list-bullet'
            size='xl'
            :color='resViewMode === "list" ? "primary" : "gray"'
            variant='solid'
            label='List'
            :trailing='false'
            @click='resViewMode = "list"'
          />

          <UButton
            icon='i-heroicons-map'
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
        :profiles='data'
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