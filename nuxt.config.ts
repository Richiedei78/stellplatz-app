// https://nuxt.com/docs/api/configuration/nuxt-config
import appConfig from './app/app.config'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n', '@vite-pwa/nuxt', '@nuxt/test-utils/module'],

  devtools: { enabled: true },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#15803d' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-11-01',

  typescript: {
    strict: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    // Öffentliche Adresse der App (für SEO-Links). Lokal: localhost.
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
      { code: 'nl', language: 'nl-NL', name: 'Nederlands', file: 'nl.json' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'da', language: 'da-DK', name: 'Dansk', file: 'da.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      // Produktname kommt aus app/app.config.ts
      name: appConfig.appName,
      short_name: appConfig.appName,
      description: 'Stellplatz & Camping Verwaltung',
      lang: 'de',
      theme_color: '#15803d',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      navigateFallback: null,
      globPatterns: ['**/*.{js,css,png,svg,ico}'],
    },
    devOptions: {
      enabled: false,
    },
  },
})
