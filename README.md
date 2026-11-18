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

`/athletics` is a hub. Each video has a page at `/athletics/<slug>`. Both read `public/film/athletics-videos.js`.

To add a video, append one object to `ATHLETICS.videos`:

- `slug` — URL segment, lowercase letters, numbers, and hyphens
- `title`, `sport`, `year`, `logline`, `overview`
- `role` — PJ’s role on that video only (New Standard is `Editor`)
- `format`, `status`, `toolkit`
- `youtubeId` — 11-character id. The page shows a still first and loads a privacy-enhanced player on click
- `runtime`, `poster`, `posterAlt`
- `camera` — the shooters for that video, as an array of names
- `stills` — `{ src, alt, caption }`, WebP frames from a public edit

Do not commit raw game footage or Athletics-internal files. The hub header role (`Videographer & Editor`) is PJ’s overall Athletics title and is separate from each video’s `role`.

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
