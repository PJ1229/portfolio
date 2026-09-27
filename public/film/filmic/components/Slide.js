import { renderLayout } from "./layouts/index.js";

export function createSlide(slide, index, total) {
  const section = document.createElement("section");
  section.className = `filmic-slide filmic-slide--${slide.layout}`;
  section.id = String(index + 1);
  section.dataset.slide = String(index + 1);
  section.dataset.slideId = slide.id;
  section.setAttribute("aria-labelledby", `filmic-slide-title-${index + 1}`);

  const header = document.createElement("header");
  header.className = "filmic-slide__header";

  const count = document.createElement("p");
  count.className = "filmic-slide__count";
  count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  const title = document.createElement("h2");
  title.id = `filmic-slide-title-${index + 1}`;
  title.className = "filmic-slide__title";
  title.textContent = slide.title;

  header.append(count, title);
  section.append(header, renderLayout(slide, { eager: index < 3 }));
  return section;
}
