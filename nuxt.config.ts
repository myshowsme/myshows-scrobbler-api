// GitHub Pages раздаёт сайт из подпапки, поэтому базовый путь приходит из окружения.
// Локально переменная не задана и сайт живёт в корне.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

// Адреса страниц до появления английской версии — без префикса языка. На них уже
// могут вести ссылки, поэтому по каждому кладём HTML-редирект на русскую страницу.
// Список закрыт: новые страницы сразу живут под /ru/ и /en/.
const legacyPaths = [
  '/start/introduction',
  '/start/quickstart',
  '/start/authentication',
  '/scrobbling/lifecycle',
  '/scrobbling/endpoints',
  '/scrobbling/request',
  '/scrobbling/ids',
  '/scrobbling/anime',
  '/scrobbling/metadata',
  '/scrobbling/response',
  '/rules/errors',
  '/rules/limits',
  '/rules/trakt-simkl',
]

export default defineNuxtConfig({
  extends: ['docus'],

  modules: ['@nuxtjs/i18n'],

  // Docus принудительно ставит стратегию `prefix`: у каждого языка, включая основной,
  // свой префикс (/ru/…, /en/…). Корень при этом @nuxtjs/i18n не пререндерит —
  // редирект с него на нужный язык делает статический public/index.html.
  // Контент лежит в content/<code>/, структура папок в языках должна совпадать.
  i18n: {
    // Тот же адрес, что у site.url. Без него nuxt-site-config при сборке сыплет ошибками
    // о несовпадении хостов — на разметку это не влияет, но засоряет лог CI.
    baseUrl: process.env.NUXT_SITE_URL,
    defaultLocale: 'ru',
    locales: [
      { code: 'ru', name: 'Русский' },
      { code: 'en', name: 'English' },
    ],
  },

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

  // Поисковики читают robots.txt только из корня домена (myshowsme.github.io/robots.txt),
  // а файл в подпапке игнорируют — поэтому @nuxtjs/robots при непустом baseURL
  // отказывается его генерировать и пишет ошибку в лог сборки. Отключаем только файл:
  // мета-тег robots на страницах модуль ставит по-прежнему.
  robots: {
    robotsTxt: false,
  },

  // Nitro не добавляет baseURL к адресу редиректа, поэтому он прописан вручную.
  routeRules: Object.fromEntries(
    legacyPaths.map(path => [path, { redirect: `${baseURL}ru${path}` }]),
  ),

  nitro: {
    prerender: {
      routes: [
        ...legacyPaths,
        // На markdown-версии лендингов ссылается только llms.txt, а его краулер не
        // обходит — без явного указания эти файлы не генерируются.
        '/raw/ru.md',
        '/raw/en.md',
      ],
    },
  },

  compatibilityDate: '2026-08-25',
})
