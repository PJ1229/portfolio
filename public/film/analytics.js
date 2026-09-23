(function () {
  "use strict";

  function track(name, parameters) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, parameters || {});
  }

  document.querySelectorAll(".project[href]").forEach(function (link) {
    link.addEventListener("click", function () {
      track("project_open", {
        project_name: link.querySelector("h2") ? link.querySelector("h2").textContent.trim() : link.href,
      });
    });
  });

  document.querySelectorAll("[data-track-contact]").forEach(function (link) {
    link.addEventListener("click", function () {
      track("contact_click", { contact_method: "email" });
    });
  });

  document.querySelectorAll("[data-track-media]").forEach(function (media) {
    media.addEventListener("play", function onFirstPlay() {
      track("video_play", { video_name: media.dataset.trackMedia });
      media.removeEventListener("play", onFirstPlay);
    });
  });

  document.querySelectorAll("[data-compare] input[type='range']").forEach(function (control) {
    control.addEventListener("input", function onFirstCompare() {
      track("grade_compare", { project_name: "December" });
      control.removeEventListener("input", onFirstCompare);
    });
  });
})();
