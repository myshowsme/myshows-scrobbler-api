<script setup lang="ts">
// Штатный LanguageSelect из Docus обозначает язык эмодзи-флагом страны, и настройки,
// чтобы это отключить, нет. Здесь на кнопке код языка, в списке — названия языков
// с отметкой текущего; переключение такое же, как в оригинале.
// Переопределение компонента — документированный способ, см. docus.dev/concepts/customization.
const { locale, locales, switchLocalePath } = useDocusI18n()

const current = computed(() => locales.find(item => item.code === locale.value))
</script>

<template>
  <UPopover :content="{ align: 'end' }">
    <UButton
      color="neutral"
      variant="ghost"
      class="size-8 justify-center text-xs font-semibold uppercase"
      :aria-label="current?.name"
    >
      {{ locale }}
    </UButton>

    <template #content>
      <ul class="flex flex-col">
        <li
          v-for="localeItem in locales"
          :key="localeItem.code"
        >
          <NuxtLink
            class="flex justify-between items-center py-1.5 px-2 gap-3 hover:bg-muted"
            :to="switchLocalePath(localeItem.code) as string"
            :aria-label="localeItem.name"
            :aria-current="localeItem.code === locale ? 'true' : undefined"
          >
            <span class="text-sm">
              {{ localeItem.name }}
            </span>
            <UIcon
              v-if="localeItem.code === locale"
              name="i-lucide-check"
              class="size-4 text-primary"
            />
          </NuxtLink>
        </li>
      </ul>
    </template>
  </UPopover>
</template>
