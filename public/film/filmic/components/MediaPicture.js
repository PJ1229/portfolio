function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

export function createMediaPicture(image, options = {}) {
  const figure = element("figure", "filmic-media");
  figure.dataset.mediaId = image.id;
  figure.dataset.sourceLabel = image.label;

  const visual = element("div", "filmic-media__visual");
  if (image.src) {
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.width = image.width || 2048;
    img.height = image.height || 1152;
    img.loading = options.eager ? "eager" : "lazy";
    img.decoding = "async";
    if (options.eager) img.fetchPriority = "high";
    visual.append(img);
  } else {
    visual.classList.add("filmic-media__visual--empty");
    visual.append(element("span", "filmic-media__empty-label", image.slotId || "Media pending"));
  }

  const caption = element("figcaption", "filmic-media__caption");
  caption.append(element("span", "filmic-media__label", image.label));
  caption.append(element("span", "filmic-media__caption-text", image.caption.text));
  if (image.caption.draft) caption.dataset.draft = "true";

  figure.append(visual, caption);
  return figure;
}
