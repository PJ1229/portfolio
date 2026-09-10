## Film portfolio (new root)

- Lives under `public/film/`: `index.html` (work/projects index),
  `unsanctioned.html`, `about.html`, `projects.js` (project content-model
  renderer), and `film.css` (its own stylesheet, separate from
  `public/index.css`).
- Served at `/`, `/unsanctioned`, and `/about`. `/writing` 302s to the
  Substack publication (`https://substack.com/@pjk1m`).
- **Love from Toronto is unpublished.** `public/film/love-from-toronto.html`
  and its assets stay in the repo for a future re-publish, but `/love-from-toronto`
  and `/film/love-from-toronto.html` return 404 (guard in `server.js`).
- Assets under `public/images/unsanctioned/` and `public/images/love-from-toronto/`
  (compressed WebP, no large files committed).
- `inspo` now lives on the film register at `public/film/inspo.html`, served
  at `/inspo` (and `/inspo.html`); the old `/lab/inspo.html` path 301s to it.
- `/summer-26` is a clean alias for the lab `summer-series.html`.
- The lab site is still reachable at `/lab` (and `/lab/`); no lab content was
  removed. Legacy stays at `/legacy/`.

## Codebase layout

- **New “lab” site (primary):**
  - Lives under `public/lab/` (e.g. `public/lab/index.html`, `public/lab/dsa.html`, `public/lab/guitar.html`, `public/lab/blog.html`, plus blog post files under `public/lab/blog/`). `inspo` moved out to `public/film/inspo.html`.
  - Shared styles live in `public/index.css`.
  - Server routes `/`, `/lab`, and `/lab/` all serve `public/lab/index.html` (no redirects).

- **Legacy v1 site:**
  - Lives under `public/legacy/` (mirrors the old structure: `index.html`, `film.html`, `experience.html`, `projects.html`, `blog.html`, `dsa.html`, `guitar.html`, plus `film-projects/`, `experience/`, `blog-posts/`, `js/`).
  - Served at `/legacy/` (with `/legacy` → `/legacy/` redirect).

- **Shared assets:**
  - Fonts, images, icons, PDFs, etc. stay in their existing folders under `public/` and are used by both the lab and legacy pages.

The goal is: **anything “lab” you actively maintain lives under `public/lab/`; anything at the root of `public/` is considered legacy.**
Legacy is now explicitly under `public/legacy/`.

## Redirects (important)

If you have redirects configured outside the app (Cloudflare/DNS/Heroku), avoid creating a loop between `/` and `/lab`. The app intentionally does not redirect for lab routes to prevent `ERR_TOO_MANY_REDIRECTS`.


## Homepage hero footage

- `public/film/hero.js` swaps muted looping previews on title hover/focus;
  titles still open their project pages. There are no visible playback controls.
- Clips live in `public/videos/`: `inlw-hero.mp4` (first 20 seconds of the
  supplied film) and `unsanctioned-hero.mp4` (first 7 seconds of the supplied
  edit, excluding end credits). Both are 1280×720, 24 fps H.264, without audio,
  with MP4 fast-start metadata. Original files remain on the external drive.
- Only the selected clip loads. Reduced-motion and Save-Data visitors start
  on the existing still. Hidden/offscreen footage
  pauses; blocked playback and loading failures retain the still fallback.
