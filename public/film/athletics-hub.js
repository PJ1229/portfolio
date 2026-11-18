(function () {
  "use strict";

  var moved = { "#overview": 1, "#frames": 1, "#credits": 1, "#film": 1 };
  if (moved[location.hash] && ATHLETICS.videos[0]) {
    location.replace("/athletics/" + ATHLETICS.videos[0].slug + location.hash);
    return;
  }

  var title = document.querySelector("[data-athletics-title]");
  var role = document.querySelector("[data-athletics-role]");
  var intro = document.querySelector("[data-athletics-intro]");
  var grid = document.querySelector("[data-athletics-grid]");
  if (title) title.textContent = ATHLETICS.title;
  if (role) role.textContent = ATHLETICS.role + " · " + ATHLETICS.dates;
  if (intro) intro.textContent = ATHLETICS.intro;
  if (!grid) return;

  ATHLETICS.videos.forEach(function (video) {
    var card = document.createElement("a");
    card.className = "athletics-card";
    card.href = "/athletics/" + video.slug;

    var still = document.createElement("span");
    still.className = "athletics-still";
    if (video.poster) {
      var img = document.createElement("img");
      img.src = video.poster;
      img.alt = video.posterAlt || "";
      img.loading = "lazy";
      still.appendChild(img);
    }

    var kicker = document.createElement("span");
    kicker.className = "athletics-kicker";
    kicker.textContent = [video.sport, video.year].filter(Boolean).join(" · ");

    var heading = document.createElement("span");
    heading.className = "athletics-name";
    heading.textContent = video.title;

    card.append(still, kicker, heading);
    grid.appendChild(card);
  });
})();
