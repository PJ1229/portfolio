(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;

  var button = header.querySelector(".site-menu");
  var nav = document.getElementById("site-nav");

  function setOpen(open) {
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    if (button) button.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (button) {
    button.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });
  }

  if (nav) {
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });

  var stage = document.querySelector("body.has-stage .stage");
  function onScroll() {
    if (!stage) return;
    var over = window.scrollY < stage.offsetHeight - header.offsetHeight;
    header.classList.toggle("is-on-stage", over);
  }
  if (stage) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if (!tocLinks.length || !("IntersectionObserver" in window)) return;

  var byHref = {};
  tocLinks.forEach(function (link) {
    byHref[link.getAttribute("href")] = link;
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var link = byHref["#" + entry.target.id];
      if (!link) return;
      tocLinks.forEach(function (item) { item.removeAttribute("aria-current"); });
      link.setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-20% 0px -60% 0px", threshold: 0.01 });

  tocLinks.forEach(function (link) {
    var id = (link.getAttribute("href") || "").slice(1);
    var section = id && document.getElementById(id);
    if (section) observer.observe(section);
  });
})();
