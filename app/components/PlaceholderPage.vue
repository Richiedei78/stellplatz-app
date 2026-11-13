<script setup lang="ts">
const props = defineProps<{
  /** i18n-Key des Seitentitels */
  titleKey: string
  icon: string
}>()

const { t } = useI18n()

useHead({ title: () => t(props.titleKey) })
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <h1 class="mb-6 text-2xl font-semibold text-highlighted sm:text-3xl">
      {{ t(titleKey) }}
    </h1>
    <UCard>
      <div class="flex items-start gap-4">
        <UIcon
          :name="icon"
          class="size-10 shrink-0 text-primary"
        />
        <div>
          <p class="text-lg font-medium text-highlighted">
            {{ t('common.comingSoon') }}
          </p>
          <p class="mt-1 text-muted">
            {{ t('common.comingSoonHint') }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
