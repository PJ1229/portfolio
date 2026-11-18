(function () {
  "use strict";

  function bindCompare(comparison) {
    var control = comparison.querySelector('input[type="range"]');
    if (!control) return;

    function paint() {
      var value = Number(control.value);
      if (!Number.isFinite(value)) value = 50;
      value = Math.min(100, Math.max(0, value));
      comparison.style.setProperty("--position", value + "%");
    }

    function setFromPoint(clientX) {
      var rect = comparison.getBoundingClientRect();
      if (!rect.width) return;
      var ratio = (clientX - rect.left) / rect.width;
      control.value = String(Math.round(Math.min(100, Math.max(0, ratio * 100))));
      paint();
    }

    control.addEventListener("input", paint);
    control.addEventListener("change", paint);
    control.addEventListener("pointerdown", function (event) {
      control.focus();
      if (control.setPointerCapture) control.setPointerCapture(event.pointerId);
      setFromPoint(event.clientX);
    });
    control.addEventListener("pointermove", function (event) {
      if (!control.hasPointerCapture || !control.hasPointerCapture(event.pointerId)) return;
      setFromPoint(event.clientX);
    });
    paint();
  }

  document.querySelectorAll("[data-uns-compare]").forEach(bindCompare);

  document.querySelectorAll(".stills figure[tabindex]").forEach(function (figure) {
    figure.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        figure.click();
      }
    });
  });

  var heroVideo = document.querySelector(".uns-hero-video");
  if (!heroVideo) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function applyMotionPreference() {
    if (reducedMotion.matches) {
      heroVideo.pause();
      heroVideo.removeAttribute("autoplay");
    } else if (!document.hidden) {
      heroVideo.play().catch(function () {
        /* The poster remains visible if autoplay is unavailable. */
      });
    }
  }

  applyMotionPreference();
  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", applyMotionPreference);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) heroVideo.pause();
    else applyMotionPreference();
  });

  if ("IntersectionObserver" in window) {
    var videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) heroVideo.pause();
        else applyMotionPreference();
      });
    }, { threshold: 0.05 });
    videoObserver.observe(heroVideo);
  }
})();
