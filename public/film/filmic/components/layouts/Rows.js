import { el, imageById, label, media } from "./shared.js";

function renderActs(slide, options) {
  const layout = el("div", "filmic-layout filmic-layout--rows filmic-act-rows");
  slide.body.rows.forEach((row, index) => {
    const article = el("article", "filmic-act-row");
    article.append(media(imageById(slide, row.imageId, index), {
      eager: options.eager && index === 0,
      hideCaption: true
    }));
    const copy = el("div", "filmic-act-row__copy");
    copy.append(
      label(row.timecode, "filmic-timecode"),
      el("h3", null, row.name),
      el("p", "filmic-act-row__description", row.description),
      el("p", "filmic-camera-line", row.camera)
    );
    article.append(copy);
    layout.append(article);
  });
  return layout;
}

function renderFood(slide) {
  const layout = el("div", "filmic-layout filmic-layout--rows filmic-food-layout");
  const copy = el("div", "filmic-food-copy");
  copy.append(
    label("Four passes / one build"),
    el("p", "filmic-food-lead", slide.body.lead),
    el("p", "filmic-food-placement", slide.body.placement)
  );
  const grid = el("div", "filmic-food-grid");
  slide.images.forEach((image, index) => {
    const item = el("div", "filmic-food-slot");
    item.append(label(String(index + 1).padStart(2, "0")), media(image, { hideCaption: true }));
    grid.append(item);
  });
  layout.append(copy, grid);
  return layout;
}

export function renderRows(slide, options) {
  if (slide.id === "three-acts") return renderActs(slide, options);
  if (slide.id === "food") return renderFood(slide, options);
  throw new Error(`No rows renderer for ${slide.id}.`);
}
