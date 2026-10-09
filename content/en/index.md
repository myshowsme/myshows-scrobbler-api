---
seo:
  title: Scrobbling for players and media servers
  description: Scrobbling marks what users watch in real time. The request format
    is a superset of the Trakt and Simkl scrobble APIs, so a single payload goes to
    all three services unchanged.
---

::u-page-hero
---
orientation: horizontal
---
#title
Scrobble API

#description
Scrobbling marks what users watch in real time. The player tells MyShows when the user starts watching, where they are now, and when they finish. The user doesn't have to mark anything by hand.

#links
  :::u-button
  ---
  color: primary
  size: xl
  to: /en/start/quickstart
  trailing-icon: i-lucide-arrow-right
  ---
  Quickstart
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
  Reference client
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
Three endpoints for the whole viewing lifecycle

#description
The API is built for third-party developers: players, plugins, media servers, mobile clients.

#features
  :::u-page-feature
  ---
  icon: i-lucide-play
  to: /en/scrobbling/lifecycle
  ---
  #title
  `POST /start`

  #description
  The user starts watching, and MyShows opens a viewing session.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-pause
  to: /en/scrobbling/lifecycle
  ---
  #title
  `POST /pause`

  #description
  The position is updated every 10–30 seconds while playback is running.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-check
  to: /en/scrobbling/lifecycle
  ---
  #title
  `POST /stop`

  #description
  Progress has passed the threshold, and the view is marked in the user's profile.
  :::
::

::u-page-section
---
class: pt-0
---
#title
One payload for three services

#features
  :::u-page-feature
  ---
  icon: i-lucide-git-merge
  to: /en/rules/trakt-simkl
  ---
  #title
  Trakt and Simkl compatibility

  #description
  The format is a superset of their scrobble APIs. Both ignore unknown fields, so the same payload goes to all three services unchanged.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-fingerprint
  to: /en/scrobbling/ids
  ---
  #title
  19 identifier types

  #description
  IMDb, TMDB, TVDB, Kinopoisk, MAL, Shikimori, AniList and more. Send everything you know, and matching gets more reliable.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-tv
  to: /en/scrobbling/anime
  ---
  #title
  Anime and absolute numbering

  #description
  An absolute episode number without a season is a valid option. You don't need to convert it into a season and episode pair on your side.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-audio-lines
  to: /en/scrobbling/metadata
  ---
  #title
  Quality metadata

  #description
  Resolution, HDR, audio codec, channel layout, audio track language. The values match the Trakt reference.
  :::
::
