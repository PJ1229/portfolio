/* Poster first. YouTube loads on click, privacy-enhanced, without the title bar sitting on the stage. */
(function () {
  "use strict";

  function embedUrl(id) {
    return "https://www.youtube-nocookie.com/embed/" + id +
      "?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1";
  }

  document.querySelectorAll(".player[data-youtube-id]").forEach(function (player) {
    var id = player.getAttribute("data-youtube-id") || "";
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    var button = player.querySelector(".player-launch");
    if (!button) return;

    button.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.src = embedUrl(id);
      frame.title = button.getAttribute("aria-label") || "Film";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.allowFullscreen = true;
      player.replaceChildren(frame);
    });
  });
})();
