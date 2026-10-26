const test = require("node:test");
const assert = require("node:assert/strict");
const render = require("./render");
const content = require("./content");

test("renders the three approved cards, demo embeds, and escaped HTML", () => {
  const data = structuredClone(content);
  data.projects[0].name = 'Changed <script>alert("x")</script>';
  const html = render(data);
  assert.equal((html.match(/<article /g) || []).length, 3);
  assert.equal((html.match(/<iframe /g) || []).length, 3);
  assert.equal((html.match(/<h1 /g) || []).length, 1);
  assert.ok(html.includes("Changed &lt;script&gt;"));
  assert.ok(!html.includes('<script>alert("x")</script>'));
  assert.ok(!html.includes('src=""'));
  assert.ok(!html.includes("github.com/PJ1229/um-autolog"));
  assert.ok(!html.includes('href="/about"'));
  assert.ok(html.includes('href="/#info"'));
  assert.ok(html.includes("https://youtu.be/3N1zfZ2oOhQ"));
  assert.ok(html.includes("https://youtu.be/3-hsH8Vi_Ro"));
  assert.ok(html.includes("https://youtu.be/S6AR5nTcQ0s"));
  assert.ok(html.includes("https://www.youtube-nocookie.com/embed/3N1zfZ2oOhQ"));
  assert.ok(html.includes("https://www.youtube-nocookie.com/embed/3-hsH8Vi_Ro"));
  assert.ok(html.includes("https://www.youtube-nocookie.com/embed/S6AR5nTcQ0s"));

  const [autolog, bom, checker] = html.split("<article ").slice(1);
  assert.ok(autolog.includes("In development"));
  assert.ok(autolog.includes("Aug 2026–present"));
  assert.ok(autolog.includes("Creative Video Intern"));
  assert.ok(autolog.includes("Michigan Athletics"));
  assert.ok(autolog.includes("25BKW_1OSU_005_#05 JUMPER"));
  assert.ok(autolog.includes("29 sports and 269 action tags"));
  assert.ok(autolog.includes("jersey accuracy is the next focus"));
  assert.ok(autolog.includes("Python / Apple Vision / SoundAnalysis / ffmpeg / Streamlit"));
  assert.ok(!autolog.includes("Repository"));
  assert.ok(!/Shipped/i.test(autolog));

  assert.ok(bom.includes("Bill of Materials Generator"));
  assert.ok(bom.includes("In active development"));
  assert.ok(bom.includes("May 2025–present"));
  assert.ok(bom.includes("Software engineering co-op"));
  assert.ok(bom.includes("Yazaki North America"));
  assert.ok(bom.includes("slow, repetitive, and error-prone"));
  assert.ok(bom.includes("per-harness and combined views"));
  assert.ok(bom.includes("Built for Tesla EV wiring-harness data, which PJ owned end to end, from design through deployment and support."));
  assert.ok(bom.includes("Python / PySide6 / Excel export / pytest"));
  assert.ok(!bom.includes("17 of 17"));
  assert.ok(!bom.includes("44/50"));
  assert.ok(!/Shipped/i.test(bom));

  assert.ok(checker.includes("Wiring Drawing Rule Checker"));
  assert.ok(checker.includes("In active development"));
  assert.ok(checker.includes("May 2025–present"));
  assert.ok(checker.includes("taping and clipping rules"));
  assert.ok(checker.includes("flags rule violations right on the drawing"));
  assert.ok(checker.includes("Root-caused a systematic defect driving ~$44K in savings per frame harness and cut review time 88% (128 hrs to under 16)."));
  assert.ok(checker.includes("Python / Tkinter / React/Node / pytest"));
  assert.ok(!checker.includes("17 of 17"));
  assert.ok(!checker.includes("44/50"));
  assert.ok(!checker.includes("OCR"));
  assert.ok(!/Shipped/i.test(checker));

  for (const banned of [
    "Excel VBA", "PaddleOCR", "pdfplumber", "Tesseract", "openpyxl",
    "PyInstaller", "PyObjC", "FFmpeg", "Capital", "KBL", "automotive OEM",
    "github.com/PJ1229/um-autolog", "pending", "camera platform", "17 of 17", "17/17", "44/50",
    "Demo uses invented sample data", "Demo uses sample data",
  ]) {
    assert.ok(!html.includes(banned), banned);
  }
});

test("unsafe repository urls and video ids are omitted", () => {
  const html = render.renderProject({
    name: "Unsafe",
    status: "In development",
    year: "",
    role: "",
    context: "",
    description: 'A <script>alert("x")</script> description.',
    stack: ["Python"],
    repo: "javascript:alert(1)",
    demo: "https://youtu.be/3N1zfZ2oOhQ",
    videoId: 'abc"><script>',
  }, 0);
  assert.ok(!html.includes("javascript:"));
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes("<iframe"));
  assert.ok(html.includes("https://youtu.be/3N1zfZ2oOhQ"));
  assert.ok(html.includes("A &lt;script&gt;"));
});
