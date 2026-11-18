const ITEMS = [
  { id: "work", label: "Work", href: "/" },
  { id: "engineering", label: "Engineering", href: "/engineering" },
  { id: "writing", label: "Writing", href: "/writing", external: true },
  { id: "about", label: "About", href: "/#info" },
];

function renderHeader(current) {
  const aboutHref = current === "work" ? "#info" : "/#info";
  const links = ITEMS.map((item) => {
    const href = item.id === "about" ? aboutHref : item.href;
    if (item.id === current) {
      return `<a href="${href}" aria-current="page">${item.label}</a>`;
    }
    if (item.external) {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${item.label} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`;
    }
    return `<a href="${href}">${item.label}</a>`;
  }).join("");

  return `<header class="site-header">
    <div class="site-header-inner">
      <a class="site-mark" href="/">PJ Kim</a>
      <button class="site-menu" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Primary">${links}</nav>
    </div>
  </header>
  <script src="/film/nav.js" defer></script>`;
}

function renderFooter() {
  return `<footer class="site-footer">
    <div class="site-footer-inner">
      <p>© PJ Kim</p>
      <nav aria-label="Footer">
        <a href="/inspo">Inspo</a>
        <a href="https://www.youtube.com/@pj.k1m" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://www.instagram.com/pj.k1m/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="mailto:pekim@umich.edu">Email</a>
      </nav>
    </div>
  </footer>`;
}

module.exports = { renderHeader, renderFooter };
