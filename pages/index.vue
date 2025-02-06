<script setup lang='ts'>
// Datos estáticos en lugar de Sanity
const data = [
  {
    id: '1',
    name: 'Sudo',
    image: 'https://picsum.photos/400/300',
    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    location: 'Madrid',
    updatedAt: '2024-02-06'
  },
  {
    id: '2',
    name: 'El groso',
    image: 'https://picsum.photos/400/301',
    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    location: 'Barcelona',
    updatedAt: '2024-02-05'
  },
  {
    id: '3',
    name: 'Kira',
    image: 'https://picsum.photos/400/302',
    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    location: 'Valencia',
    updatedAt: '2024-02-04'
  },
  {
    id: '4',
    name: 'Kira',
    image: 'https://picsum.photos/400/302',
    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    location: 'Valencia',
    updatedAt: '2024-02-04'
  },
  {
    id: '5',
    name: 'Kira',
    image: 'https://picsum.photos/400/302',
    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    location: 'Valencia',
    updatedAt: '2024-02-04'
  },
  {
    id: '6',
    name: 'Kira',
    image: 'https://picsum.photos/400/302',
    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    location: 'Valencia',
    updatedAt: '2024-02-04'
  },
  {
    id: '7',
    name: 'Kira',
    image: 'https://picsum.photos/400/302',
    description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    location: 'Valencia',
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
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
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