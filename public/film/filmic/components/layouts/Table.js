import { el, label } from "./shared.js";

function createTable(columns, rows, options = {}) {
  const table = el("table", `filmic-table ${options.className || ""}`.trim());
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  columns.forEach((column) => headRow.append(el("th", null, column)));
  head.append(headRow);
  table.append(head);

  const body = document.createElement("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.total) tr.classList.add("filmic-table__total");
    const values = Object.entries(row)
      .filter(([key]) => !["imageId", "total"].includes(key))
      .map(([, value]) => value);
    values.forEach((value) => tr.append(el("td", null, String(value))));
    body.append(tr);
  });
  table.append(body);
  return table;
}

function renderShotList(slide) {
  const layout = el("div", "filmic-layout filmic-layout--table filmic-shot-list");
  layout.append(createTable(slide.body.columns, slide.body.rows));
  return layout;
}

function renderProduction(slide) {
  const layout = el("div", "filmic-layout filmic-layout--table filmic-production");
  const overview = el("div", "filmic-production__overview");
  overview.append(label("Kit"), el("p", "filmic-kit", slide.body.kit), label("Schedule"));
  const days = el("div", "filmic-days");
  slide.body.schedule.forEach((day) => {
    const item = el("div", "filmic-day");
    item.append(el("strong", null, day.day), el("p", null, day.plan));
    days.append(item);
  });
  overview.append(days);

  const budget = el("div", "filmic-budget");
  budget.append(label(slide.body.budgetLabel), createTable(slide.body.columns, slide.body.rows, { className: "filmic-budget-table" }));
  layout.append(overview, budget);
  return layout;
}

export function renderTable(slide) {
  if (slide.id === "shot-list") return renderShotList(slide);
  if (slide.id === "production") return renderProduction(slide);
  throw new Error(`No table renderer for ${slide.id}.`);
}
