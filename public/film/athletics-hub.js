(function () {
  "use strict";

  var title = document.querySelector("[data-athletics-title]");
  var role = document.querySelector("[data-athletics-role]");
  var intro = document.querySelector("[data-athletics-intro]");
  var grid = document.querySelector("[data-athletics-grid]");
  if (title) title.textContent = ATHLETICS.title;
  if (role) role.textContent = ATHLETICS.role + " · " + ATHLETICS.dates;
  if (intro) intro.textContent = ATHLETICS.intro;
  if (!grid || !ATHLETICS.videos) return;

  function creditLine(video) {
    var parts = [];
    if (video.role && video.role.length) {
      var job = video.role.join(", ");
      if (job === "Editor") job = "Edit";
      parts.push(job + " PJ Kim");
    }
    if (video.camera && video.camera.length) {
      parts.push("Camera " + video.camera.join(", "));
    }
    return parts.join(" · ");
  }

  ATHLETICS.videos.forEach(function (video, index) {
    var entry = document.createElement("article");
    entry.className = "athletics-entry";
    entry.id = video.slug;

    var player = document.createElement("div");
    player.className = "player";
    if (/^[A-Za-z0-9_-]{11}$/.test(video.youtubeId || "")) {
      player.setAttribute("data-youtube-id", video.youtubeId);
      var button = document.createElement("button");
      button.type = "button";
      button.className = "player-launch";
      button.setAttribute("aria-label", "Play " + video.title);
      if (video.poster) {
        var poster = document.createElement("img");
        poster.className = "player-poster";
        poster.src = video.poster;
        poster.alt = video.posterAlt || "";
        poster.decoding = "async";
        if (index === 0) {
          poster.loading = "eager";
          poster.setAttribute("fetchpriority", "high");
        } else {
          poster.loading = "lazy";
        }
        button.appendChild(poster);
      }
      var play = document.createElement("span");
      play.textContent = "Play";
      button.appendChild(play);
      player.appendChild(button);
    }

    var heading = document.createElement(video.page ? "a" : "h2");
    heading.className = "athletics-name";
    heading.textContent = video.title;
    if (video.page) heading.href = "/athletics/" + video.slug;

    var kicker = document.createElement("p");
    kicker.className = "athletics-kicker";
    kicker.textContent = [video.sport, video.year].filter(Boolean).join(" · ");

    var credit = document.createElement("p");
    credit.className = "athletics-credit";
    credit.textContent = creditLine(video);

    entry.append(player, heading, kicker, credit);

    if (video.stills && video.stills.length) {
      var strip = document.createElement("div");
      strip.className = "stills athletics-strip";
      video.stills.forEach(function (still) {
        var figure = document.createElement("figure");
        figure.tabIndex = 0;
        var img = document.createElement("img");
        img.src = still.src;
        img.alt = still.alt || "";
        img.loading = "lazy";
        var caption = document.createElement("figcaption");
        caption.textContent = still.caption || "";
        figure.append(img, caption);
        strip.appendChild(figure);
      });
      entry.appendChild(strip);
    }

    grid.appendChild(entry);
  });
})();
