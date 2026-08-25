export default defineAppConfig({
  docus: {
    locale: 'ru',
  },

  seo: {
    title: 'MyShows Scrobble API',
    description: 'Скробблинг MyShows: отметка просмотра в реальном времени для плееров, '
      + 'плагинов, медиасерверов и мобильных клиентов.',
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

  toc: {
    bottom: {
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

  ui: {
    colors: {
      primary: 'myshows',
      neutral: 'neutral',
    },
  },
})
