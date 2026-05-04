# ideas backlog

Short-lived notes for things that are not built yet but worth keeping.

---

## summer series: auto view counts & cross-post comparison

**Goal:** Pull public metrics (views, etc.) from the links in [summer series](public/lab/summer-series.html) so each week and each reel can be compared on the page.

**Reality check:**

- **YouTube:** Feasible. [YouTube Data API v3](https://developers.google.com/youtube/v3/docs/videos/list) `videos.list` with `part=statistics` returns `viewCount` for video IDs. This repo already calls the YouTube API for `/api/guitar-videos` in `server.js` using `YOUTUBE_API_KEY`. A similar **server route + caching** (respect quota) could merge stats into the summer UI; **never** ship the API key to the browser.
- **Instagram:** Not practical for arbitrary `instagram.com/p/…` URLs via official APIs unless the media is on **your** connected Business/Creator account (Graph API, tokens, app setup). Scraping is brittle and off-policy.
- **TikTok:** Same class of problem—official APIs expect app registration, scopes, and account linkage; not a generic “paste URL → views” for a static portfolio.

**Possible v1:** Auto stats for **YouTube only** on the summer page; optional **manual** fields (or a small committed JSON updated locally) for IG/TikTok until/unless Meta/TikTok integrations are worth it.

**Alternative:** A local script (cron or ad hoc) that hits YouTube, writes `public/lab/data/summer-stats.json`, commit and deploy—stats update without a long-lived server secret on production (key stays on your machine).

---
