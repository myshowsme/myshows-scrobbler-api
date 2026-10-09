export default defineAppConfig({
  seo: {
    title: 'MyShows Scrobble API',
  },

  header: {
    // Вордмарк уже говорит «MyShows» — рядом только название раздела.
    // Разделитель рисует app/components/AppHeaderLogo.vue.
    title: 'api',
    // Пути без baseURL: Docus прогоняет логотип через NuxtImg, тот подставляет
    // базовый путь сам. Ручной префикс здесь задвоился бы.
    // По конвенции Docus `light` — вариант ДЛЯ светлой темы, то есть тёмные буквы.
    logo: {
      light: '/logo/myshows-dark.svg',
      dark: '/logo/myshows-light.svg',
      alt: 'MyShows',
    },
  },

  github: {
    url: 'https://github.com/myshowsme/myshows-scrobbler-api',
    branch: 'main',
  },

  search: {
    fts: true,
  },

  // Тексты, которые зависят от языка. Docus берёт seo и toc.bottom из app.config
  // как есть, без перевода, поэтому нужный вариант подставляет
  // app/plugins/localized-app-config.ts — при загрузке и при смене языка.
  localized: {
    ru: {
      seo: {
        description: 'Скробблинг MyShows: отметка просмотра в реальном времени для плееров, '
          + 'плагинов, медиасерверов и мобильных клиентов.',
      },
      tocBottom: {
        title: 'Полезное',
        links: [
          {
            icon: 'i-lucide-key-round',
            label: 'Получить токен',
            to: 'https://myshows.me/profile/watch-history/',
            target: '_blank',
          },
          {
            icon: 'i-simple-icons-github',
            label: 'Референс-клиент',
            to: 'https://github.com/myshowsme/myshows-scrobbler',
            target: '_blank',
          },
          {
            icon: 'i-lucide-bug',
            label: 'Сообщить о баге',
            to: 'https://github.com/myshowsme/myshows-scrobbler-api/issues',
            target: '_blank',
          },
        ],
      },
    },
    en: {
      seo: {
        description: 'MyShows scrobbling: real-time watch tracking for players, '
          + 'plugins, media servers and mobile clients.',
      },
      tocBottom: {
        title: 'Resources',
        links: [
          {
            icon: 'i-lucide-key-round',
            label: 'Get a token',
            to: 'https://en.myshows.me/profile/watch-history/',
            target: '_blank',
          },
          {
            icon: 'i-simple-icons-github',
            label: 'Reference client',
            to: 'https://github.com/myshowsme/myshows-scrobbler',
            target: '_blank',
          },
          {
            icon: 'i-lucide-bug',
            label: 'Report a bug',
            to: 'https://github.com/myshowsme/myshows-scrobbler-api/issues',
            target: '_blank',
          },
        ],
      },
    },
  },

  ui: {
    colors: {
      primary: 'myshows',
      neutral: 'neutral',
    },
  },
})
