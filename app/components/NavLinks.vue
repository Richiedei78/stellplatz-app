<script setup lang="ts">
const emit = defineEmits<{ navigate: [] }>()

const { t } = useI18n()
const localePath = useLocalePath()
const { items } = useNavigation()

const links = computed(() =>
  items.map(item => ({
    label: t(item.labelKey),
    icon: item.icon,
    to: localePath(item.path),
    onSelect: () => emit('navigate'),
  })),
)
</script>

<template>
  <UNavigationMenu
    :items="links"
    orientation="vertical"
    :ui="{ link: 'text-base py-3 px-3', linkLeadingIcon: 'size-6' }"
  />
</template>
