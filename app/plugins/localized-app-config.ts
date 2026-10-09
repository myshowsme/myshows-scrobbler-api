// app.config один на все языки, а Docus читает из него описание сайта и ссылки под
// оглавлением напрямую. Подставляем вариант текущего языка из `localized`.
// На сервере app.config копируется на каждый запрос, так что правка не протекает
// между запросами с разными языками.
export default defineNuxtPlugin({
  name: 'localized-app-config',
  dependsOn: ['i18n:plugin'],
  setup(nuxtApp) {
    const appConfig = useAppConfig()
    const { defaultLocale } = useRuntimeConfig().public.i18n

    watch(nuxtApp.$i18n.locale, (code) => {
      const strings = appConfig.localized[code as keyof typeof appConfig.localized]
        ?? appConfig.localized[defaultLocale as keyof typeof appConfig.localized]

      appConfig.seo = { ...appConfig.seo, ...strings.seo }
      appConfig.toc = { ...appConfig.toc, bottom: strings.tocBottom }
    }, { immediate: true })
  },
})
