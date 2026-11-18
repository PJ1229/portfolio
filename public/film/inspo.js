(function () {
  "use strict";

  var entries = [
    {
      title: "fred again.. — behind the sound",
      url: "https://www.youtube.com/watch?v=fO-DT-f9dz8",
      type: "video",
      duration: "20:20",
      date: "2026-11-08",
      isKey: true,
      preview: "/images/inspo/previews/fred-behind-the-sound.jpg",
      previewAlt: "Thumbnail for Fred again..: Behind The Sound by Gawx Art"
    },
    {
      title: "call me by your name",
      url: "https://letterboxd.com/film/call-me-by-your-name/",
      type: "film",
      duration: "2:12",
      year: "2017",
      foundation: true,
      isKey: true,
      preview: "/images/inspo/call-me-by-your-name.jpg",
      previewAlt: "Call Me by Your Name poster",
      previewFit: "contain"
    },
    {
      title: "closer",
      url: "https://letterboxd.com/film/closer/",
      type: "film",
      duration: "1:44",
      year: "2004",
      foundation: true,
      isKey: true,
      preview: "/images/inspo/closer.jpg",
      previewAlt: "Closer poster",
      previewFit: "contain"
    },
    {
      title: "priscilla",
      url: "https://letterboxd.com/film/priscilla/",
      type: "film",
      duration: "1:53",
      year: "2023",
      foundation: true,
      isKey: true,
      preview: "/images/inspo/priscilla.jpg",
      previewAlt: "Priscilla poster",
      previewFit: "contain"
    },
    {
      title: "requiem for a dream",
      url: "https://letterboxd.com/film/requiem-for-a-dream/",
      type: "film",
      duration: "1:42",
      year: "2000",
      foundation: true,
      isKey: true,
      preview: "/images/inspo/requiem-for-a-dream.jpg",
      previewAlt: "Requiem for a Dream poster",
      previewFit: "contain"
    },
    {
      title: "whycrywhenyoucancut",
      url: "https://www.youtube.com/watch?v=6qDF358rxtw",
      type: "video",
      duration: "1:34",
      date: "2026-10-15",
      preview: "/images/inspo/previews/why-cry-when-you-can-cut.jpg",
      previewAlt: "Thumbnail for whycrywhenyoucancut by zian fournier"
    },
    {
      title: "remember?",
      url: "https://www.youtube.com/watch?v=eDRq516f4Mk",
      type: "video",
      duration: "0:47",
      date: "2026-09-30",
      preview: "/images/inspo/previews/remember.jpg",
      previewAlt: "Thumbnail for Remember? by Miles Murphy"
    },
    {
      title: "adam bricker — projects",
      url: "https://www.adambricker.com/projects",
      type: "site",
      duration: "—",
      date: "2026-09-29"
    },
    {
      title: "mckenna grace — bones and all",
      url: "https://www.youtube.com/watch?v=MyA24lQByPQ",
      type: "video",
      duration: "4:07",
      date: "2026-09-29",
      preview: "/images/inspo/previews/bones-and-all.jpg",
      previewAlt: "Thumbnail for Mckenna Grace's Bones and All music video"
    },
    {
      title: "your life ends when you turn 25",
      url: "https://www.youtube.com/watch?v=kzwl_SoaecY",
      type: "video",
      duration: "5:27",
      date: "2026-09-29",
      preview: "/images/inspo/previews/life-ends-25.jpg",
      previewAlt: "Thumbnail for Your Life Ends When You Turn 25"
    },
    {
      title: "forrest nolan — drama queens",
      url: "https://www.youtube.com/watch?v=7hMTP2UPb3U",
      type: "video",
      duration: "2:58",
      date: "2026-09-29",
      preview: "/images/inspo/previews/drama-queens.jpg",
      previewAlt: "Thumbnail for Forrest Nolan's Drama Queens music video"
    },
    {
      title: "i tried to shoot a cinematic ski film in japan | sony fx3",
      url: "https://www.youtube.com/watch?v=yRURaSoB7CY",
      type: "video",
      duration: "37:00",
      date: "2026-09-06",
      isKey: true,
      preview: "/images/inspo/previews/ski-japan.jpg",
      previewAlt: "Thumbnail for a cinematic ski film shot in Japan"
    },
    {
      title: "how we raised $2.4m for our startup in one week",
      url: "https://www.youtube.com/watch?v=2sIhJFwiaqc",
      type: "video",
      duration: "14:00",
      date: "2026-09-06",
      preview: "/images/inspo/previews/raised-startup.jpg",
      previewAlt: "Thumbnail for How We Raised $2.4M for Our Startup in One Week"
    },
    {
      title: "a warning for high achievers",
      url: "https://www.youtube.com/watch?v=cB-DFAdL8SI",
      type: "video",
      duration: "12:00",
      date: "2026-08-25",
      preview: "/images/inspo/previews/warning-high-achievers.jpg",
      previewAlt: "Thumbnail for A Warning for High Achievers"
    },
    {
      title: "the art of minimalism",
      url: "https://www.youtube.com/watch?v=bdC2BtJNt9s",
      type: "video",
      duration: "17:00",
      date: "2026-06-23",
      preview: "/images/inspo/previews/art-minimalism.jpg",
      previewAlt: "Thumbnail for The Art of Minimalism"
    },
    {
      title: "stop worrying about ai and make films",
      url: "https://www.youtube.com/watch?v=qTJA_Z9lM94",
      type: "video",
      duration: "1:00",
      date: "2026-06-16",
      preview: "/images/inspo/previews/ai-make-films.jpg",
      previewAlt: "Thumbnail for Stop Worrying About AI and Make Films"
    },
    {
      title: "making of obsession (2026)",
      url: "https://www.youtube.com/watch?v=0w5cxLjLCZM",
      type: "video",
      duration: "10:00",
      date: "2026-06-15",
      preview: "/images/inspo/previews/making-obsession.jpg",
      previewAlt: "Thumbnail for Making of Obsession"
    },
    {
      title: "the story of creator camp",
      url: "https://www.youtube.com/watch?v=yV8QeblH2gA",
      type: "video",
      duration: "29:00",
      date: "2026-05-30",
      isKey: true,
      preview: "/images/inspo/previews/creator-camp.jpg",
      previewAlt: "Thumbnail for The Story of Creator Camp"
    },
    {
      title: "your life ends once you graduate college",
      url: "https://www.youtube.com/watch?v=nreqVzdpQow",
      type: "video",
      duration: "6:00",
      date: "2026-05-10",
      isKey: true,
      preview: "/images/inspo/previews/life-graduate.jpg",
      previewAlt: "Thumbnail for Your Life Ends Once You Graduate College"
    },
    {
      title: "the best piece of advice i've ever received",
      url: "https://www.youtube.com/watch?v=Yrug2Fd9CWY",
      type: "video",
      duration: "13:00",
      date: "2026-05-03",
      preview: "/images/inspo/previews/best-advice.jpg",
      previewAlt: "Thumbnail for The Best Piece of Advice I've Ever Received"
    },
    {
      title: "the most realistic one year guitar progress video (self taught)",
      url: "https://www.youtube.com/watch?v=1jgyIao60JQ",
      type: "video",
      duration: "21:00",
      date: "2026-04-29",
      preview: "/images/inspo/previews/guitar-progress.jpg",
      previewAlt: "Thumbnail for a one-year self-taught guitar progress video"
    },
    {
      title: "nothing is sweeter than this moment",
      url: "https://www.youtube.com/watch?v=xPcq1BuHXtY",
      type: "video",
      duration: "28:00",
      date: "2026-04-27",
      preview: "/images/inspo/previews/sweeter-moment.jpg",
      previewAlt: "Thumbnail for Nothing Is Sweeter Than This Moment"
    },
    {
      title: "dods world championship 2025",
      url: "https://www.youtube.com/watch?v=tzSS7LjhTJs",
      type: "video",
      duration: "31:00",
      date: "2026-04-17",
      preview: "/images/inspo/previews/dods-world-championship.jpg",
      previewAlt: "Thumbnail for DODS World Championship 2025"
    },
    {
      title: "digital intimacy",
      url: "https://www.youtube.com/watch?v=xchmB7-fKSE",
      type: "video",
      duration: "10:00",
      date: "2026-04-17",
      preview: "/images/inspo/previews/digital-intimacy.jpg",
      previewAlt: "Thumbnail for Digital Intimacy"
    },
    {
      title: "i don't want to forget this",
      url: "https://www.youtube.com/watch?v=n81pWqqkNPs",
      type: "video",
      duration: "21:00",
      date: "2026-04-10",
      preview: "/images/inspo/previews/dont-forget.jpg",
      previewAlt: "Thumbnail for I Don't Want to Forget This"
    },
    {
      title: "when you should quit",
      url: "https://www.youtube.com/watch?v=JOYq7s_f-uw",
      type: "video",
      duration: "12:00",
      date: "2026-04-08",
      preview: "/images/inspo/previews/when-quit.jpg",
      previewAlt: "Thumbnail for When You Should Quit"
    },
    {
      title: "to brooklyn and back",
      url: "https://www.youtube.com/watch?v=BA-ZOaDIn58",
      type: "video",
      duration: "3:00",
      date: "2026-03-17",
      isKey: true,
      preview: "/images/inspo/previews/brooklyn-back.jpg",
      previewAlt: "Thumbnail for To Brooklyn and Back"
    },
    {
      title: "fred again rooftop live in naples",
      url: "https://www.youtube.com/watch?v=2yfyPeAEV3A",
      type: "video",
      duration: "63:00",
      date: "2026-03-16",
      preview: "/images/inspo/previews/fred-again-naples.jpg",
      previewAlt: "Thumbnail for Fred again rooftop live in Naples"
    },
    {
      title: "the climb back — j. cole",
      url: "https://www.youtube.com/watch?v=oVaBgcJwkI4",
      type: "song",
      duration: "—",
      date: "2026-03-16",
      preview: "/images/inspo/previews/climb-back.jpg",
      previewAlt: "Thumbnail for The Climb Back by J. Cole"
    },
    {
      title: "letters to a young creator",
      url: "https://letters.stevejobsarchive.com/",
      type: "site",
      duration: "—",
      date: "2026-03-16"
    },
    {
      title: "for the rational lover.",
      url: "https://www.youtube.com/watch?v=we-e8m7T5uI",
      type: "video",
      duration: "29:00",
      date: "2026-03-16",
      preview: "/images/inspo/previews/rational-lover.jpg",
      previewAlt: "Thumbnail for For the Rational Lover"
    },
    {
      title: "how i edit my youtube videos in 2026 (color grade, graphics, & more)",
      url: "https://www.youtube.com/watch?v=gGZWWIUvMxA",
      type: "video",
      duration: "24:00",
      date: "2026-02-10",
      preview: "/images/inspo/previews/edit-youtube.jpg",
      previewAlt: "Thumbnail for How I Edit My YouTube Videos in 2026"
    },
    {
      title: "are you just living day to day?",
      url: "https://www.youtube.com/watch?v=amXl7FG7J4c",
      type: "video",
      duration: "1:00",
      date: "2026-02-10",
      preview: "/images/inspo/previews/living-day-to-day.jpg",
      previewAlt: "Thumbnail for Are You Just Living Day to Day?"
    }
  ];

  var grid = document.querySelector("[data-inspo-grid]");
  var count = document.querySelector("[data-inspo-count]");
  var filters = document.querySelectorAll("[data-filter]");
  var kinds = { film: "Film", video: "Video", song: "Song", site: "Site" };

  if (count) count.textContent = entries.length + " references";
  if (!grid) return;

  function sentence(value) {
    var text = String(value || "");
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  }

  function metaLine(entry) {
    var bits = [kinds[entry.type] || sentence(entry.type)];
    if (entry.year) bits.push(entry.year);
    if (entry.duration && entry.duration !== "—") bits.push(entry.duration);
    if (entry.isKey) bits.push("Key");
    return bits.join(" · ");
  }

  var cards = entries.map(function (entry, index) {
    var link = document.createElement("a");
    link.className = "inspo-card";
    link.href = entry.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.dataset.kind = entry.type;
    link.dataset.key = entry.isKey ? "true" : "false";
    link.setAttribute("aria-label", sentence(entry.title) + ", " + metaLine(entry) + ", opens in a new tab");

    var stage = document.createElement("span");
    stage.className = "inspo-stage";

    if (entry.preview) {
      var img = document.createElement("img");
      img.src = entry.preview;
      img.alt = entry.previewAlt || "";
      img.decoding = "async";
      if (index > 5) img.loading = "lazy";
      if (entry.previewFit === "contain") img.className = "is-contained";
      img.addEventListener("error", function () {
        img.remove();
        var fallback = document.createElement("span");
        fallback.className = "inspo-fallback";
        fallback.textContent = sentence(entry.title);
        stage.appendChild(fallback);
      });
      stage.appendChild(img);
    } else {
      var fallback = document.createElement("span");
      fallback.className = "inspo-fallback";
      fallback.textContent = sentence(entry.title);
      stage.appendChild(fallback);
    }

    var caption = document.createElement("span");
    caption.className = "inspo-caption";
    var meta = document.createElement("span");
    meta.className = "inspo-meta";
    meta.textContent = metaLine(entry);
    if (entry.preview) {
      var title = document.createElement("span");
      title.className = "inspo-title";
      title.textContent = sentence(entry.title);
      caption.append(title, meta);
    } else {
      caption.append(meta);
    }
    link.append(stage, caption);
    link.addEventListener("click", function () {
      if (typeof window.gtag === "function") {
        window.gtag("event", "inspo_open", { title: entry.title, content_type: entry.type });
      }
    });
    grid.appendChild(link);
    return link;
  });

  function applyFilter(name) {
    cards.forEach(function (card) {
      var show = name === "all" || (name === "key" ? card.dataset.key === "true" : card.dataset.kind === name);
      card.hidden = !show;
    });
    filters.forEach(function (button) {
      button.setAttribute("aria-pressed", button.dataset.filter === name ? "true" : "false");
    });
  }

  filters.forEach(function (button) {
    button.addEventListener("click", function () { applyFilter(button.dataset.filter); });
  });
})();
