# MyShows Scrobble API — документация

Документация Scrobble API MyShows, собранная на [Docus](https://docus.dev) и
опубликованная на GitHub Pages: **https://myshowsme.github.io/myshows-scrobbler-api/**

Референс-клиент этого API — [myshowsme/myshows-scrobbler](https://github.com/myshowsme/myshows-scrobbler).

## Локальная разработка

```bash
pnpm install
pnpm dev         # http://localhost:3000
```

Сборка статики и предпросмотр:

```bash
pnpm generate
pnpx serve .output/public
```

## Структура

```
content/                    # весь текст документации, по папке на язык
├── ru/                     # русская версия (основная), адреса /ru/…
│   ├── index.md            # лендинг (/ru)
│   ├── 1.start/            # Начало: введение, быстрый старт, аутентификация
│   ├── 2.scrobbling/       # Скробблинг: цикл, эндпоинты, запрос, ids, аниме, метаданные, ответ
│   └── 3.rules/            # Правила: ошибки, лимиты, совместимость с Trakt и Simkl
└── en/                     # английская версия, адреса /en/…, структура как в ru/
app/
├── app.config.ts           # заголовок, ссылки в TOC и описание сайта на каждом языке, цвета
├── app.css                 # тема: фирменный красный #c00
└── plugins/
    └── localized-app-config.ts  # подставляет тексты из app.config под текущий язык
public/index.html           # редирект с корня на /ru или /en
.github/workflows/deploy.yml
```

Порядок страниц в навигации задаётся числовым префиксом файла, заголовок и иконка
раздела — в `.navigation.yml`. Префиксы и расширения в URL не попадают: файл
`content/ru/2.scrobbling/4.ids.md` доступен по адресу `/ru/scrobbling/ids`.

## Языки

Языки подключены через `@nuxtjs/i18n` (он приходит вместе с Docus), список — в
`i18n.locales` в `nuxt.config.ts`. Docus всегда ставит префикс языка, включая
основной, поэтому:

- папки в `content/ru/` и `content/en/` должны совпадать — по ним строятся пары
  страниц для переключателя языка и `hreflang`;
- во внутренних ссылках в markdown язык пишется явно: `/ru/scrobbling/ids`,
  `/en/scrobbling/ids`. Без префикса ссылка в HTML всё равно сработает, но в сырых
  `.md` и `llms-full.txt` поведёт на несуществующую страницу;
- корень `/` не пререндерится, вместо него `public/index.html` выбирает язык
  по cookie и настройкам браузера;
- старые адреса без префикса (`/start/quickstart` и т. п.) перечислены в
  `legacyPaths` в `nuxt.config.ts` и редиректят на русскую версию. Новые страницы
  туда добавлять не нужно.

## Деплой

Пуш в `main` запускает [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
`pnpm generate` собирает статику в `.output/public`, дальше её публикует
`actions/deploy-pages`.

Базовый путь `/myshows-scrobbler-api/` не зашит в конфиг — он приходит из
`NUXT_APP_BASE_URL`, который workflow берёт у `actions/configure-pages`. Поэтому
локально сайт открывается в корне, а на Pages — в подпапке, без правок кода.

## Обновление зависимостей

- **Docus держим на 5.13.x.** В 5.14.0 появился `nuxt-agent-discovery`, который
  падает на сборке, если у `site.url` есть путь, — а на Pages он есть
  (`/myshows-scrobbler-api`). Обходы через `agentDiscovery.siteUrl` ломают canonical
  и ссылки в `llms.txt`. Обновляться, когда модуль научится работать с подпапкой
  или сайт переедет в корень своего домена.
- **`mdast-util-to-markdown` закреплён на 2.1.2** через `overrides` в
  `pnpm-workspace.yaml` — с 2.1.3 вместе с remark-mdc генерация `/llms-full.txt`
  уходит в бесконечную рекурсию. Там же ссылки на issues, после закрытия которых
  override можно убрать.
- **Версия pnpm записана в `pnpm-lock.yaml`** (так делает pnpm 12). После смены
  `packageManager` в `package.json` нужно прогнать `pnpm install` и закоммитить
  lockfile, иначе `--frozen-lockfile` в CI упадёт.
