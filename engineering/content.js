// Server-only content. Do not move this file into public/.
// Public copy stays free of customer metrics, internal names, and unpublished specs.
// The bill-of-materials generator is a Python desktop app and CLI. Do not describe
// it as Excel VBA or as shipped, and do not name the automotive customer.
module.exports = {
  headline: "Engineering",
  summary: "Electrical engineering at the University of Michigan. Michigan Athletics creative video intern (Aug 2026–now) and Yazaki North America software engineering co-op (since May 2025).",
  projects: [
    {
      slug: "um-autolog",
      name: "um-autolog",
      status: "Shipped",
      year: "2026",
      context: "Michigan Athletics",
      role: "Developer",
      problem: "Jersey numbers in game footage were logged by hand.",
      solution: "Apple Vision OCR proposes the numbers, and a Streamlit review UI confirms them before the log is applied.",
      stack: ["Python", "Apple Vision", "PyObjC", "FFmpeg", "Streamlit"],
      repo: "https://github.com/PJ1229/um-autolog",
      demo: "https://youtu.be/3N1zfZ2oOhQ",
      videoId: "3N1zfZ2oOhQ",
    },
    {
      slug: "yazaki-bom",
      name: "Yazaki Bill of Materials Generator",
      status: "In active development",
      year: "May–Oct 2026",
      context: "Yazaki North America co-op",
      role: "Software engineering co-op",
      problem: "Assembly bill-of-materials tables are split across an automotive OEM's harness data.",
      solution: "A Python desktop app and CLI extract them from Capital HDSI, KBL/XML, text PDFs, and image-only PDFs with local Tesseract OCR, merge and dedupe the rows, and export a formatted Excel workbook for purchasing.",
      stack: ["Python", "pdfplumber", "Tesseract OCR", "openpyxl", "PyInstaller (Mac app)"],
      repo: null,
      demo: "https://youtu.be/3-hsH8Vi_Ro",
      videoId: "3-hsH8Vi_Ro",
    },
    {
      slug: "yazaki-rule-checker",
      name: "Yazaki Wiring Drawing Rule Checker",
      status: "Shipped",
      year: "2026",
      context: "Yazaki North America co-op",
      role: "Software engineering co-op",
      problem: "Wiring drawings had to be checked against the drawing rules by hand.",
      solution: "A desktop tool reads the drawings with PaddleOCR and checks them against the rules.",
      stack: ["Python", "Tkinter", "PaddleOCR"],
      repo: null,
      demo: "https://youtu.be/S6AR5nTcQ0s",
      videoId: "S6AR5nTcQ0s",
    },
  ],
};
