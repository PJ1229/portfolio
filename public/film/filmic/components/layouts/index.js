import { renderCompare } from "./Compare.js";
import { renderFullBleed } from "./FullBleed.js";
import { renderQuote } from "./Quote.js";
import { renderRows } from "./Rows.js";
import { renderSplit } from "./Split.js";
import { renderSwatches } from "./Swatches.js";
import { renderTable } from "./Table.js";

const renderers = {
  compare: renderCompare,
  fullBleed: renderFullBleed,
  quote: renderQuote,
  rows: renderRows,
  split: renderSplit,
  swatches: renderSwatches,
  table: renderTable
};

export function renderLayout(slide, options = {}) {
  const renderer = renderers[slide.layout];
  if (!renderer) throw new Error(`Unknown Filmic layout: ${slide.layout}.`);
  return renderer(slide, options);
}
