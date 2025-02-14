<script setup lang='ts'>
import { useFilters } from '~/composables/useFilters'
import type Profile from "~/Models/Profile";
import ProfilesGrid from "~/components/lists/ProfilesGrid.vue";
import ProfilesMap from "~/components/lists/ProfilesMap.vue";

const { data } = await useFetch<Profile[]>('/api/profiles')

const isOpen = ref(false)
const resViewMode = ref('list')
const sortOptions = [
  {value: 'newest', label: 'Newest', icon: 'i-heroicons-inbox-stack-20-solid'},
  {value: 'near', label: 'Nearest', icon: 'i-heroicons-map-pin-20-solid'},
  {value: 'price', label: 'Price', icon: 'i-heroicons-banknotes-20-solid'}
]

const sortOptionsSelected = ref('newest')
const { filters, filteredData, sortBy } = useFilters(data)
// Provide filters to SearchFilters component
provide('filters', filters)

sortBy.value = sortOptionsSelected.value

watch(sortOptionsSelected, (newVal) => {
  sortBy.value = newVal
})
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

      <ProfilesGrid
        v-if='resViewMode === "list"'
        :profiles='filteredData'
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:p-4 lg:px-0"
      />

      <ProfilesMap v-if='resViewMode === "map"' :profiles='filteredData' />

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

html {
  overflow-y: scroll;
  scrollbar-gutter: stable;
}

</style>