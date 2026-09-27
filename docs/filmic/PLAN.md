# Worth the Walk — implementation plan

Status: Phase 1 planning only, updated with PJ's 2026-09-27 answers. No pitch-page code or media has been created.

## Direct answers

### Where the route should live

Keep the existing Express route in `server.js`:

```js
app.get("/filmic", (req, res) => {
  res.set("X-Robots-Tag", "noindex, nofollow");
  sendFilmPage(res, "filmic.html");
});
```

The route already serves `public/film/filmic.html`. That file will become a minimal, self-contained shell for the new deck. Its JavaScript and CSS will live under `public/film/filmic/`. This is part of the existing Portfolio repo and deploys as `pjk1m.com/filmic`; it is not a separate site, app, or repository. The older Filmic application at the same URL will be replaced in place and remain recoverable through Git history.

Do not put the application itself in `public/filmic/`: Express's static middleware runs before the explicit route, and a real directory at that path can redirect `/filmic` to `/filmic/`. The stills can use the repo-equivalent public location `public/images/filmic-pitch/frames/`, which avoids that route collision.

### How to keep it out of homepage project data

The homepage has no shared project collection. Its selected-work titles and project tiles are hard-coded in `public/film/index.html`; `public/film/projects.js` only renders metadata from attributes already present in that markup. Therefore the cleanest solution is to add nothing to either file and keep all pitch content in the dedicated `public/film/filmic/deck.js` module.

There is no RSS/feed generator in the repo. `public/sitemap.xml` is hand-authored and already omits `/filmic`.

### Whether the current image setup handles AVIF

It does not. This is a vanilla Express/static site with no image build pipeline, and neither `sharp` nor a framework image component is installed. Add a small `scripts/filmic-images.mjs` script backed by `sharp` in Phase 2. It will make the AVIF/WebP widths and tiny placeholders deterministically from the renamed JPEG copies.

## Repository findings

| Area | Finding | Consequence for `/filmic` |
| --- | --- | --- |
| Framework | Express 4 serving static HTML/CSS/JavaScript from `public/`; CommonJS server; no frontend framework or bundler | Build the deck as native ES modules and scoped CSS; do not introduce React, Next, Astro, or Vite |
| Routing | `server.js` already maps `/filmic` to `public/film/filmic.html` | Reuse the route and replace the old Filmic application page in this Portfolio repo |
| Current `/filmic` | An older Filmic application page with the main site nav, shared `film.css`, Google Fonts, and Google Analytics | The replacement should not load shared chrome, `film.css`, `projects.js`, `lightbox.js`, analytics, or remote font CSS |
| Styling | Plain CSS. Shared film styles are namespaced under `.film-page`, but the new brief needs a separate visual system | Use one page-root class and a dedicated `filmic.css`; no selectors should target generic site elements |
| Project data | Homepage cards/titles are hard-coded in `public/film/index.html`; `projects.js` is only a DOM metadata renderer | Keep deck data entirely separate and never add a homepage link or project tile |
| Images | Existing site assets are manually prepared JPG/PNG/WebP files; no AVIF generator or responsive manifest | Use the proposed Sharp script and `<picture>`/`srcset` |
| Fonts | IvyOra exists at `/Users/pjkim/Library/Fonts/ivyora-display-regular.ttf` and `public/fonts/ivyora-display-regular.ttf`; PJ confirmed it may be used on the site. The requested SF Compact file is not present | Use the repo IvyOra copy for display type and self-hosted Inter Tight for body type; do not embed SF Compact/SF Pro |
| Search controls | The HTML already has `noindex, nofollow`; the Express route also sends `X-Robots-Tag: noindex, nofollow` | Keep both layers in the replacement |
| Robots | `public/robots.txt` already contains `Disallow: /filmic` | Keep it to match the brief. It publicly reveals that the path exists but does not grant access or create a site link; the meta tag and response header remain the actual noindex signals |
| Sitemap/feed | `public/sitemap.xml` is manual and omits `/filmic`; no feed generation was found | Leave the sitemap unchanged and add a regression test |
| Deploy | Heroku remote plus `Procfile` (`web: node server.js`) | No static-host rewrite configuration is needed; verify with the same Node server used in production |
| Tests | One Node test file exists, but `npm test` is still a stub. Playwright is not installed | Add Playwright only in M6 and expose a focused `test:filmic` command |
| Working tree | Phase 1 began from `main`, five commits ahead of `origin/main`, with unrelated `.DS_Store` edits and one untracked legacy alias | Work is now on `filmic-pitch`; preserve and never commit the unrelated changes |

## Authoritative brief and site references

Content priority, highest to lowest:

1. This written Codex prompt and PJ's follow-up answers.
2. `Filmic Creative Case Zingerman's Deli.pdf` as the client/assignment brief.
3. `Worth_the_Walk_v2.pptx` and the earlier PPTX as visual/context references only.

The four-page Filmic creative-case PDF was fully rendered and inspected. The web pitch must visibly answer its core requirements:

- position Zingerman's as a historic Ann Arbor/Kerrytown staple worth the off-campus trip for incoming students;
- balance history/community, the family-deli atmosphere, staff, and the quality/range of the food;
- present one 1:00-2:30 promotional concept, one 0:15-1:00 social short, and a $5,000 budget;
- demonstrate DP thinking specifically through angles, camera movement, framing, blocking, lensing, lighting, filters, frame rates, and practical production choices;
- show a complete idea, not only attractive images.

Use these existing site pages as design/interaction references, without importing their headers, analytics, Google Fonts, or project-page chrome:

- `public/film/december.html` and `december.css`: cinematic full-bleed hero, editorial title lockup, restrained section metadata, grain, image-led visual-language sections, and before/after grade presentation.
- `public/film/unsanctioned.html` and `unsanctioned.css`: strong edge labels/timecodes, full-bleed image treatment, structured campaign/technical information, visual rhythm, and the existing range-input comparison pattern.
- The new page should feel recognizably made by the same filmmaker, but use the supplied Zingerman's warm palette, IvyOra-style display voice, and presentation-stage interaction rather than December's pressbook flow or Unsanctioned's distressed rave language.

## Proposed file placement

```text
server.js                                  existing route; likely no route change
public/film/filmic.html                    minimal deck document shell
public/film/filmic/
  filmic.css                               page-scoped design and motion
  app.js                                   entry point and mode selection
  deck.js                                  the one content/data file
  components/
    Deck.js
    Slide.js
    MediaPicture.js
    CompareViewer.js
    Filmstrip.js
    NotesPanel.js
    PresenterView.js
    GridOverview.js
    HelpOverlay.js
  layouts/
    FullBleed.js
    Split.js
    Rows.js
    Compare.js
    Table.js
    Swatches.js
    Quote.js
    Video.js                            reserved for a later slide
    Storyboard.js                       reserved for a later slide
    Links.js                            reserved for a later slide
public/images/filmic-pitch/
  frames/                                  canonical JPGs and generated variants
  references/                              empty until actual mood/reference files exist
  video/                                   poster/clip output only if later approved
public/fonts/filmic/                        licensed/self-hosted WOFF2 files, if approved
scripts/filmic-images.mjs                   Sharp image pipeline
tests/filmic.spec.js                        Playwright coverage
playwright.config.js                       added only if a shared config is still absent
public/filmic-sw.js                         approved page-specific offline worker
```

The existing `public/images/filmic/` directory belongs to the older application page. Leave those files untouched; replacing the page does not authorize deleting its old media.

## Component tree

```text
Deck
├── PresentMode
│   ├── Slide
│   │   └── layouts/<layout>
│   │       ├── MediaPicture
│   │       ├── CompareViewer
│   │       │   └── Filmstrip
│   │       └── layout-specific text/table/swatches
│   ├── NotesPanel
│   ├── GridOverview
│   └── HelpOverlay
├── ReadMode
│   └── Slide × 13
│       └── the same layout components with read-mode presentation
└── PresenterView
    ├── current Slide
    ├── next Slide preview
    ├── current notes
    └── elapsed/target timer
```

`Deck` owns the current slide, URL hash, view mode, keyboard commands, preloading, and `BroadcastChannel`. `Slide` is a small dispatcher keyed by `layout`. Layout modules consume data only; they do not contain pitch copy or media paths.

All 13 slide containers can exist in the document for accessibility and overview/test coverage while only the active and adjacent slides receive eager media. Controls inside the compare viewer, notes, grid, and links must stop click-to-advance propagation.

## Data model

Because the repo does not use TypeScript or a compilation step, use a JavaScript module with JSDoc typedefs and runtime validation in development. This keeps the page native to the repo while preserving editor assistance. `public/film/filmic/deck.js` will be the only source for:

- deck metadata, target runtime, palette, and UI labels that are specific to this pitch;
- every slide, title, body block, timecode, table row, quote, caption, and speaker note;
- every image/reference/video path, alt text, source label, placeholder, dimensions, and responsive source set;
- the seven frame triplets and their grading notes;
- clearly named empty `Reference` slots;
- future `video`, `storyboard`, and `links` layout data.

Base schema:

```text
DeckData
  meta: { title, slug, totalSlides, targetSeconds, warningSeconds }
  palette: { background, text, muted, dim, accent, swatches[] }
  compareFrames: CompareFrame[7]
  slides: Slide[13]

Slide
  id: string
  layout: "fullBleed" | "split" | "rows" | "compare" | "table" |
          "swatches" | "quote" | "video" | "storyboard" | "links"
  title: string
  body: string | structured layout content
  images: ImageAsset[]
  notes: { seconds: number, text: string }

ImageAsset
  id, src, alt, label: "Shot 9/26" | "Reference"
  caption: { text, draft }
  width, height, placeholder
  sources: { avif, webp }
  slotId?: string       // named empty reference slot when src is null
```

Representative slide object:

```js
{
  id: "the-idea",
  layout: "split",
  title: "The idea",
  body: {
    lead: "Students don't skip Zingerman's because it's bad. They skip it because it's a walk they've never taken.",
    accent: "So the film is the walk, and what's been waiting at the end of it since 1982.",
    acts: [
      { numeral: "I", text: "Start on campus and walk there, with the history told on the way." },
      { numeral: "II", text: "Inside: the counter, the case, the people." },
      { numeral: "III", text: "The student sits down, tries a meal, and gives an honest review." }
    ]
  },
  images: [{
    id: "frame-02-graded",
    src: "/images/filmic-pitch/frames/frame-02-graded.jpg",
    alt: "Draft: low-angle view of the Zingerman's Delicatessen sign.",
    label: "Shot 9/26",
    caption: { text: "Draft: the sign against the afternoon sky.", draft: true },
    width: 2400,
    height: 1350,
    placeholder: "/images/filmic-pitch/frames/frame-02-graded-placeholder.webp",
    sources: {
      avif: "/images/filmic-pitch/frames/frame-02-graded-{800,1600,2400}.avif",
      webp: "/images/filmic-pitch/frames/frame-02-graded-{800,1600,2400}.webp"
    }
  }],
  notes: {
    seconds: 30,
    text: "Set up the barrier: the deli is known, but the walk keeps students from making it part of their routine."
  }
}
```

The brace notation above documents a three-file source set; the actual object will use explicit valid `srcset` strings. Alt text and captions shown here are deliberately marked as drafts until the stills are visually reviewed.

Reference entries will be explicit even before files arrive, for example:

```js
{
  id: "reference-food-01",
  slotId: "reference-food-01",
  src: null,
  alt: "Reference image pending.",
  label: "Reference",
  caption: { text: "Reference image pending PJ review.", draft: true }
}
```

The UI must render the label even for a placeholder. A reference can never inherit `Shot 9/26`, and a shot can never inherit `Reference`.

## Asset pipeline

### Confirmed sources

- Stills: `/Users/pjkim/Documents/academics/apps/filmic/raw-footage/`
- The folder contains all seven `ungraded`, seven `graded`, six correctly named `rec709`, and the known `rec706_5.jpg` typo.
- Screenshots in that folder remain ignored.
- Supporting decks/PDFs are present in `/Users/pjkim/Documents/academics/apps/filmic/`. PJ confirmed the written prompt is authoritative, the Filmic Zingerman's PDF is the client brief, and the PPTX files are reference only.
- The seven PNG screenshots were inspected after PJ said all available images are in `raw-footage`. The first five are QuickTime-window captures of PJ's Zingerman's footage (sign/storefront/window/interior/cheese case); the last two show the grade and node graph in DaVinci Resolve. They are not Pinterest/reference images. PJ confirmed that all seven screenshots should be ignored in favor of the 21 clean frame JPGs.
- The external-drive clip range `VID_20260926_130317_014.mp4` through `VID_20260926_131530_026.mp4` is excluded. PJ said it is probably unnecessary because the stills are sufficient. Do not inspect, copy, transcode, or ship those clips unless requested later.

### Canonical copy mapping

For each `NN` from `01` through `07`:

| Source | Canonical repo copy |
| --- | --- |
| `ungradedN.jpg` | `public/images/filmic-pitch/frames/frame-NN-log.jpg` |
| `rec709_N.jpg` | `public/images/filmic-pitch/frames/frame-NN-709.jpg` |
| `gradedN.jpg` | `public/images/filmic-pitch/frames/frame-NN-graded.jpg` |

Special case: copy `rec706_5.jpg` as `frame-05-709.jpg`; never rename or modify the academic source file.

### Generation steps

1. Copy the 21 JPEGs with the canonical names above. They are static fallback/source assets, not imported into a JavaScript bundle.
2. Visually inspect each triplet to verify matching frames and scene identity. Write a scene-specific `alt` and short caption draft in `deck.js`, with every caption carrying `draft: true`.
3. Run `node scripts/filmic-images.mjs`. The script should auto-orient, strip unnecessary metadata, preserve aspect ratio, and never upscale.
4. For every canonical state, generate widths near 800, 1600, and 2400 pixels in both AVIF and WebP:
   - `frame-01-log-800.avif`
   - `frame-01-log-1600.avif`
   - `frame-01-log-2400.avif`
   - and matching `.webp` files, repeated for `709`, `graded`, and frames 02–07.
5. Generate `frame-NN-STATE-placeholder.webp` at roughly 32–48 px wide for the blurred background placeholder.
6. Emit deterministic output only. A dry-run/check mode should report missing sources, the frame-05 typo mapping, and unexpected files without touching the originals.
7. Use `<picture>` with AVIF, WebP, and canonical JPEG fallback. Slides 1–3 may load eagerly as appropriate; later slides remain lazy/data-sourced until near the viewport or active slide.
8. Present mode preloads the next two slides' images. The compare slide loads the selected triplet first, then fills the remaining filmstrip during idle time. Full 2400px graded images load only when their slide is near or open.

### Grade copy direction

Use PJ's own technical explanation as the starting point for the comparison captions and speaker notes:

> I pushed the midtones warmer and the shadows toward green/orange.

Keep the captions concise and image-specific. Where the frame supports it, pair that explanation with the existing intent: blacks down, sign colors restored, cheese stays white, and food color never gets pushed unnaturally. All wording remains `draft: true` until PJ reviews the matched frame captions.

PJ approved a small page-specific service worker. Add it late in the build, after asset URLs stabilize, register it with `/filmic` scope, and use it to precache the local application shell, deck data, fonts, and presentation-critical responsive images after the first complete online visit. Keep its cache names/versioning specific to Filmic so it does not intercept or retain the rest of the portfolio. Present mode still preloads the next two slides immediately; the worker provides the reliable offline reload that ordinary browser cache cannot guarantee.

## Font decision

PJ confirmed that IvyOra may be used on `pjk1m.com`. Use `public/fonts/ivyora-display-regular.ttf` as the canonical source, generate or package a web-optimized WOFF2 copy if the available tooling supports it without altering the source, and retain the TTF as fallback. The Apple font files in the repo are SF Pro, not SF Compact, so body copy will use self-hosted Inter Tight with the system stack as fallback.

The page will use one-line family tokens so a licensed file can be swapped later:

```css
--font-display: "IvyOra Display", "Instrument Serif", "Iowan Old Style", Georgia, serif;
--font-body: "Inter Tight", system-ui, sans-serif;
```

All chosen fonts will be self-hosted so the deck has no runtime font dependency. Instrument Serif remains the immediate display fallback if IvyOra fails to load; Inter Tight and `system-ui` replace SF Compact for body text.

## Interaction and implementation notes

### Present and read modes

- `/filmic` defaults to the 16:9 present stage on non-phone viewports.
- `/filmic?view=read` renders the same data as a vertical treatment. A `view=present` override can keep presentation mode on a phone; otherwise narrow phones automatically use read mode.
- Hashes are one-based (`#1` through `#13`). Invalid hashes clamp safely. Hash changes update slide state without a page reload.
- Shortcuts: Right/Space/click advance; Left goes back; `F` fullscreen; `N` notes; `G` grid; `P` presenter; `?` help; Escape closes the top overlay; `1`–`9` jump directly.
- Space only advances when focus is outside the compare viewer and editable/control elements.
- Presenter view can use `/filmic?presenter=1#N`, `BroadcastChannel`, a local elapsed timer, current/next slides, and the active notes. The timer begins a gentle state change after 4:30 toward the 4:45 target.

### Compare viewer

- The data defines all seven triplets and a default comparison of LOG versus GRADED.
- Since PJ had no preference for the ambiguous single-state behavior, use one three-way segmented pair control with explicit options: `LOG | 709`, `709 | GRADED`, and `LOG | GRADED`. Default to `LOG | GRADED`. This makes both sides of the wipe visible before interaction instead of assigning hidden pairing rules to `LOG`, `709`, and `GRADED` alone.
- The wipe divider is pointer/touch draggable and keyboard operable with `role="slider"`, `tabindex="0"`, `aria-valuemin="0"`, `aria-valuemax="100"`, and `aria-valuenow`.
- Press-and-hold/touch-and-hold, or hold Space while the viewer is focused, temporarily shows LOG and restores the prior comparison on release/cancel/blur.
- The filmstrip changes the active frame without changing slide position. Captions and grading notes always come from `deck.js`.
- In read mode, this becomes a standalone Grade section using the same component and content.

### Visual system and isolation

- Scope every rule below a unique `.filmic-deck` root and load only `filmic.css`.
- Use the supplied warm near-black/paper/accent palette and six building swatches as data-driven CSS custom properties.
- Full-bleed square-corner images, letterboxed 16:9 stage, restrained type, muted counter, and timecode labels.
- Crossfades and scale settle use roughly 600 ms non-bouncy easing. Reduced-motion removes crossfades, image settle, animated grain, and smooth scrolling.
- Film grain is a very low-opacity local CSS/SVG texture. It must not obscure text or cause a large paint cost.
- Omit the portfolio header/footer and omit the optional corner link initially.

### Privacy, accessibility, security, and performance

- Keep both `<meta name="robots" content="noindex, nofollow">` and the existing route-level `X-Robots-Tag`.
- Do not add `/filmic` to `index.html`, `projects.js`, nav, footer, sitemap, structured data, or any future project registry.
- Remove Google Analytics and all third-party scripts from this page. Reference images must be local, attributed/labeled on screen, and supplied by PJ rather than hotlinked from Pinterest.
- All images receive meaningful alt text after inspection. All controls use native buttons where possible, visible focus, labels, and logical tab order. Body text is checked to at least 4.5:1 contrast.
- Lazy-load content after slide 3, reserve media dimensions to avoid layout shift, and test desktop Lighthouse at 90 or better.
- Keyboard events must ignore inputs, links, controls, open overlays, and the focused comparison interaction as appropriate.

## Milestones

Each milestone ends with a review stop, a concise preview command, a list of decisions made, and one commit on `filmic-pitch`. Nothing is pushed or deployed without separate approval.

### M1 — route, hidden-page setup, data file, present-mode navigation with plain layouts

- Replace the old `/filmic` document with the isolated shell.
- Preserve the existing Express route and noindex header.
- Add all 13 slides to `deck.js`, including notes, rough seconds, tables, reference slots, and reserved future layout types.
- Add plain semantic layouts, 16:9 stage, hash navigation, basic keyboard/click navigation, and the slide counter.
- Verify the homepage, sitemap, and project markup remain untouched.

### M2 — real layouts and visual polish

- Build FullBleed, Split, Rows, Table, Swatches, and Quote layouts.
- Apply the palette, licensed font choice, labels, letterboxing, focus states, grain, and reduced-motion behavior, drawing selectively from December's cinematic restraint and Unsanctioned's technical labeling.
- Add responsive local picture sources after media review/pipeline approval.

### M3 — compare viewer and filmstrip

- Build the accessible three-state viewer, wipe control, temporary LOG reveal, grading notes, and seven-frame filmstrip.
- Add near-slide loading, next-two-slide preloading, and idle loading for the remaining compare frames.

### M4 — scroll mode and mobile

- Add `?view=read`, the mode toggle, automatic phone behavior, and the standalone Grade section.
- Tune long-read typography, image sizing, sticky/inline controls, and touch behavior.

### M5 — presenter view, grid, and help overlay

- Add presenter window synchronization, current/next/notes/timer, the 4:30 warning state, grid overview, notes panel, fullscreen handling, and shortcut help.
- Handle blocked popups and missing `BroadcastChannel` gracefully.

### M6 — tests and performance

- Add Playwright checks that `/filmic` exposes 13 slides, arrow keys update the hash, meta robots is `noindex, nofollow`, the response header remains present, and homepage HTML has no `/filmic` link.
- Add keyboard/compare smoke coverage, image-pipeline validation, accessibility checks, and Lighthouse-oriented performance fixes.
- Add and verify the approved Filmic-specific service worker, cache versioning, first-visit completion state, and offline reload/navigation.
- Confirm there are no third-party requests, sitemap entry, feed entry, or accidental shared-style regressions.

## Resolved decisions

1. Build in this Portfolio repo at `pjk1m.com/filmic`; replace the old page in place and rely on Git history as its archive.
2. Keep the existing `Disallow: /filmic`. It is only a crawler instruction and publicly lists the path; it is not a password or access control. Keep meta/header noindex as well.
3. Add the scoped service worker in M6.
4. Exclude external-drive clips unless PJ later requests them.
5. The written prompt overrides the PPTX. The Filmic Zingerman's PDF supplies client constraints; the PPTX is visual/context reference.
6. Use explicit comparison pairs, defaulting to `LOG | GRADED`.
7. PJ confirmed IvyOra may be embedded on `pjk1m.com`; use the repo font file with Instrument Serif as fallback.
8. Ignore all seven PNG screenshots and use only the 21 clean LOG/709/graded JPGs.
9. Grade captions should begin from PJ's explanation: warmer midtones and shadows pushed toward green/orange.

## Remaining open questions for PJ

None blocking M1. Reference/mood slots remain deliberately empty until separate reference images are supplied.

## Changelog

- 2026-09-27 — Initial Phase 1 plan after repository inspection. Recorded the existing route/search controls, static-site architecture, lack of an AVIF pipeline, confirmed still filenames and typo, proposed native-module structure, and added decisions needed before M1.
- 2026-09-27 — Incorporated PJ's answers: confirmed this repo and `/filmic` route, replacement of the old page, approved the scoped service worker, excluded external clips, made the prompt authoritative over the PPTX, inspected the complete Filmic Zingerman's brief, classified the seven screenshots, chose explicit comparison pairs, and added December/Unsanctioned as site-native design references. IvyOra web-embedding rights and optional Resolve screenshots remain open.
- 2026-09-27 — Closed the remaining Phase 1 questions: PJ approved IvyOra for site use, chose the 21 clean JPGs and no screenshots, and supplied the Grade-section direction of warmer midtones with shadows pushed toward green/orange. No questions now block M1.
- 2026-09-27 — Completed M1: replaced the legacy `/filmic` shell, added the isolated 13-slide content model and plain 16:9 presentation renderer, copied and normalized all 21 source JPGs without altering the originals, and verified route isolation, hash navigation, and noindex controls.
- 2026-09-27 — Completed M2: replaced the generic content renderer with dedicated layout components, rebuilt all 13 slides as fixed 16:9 compositions, removed internal scrolling and clipping, added restrained transitions and grain, and visually reviewed every slide at the presentation viewport.
