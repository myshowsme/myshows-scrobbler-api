---
seo:
  title: Скробблинг для плееров и медиасерверов
  description: Скробблинг — отметка просмотра в реальном времени. Формат запроса
    надмножество scrobble-API Trakt и Simkl, поэтому один payload уходит во все
    три сервиса без изменений.
---

::u-page-hero
---
orientation: horizontal
---
#title
Scrobble API

#description
Скробблинг — это отметка просмотра в реальном времени. Плеер сообщает MyShows, что пользователь начал смотреть, где он сейчас и когда досмотрел. Пользователю не нужно отмечать ничего руками.

#links
  :::u-button
  ---
  color: primary
  size: xl
  to: /start/quickstart
  trailing-icon: i-lucide-arrow-right
  ---
  Быстрый старт
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-github
  size: xl
  to: https://github.com/myshowsme/myshows-scrobbler
  target: _blank
  variant: outline
  ---
  Референс-клиент
  :::

#default
  :::div{class="w-full"}
  ```bash
  curl https://myshows.me/scrobble/stop \
    -H "Authorization: Bearer $MYSHOWS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "progress": 92.0,
      "source_app": "my-player",
      "show":    { "ids": { "imdb": "tt11280740" } },
      "episode": { "season": 2, "number": 1 }
    }'
  ```
  :::
::

::u-page-section
---
class: pt-0
---
#title
Три эндпоинта на весь жизненный цикл просмотра

#description
API рассчитан на сторонних разработчиков: плееры, плагины, медиасерверы, мобильные клиенты.

#features
  :::u-page-feature
  ---
  icon: i-lucide-play
  to: /scrobbling/lifecycle
  ---
  #title
  `POST /start`

  #description
  Пользователь начал смотреть — MyShows открывает сессию просмотра.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-pause
  to: /scrobbling/lifecycle
  ---
  #title
  `POST /pause`

  #description
  Позиция обновляется раз в 10–30 секунд, пока идёт воспроизведение.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-check
  to: /scrobbling/lifecycle
  ---
  #title
  `POST /stop`

  #description
  Прогресс перешёл порог — просмотр отмечается в профиле пользователя.
  :::
::

::u-page-section
---
class: pt-0
---
#title
Один payload на три сервиса

#features
  :::u-page-feature
  ---
  icon: i-lucide-git-merge
  to: /rules/trakt-simkl
  ---
  #title
  Совместимость с Trakt и Simkl

  #description
  Формат — надмножество их scrobble-API. Оба игнорируют неизвестные поля, поэтому тот же payload уходит во все три сервиса без изменений.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-fingerprint
  to: /scrobbling/ids
  ---
  #title
  19 видов идентификаторов

  #description
  IMDb, TMDB, TVDB, Кинопоиск, MAL, Shikimori, AniList и другие. Передавайте всё, что знаете — сопоставление будет надёжнее.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-tv
  to: /scrobbling/anime
  ---
  #title
  Аниме и абсолютная нумерация

  #description
  Сквозной номер эпизода без сезона — допустимый вариант. Пересчитывать его в пару «сезон + эпизод» на своей стороне не нужно.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-audio-lines
  to: /scrobbling/metadata
  ---
  #title
  Метаданные качества

  #description
  Разрешение, HDR, аудиокодек, число каналов, язык дорожки. Значения совпадают со справочником Trakt.
  :::
::
