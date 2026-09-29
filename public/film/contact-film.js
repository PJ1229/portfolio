(function () {
  "use strict";

  var section = document.querySelector("[data-contact-film]");
  if (!section) return;

  var video = section.querySelector("[data-contact-video], .contact-film-video");
  var playButton = section.querySelector("[data-contact-play]");
  var content = section.querySelector(".home-contact-content");
  var controls = section.querySelector("[data-contact-controls]");
  var toggleButton = section.querySelector("[data-contact-toggle]");
  var closeButton = section.querySelector("[data-contact-close]");
  var muteButton = section.querySelector("[data-contact-mute]");
  var fullscreenButton = section.querySelector("[data-contact-fullscreen]");
  var timeline = section.querySelector("[data-contact-timeline]");
  var currentLabel = section.querySelector("[data-contact-current]");
  var durationLabel = section.querySelector("[data-contact-duration]");
  if (!video || !playButton || !controls) return;

  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var active = false;
  var currentSource = "";
  var tracked = false;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "00:00";
    var rounded = Math.max(0, Math.floor(seconds));
    var minutes = Math.floor(rounded / 60);
    var remainder = rounded % 60;
    return String(minutes).padStart(2, "0") + ":" + String(remainder).padStart(2, "0");
  }

  function loadSource(source) {
    if (!source || currentSource === source) return false;
    video.src = source;
    video.load();
    currentSource = source;
    return true;
  }

  function updateControls() {
    var duration = Number.isFinite(video.duration) ? video.duration : 120;
    timeline.max = String(duration);
    timeline.value = String(video.currentTime || 0);
    timeline.setAttribute("aria-valuetext", formatTime(video.currentTime) + " of " + formatTime(duration));
    currentLabel.textContent = formatTime(video.currentTime);
    durationLabel.textContent = formatTime(duration);
    toggleButton.textContent = video.paused ? "PLAY" : "PAUSE";
    toggleButton.setAttribute("aria-label", video.paused ? "Play film" : "Pause film");
    muteButton.textContent = video.muted ? "UNMUTE" : "MUTE";
    muteButton.setAttribute("aria-label", video.muted ? "Unmute film" : "Mute film");
  }

  function preview() {
    if (active || !canHover.matches || reducedMotion.matches || saveData) return;
    loadSource(video.dataset.previewSrc || video.dataset.src);
    video.muted = true;
    section.classList.add("is-previewing");
    video.play().catch(function () {
      section.classList.remove("is-previewing");
    });
  }

  function stopPreview() {
    if (active) return;
    section.classList.remove("is-previewing");
    video.pause();
    try { video.currentTime = 0; } catch (error) { /* metadata may not be ready */ }
  }

  function playFullFilm() {
    loadSource(video.dataset.src);
    active = true;
    section.classList.remove("is-previewing");
    section.classList.add("is-playing");
    if (content) content.setAttribute("aria-hidden", "true");
    controls.hidden = false;
    try { video.currentTime = 0; } catch (error) { /* metadata may not be ready */ }
    video.muted = false;
    video.play().catch(function () {
      video.muted = true;
      video.play().catch(function () {});
    });
    if (!tracked && typeof window.gtag === "function") {
      window.gtag("event", "video_play", { video_name: "Verci fellowship film" });
      tracked = true;
    }
    updateControls();
    window.requestAnimationFrame(function () {
      toggleButton.focus({ preventScroll: true });
    });
  }

  function closeFilm(options) {
    active = false;
    video.pause();
    video.muted = true;
    try { video.currentTime = 0; } catch (error) { /* metadata may not be ready */ }
    section.classList.remove("is-playing", "is-previewing");
    if (content) content.removeAttribute("aria-hidden");
    controls.hidden = true;
    updateControls();
    if (!options || options.focus !== false) playButton.focus();
  }

  playButton.addEventListener("click", playFullFilm);
  section.addEventListener("pointerenter", preview);
  section.addEventListener("pointerleave", stopPreview);
  playButton.addEventListener("focus", preview);
  section.addEventListener("focusout", function (event) {
    if (!section.contains(event.relatedTarget)) stopPreview();
  });

  toggleButton.addEventListener("click", function () {
    if (video.paused) video.play().catch(function () {});
    else video.pause();
  });
  closeButton.addEventListener("click", function () { closeFilm(); });
  muteButton.addEventListener("click", function () {
    video.muted = !video.muted;
    updateControls();
  });
  fullscreenButton.addEventListener("click", function () {
    var target = section;
    if (target.requestFullscreen) target.requestFullscreen();
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  });
  timeline.addEventListener("input", function () {
    video.currentTime = Number(timeline.value);
    updateControls();
  });

  video.addEventListener("loadedmetadata", updateControls);
  video.addEventListener("durationchange", updateControls);
  video.addEventListener("timeupdate", updateControls);
  video.addEventListener("play", updateControls);
  video.addEventListener("pause", updateControls);
  video.addEventListener("volumechange", updateControls);
  video.addEventListener("ended", function () {
    if (active) {
      closeFilm({ focus: false });
      return;
    }
    if (section.classList.contains("is-previewing")) {
      video.currentTime = 0;
      video.play().catch(function () {});
    }
  });
  video.addEventListener("error", function () {
    section.classList.remove("is-previewing", "is-playing");
    controls.hidden = true;
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && active) closeFilm();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting && active) {
        video.pause();
        updateControls();
      }
    }, { threshold: 0.1 }).observe(section);
  }

  updateControls();
})();
