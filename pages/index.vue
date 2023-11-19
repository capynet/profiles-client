<script setup lang='js'>
const query = `*[_type == 'pet']`
const sanity = useSanity()
const {data} = await useAsyncData('profiles', () => sanity.fetch(query))
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

      <div class="mb-10">
        <SearchFilters/>
      </div>

      <UButton
        @click='isOpen = false'
        label='Ver los 32 resultados'
        size='xl'
        block
      />
    </UCard>
  </USlideover>


  <div class='left w-full sm:w-3/12 p-6' v-if='$device.isDesktop'>
    <h2 class='mb-4'>Filter</h2>
    <SearchFilters/>
  </div>


  <div class="heading flex justify-between items-center mb-4">
    <UButton
      label='Filters'
      @click='isOpen = true'
      v-if='$device.isMobile'
      size='xl'
      class=""
    />

    <div class="view-modes">
      <UButton
        class='mr-2'
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

  </div>


<div class="flex">
  <URadioGroup
    v-model='sortOptionsSelected'
    :options='sortOptions'
    class='sort-options mb-4 ml-auto border py-2 px-4 rounded-sm'
    v-if='resViewMode === "list"'
  >
    <template #label='{ option }'>
      <p class='italic flex items-center'>
        <UIcon :name='option.icon'/>
        {{ option.label }}
      </p>
    </template>
  </URadioGroup>
</div>

  <ProductsGrid v-if='resViewMode === "list"' :profiles='data'/>
  <ProductsMap v-if='resViewMode === "map"' :profiles='data'/>
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
</style>