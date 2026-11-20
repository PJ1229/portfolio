# film site plan

Plan for turning pjk1m.com from a personal site into a **film portfolio**.
Design references live in [design-refs/film-site/](design-refs/film-site/) —
read [that INSPO.md](design-refs/film-site/INSPO.md) before building anything
visual.

Status: **built (2026-08-13).** The design system, four pages, routes, and the
`/inspo` restyle are on disk under `public/film/`; the root now serves the film
index. Remaining work is content-level (logline, crew confirmation, Substack
URL, reel uploads) — see open questions.

**Update (2026-08-19):** the register is now a **Projects** model, not a Films
model. Project cards carry `type[]` / `client` / `status` data attributes
(rendered by `public/film/projects.js`); client work (e.g. Michigan Athletics)
will live in the same WORK grid via a `client` badge. Primary nav is
`WORK · WRITING · INFO`; every page footer links to `/inspo`. `/writing`
302s to `https://substack.com/@pjk1m`. **Love from Toronto is unpublished**
(404 at `/love-from-toronto`; source kept in `public/film/`). The
`/unsanctioned` detail page is now the ordered, optional-section template
(Overview → Trailer/Hero → BTS → Impact/Results → Credits → Gallery →
Related Writing).

---

## decisions (locked 2026-08-13)

| Decision | Answer |
| --- | --- |
| Domain / repo | **pjk1m.com**, this repo. Portable by design. |
| What the site is | A **film portfolio**, not a personal site. |
| Writing | Moves to **Substack**. Site links out. |
| Subject | **unsanctioned** — the biggest work so far. |
| Second work | **love in toronto** — listed, marked in progress. |
| Ostar | PJ's own brand. Not client work, no client framing. |
| Look | The **"A Life Diary"** direction — dark canvas, bone-paper card. |
| Register | Cinematic. Title Case / uppercase mono. |
| Kept from the old site | `inspo`, `summer '26` (temporary), a short bio. |
| Dropped | `dsa`, `guitar`, the beyblades-to-algorithms homepage narrative. |

### corrections this plan is built on

Two earlier assumptions were wrong and are worth recording so they don't come
back:

- **"the Cost of Trying" is not a film.** costoftrying was a brand/community
  project and it's **abandoned**. The name was never a film title. The
  `costoftrying/` folder on the drive is just drive organization — several
  live projects still sit under it, including love in toronto.
- **The film is `ostar/project-unsanctioned`**, not
  `costoftrying/shorts/short-film/`. That second folder is a separate,
  unfinished, untitled short (trailer + drafts, untouched since 2026-07-31).
  It is **not** part of this plan.

---

## the two works

### unsanctioned — finished, released

Source: `/Volumes/TOSHIBA EXT/ostar/project-unsanctioned/`

| | |
| --- | --- |
| Final | `06_deliverables/film/project-unsanctioned.mp4` (473 MB, 2026-08-09) |
| Watermarked | `project-unsanctioned-watermarked.mp4` (481 MB) |
| Released | **2026-08-10** — [instagram](https://www.instagram.com/p/Db3dMg9p6_i/) · [tiktok](https://www.tiktok.com/@pj.k1m/video/7672451205301275918) · [youtube](https://www.youtube.com/watch?v=FLqxwn8_9xI) |
| Drafts | `draft1` → `draft9` (Aug 1 → Aug 9), so it's picture-locked |
| Footage | ~40 GB, 182 video clips from **ant / gabriel / justin**, + 107 Fuji stills |
| Camera (gabriel) | Sony, XAVC S-I 4K DCI 24.00p 4:2:2 10-bit, **S-Log3 / S-Gamut3.Cine** |
| Grade | Resolve CST → Rec.709 Gamma 2.4, applied as node 1 |

The reason this page can be deep: **the process is already documented.** Almost
no student film has this material sitting on disk ready to publish.

- `PROJECT_NOTES.md` — the Premiere→Resolve→**Replace Footage** workflow
  (chosen because no Direct Link exists for that pairing, and XML round-trips
  flatten transitions), plus a full camera/color-space log.
- **Transition map**, read straight out of the `.prproj` sequence data:
  `C1291 → C1294 → C1300 → C1302 → C1308 → C1303 → C1304 → C1311 → C1309 → C1313`.
  Only one real two-clip transition in the whole film — a ~1.3s Luma Fade
  cross-dissolve at `C1303 → C1304`, timeline ~00:20.1–00:24.7. `C1291` opens
  with a one-sided fade from black; `C1304` fades out via Burn Alpha.
- `06_deliverables/carousels/scene1-coloring-carousel/` — finished 6-slide
  before/after carousel, `01-cover.png` → `06-node-tree.png`.
- `04_bts/scene1-coloring-stills/` — before/after pairs at three timecodes
  (`00_02_14`, `00_04_13`, `00_06_20`) plus `node-tree.png`.
- `04_bts/scene1-colorgrading-timelapse.mp4` — screen-recorded grade build.
- `06_deliverables/reels/project-unsanctioned-sfx-breakdown.mp4`
- `06_deliverables/reels/project-unsanctioned-colorgrading-tutorial.mov`
- 9 colour-clustered footage groups, named by look — night low light, night
  parking garage, purple/magenta party lighting, pink neon interior, vivid
  red/pink, overcast street market, bright daylight exteriors.

### love in toronto — work in progress

Source: `/Volumes/TOSHIBA EXT/costoftrying/travel/ontario-aug26/`
(renamed from `love-in-toronto/`)

| | |
| --- | --- |
| Trailer | `06_deliverables/ontario-aug26-trailer1.mp4` (130 MB, 2026-08-07) |
| Promo posted | **2026-08-08** — [instagram](https://www.instagram.com/p/Dbw8DLFIsWk/) · [tiktok](https://www.tiktok.com/@pj.k1m/video/7672158106494815502) |
| Footage | 274 clips + 45 stills, Fujifilm X-S20; `01_raw_footage/{fuji,phone-and-stills}` |
| Graded so far | one clip — `05_renders_proxies/DSCF1018_graded.mov` |
| Cut | **none yet** |
| Shot | Toronto / Ontario, **2026-08-03 → 08-05** |

**Public title is "love in toronto"** — that's what the promo shipped under.
`ontario-aug26` is the drive's filing name only. Don't leak it to the site.

Good story material for the page, if you want it: the Fuji's internal clock
had drifted **+790 days, 15:17:58**, so all 274 clips self-reported June 2024.
The real dates were recovered by matching against GPS-tagged iPhone photos
from the same trip window — Stackt Market, CN Tower, the MASA taco truck. The
footage is now sorted into location subfolders because of it.

---

## structure

The film portfolio takes over the root. `legacy/` stays exactly as it is — an
untouched archive.

```
pjk1m.com/
  /                   work index — 2 films, row-based
  /unsanctioned       deep film page (the site's centre of gravity)
  /filmic             the Filmic application (2026) — essays, critique, speed round
  /love-in-toronto    lighter WIP page, built on the trailer
  /about              short filmmaker bio
  /inspo              kept, restyled into the new system
  /summer-26          temporary — see below
  /writing            302 → Substack
  /legacy/            untouched archive (incl. 8 old film-project pages)
```

**Routes to add** in `server.js`, following the existing `sendFile` pattern
(no directory auto-index; `express.static` is already mounted with
`index: false`):

- `/` → `public/film/index.html` — **replaces** the current `sendLabIndex()`
- `/unsanctioned`, `/love-in-toronto`, `/about` → `public/film/*.html`
- `/writing` → `res.redirect(302, <substack url>)`
- Keep `/inspo.html` and `/summer-series.html` working; add clean
  `/inspo` and `/summer-26` aliases.
- Keep `/blog.html` and `/blog/:post` alive as redirects to Substack rather
  than deleting them — they're linked from outside and from `legacy/`.

**The 8 legacy film-project pages** (december, filsoc fall dance, v1 hype
video, lost, anniversary, msu akdphi, ootd launch, words from the people you
love) stay on the legacy site for now, per "only unsanctioned for now." Worth
revisiting once the two main pages exist — they're finished work sitting one
directory away from a portfolio that says it has two items.

---

## design system

From reference `01` — see [INSPO.md](design-refs/film-site/INSPO.md) for the
full breakdown of what to take and what to adapt.

### the core structure

A **bone-paper card floating on a near-black canvas**, generous margin on all
four sides. Mono nav pinned to the card's corners, a tiny centered serif
running header, a framed 16:9 still, then a massive condensed uppercase title
with a rotated mono date stamp tucked against it.

```
████████████████████████████████
█  ┌──────────────────────────┐ █
█  │ INDEX          FILM  INFO│ █   ← mono, tiny, letterspaced
█  │   A Film By PJ Kim,      │ █   ← serif running header, centered
█  │  ┌────────────────────┐  │ █
█  │  │   [16:9 still]     │  │ █   ← hairline frame
█  │  └────────────────────┘  │ █
█  │  UNSANCTIONED            │ █   ← condensed grotesque, huge
█  │  ║2026.08.10             │ █   ← rotated date stamp
█  └──────────────────────────┘ █
█             pjk¹              █   ← monogram on the dark
████████████████████████████████
```

### tokens

| Token | Value | Notes |
| --- | --- | --- |
| `--canvas` | `#0F0F0F` | the dark room |
| `--paper` | `#E8E6DF` | bone, not white — keep it warm |
| `--ink` | `#111` | type on paper |
| `--ink-dim` | `#6B6862` | mono metadata on paper |
| `--paper-dim` | `#8C8C8C` | mono metadata on dark |
| `--accent` | **TBD** | one accent, sampled from the film itself |
| `--rule` | `1px` | hairline frames, never heavier |

**One accent, used only for labels, nav hover, and section markers — never
body text.** That discipline is what makes reference `02` work. Sample it from
an actual frame: `cluster-06-vivid-red-pink-highest-saturation` or
`cluster-05-pink-neon-interior`. A colour taken from the grade will always sit
better than one picked in a colour wheel.

### type

Three roles, no more:

| Role | Face | Fallback |
| --- | --- | --- |
| Display titles | condensed grotesque, uppercase, tight tracking | `Anton`, or `Archivo Black` |
| Running header / prose | serif, Title Case | `Instrument Serif`, `EB Garamond` |
| Metadata, nav, credits | mono, uppercase, letterspaced | `IBM Plex Mono`, `JetBrains Mono` |

The reference uses a Druk/Knockout-class condensed face. Those are paid; Anton
is the closest free stand-in. Budget for the real thing later if the display
type is carrying the whole identity — it is.

### rules

- **Never mix casings within a role.** Display = uppercase. Metadata =
  uppercase mono. Prose = Title Case / sentence case. That's the whole system.
- Titles sit **optically flush** to the card's left and right edges.
- Hairline frames only. No shadows, no rounded corners, no gradients.
- Stills keep their in-frame subtitles if they have them (reference `02`).
- Grain overlay is optional and should be subtle — the footage already has it.

### the lowercase rule

`STYLEGUIDE.md`'s lowercase hard rule is scoped to lab pages
(`text-transform: lowercase` via `.lab-page`). The film pages use a new
`.film-page` class and their own stylesheet at `public/film/film.css` —
`public/index.css` is not touched. When `lab/` shrinks to `inspo` + `summer
'26`, update `STYLEGUIDE.md` to say the rule now covers only those, and add
the film register alongside it.

---

## page specs

### `/` — work index

Row-based, from reference `03`. Two entries read as deliberate this way; a grid
of two reads as unfinished.

Each row: title in display type, one-paragraph description, role credits
inline in mono, 16:9 thumbnail. Status in mono on the right —
`RELEASED 2026.08.10` / `IN PROGRESS`.

### `/unsanctioned` — the deep page

The site's centre of gravity. Sections, in order:

1. **Hero** — the card structure above. Framed still, `UNSANCTIONED`, rotated
   `2026.08.10`.
2. **The film** — YouTube embed (`FLqxwn8_9xI`). See asset notes on why not
   self-hosted.
3. **Logline / synopsis** — *needs writing, doesn't exist yet.*
4. **Credits** — two-column mono, reference `02`. Roles in accent, names in
   ink. Directed / edited / colour: PJ Kim. Camera: gabriel, ant, justin,
   gabechan. Plus a technical block: `SHOT ON — SONY · XAVC S-I 4K DCI
   24.00p 10-BIT`, `S-LOG3 / S-GAMUT3.CINE`, `STILLS — FUJIFILM`.
5. **The Grade** — *paper section.* Before/after pairs at the three timecodes,
   the node tree, and a plain-language version of the CST-to-Rec.709 note.
   The grading timelapse embeds here.
6. **The Cut** — *paper section.* The transition map as a typeset diagram, and
   why there's only one real dissolve in the film. This is the most
   interesting thing on the site and nobody else has it.
7. **Sound** — the SFX breakdown reel.
8. **Stills** — 3-across grid from the Fuji stills and cluster frames.
9. **Watch** — the three platform links, mono, no icons.

Sections 5–7 are the paper chapters; everything else is dark. That contrast is
the concept: dark for the film, paper for the working notes.

### `/love-in-toronto` — WIP

Same shell, one third the length. Trailer as hero, a handful of
location-sorted stills, `IN PROGRESS` in mono, and — if you want it — the
clock-drift story as a short paper section. No credits block until there's a
cut. Designed so it upgrades to a full page rather than being rebuilt.

### `/about`

Short. Reference `05`'s three-tier hierarchy: one large statement, a
supporting paragraph, a small dense detail block. Contact + socials in mono.
Not the current homepage narrative — none of the beyblades/fashion-brand/
algorithms material carries over.

### `/inspo` and `/summer-26`

`inspo` gets restyled into the new system, content unchanged.

`summer '26` is **temporary scaffolding.** It's logged through `aug 17–23` and
the plan is to convert it into an article with links to each work. Leave it on
the old lab styling until then — restyling a page that's about to become a
link out is wasted work.

---

## asset pipeline

Nothing large gets committed. `.gitignore` already excludes one 1-video path,
which is the precedent.

- **Film + trailer → YouTube embeds.** The final is 473 MB and the trailer
  130 MB; both are already published. Use `youtube-nocookie.com`. Confirm the
  YouTube cut matches `project-unsanctioned.mp4` before treating the embed as
  the canonical film.
- **Stills** — export web-sized JPEG/WebP (max ~2000px wide) from the Fuji
  stills and cluster frames into `public/images/unsanctioned/`.
- **Carousel slides** — the existing PNGs are 2.6–6.5 MB each. Re-export the
  before/after pairs and node tree as compressed WebP.
- **Hero motion** (optional) — a short silent muted WebM loop, a few hundred
  KB, not the film.
- **Reels** (SFX breakdown, grading tutorial) — upload and embed rather than
  self-host.

---

## build order

1. **Extract and compress assets** — stills, before/after pairs, node tree,
   hero frame. Nothing can be designed against placeholder images.
2. **Build `public/film/film.css`** — tokens, card shell, the three type
   roles. Get the card-on-dark right in isolation before any page uses it.
3. **`/unsanctioned`** first, not the index. It's the hardest page and it
   defines every component the others reuse.
4. **`/` index** from the components that fall out of step 3.
5. **`/love-in-toronto`** and **`/about`**.
6. **`server.js` routes**, including the Substack redirects.
7. **Restyle `/inspo`.**
8. **Update the docs** — `STYLEGUIDE.md` for the two registers, `README.md`
   table, `DEV_NOTES.md` for the new routes, `ARCHIVE.md` for removed lab copy.

---

## open questions

Nothing here blocks step 1.

- **Logline / synopsis for unsanctioned.** Doesn't exist in any form on the
  drive or in the repo. Needs writing — it's the one piece of the deep page
  that can't be assembled from existing material.
- **Accent colour** — pick a frame to sample from.
- **Crew roles.** Camera credits above are inferred from footage folder names
  (`ant/`, `gabriel/`, `justin/`, `gabechan/`). Confirm actual roles before
  publishing — miscrediting collaborators is the one error here that's
  genuinely costly. Also note `gabechan`'s 5 zip archives are still
  **unopened**, so that footage may not even be in the film.
- **Substack URL** — not known yet; needed for the redirects.
- **Does the summer '26 article go to Substack or stay on the site?** Still
  open. Substack is the consistent answer, but the per-work links make it a
  second informal work index, which argues for keeping it here.
- **`lab/index.html:54` links to `costoftrying.com`** as where the philosophy
  "is being developed" — dead pointer to an abandoned project. Fix or drop it
  regardless of what happens to that page.
- **Fate of `dsa` and `guitar`.** Dropped from the portfolio, but `guitar`
  has a live `/api/guitar-videos` YouTube route in `server.js`. Decide whether
  they move to `legacy/` or are deleted, and whether that API route goes.

---

## unsanctioned — campaign expansion (2026-08-24)

The unsanctioned page grows from a single-film page into the full campaign,
now presented as a dated timeline: film + photo drop + teaser + post-rave
impact, with BTS as the process chapter. Locked decisions:

- Event: **Arcade Rave: Gotta Gacha** — Friday, August 21, 2026 · 10PM–2AM.
  Presented by OSTAR × House Bl3nd, collab with Gotta Gacha
  ([gottagacha.com](https://gottagacha.com)).
- Hero film: posted **Aug 11** ([YouTube](https://www.youtube.com/watch?v=FLqxwn8_9xI)).
- Photo drop: posted **Aug 14** — stills by **Michael Counts**, edited by
  **PJ Kim**, shot on **Fujifilm X-S20**. Source: `06_deliverables/social/`
  (page uses `1,2,3,7`).
- Teaser: posted **Aug 18** ([instagram.com/p/DcMg6QLIgrd](https://www.instagram.com/p/DcMg6QLIgrd/)).
  Shot by **Anthony Nguyen** on **Sony a7III · S-Log2**; edit + grade by PJ Kim.
  Its 10 stills are filed at
  `ostar/project-unsanctioned/03_graphics/stills/ant_C4734_*.jpg`
  (sorted by timecode, not the `StillNNN` suffix).
- Justin's edit: posted **Aug 19** ([instagram.com/reel/DcOzYjayYHM](https://www.instagram.com/reel/DcOzYjayYHM/)),
  shot & cut by **Justin Lagman** on **Sony a7II**.
- Event stills: **Alex Ge**, **Sony a7IV · S-Log3**, 6 photos filed at
  `ostar/gotta-gotcha/06_deliverables/stills/`.
- Design (banner + lineup): **Justin Lagman** — banner posted **Aug 12**,
  lineup posted **Aug 21** (day of the rave).
- BTS: process ran **Jun 16 → Aug 21** — first meeting Jun 16, then Jun 30,
  Jul 10, Jul 26, big logistics meeting Aug 12; production Aug 1 → rave.
  BTS photos filed at `04_bts/photos/` (scripts/directing/editing/food;
  scripts, editing, food are verticals — rotated 90° CW for the web exports).
  Coloring carousel (Scene 1) slides from
  `06_deliverables/carousels/scene1-coloring-carousel/`; SFX breakdown and
  coloring breakdown link out to TikTok.
- Impact (Instagram, one month of the teaser): **+100K Instagram impressions**,
  **+144 followers**. The page shows those two counts. Aftermovie reference was
  dropped when the project was marked finished — the campaign reads as complete.
- Lineup: Cinco 10:00PM · Ayo B2B HangoutWithG 11:00PM · Artificial Sky
  12:00AM · **KWIN** 1:00AM–shutdown.

Final section order on `/unsanctioned`:

```
01 Overview          white card — "campaign ships in four parts"
02 Trailer/Hero      dark — AUG 11
03 Gallery           dark — hero/trailer stills
04 Photo Drop        paper — AUG 14; Michael Counts stills, edited by PJ
05 3 Days Before     dark — AUG 18; IG link-out poster + 10 stills
06 Justin's Edit     paper — AUG 19; Justin Lagman's a7II cut, IG reel
07 Post-Rave/Impact  dark — AUG 21; stats, banner/lineup, 6 event stills
08 BTS               paper — JUN 16 → AUG 21; meetings, photos, reels
09 Credits           dark — grouped per deliverable
```

Asset pipeline: WebP exports live in `public/images/unsanctioned/` under
`teaser/`, `post-rave/`, `bts/`, `photo-drop/`, `carousel/`. New CSS:
`.stats`, `.designs`, `.lightbox` (stills open full-screen via
`public/film/lightbox.js`).
