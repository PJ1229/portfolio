# portfolio

Personal site: Express serves static pages from `public/`. The **film/projects portfolio** (`public/film/`) is the main surface at `/`; the **lab** site is still reachable at `/lab`, and the v1 site is archived at `/legacy/`. See [DEV_NOTES.md](DEV_NOTES.md) for layout, routes, and legacy vs lab paths.

## run locally

```bash
npm install
# create `.env` with EMAIL_USER, EMAIL_PASS (required by server.js); optional YOUTUBE_API_KEY for guitar playlist API
npm start
```

Default port is `5050` unless `PORT` is set.

## Athletics videos

`/athletics` is one page. Append one object to `ATHLETICS.videos` in `public/film/athletics-videos.js` and the hub adds a card. The card’s id is the slug, so the edit lives at `/athletics#<slug>`.

- `slug` — anchor id, lowercase letters, numbers, and hyphens
- `title`, `sport`, `year`
- `role` — PJ’s role on that video only. New Standard is `["Editor"]`, which the card shows as “Edit PJ Kim”
- `youtubeId` — 11-character id. The card shows a 16:9 still and loads a privacy-enhanced player on click
- `poster`, `posterAlt`
- `camera` — that video’s shooters, as an array of names
- `stills` — optional `{ src, alt, caption }` strip under the card. Captions open in the lightbox
- `page` — optional, default `false`. Leave it false so the edit stays on the hub. Set `page: true` only when that piece should also have a full film page, and add that page before the `/athletics/:slug` redirect in `server.js`

`/athletics/new-standard` redirects to `/athletics#new-standard`. Do not commit raw game footage or Athletics-internal files. The hub header role (`Videographer & Editor`) is PJ’s overall Athletics title and is separate from each video’s `role`.

## documentation (markdown in this repo)

| Doc | What it’s for |
| --- | --- |
| [DEV_NOTES.md](DEV_NOTES.md) | Repo layout, lab vs legacy, redirects |
| [STYLEGUIDE.md](STYLEGUIDE.md) | Voice, lab nav, blog/inspo conventions |
| [ARCHIVE.md](ARCHIVE.md) | Removed lab copy, restore snippets, legacy tree note |
| [IDEAS.md](IDEAS.md) | Backlog ideas not implemented yet |
| [FILM_SITE_PLAN.md](FILM_SITE_PLAN.md) | Plan for the film portfolio (built; now restructured to a Projects model) |
| [design-refs/film-site/INSPO.md](design-refs/film-site/INSPO.md) | Web-design references for the film portfolio |
| [README.md](README.md) | This file |
