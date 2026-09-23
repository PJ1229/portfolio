(function () {
  "use strict";

  var comparison = document.querySelector("[data-uns-compare]");
  if (comparison) {
    var comparisonControl = comparison.querySelector('input[type="range"]');
    if (comparisonControl) {
      var updateComparison = function () {
        comparison.style.setProperty("--position", comparisonControl.value + "%");
      };
      comparisonControl.addEventListener("input", updateComparison);
      updateComparison();
    }
  }

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
