/* Michigan Athletics videos. The hub at /athletics renders this list.
   page defaults to false: the edit stays a card on the hub.
   Set page: true only when that edit also has a full film page.
   camera is the shooters for that video, not PJ's role. */
var ATHLETICS = {
  title: "Michigan Athletics",
  role: "Videographer & Editor",
  dates: "Aug 2026–present",
  intro: "I edit varsity footage for Michigan Athletics.",
  videos: [
    {
      slug: "new-standard",
      title: "New Standard",
      sport: "Soccer",
      year: "2026",
      page: false,
      logline: "A cinematic soccer edit for Michigan Athletics, shot on a Sony FX3.",
      overview: "I edit varsity footage for Michigan Athletics. New Standard is the soccer edit.",
      role: ["Editor"],
      format: ["Sports edit"],
      status: ["2026"],
      toolkit: ["DaVinci Resolve"],
      youtubeId: "ArtwsAm4quY",
      runtime: "0:13",
      poster: "/images/athletics/new-standard-01.webp",
      posterAlt: "A Michigan player in a maize jersey, number 17, running past the sideline",
      camera: ["Gabe Conn", "Megan Jones", "Quinton Kole"],
      stills: [
        {
          src: "/images/athletics/new-standard-01.webp",
          alt: "A Michigan player in a maize jersey, number 17, running past the sideline",
          width: 1920,
          height: 1080,
          caption: "01 · Number 17"
        },
        {
          src: "/images/athletics/new-standard-02.webp",
          alt: "A black-and-white close view of a soccer ball at a player’s feet",
          width: 1920,
          height: 1080,
          caption: "02 · The ball"
        },
        {
          src: "/images/athletics/new-standard-03.webp",
          alt: "A goalkeeper in black dives as the ball crosses the goal line",
          width: 1920,
          height: 1080,
          caption: "03 · The keeper"
        },
        {
          src: "/images/athletics/new-standard-04.webp",
          alt: "A motion-blurred player with a tracking overlay across the body",
          width: 1920,
          height: 1080,
          caption: "04 · Tracked"
        },
        {
          src: "/images/athletics/new-standard-05.webp",
          alt: "Michigan players in maize jerseys clapping along the sideline",
          width: 1920,
          height: 1080,
          caption: "05 · The sideline"
        },
        {
          src: "/images/athletics/new-standard-06.webp",
          alt: "A Michigan block M flag against a dark sky",
          width: 1920,
          height: 1080,
          caption: "06 · Block M"
        }
      ]
    }
  ]
};
