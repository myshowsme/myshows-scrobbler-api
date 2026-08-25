// GitHub Pages раздаёт сайт из подпапки, поэтому базовый путь приходит из окружения.
// Локально переменная не задана и сайт живёт в корне.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  extends: ['docus'],

  site: {
    name: 'MyShows Scrobble API',
  },

  app: {
    baseURL,
    head: {
      // Docus прописывает `/favicon.ico` без учёта baseURL, поэтому свою иконку
      // добавляем сами — с базовым путём, иначе на Pages будет 404.
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` },
      ],
    },
  },

  // Логотип Docus рендерит через NuxtImg, а IPX при непустом baseURL подставляет его
  // дважды и ссылается на несгенерированный файл. Оптимизировать тут нечего — на сайте
  // из картинок только SVG-логотип, — поэтому отдаём исходные пути как есть.
  image: {
    provider: 'none',
  },

  // Автогенерация OG-картинок несовместима с раздачей из подпапки: nuxt-og-image
  // сам подставляет baseURL в путь, а потом site.url (в котором подпапка уже есть)
  // добавляется сверху — получается /myshows-scrobbler-api/myshows-scrobbler-api/_og/…
  // Держать в разметке ссылку на 404 хуже, чем обойтись без превью-картинок.
  // Если сайт переедет на свой домен в корень — можно включить обратно.
  ogImage: {
    enabled: false,
  },

  compatibilityDate: '2026-08-25',
})
