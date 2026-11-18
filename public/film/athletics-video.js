(function () {
  "use strict";

  var slug = location.pathname.replace(/\/+$/, "").split("/").pop();
  var video = null;
  for (var i = 0; i < ATHLETICS.videos.length; i++) {
    if (ATHLETICS.videos[i].slug === slug) video = ATHLETICS.videos[i];
  }

  var root = document.querySelector("[data-athletics-video]");
  if (!root) return;

  if (!video) {
    document.title = "Not found — PJ Kim";
    root.innerHTML = "<p class=\"athletics-missing\">That edit isn’t on the hub. <a href=\"/athletics\">Back to Michigan Athletics</a>.</p>";
    return;
  }

  document.title = video.title + " — PJ Kim";

  function text(selector, value) {
    var node = root.querySelector(selector);
    if (node) node.textContent = value;
  }

  function list(selector, items) {
    var node = root.querySelector(selector);
    if (!node) return;
    items.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      node.appendChild(li);
    });
  }

  text("[data-field='title']", video.title);
  text("[data-field='logline']", video.logline);
  text("[data-field='overview']", video.overview);
  list("[data-field='role']", video.role || []);
  list("[data-field='format']", video.format || []);
  list("[data-field='status']", video.status || []);
  list("[data-field='toolkit']", video.toolkit || []);

  var stage = root.querySelector("[data-field='stage']");
  if (stage && video.poster) {
    var still = document.createElement("img");
    still.src = video.poster;
    still.alt = video.posterAlt || "";
    still.setAttribute("fetchpriority", "high");
    stage.appendChild(still);
  }

  var player = root.querySelector("[data-field='player']");
  if (player && /^[A-Za-z0-9_-]{11}$/.test(video.youtubeId || "")) {
    player.setAttribute("data-youtube-id", video.youtubeId);
    var button = document.createElement("button");
    button.type = "button";
    button.className = "player-launch";
    button.setAttribute("aria-label", "Play " + video.title);
    if (video.poster) {
      var poster = document.createElement("img");
      poster.src = video.poster;
      poster.alt = "";
      button.appendChild(poster);
    }
    var label = document.createElement("span");
    label.textContent = "Play";
    button.appendChild(label);
    player.appendChild(button);
  }

  var runtime = root.querySelector("[data-field='runtime']");
  if (runtime) runtime.textContent = video.runtime || "";

  var frames = root.querySelector("[data-field='stills']");
  (video.stills || []).forEach(function (still) {
    var figure = document.createElement("figure");
    figure.tabIndex = 0;
    var media = document.createElement("div");
    media.className = "frame-media";
    var img = document.createElement("img");
    img.src = still.src;
    img.alt = still.alt || "";
    img.loading = "lazy";
    media.appendChild(img);
    var caption = document.createElement("figcaption");
    caption.textContent = still.caption || "";
    figure.append(media, caption);
    frames.appendChild(figure);
  });

  var credits = root.querySelector("[data-field='credits']");
  function credit(label, valueNode) {
    var row = document.createElement("div");
    var span = document.createElement("span");
    span.textContent = label;
    var strong = document.createElement("strong");
    strong.appendChild(valueNode);
    row.append(span, strong);
    credits.appendChild(row);
  }

  var editor = document.createTextNode("PJ Kim");
  credit("Editor", editor);
  if (video.camera && video.camera.length) {
    credit("Camera", document.createTextNode(video.camera.join(" · ")));
  }
  credit("For", document.createTextNode(ATHLETICS.title));
  if (video.toolkit && video.toolkit.length) {
    credit("Edit", document.createTextNode(video.toolkit.join(" · ")));
  }
  var logLink = document.createElement("a");
  logLink.href = "/engineering";
  logLink.textContent = "um-autolog";
  credit("Logging", logLink);
})();
