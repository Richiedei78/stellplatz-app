<script setup lang="ts">
const { locale, locales, setLocale, t } = useI18n()

type LocaleCode = typeof locale.value

const options = computed(() =>
  locales.value.map(l => ({ label: l.name ?? l.code, value: l.code })),
)

const selected = computed({
  get: () => locale.value,
  set: (code: LocaleCode) => {
    void setLocale(code)
  },
})
</script>

<template>
  <USelect
    v-model="selected"
    :items="options"
    icon="i-lucide-languages"
    size="lg"
    class="w-40"
    :aria-label="t('header.language')"
  />
</template>
