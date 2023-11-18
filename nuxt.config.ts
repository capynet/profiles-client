// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    modules: [
        '@nuxtjs/sanity',
        '@nuxt/ui',
        '@nuxtjs/device',
        '@nuxtjs/color-mode',
        '@nuxtjs/i18n',
        '@nuxtjs/supabase',
        '@vueuse/nuxt',
        '@nuxt/image',
    ],
    runtimeConfig: {
        public: {
            siteUrl: process.env.SITE_URL
        }
    },
    sanity: {
        projectId: 'f68tamz8',
        dataset: "production"
    },
    i18n: {
        vueI18n: './i18n.config.ts'
    },
    devServer: {
        https: {
            key: 'localhost-key.pem',
            cert: 'localhost.pem'
        }
    },
    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            exclude: [
                '/',
                '/profile/*'
            ],
        }
    },
    tailwindcss: {
        viewer: false
    }
})
