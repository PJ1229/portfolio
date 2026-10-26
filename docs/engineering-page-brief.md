# Engineering page — pjk1m.com

The public page now lists three finished projects (um-autolog, the Yazaki bill
of materials generator, and the Yazaki wiring drawing rule checker), each with
a demo video. The notes below are the original build record, including the
placeholder slots that were later removed.

Implement `/engineering` as a section of the existing film portfolio: one practice,
with engineering and filmmaking presented in the same visual language.

## Original build requirements

- Inspect the framework/router, CSS and actual tokens, type/spacing/breakpoints,
  content conventions, loaded fonts and image handling before writing code.
  Report a plan and wait for approval. This review was completed and approved.
- Additive changes only; preserve existing routes, global styles and token values.
  Reuse the header/nav/footer conventions. No new dependencies or font loaders.
- Responsive at 375px, 768px and 1440px; visible keyboard focus, semantic heading
  order, meaningful image alternatives and reduced-motion support. No new animation.
- Datasheet vernacular: mostly white, large tight display type, 13–14px minimum
  specification text, hairline rules, square spec tables, one full-bleed panel.
  Derive the palette from the site; no cream/terracotta palette.
- Page order: existing navigation; `work / engineering` breadcrumb; hero and three
  parallel capability areas; blueprint panel; four stacked project datasheets;
  existing footer and a film-work cross-link.
- Hero positioning: electrical engineering student building imaging and camera
  systems, with automotive software co-op work as the professional track.
- Capabilities: embedded and robotics; vision and OCR pipelines; automation and
  internal tooling. One sentence each, no numbered markers.
- Blueprint: stroke-only chassis SVG on the left; a bordered table of four
  chronological camera-platform milestones and target periods on the right;
  short statement below, then a thin name/year footer. No numbering elsewhere.
- Every datasheet comes from one data file and one renderer. Show name, status,
  year, summary, two-column specifications, plain-text stack, optional repo/media.
- Required project fields: `slug`, `name`, `status` (`shipped` or `in development`),
  `year`, `context`, `summary`, `stack[]`, `specs[{label,value}]`, `repo|null`,
  `media[{src,alt,caption}]`, `cleared`, `redactedNote`.
- When not cleared, show public name/role/summary/stack and the redaction note;
  suppress all specifications and customer identities through renderer behavior.
  Yazaki ships with `cleared: false`.
- Missing images get bordered aspect-ratio boxes with visible alternatives.
  Do not generate decorative images, fabricated screenshots or placeholder SVGs.
  Keep missing source paths empty and document outstanding assets.
- Verify data-driven rendering, confidentiality, keyboard access, responsive
  layout and absence of unintended film-page visual changes.
- Do not fabricate metrics, dates, project details or milestone periods.

## Approved implementation decisions

- Keep Express 4.21.2 and plain CSS. Reuse Anton and IBM Plex Mono through the
  existing Google Fonts stylesheet. There are no shared JS layout components;
  repeat the existing header/footer markup and reuse their classes.
- Add one ENGINEERING link to the homepage navigation. This is the approved
  exception to unchanged existing-page visuals. Existing global CSS stays intact.
- Use black as the blueprint accent against white paper, consistent with the
  existing monochrome palette.
- Use a server-only CommonJS data file (`engineering/content.js`) and renderer.
  This is the approved single-data-file extension of the existing vanilla-JS pattern.
- Add `role`, `client` and `pending`. `pending` displays “Details pending” instead
  of falsely claiming a known project status. Empty year/stack/role have explicit
  pending states. Two unspecified project slots remain explicitly unfilled.
- Customer identities belong exclusively in `client`, never public copy. The
  renderer additionally removes that identity from public text case-insensitively.
  Restricted specs, customer identity, repo and media require both `cleared: true`
  and a code-reviewed SHA-256 digest in `approvedDigests` in `engineering/render.js`.
  The initial version had no approved digests. The later source-backed um-autolog
  update approves only its exact generic technical specifications; Yazaki remains
  unapproved. Changing restricted content alone cannot publish it.
  Public summaries remain an editorial contract: software cannot identify an
  undeclared customer name embedded in arbitrary prose.
- Source data is outside the public directory and is never sent to the browser.
  Node loads it on startup; restart the existing server after content edits.

## Content and assets still needed

- Four complete project records: verified names, status, year, roles, public
  summaries, stacks, specifications and repository links. Only Camera platform
  and Yazaki were identified in the supplied brief. Later source material filled
  the um-autolog slot and Yazaki's public fields; one slot remains pending. See
  `engineering-content-sources.md` for provenance and remaining gaps.
- Four real chronological camera-platform milestones and target periods, plus
  the platform footer year. Current rows explicitly say they are pending.
- `/assets/engineering/chassis.svg`: supplied technical drawing. Leave the
  source empty until available. The renderer rebuilds a restricted inert SVG
  vocabulary and forces `fill="none"` and `stroke="currentColor"`.
- Camera prototype photo and any additional project media, with meaningful
  alternative text and captions. Local raster media uses 16:9; drawing uses 4:3.
- Employer publication review before adding a restricted-payload digest. Do not
  store actual confidential material in Git simply because the file is server-only.

## Validation

Run `node --test engineering/render.test.js` for populated-field confidentiality,
content-only clearance bypass attempts, content-driven rendering and HTML escaping.
The project has no build step and its existing npm test script is a placeholder.
Use the existing Express server for route and browser checks.

Verified during implementation:

- All three Node tests pass, including populated restricted fields and attempts
  to bypass clearance by changing `cleared` or the project slug.
- Headless Chrome at 375px, 768px and 1440px: no horizontal overflow, four
  datasheets, loaded existing fonts, no empty image requests, seven keyboard
  links with visible focus, and no motion under reduced-motion emulation.
- Full-page screenshots inspected at all three sizes.
- Homepage main/footer element geometry is identical with and without the
  approved nav link at all three sizes; existing stylesheets were not edited.
- Existing film routes respond successfully. Engineering server source paths
  return 404. No placeholder drawing asset was created.
- No dependencies added. Deployment is not part of this repo change; the
  existing Express deployment architecture is preserved.
