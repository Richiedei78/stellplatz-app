<script setup lang="ts">
// Schlichtes Layout für spätere Login-/Registrierungsseiten
const appConfig = useAppConfig()
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center bg-muted px-4 py-10">
    <div class="mb-6 flex items-center gap-2 text-xl font-semibold text-highlighted">
      <UIcon
        name="i-lucide-caravan"
        class="size-8 text-primary"
      />
      {{ appConfig.appName }}
    </div>
    <div class="w-full max-w-md">
      <slot />
    </div>
  </div>
</template>
