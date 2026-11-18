(function () {
  "use strict";

  document.querySelectorAll("[data-compare]").forEach(function (comparison) {
    var control = comparison.querySelector('input[type="range"]');
    if (!control) return;

    function update() {
      comparison.style.setProperty("--position", control.value + "%");
    }

    control.addEventListener("input", update);
    update();
  });

  document.querySelectorAll(".stills figure[tabindex]").forEach(function (figure) {
    figure.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        figure.click();
      }
    });
  });
})();
