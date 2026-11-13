<script setup lang="ts">
const appConfig = useAppConfig()
const i18nHead = useLocaleHead()

useHead({
  titleTemplate: title => (title ? `${title} · ${appConfig.appName}` : appConfig.appName),
  htmlAttrs: {
    lang: () => i18nHead.value.htmlAttrs.lang,
    dir: () => i18nHead.value.htmlAttrs.dir,
  },
  link: () => [...(i18nHead.value.link ?? [])],
  meta: () => [...(i18nHead.value.meta ?? [])],
})
</script>

<template>
  <UApp>
    <NuxtPwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
