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

  document.querySelectorAll("[data-compare]").forEach(bindCompare);

  document.querySelectorAll(".stills figure[tabindex]").forEach(function (figure) {
    figure.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        figure.click();
      }
    });
  });
})();
