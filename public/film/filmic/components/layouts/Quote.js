import { el, media } from "./shared.js";

export function renderQuote(slide, options) {
  const layout = el("div", "filmic-layout filmic-layout--quote");
  layout.append(media(slide.images[0], {
    eager: options.eager,
    className: "filmic-hero-media",
    hideCaption: true
  }));

  const footer = el("div", "filmic-quote-footer");
  footer.append(
    el("p", "filmic-quote-attribution", slide.body.attribution),
    el("p", "filmic-quote-close", slide.body.close)
  );
  layout.append(footer);
  return layout;
}
