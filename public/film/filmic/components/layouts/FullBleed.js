import { el, label, media } from "./shared.js";

export function renderFullBleed(slide, options) {
  const layout = el("div", "filmic-layout filmic-layout--fullBleed");
  layout.append(media(slide.images[0], {
    eager: options.eager,
    className: "filmic-hero-media",
    hideCaption: true
  }));

  const copy = el("div", "filmic-hero-copy");
  copy.append(label(slide.body.sub, "filmic-hero-sub"));
  if (slide.body.cornerLabel) copy.append(label(slide.body.cornerLabel, "filmic-hero-corner"));
  layout.append(copy);
  return layout;
}
