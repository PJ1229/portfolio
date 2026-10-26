const content = require("./content");

function escape(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}

function httpsUrl(value) {
  const url = String(value || "");
  return /^https:\/\/[^\s"'<>]+$/.test(url) ? url : "";
}

function youtubeId(value) {
  const id = String(value || "");
  return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : "";
}

function renderProject(project, index) {
  const id = youtubeId(project.videoId);
  const repo = httpsUrl(project.repo);
  const demo = httpsUrl(project.demo);
  const links = [
    repo ? `<a href="${escape(repo)}" target="_blank" rel="noopener noreferrer">Repository <span aria-hidden="true">↗</span></a>` : "",
    demo ? `<a href="${escape(demo)}" target="_blank" rel="noopener noreferrer">Demo <span aria-hidden="true">↗</span></a>` : "",
  ].filter(Boolean).join("");
  const video = id
    ? `<div class="engineering-video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${escape(project.name)} demo" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`
    : "";
  const stack = Array.isArray(project.stack) ? project.stack.filter(Boolean) : [];
  const who = [project.role, project.context].filter(Boolean).map(escape).join(" / ");
  return `<article class="engineering-project" aria-labelledby="project-${index}">
    <div class="engineering-project-heading">
      <h2 class="disp" id="project-${index}">${escape(project.name)}</h2>
      <p class="engineering-status">${escape(project.status)}${project.year ? `<br>${escape(project.year)}` : ""}</p>
    </div>
    ${who ? `<p class="engineering-context">${who}</p>` : ""}
    ${project.description ? `<p class="engineering-description">${escape(project.description)}</p>` : ""}
    ${project.demoNote ? `<p class="engineering-demo-note">${escape(project.demoNote)}</p>` : ""}
    ${stack.length ? `<p class="engineering-stack"><span>Stack</span> ${escape(stack.join(" / "))}</p>` : ""}
    ${links ? `<p class="engineering-links">${links}</p>` : ""}
    ${video}
  </article>`;
}

function render(data = content) {
  return `<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Engineering — PJ Kim</title>
  <meta name="description" content="${escape(data.summary)}">
  <link rel="canonical" href="https://pjk1m.com/engineering">
  <link rel="icon" href="/images/logo.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/film/film.css"><link rel="stylesheet" href="/engineering/engineering.css">
</head><body class="film-page engineering-page">
  <a class="engineering-skip" href="#main">Skip to content</a>
  <header class="nav engineering-nav">
    <a href="/">PJ KIM</a>
    <nav class="nav-links" aria-label="Primary">
      <a href="/">WORK</a>
      <span aria-current="page">ENGINEERING</span>
      <a href="/writing">WRITING</a>
      <a href="/#info">INFO</a>
      <a href="/inspo">INSPO</a>
    </nav>
  </header>
  <main id="main" tabindex="-1">
    <div class="engineering-intro">
      <nav class="engineering-breadcrumb" aria-label="Breadcrumb"><a href="/">work</a><span aria-hidden="true"> / </span><span aria-current="page">engineering</span></nav>
      <h1 class="disp">${escape(data.headline)}</h1>
      <p class="engineering-positioning">${escape(data.summary)}</p>
    </div>
    <section class="engineering-datasheets" aria-label="Projects">${data.projects.map(renderProject).join("")}</section>
    <p class="engineering-crosslink">The same practice, through another lens. <a href="/">Explore the film work <span aria-hidden="true">↗</span></a></p>
  </main>
  <footer class="monogram"><a href="/inspo">INSPO</a> · PJK1M</footer>
</body></html>`;
}

module.exports = render;
module.exports.renderProject = renderProject;
