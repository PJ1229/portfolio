## style guide (portfolio)

## film register (`public/film/`)

The film portfolio is a separate register from the lab site: its own stylesheet
(`public/film/film.css`) and page class (`.film-page`). The lowercase hard rule
below does **not** apply to it. The `/inspo` page has moved onto this register.
It is a **Projects** portfolio now — film work and client work share the same
grid; client work is tagged, not split into its own section.

### primary nav
- **format**: `Work · Engineering · Writing ↗ · About`. Sentence case, shared
  partial (`public/film/chrome.js`). `Work` → `/`, `Engineering` →
  `/engineering`, `Writing` → `/writing` (opens Substack), `About` → `/#info`.
  Inspo is footer-only.
- **footer**: © PJ Kim, then Inspo, YouTube, Instagram, Email.

### project content model
- Each project element carries its model as data attributes, rendered by
  `public/film/projects.js` into its `[data-project-meta]` child:
  - `data-type="EVENT,PROMO,FILM"` — comma-separated type[] (FILM, EVENT,
    PROMO, SPORTS, BRAND), rendered as mono tag chips.
  - `data-client="self"` — `"self"` renders nothing; any other value (e.g.
    `"Michigan Athletics"`) renders an inverted client badge.
  - `data-status="IN PROGRESS"` + optional `data-year="2026"` — status line.
- To add client work, add a `.project` card with `data-client="<client name>"`.

### project detail template
- Detail pages are an ordered list (`<ol class="project-sections">`) of
  independently-optional sections, in this order:
  `01 Overview (always) → 02 Trailer/Hero → 03 BTS → 04 Impact/Results →
  05 Credits → 06 Gallery → 07 Related Writing`.
- Render a section only when it has content — delete its `<li>` to omit it;
  insert a new `<li>` in order to add one. No placeholder sections.

### type — one family
- **SF Pro**, self-hosted from `public/fonts/SF-Pro.ttf` as subset woff2 files
  (`SF Pro Text` for UI and body, `SF Pro Display` for titles). Weights 400 and 500.
  Stack continues `-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`.
- **IBM Plex Mono** only for timecodes and tech specs.
- Do not load Inter, Anton, Instrument Serif, Bodoni, or the original SF Pro files.

### tokens
- Light paper shell `#F8F7F3`, ink `#141413`, meta `#6B6A65`. Footage sits on a
  black stage `#0B0B0C`. A film may set `--cover-mat` and nothing else in chrome.
- Shared signal `#D8191F` is for the focus ring and the active-section tick only.
- Hairline frames. No shadows. One breakpoint at 720px.
- Tokens live in `public/film/tokens.css`.

### rules
- never mix casings within a role. display = uppercase, metadata = uppercase
  mono, prose = Title Case / sentence case.
- titles sit optically flush to the card's edges.

### voice + casing
- **default casing**: sentence case for paragraphs, **lowercase** for lab headings/titles unless there’s a strong reason not to.
- **hard rule (lab pages)**: all lab page text is forced lowercase via CSS (`text-transform: lowercase`).
- **contractions**: use them (match the casual tone).
- **punctuation**: keep it clean; avoid extra exclamation points.

### lab nav microcopy
- **format**: `back · yt channel · my inspo` (keep this strip to those three items; link other hub pages from body copy instead).
- **links**: external links use `target="_blank"` + `rel="noopener noreferrer"`.

### lab writing page
- **page title (`h1`)**: lowercase (e.g. `writing`).
- **post titles**: lowercase on the list page and on the post page (`<title>` + `h1`).
- **reading time**: `feb 2026 · X min read` (use `min`, not `mins`).

### inspo page
- **surface**: full-black archive; do not put `/inspo` back inside the paper card.
- **content source**: add entries to `public/film/inspo.js`; foundational films stay first, then dated references run newest-first.
- **preview**: use a local image when one is available and a deliberate type-led fallback when it is not. Hover/focus may change the preview, but the row itself remains the real outbound link.
- **red marker**: set `isKey: true` on archive entries that changed how PJ thinks; the renderer supplies the diamond.
- **weight**: keep font weight consistent; red should only change color.
- **key mark**: `var(--signal)`, the shared tick color. Not a second red.

### home contact film
- The Verci film is a native, lazy-loaded video behind `LET'S MAKE SOMETHING.`
- Keep the supplied sunset portrait as the poster and the YouTube upload as a fallback link only.
- Hover/focus uses the separate, silent `/videos/verci-hover.mp4` proxy; an explicit click swaps to the full `/videos/verci-film.mp4` with audio and restarts it from the beginning.
- Preserve play/pause, timeline, time, mute, fullscreen, close, keyboard focus, and reduced-motion behavior when changing the treatment.

### images
- **responsive crop rule** (lab home photo): use `object-fit: cover` and pick the anchor with `object-position` depending on which side should crop first.
