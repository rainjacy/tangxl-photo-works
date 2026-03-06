// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/i18n'
  ],

  app: {
    head: {
      title: '回影无声 - 唐西林摄影作品集',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '唐西林摄影作品集，记录松江从农业文明向工业文明转型的历史进程' },
        { name: 'keywords', content: '摄影,唐西林,松江,作品集' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  i18n: {
    locales: [
      { code: 'zh', name: '中文' },
      { code: 'en', name: 'English' }
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  image: {
    quality: 80,
    format: ['webp', 'jpeg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  }
})
