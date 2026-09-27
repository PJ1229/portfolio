import { el, imageById, label, media } from "./shared.js";

export function renderCompare(slide) {
  const layout = el("div", "filmic-layout filmic-layout--compare");
  const comparison = el("div", "filmic-compare-stage");
  const log = media(imageById(slide, "frame-01-log"), { hideCaption: true });
  const graded = media(imageById(slide, "frame-01-graded"), { hideCaption: true });
  log.dataset.state = "LOG";
  graded.dataset.state = "GRADED";
  comparison.append(log, graded);

  const copy = el("div", "filmic-compare-copy");
  copy.append(
    label(slide.body.defaultPair, "filmic-timecode"),
    el("p", "filmic-compare-direction", slide.body.gradeDirection),
    el("p", "filmic-compare-instruction", slide.body.instruction)
  );
  layout.append(comparison, copy);
  return layout;
}
