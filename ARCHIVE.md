# site archive log

Tracks sections and surface links **removed from the live lab** (or superseded wholesale), with **archive dates** and **restore snippets**. Full history is always in git (`git log -p -- public/lab/index.html`, etc.).

When you archive something new, append a block under the right heading using the same shape: date, what, file, notes, optional restore HTML.

---

## lab — `public/lab/index.html`

### 2026-05-04 — tmc retreat vlog on home

- **Archived:** 2026-05-04  
- **Removed:** the clause pointing to a retreat vlog plus the embedded player (YouTube `Eb6kjOybPdw` in the last live version). An earlier version used a local `<video>` (`../videos/DSCF3582_720p.mp4`); see commit `5bdb69c` / `73b6785` if you need that variant.  
- **Restore:** append to the **end** of the existing tmc retreat `<p>` (before `</p>`), then add the embed block before the “some other communities” paragraph.

Append immediately **before** the closing `</p>` of that paragraph:

```html
 here's a little vlog from it:
```

Then immediately after that `</p>`:

```html
    <div class="lab-vlog" style="margin-top: 12px; margin-bottom: 18px;">
      <iframe
        class="lab-vlog-video"
        src="https://www.youtube-nocookie.com/embed/Eb6kjOybPdw?rel=0"
        title="Retreat vlog"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
```

### 2026-05-04 — daily activity links on home

- **Archived:** 2026-05-04  
- **Removed:** intro line “here’s some logs of my daily activities:” and the list linking to `dsa.html` (coding) and `guitar.html` (guitar). A short-lived `<details>` “archive” control was removed entirely per preference.  
- **Still in repo:** `public/lab/dsa.html`, `public/lab/guitar.html` (and server routes) unchanged—only the home surface links were dropped.  
- **Restore:** e.g. after the shift/v1 paragraph.

```html
    <p style="margin-bottom: 6px;">
      here’s some logs of my daily activities:
    </p>
    <ul>
      <li><a href="dsa.html">coding</a></li>
      <li><a href="guitar.html">guitar</a></li>
    </ul>
```

---

## superseded site — `public/legacy/`

- **What:** older portfolio tree (v1) kept under `public/legacy/`. The primary site is served from `public/lab/` for `/` and related routes (see `server.js`).  
- **Archived / superseded:** no single cutover date recorded here—treat this folder as historical reference and use git for precise timelines.
