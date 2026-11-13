<script setup lang="ts">
const appConfig = useAppConfig()
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { items } = useNavigation()

const menuOpen = ref(false)

const mobileItems = computed(() => items.filter(i => i.mobilePrimary))

function isActive(path: string): boolean {
  const target = localePath(path)
  if (path === '/') return route.path === target
  return route.path === target || route.path.startsWith(`${target}/`)
}

// Ist eine Seite aktiv, die nur im "Mehr"-Menü steht?
const moreActive = computed(() =>
  items.some(i => !i.mobilePrimary && isActive(i.path)),
)
</script>

<template>
  <div class="min-h-dvh bg-default">
    <!-- Seitenleiste (nur Desktop/Tablet quer) -->
    <aside
      class="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-default bg-elevated/40 lg:flex"
    >
      <NuxtLink
        :to="localePath('/')"
        class="flex h-16 items-center gap-2 border-b border-default px-5 text-lg font-semibold text-highlighted"
      >
        <UIcon
          name="i-lucide-caravan"
          class="size-7 text-primary"
        />
        {{ appConfig.appName }}
      </NuxtLink>
      <nav
        class="flex-1 overflow-y-auto p-3"
        :aria-label="t('nav.main')"
      >
        <NavLinks />
      </nav>
    </aside>

    <div class="lg:pl-64">
      <!-- Kopfzeile -->
      <header
        class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-default bg-default/90 px-4 backdrop-blur sm:px-6"
      >
        <NuxtLink
          :to="localePath('/')"
          class="flex items-center gap-2 text-lg font-semibold text-highlighted lg:hidden"
        >
          <UIcon
            name="i-lucide-caravan"
            class="size-7 text-primary"
          />
          <span class="hidden sm:inline">{{ appConfig.appName }}</span>
        </NuxtLink>

        <div class="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <UColorModeButton
            size="lg"
            :aria-label="t('header.colorMode')"
          />
          <!-- Platzhalter für das spätere Benutzermenü -->
          <UButton
            icon="i-lucide-circle-user-round"
            color="neutral"
            variant="ghost"
            size="lg"
            :aria-label="t('header.userMenu')"
            disabled
          />
        </div>
      </header>

      <!-- Inhalt; unten Platz für die Handy-Leiste lassen -->
      <main class="px-4 py-6 pb-28 sm:px-6 lg:pb-8">
        <slot />
      </main>
    </div>

    <!-- Untere Navigationsleiste (nur Handy/Tablet hochkant) -->
    <nav
      class="fixed inset-x-0 bottom-0 z-30 border-t border-default bg-default pb-[env(safe-area-inset-bottom)] lg:hidden"
      :aria-label="t('nav.main')"
    >
      <ul class="grid grid-cols-5">
        <li
          v-for="item in mobileItems"
          :key="item.path"
        >
          <NuxtLink
            :to="localePath(item.path)"
            class="flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-xs font-medium"
            :class="isActive(item.path) ? 'text-primary' : 'text-muted'"
          >
            <UIcon
              :name="item.icon"
              class="size-6"
            />
            <span class="w-full truncate text-center">{{ t(item.labelKey) }}</span>
          </NuxtLink>
        </li>
        <li>
          <button
            type="button"
            class="flex min-h-16 w-full flex-col items-center justify-center gap-1 px-1 text-xs font-medium"
            :class="moreActive ? 'text-primary' : 'text-muted'"
            @click="menuOpen = true"
          >
            <UIcon
              name="i-lucide-menu"
              class="size-6"
            />
            <span class="w-full truncate text-center">{{ t('nav.more') }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Menü-Drawer für das Handy (öffnet von unten, gut mit dem Daumen erreichbar) -->
    <UDrawer
      v-model:open="menuOpen"
      :title="t('nav.menu')"
      class="lg:hidden"
    >
      <template #body>
        <NavLinks @navigate="menuOpen = false" />
      </template>
    </UDrawer>
  </div>
</template>
