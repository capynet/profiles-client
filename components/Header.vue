<script setup lang='ts'>
const {locale} = useI18n()

const languagesMap = {
  es: "Español",
  en: "Inglés",
}

const languageOptions = [[{
  label: 'Español',
  icon: 'i-heroicons-pencil-square-20-solid',
  click: () => {
    console.log(locale.value);
    locale.value = 'es'
    console.log(locale.value);
  }
}, {
  label: 'Inglés',
  icon: 'i-heroicons-document-duplicate-20-solid',
  click: () => {
    locale.value = 'en'
  }
}]]

</script>

<template>
  <header class="sm:mb-16">
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

        <NuxtLink to='/' class="flex items-center">
          <img src="/img/logo.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Profiles</span>
        </NuxtLink>
        <div class="flex items-center lg:order-2">
          <ColorModePicker/>

          <UDropdown
            :items="languageOptions"
            mode="hover">
            <UButton :label="languagesMap[locale]" trailing-icon="i-heroicons-globe-alt"/>
          </UDropdown>

        </div>

      </div>
    </nav>
  </header>
</template>

