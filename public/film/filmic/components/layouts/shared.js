import { createMediaPicture } from "../MediaPicture.js";

export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

export function media(image, options = {}) {
  const figure = createMediaPicture(image, { eager: options.eager });
  if (options.className) figure.classList.add(options.className);
  if (options.hideCaption) figure.classList.add("filmic-media--captionless");
  if (options.fit) figure.dataset.fit = options.fit;
  return figure;
}

export function label(text, className = "filmic-kicker") {
  return el("p", className, text);
}

export function numberedList(items, className = "filmic-points") {
  const list = el("ol", className);
  items.forEach((item, index) => {
    const row = el("li", `${className}__item`);
    row.append(
      el("span", `${className}__number`, String(index + 1).padStart(2, "0")),
      el("p", `${className}__text`, item)
    );
    list.append(row);
  });
  return list;
}

export function imageById(slide, id, fallbackIndex = 0) {
  return slide.images.find((image) => image.id === id) || slide.images[fallbackIndex];
}
