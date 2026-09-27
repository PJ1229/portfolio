import { el, imageById, label, media, numberedList } from "./shared.js";

function renderIdea(slide, options) {
  const copy = el("div", "filmic-idea-copy");
  copy.append(
    el("p", "filmic-statement", slide.body.lead),
    el("p", "filmic-statement filmic-statement--accent", slide.body.accent)
  );

  const visual = el("div", "filmic-idea-visual");
  visual.append(media(slide.images[0], { eager: options.eager, hideCaption: true }));
  const acts = el("ol", "filmic-acts");
  slide.body.acts.forEach((act) => {
    const item = el("li", "filmic-acts__item");
    item.append(el("span", "filmic-acts__number", act.numeral), el("p", null, act.text));
    acts.append(item);
  });
  visual.append(acts);
  return [copy, visual];
}

function renderRoom(slide, options) {
  const visual = el("div", "filmic-room-visual");
  visual.append(media(slide.images[0], { eager: options.eager }));
  const copy = el("div", "filmic-room-copy");
  copy.append(label("Location strategy"), numberedList(slide.body.points));
  return [visual, copy];
}

function renderEras(slide, options) {
  const grid = el("div", "filmic-era-grid");
  slide.body.looks.forEach((look, index) => {
    const card = el("article", "filmic-era");
    const image = imageById(slide, look.imageId, index);
    card.append(media(image, { eager: options.eager && index === 0, hideCaption: true }));
    const copy = el("div", "filmic-era__copy");
    copy.append(label(index === 0 ? "Present tense" : "Memory / history"), el("h3", null, look.name), el("p", null, look.description));
    card.append(copy);
    grid.append(card);
  });
  return [grid];
}

function renderPeople(slide, options) {
  const visual = el("div", "filmic-people-visual");
  visual.append(
    media(slide.images[0], { eager: options.eager, hideCaption: true }),
    media(slide.images[1], { hideCaption: true })
  );
  const copy = el("div", "filmic-people-copy");
  copy.append(label("Human coverage"), numberedList(slide.body.points));
  return [visual, copy];
}

function renderSocial(slide) {
  const copy = el("div", "filmic-social-copy");
  copy.append(
    label(`${slide.body.runtime} · ${slide.body.format}`, "filmic-timecode"),
    el("blockquote", "filmic-social-headline", slide.body.headline),
    el("p", "filmic-social-capture", slide.body.capture),
    el("p", "filmic-social-thesis", slide.body.thesis)
  );
  const visual = el("div", "filmic-social-visual");
  visual.append(media(slide.images[0], { hideCaption: true }));
  return [copy, visual];
}

export function renderSplit(slide, options) {
  const layout = el("div", `filmic-layout filmic-layout--split filmic-layout--${slide.id}`);
  const renderers = {
    "the-idea": renderIdea,
    "the-room": renderRoom,
    "two-eras": renderEras,
    people: renderPeople,
    "social-cut": renderSocial
  };
  const renderer = renderers[slide.id];
  if (!renderer) throw new Error(`No split renderer for ${slide.id}.`);
  layout.append(...renderer(slide, options));
  return layout;
}
