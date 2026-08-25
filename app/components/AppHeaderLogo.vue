<script setup lang="ts">
// Штатный AppHeaderLogo из Docus показывает заголовок только когда логотипа нет
// (там `v-else`). Нам нужны оба: вордмарк MyShows и подпись раздела рядом с ним.
// Переопределение компонента — документированный способ, см. docus.dev/concepts/customization.
const appConfig = useAppConfig()
const { hasLogo, headerLightUrl, headerDarkUrl, contextMenuItems } = useLogoAssets()
</script>

<template>
  <span class="flex items-center gap-2">
    <UContextMenu
      v-if="hasLogo"
      :items="contextMenuItems"
    >
      <UColorModeImage
        :light="headerLightUrl"
        :dark="headerDarkUrl"
        :alt="appConfig.header?.logo?.alt || appConfig.header?.title"
        :class="['h-6 w-auto shrink-0', appConfig.header?.logo?.class]"
      />
    </UContextMenu>

    <span
      v-if="appConfig.header?.title"
      class="text-muted"
      aria-hidden="true"
    >|</span>

    <span v-if="appConfig.header?.title">{{ appConfig.header.title }}</span>
  </span>
</template>
