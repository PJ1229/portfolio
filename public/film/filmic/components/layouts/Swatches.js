import { el, imageById, label, media } from "./shared.js";

export function renderSwatches(slide, options) {
  const layout = el("div", "filmic-layout filmic-layout--swatches");
  const grid = el("div", "filmic-swatch-grid");
  slide.body.swatches.forEach((swatch) => {
    const item = el("article", "filmic-swatch");
    const chip = el("span", "filmic-swatch__chip");
    chip.style.backgroundColor = swatch.hex;
    chip.setAttribute("aria-label", `${swatch.name}, ${swatch.hex}`);
    item.append(
      chip,
      el("h3", null, swatch.name),
      el("p", "filmic-swatch__hex", swatch.hex),
      label(swatch.sampledFrom.replace("frame-", "Frame "), "filmic-swatch__source")
    );
    grid.append(item);
  });

  const source = el("div", "filmic-palette-source");
  const image = imageById(slide, "frame-04-graded");
  source.append(media(image, { eager: options.eager, hideCaption: true }), label(slide.body.caption));
  layout.append(grid, source);
  return layout;
}
