// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  modules: [
    '@nuxtjs/sanity',
    '@nuxt/ui',
    '@nuxtjs/device',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],
  sanity: {
    projectId: 'f68tamz8',
    dataset: "production"
  },
  i18n: {
    vueI18n: './i18n.config.ts'
  }
})
