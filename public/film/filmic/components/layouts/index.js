import { createMediaPicture } from "../MediaPicture.js";

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function humanize(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function renderScalar(key, value) {
  const wrapper = element("div", `filmic-copy filmic-copy--${key}`);
  if (!["lead", "accent", "sub", "headline", "thesis", "quote", "close"].includes(key)) {
    wrapper.append(element("span", "filmic-copy__key", humanize(key)));
  }
  wrapper.append(element("p", "filmic-copy__value", value));
  return wrapper;
}

function renderArray(key, values) {
  const wrapper = element("section", `filmic-group filmic-group--${key}`);
  wrapper.append(element("h3", "filmic-group__title", humanize(key)));
  const list = element("ol", "filmic-list");
  values.forEach((value) => {
    const item = element("li", "filmic-list__item");
    if (typeof value === "string") {
      item.textContent = value;
    } else {
      Object.entries(value).forEach(([childKey, childValue]) => {
        if (childValue === null || childKey === "imageId") return;
        item.append(renderValue(childKey, childValue));
      });
    }
    list.append(item);
  });
  wrapper.append(list);
  return wrapper;
}

function renderObject(key, value) {
  const wrapper = element("section", `filmic-group filmic-group--${key}`);
  wrapper.append(element("h3", "filmic-group__title", humanize(key)));
  Object.entries(value).forEach(([childKey, childValue]) => {
    wrapper.append(renderValue(childKey, childValue));
  });
  return wrapper;
}

function renderValue(key, value) {
  if (Array.isArray(value)) return renderArray(key, value);
  if (value && typeof value === "object") return renderObject(key, value);
  return renderScalar(key, String(value));
}

function renderBody(body) {
  const copy = element("div", "filmic-slide__copy");
  Object.entries(body || {}).forEach(([key, value]) => {
    if (key === "rows" || key === "columns" || value === null) return;
    copy.append(renderValue(key, value));
  });
  return copy;
}

function renderMedia(images, options = {}) {
  const media = element("div", "filmic-slide__media");
  images.forEach((image, index) => {
    media.append(createMediaPicture(image, { eager: Boolean(options.eager && index === 0) }));
  });
  return media;
}

function renderRows(slide, options) {
  const body = element("div", "filmic-slide__copy filmic-rows");
  const rows = slide.body.rows || [];
  rows.forEach((row, index) => {
    const article = element("article", "filmic-row");
    const image = slide.images.find((item) => item.id === row.imageId) || slide.images[index];
    if (image) article.append(createMediaPicture(image, { eager: Boolean(options.eager && index === 0) }));
    const text = element("div", "filmic-row__copy");
    Object.entries(row).forEach(([key, value]) => {
      if (key === "imageId" || value === null) return;
      text.append(renderValue(key, value));
    });
    article.append(text);
    body.append(article);
  });

  const remaining = Object.fromEntries(Object.entries(slide.body).filter(([key]) => key !== "rows"));
  if (Object.keys(remaining).length) body.prepend(renderBody(remaining));
  return body;
}

function renderTable(slide) {
  const wrapper = element("div", "filmic-slide__copy filmic-table-wrap");
  const preface = Object.fromEntries(
    Object.entries(slide.body).filter(([key]) => !["columns", "rows"].includes(key))
  );
  if (Object.keys(preface).length) wrapper.append(renderBody(preface));

  const table = element("table", "filmic-table");
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  slide.body.columns.forEach((column) => headRow.append(element("th", null, column)));
  head.append(headRow);
  table.append(head);

  const body = document.createElement("tbody");
  slide.body.rows.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.total) tr.classList.add("filmic-table__total");
    const values = Object.entries(row)
      .filter(([key]) => !["imageId", "total"].includes(key))
      .map(([, value]) => value);
    values.forEach((value) => tr.append(element("td", null, String(value))));
    body.append(tr);
  });
  table.append(body);
  wrapper.append(table);
  return wrapper;
}

function renderSwatches(slide) {
  const wrapper = element("div", "filmic-slide__copy");
  const grid = element("div", "filmic-swatches");
  slide.body.swatches.forEach((swatch) => {
    const item = element("article", "filmic-swatch");
    const chip = element("span", "filmic-swatch__chip");
    chip.style.backgroundColor = swatch.hex;
    chip.setAttribute("aria-label", `${swatch.name}, ${swatch.hex}`);
    item.append(chip, element("strong", null, swatch.name), element("span", null, swatch.hex));
    grid.append(item);
  });
  wrapper.append(grid, renderScalar("caption", slide.body.caption));
  return wrapper;
}

function renderCompare(slide) {
  const wrapper = element("div", "filmic-slide__copy filmic-compare-placeholder");
  wrapper.append(renderBody(slide.body));
  const selected = slide.images.find((image) => image.id === "frame-01-log");
  const result = slide.images.find((image) => image.id === "frame-01-graded");
  const pair = element("div", "filmic-compare-placeholder__pair");
  if (selected) pair.append(createMediaPicture(selected));
  if (result) pair.append(createMediaPicture(result));
  wrapper.append(pair, element("p", "filmic-placeholder-note", "Interactive wipe and filmstrip arrive in M3."));
  return wrapper;
}

export function renderLayout(slide, options = {}) {
  const layout = element("div", `filmic-layout filmic-layout--${slide.layout}`);

  if (slide.layout === "rows" && slide.body.rows) {
    layout.append(renderRows(slide, options));
    return layout;
  }

  if (slide.layout === "table") {
    layout.append(renderTable(slide));
    return layout;
  }

  if (slide.layout === "swatches") {
    layout.append(renderSwatches(slide));
    return layout;
  }

  if (slide.layout === "compare") {
    layout.append(renderCompare(slide));
    return layout;
  }

  layout.append(renderBody(slide.body));
  if (slide.images.length) layout.append(renderMedia(slide.images, options));
  return layout;
}
