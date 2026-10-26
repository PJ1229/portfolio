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

  assert.ok(bom.includes("BOM Generator"));
  assert.ok(bom.includes("In development"));
  assert.ok(bom.includes("May 2025–present"));
  assert.ok(bom.includes("Software Engineering Co-Op"));
  assert.ok(bom.includes("Yazaki North America"));
  assert.ok(bom.includes("validated 17 of 17 parts"));
  assert.ok(bom.includes("Demo uses invented sample data."));
  assert.ok(bom.includes("Python / PySide6 / pytest"));
  assert.ok(!/Shipped/i.test(bom));

  assert.ok(checker.includes("Schematic Rule Checker"));
  assert.ok(checker.includes("In development"));
  assert.ok(checker.includes(">Yazaki<") || checker.includes("Yazaki</p>"));
  assert.ok(checker.includes("taping and clip rules"));
  assert.ok(checker.includes("Demo uses sample data."));
  assert.ok(checker.includes("Python / OCR / Tkinter / React/Node"));
  assert.ok(!checker.includes("May 2025"));
  assert.ok(!/Shipped/i.test(checker));

  for (const banned of [
    "Tesla", "Excel VBA", "PaddleOCR", "pdfplumber", "Tesseract", "openpyxl",
    "PyInstaller", "PyObjC", "FFmpeg", "Capital", "KBL", "automotive OEM",
    "github.com/PJ1229/um-autolog", "pending", "camera platform",
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
