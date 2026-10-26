const test = require("node:test");
const assert = require("node:assert/strict");
const render = require("./render");
const content = require("./content");

test("renders three finished projects, public links, and escaped HTML", () => {
  const data = structuredClone(content);
  data.projects[0].name = 'Changed <script>alert("x")</script>';
  const html = render(data);
  assert.equal((html.match(/<article /g) || []).length, 3);
  assert.equal((html.match(/<iframe /g) || []).length, 3);
  assert.equal((html.match(/<h1 /g) || []).length, 1);
  assert.ok(html.includes("Changed &lt;script&gt;"));
  assert.ok(!html.includes('<script>alert("x")</script>'));
  assert.ok(!html.includes('src=""'));
  assert.ok(!/pending/i.test(html));
  assert.ok(!/camera platform/i.test(html));
  assert.ok(html.includes('href="/#info"'));
  assert.ok(!html.includes('href="/about"'));
  assert.ok(html.includes("https://github.com/PJ1229/um-autolog"));
  assert.ok(html.includes("https://youtu.be/3N1zfZ2oOhQ"));
  assert.ok(html.includes("https://youtu.be/3-hsH8Vi_Ro"));
  assert.ok(html.includes("https://youtu.be/S6AR5nTcQ0s"));
  assert.ok(html.includes("https://www.youtube-nocookie.com/embed/3N1zfZ2oOhQ"));
  assert.ok(html.includes("https://www.youtube-nocookie.com/embed/3-hsH8Vi_Ro"));
  assert.ok(html.includes("https://www.youtube-nocookie.com/embed/S6AR5nTcQ0s"));
  assert.ok(html.includes("Apple Vision"));
  assert.ok(html.includes("Streamlit"));
  assert.ok(!html.includes("Excel VBA"));
  assert.ok(html.includes("pdfplumber"));
  assert.ok(html.includes("Tesseract OCR"));
  assert.ok(html.includes("openpyxl"));
  assert.ok(html.includes("PyInstaller (Mac app)"));
  assert.ok(html.includes("In active development"));
  assert.ok(html.includes("May–Oct 2026"));
  assert.ok(html.includes("automotive OEM&#39;s harness data"));
  const bom = html.split("<article ").slice(1)[1];
  assert.ok(!bom.includes("Shipped"));
  assert.ok(html.includes("PaddleOCR"));
  assert.ok(html.includes("Tkinter"));
  assert.ok(!html.includes("React"));
  assert.ok(!html.includes("Express"));
  assert.ok(html.includes("Aug 2026"));
  assert.ok(html.includes("May 2025"));
  assert.ok(html.includes("Bill of Materials"));
  assert.ok(html.includes("Wiring Drawing Rule Checker"));
});

test("unsafe repository urls and video ids are omitted", () => {
  const html = render.renderProject({
    name: "Unsafe",
    status: "Shipped",
    year: "2026",
    role: "Developer",
    context: "",
    problem: "A problem.",
    solution: "A solution.",
    stack: ["Python"],
    repo: "javascript:alert(1)",
    demo: "https://youtu.be/3N1zfZ2oOhQ",
    videoId: 'abc"><script>',
  }, 0);
  assert.ok(!html.includes("javascript:"));
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes("<iframe"));
  assert.ok(html.includes("https://youtu.be/3N1zfZ2oOhQ"));
  assert.ok(html.includes("A problem."));
  assert.ok(html.includes("A solution."));
});
