## style guide (portfolio)

### voice + casing
- **default casing**: sentence case for paragraphs, **lowercase** for lab headings/titles unless there’s a strong reason not to.
- **hard rule (lab pages)**: all lab page text is forced lowercase via CSS (`text-transform: lowercase`).
- **contractions**: use them (match the casual tone).
- **punctuation**: keep it clean; avoid extra exclamation points.

### lab nav microcopy
- **format**: `back · yt channel · my inspo`
- **links**: external links use `target="_blank"` + `rel="noopener noreferrer"`.

### lab writing page
- **page title (`h1`)**: lowercase (e.g. `writing`).
- **post titles**: lowercase on the list page and on the post page (`<title>` + `h1`).
- **reading time**: `feb 2026 · X min read` (use `min`, not `mins`).

### inspo page
- **red marker**: wrap inline emphasis as `<span class="is-red">red</span>`.
- **red items**: add `class="is-red"` on the `<a>` element.
- **weight**: keep font weight consistent; red should only change color.

### images
- **responsive crop rule** (lab home photo): use `object-fit: cover` and pick the anchor with `object-position` depending on which side should crop first.

