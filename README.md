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
content/                    # весь текст документации
├── index.md                # лендинг (/)
├── 1.start/                # Начало: введение, быстрый старт, аутентификация
├── 2.scrobbling/           # Скробблинг: цикл, эндпоинты, запрос, ids, аниме, метаданные, ответ
└── 3.rules/                # Правила: ошибки, лимиты, совместимость с Trakt и Simkl
app/
├── app.config.ts           # заголовок, SEO, ссылки в TOC, цвета
└── app.css                 # тема: фирменный красный #c00, PT Sans + Geologica
.github/workflows/deploy.yml
```

Порядок страниц в навигации задаётся числовым префиксом файла, заголовок и иконка
раздела — в `.navigation.yml`. Префиксы и расширения в URL не попадают: файл
`content/2.scrobbling/4.ids.md` доступен по адресу `/scrobbling/ids`.

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
