/**
 * Worth the Walk content model.
 *
 * Every slide, note, caption, label, and media path for /filmic lives here.
 * Components may decide how to present this data, but must not supply pitch copy.
 */

/** @typedef {"Shot 9/26" | "Reference"} SourceLabel */
/** @typedef {"log" | "709" | "graded"} FrameState */

const FRAME_ROOT = "/images/filmic-pitch/frames";

const sceneDescriptions = [
  {
    id: "counter-signs",
    alt: "Customers at the Zingerman's deli counter beneath a dense row of hand-painted menu signs.",
    caption: "The counter in motion: customers, the glowing case, and hand-painted signs sharing one frame.",
    gradeNote: "Midtones warmer, shadows pushed toward green/orange, and the painted signs brought back without losing the room's depth."
  },
  {
    id: "exterior-sign",
    alt: "Low-angle view along the brick facade and pixel-lettered Zingerman's Delicatessen sign.",
    caption: "The name overhead, held against brick and open sky.",
    gradeNote: "The brick warms up while the sky and shadowed awning stay cooler, giving the sign clean separation."
  },
  {
    id: "retail-interior",
    alt: "Wide view through Zingerman's retail room with shelves, customers, track lights, and hanging green decorations.",
    caption: "A narrow, layered room with products, people, and light pulling toward the back counter.",
    gradeNote: "Warm midtones carry the wood and practicals; green-biased shadows keep the aisle dimensional instead of muddy."
  },
  {
    id: "storefront",
    alt: "Zingerman's red-brick storefront at Detroit and Kingsley as a woman approaches the entrance.",
    caption: "The destination: brick, the green door, the neon OPEN sign, and one person completing the walk.",
    gradeNote: "Brick and late-day warmth come forward while the door green and dark window reflections hold the frame together."
  },
  {
    id: "open-window",
    alt: "Zingerman's front window with a pink neon OPEN sign, brick surround, painted poster, and street reflections.",
    caption: "OPEN in neon, with the street and the deli's hand-made visual language layered in the glass.",
    gradeNote: "The neon stays vivid without clipping; warmer mids meet green-orange shadow separation in the window reflections."
  },
  {
    id: "cheese-case",
    alt: "Cheese case filled with white wheels and colorful hand-lettered cards beside bottles and a bright front window.",
    caption: "The case as a landscape: cheese, handwritten cards, glass reflections, and daylight from the street.",
    gradeNote: "Blacks down and warmth up, but the cheese stays white and the food color never gets pushed unnaturally."
  },
  {
    id: "patio-diners",
    alt: "Groups eating sandwiches on Zingerman's brick patio beneath pink-and-white umbrellas.",
    caption: "The payoff outside: people sharing lunch against the brick wall in direct afternoon sun.",
    gradeNote: "Warm brick and skin carry the image while the deepest shadows stay controlled and slightly green."
  }
];

const stateNames = {
  log: "LOG",
  "709": "Rec.709",
  graded: "final creative grade"
};

/**
 * @param {number} frameNumber
 * @param {FrameState} state
 */
function frameImage(frameNumber, state) {
  const number = String(frameNumber).padStart(2, "0");
  const scene = sceneDescriptions[frameNumber - 1];
  return {
    id: `frame-${number}-${state}`,
    frameId: `frame-${number}`,
    state,
    src: `${FRAME_ROOT}/frame-${number}-${state}.jpg`,
    alt: `${stateNames[state]}: ${scene.alt}`,
    label: /** @type {SourceLabel} */ ("Shot 9/26"),
    caption: {
      text: scene.caption,
      draft: true
    },
    width: 3840,
    height: 2160,
    placeholder: null,
    sources: {
      avif: null,
      webp: null
    }
  };
}

function referenceSlot(slotId, alt, caption) {
  return {
    id: slotId,
    slotId,
    src: null,
    alt,
    label: /** @type {SourceLabel} */ ("Reference"),
    caption: {
      text: caption,
      draft: true
    },
    width: null,
    height: null,
    placeholder: null,
    sources: {
      avif: null,
      webp: null
    }
  };
}

function referenceImage({ id, src, sourceUrl, alt, caption, width, height }) {
  return {
    id,
    src,
    sourceUrl,
    alt,
    label: /** @type {SourceLabel} */ ("Reference"),
    caption: {
      text: caption,
      draft: true
    },
    width,
    height,
    placeholder: null,
    sources: {
      avif: null,
      webp: null
    }
  };
}

function shotSlot(slotId, alt, caption) {
  return {
    id: slotId,
    slotId,
    src: null,
    alt,
    label: /** @type {SourceLabel} */ ("Shot 9/26"),
    caption: {
      text: caption,
      draft: true
    },
    width: null,
    height: null,
    placeholder: null,
    sources: {
      avif: null,
      webp: null
    }
  };
}

export const compareFrames = sceneDescriptions.map((scene, index) => {
  const frameNumber = index + 1;
  return {
    id: `frame-${String(frameNumber).padStart(2, "0")}`,
    sceneId: scene.id,
    caption: {
      text: scene.caption,
      draft: true
    },
    note: {
      text: scene.gradeNote,
      draft: true
    },
    states: {
      log: frameImage(frameNumber, "log"),
      "709": frameImage(frameNumber, "709"),
      graded: frameImage(frameNumber, "graded")
    }
  };
});

const graded = compareFrames.map((frame) => frame.states.graded);

export const deck = {
  meta: {
    title: "Worth the Walk",
    slug: "filmic",
    client: "Zingerman's Deli",
    author: "PJ Kim",
    role: "Director of Photography pitch",
    totalSlides: 13,
    targetSeconds: 285,
    warningSeconds: 270,
    shotDateLabel: "Shot 9/26"
  },

  palette: {
    background: "#16110E",
    text: "#E6DCC4",
    muted: "#A89C86",
    dim: "#7D7263",
    accent: "#C98B5B",
    swatches: [
      { name: "Brick", hex: "#8F5E3D", sampledFrom: "frame-04" },
      { name: "Rye", hex: "#4A2E17", sampledFrom: "frame-01" },
      { name: "Bagel crust", hex: "#A27753", sampledFrom: "frame-01" },
      { name: "Butcher paper", hex: "#E1D7B7", sampledFrom: "frame-06" },
      { name: "Door green", hex: "#334943", sampledFrom: "frame-04" },
      { name: "Awning", hex: "#293135", sampledFrom: "frame-02" }
    ]
  },

  compare: {
    defaultPair: ["log", "graded"],
    pairs: [
      { id: "log-709", label: "LOG | 709", states: ["log", "709"] },
      { id: "709-graded", label: "709 | GRADED", states: ["709", "graded"] },
      { id: "log-graded", label: "LOG | GRADED", states: ["log", "graded"] }
    ],
    holdState: "log",
    frames: compareFrames
  },

  supportedLayouts: {
    current: ["fullBleed", "split", "rows", "compare", "table", "swatches", "quote"],
    reserved: {
      video: ["provider", "src", "poster", "caption", "autoplay"],
      storyboard: ["frames", "columns", "sequenceNotes"],
      links: ["links", "groupLabel", "sourceNote"]
    }
  },

  slides: [
    {
      id: "cover",
      layout: "fullBleed",
      title: "Worth the Walk",
      body: {
        sub: "Zingerman's Deli · DP pitch · PJ Kim",
        cornerLabel: "Shot on location, Sat 9/26"
      },
      images: [graded[3]],
      notes: {
        seconds: 15,
        text: "Anything labeled Reference is mood; everything labeled Shot 9/26 is mine and was filmed on location Saturday."
      }
    },
    {
      id: "the-idea",
      layout: "split",
      title: "The idea",
      body: {
        lead: "Students don't skip Zingerman's because it's bad. They skip it because it's a walk they've never taken.",
        accent: "So the film is the walk, and what's been waiting at the end of it since 1982.",
        acts: [
          { numeral: "I", text: "Start on campus and walk there, with the history told on the way." },
          { numeral: "II", text: "Inside: the counter, the case, the people." },
          { numeral: "III", text: "The student sits down, tries a meal, and gives an honest review." }
        ]
      },
      images: [graded[1]],
      notes: {
        seconds: 25,
        text: "The client problem is distance and unfamiliarity. The concept turns that barrier into the story: a student makes the trip, learns why the place matters, and earns the first bite."
      }
    },
    {
      id: "three-acts",
      layout: "rows",
      title: "Two minutes, three acts",
      body: {
        rows: [
          {
            timecode: "0:00–0:30",
            name: "The walk.",
            description: "Diag to Kerrytown, street sound, a voice telling how it started in 1982, landing on the storefront.",
            camera: "Handheld, 35mm, daylight, 24fps.",
            imageId: "frame-04-graded"
          },
          {
            timecode: "0:30–1:30",
            name: "The counter.",
            description: "Into the rush, sandwiches built, the case glows, longest-tenured staff do the talking.",
            camera: "Gimbal through the line, 120fps macro inserts.",
            imageId: "frame-01-graded"
          },
          {
            timecode: "1:30–2:00",
            name: "The first bite.",
            description: "Student tries the Reuben and tells the people who made it what they think.",
            camera: "Locked off, 50mm. The camera finally stops moving.",
            imageId: "frame-07-graded"
          }
        ]
      },
      images: [graded[3], graded[0], graded[6]],
      notes: {
        seconds: 25,
        text: "The camera grammar resolves with the story. It moves through the walk and the rush, then becomes still when the student finally sits down and the promise is tested."
      }
    },
    {
      id: "the-room",
      layout: "split",
      title: "What the room gives us",
      body: {
        points: [
          "It's lit by overhead tubes and track spots. I'd turn off what we can and let the windows and the deli case carry it.",
          "The case glass picks up the street, so a polarizer goes on every case shot.",
          "The hand-painted signs do the art direction for us.",
          "The aisle is tight at lunch: gimbal, small rig, one camera."
        ]
      },
      images: [graded[0]],
      notes: {
        seconds: 20,
        text: "This location already has texture and production design. The DP job is subtraction: control the practicals, protect the glass, and keep the rig small enough that the real deli can stay alive around us."
      }
    },
    {
      id: "as-shot",
      layout: "compare",
      title: "As shot, and where I'd take it",
      body: {
        defaultPair: "LOG | GRADED",
        instruction: "Compare the flat capture, neutral Rec.709 transform, and final creative grade.",
        gradeDirection: "I pushed the midtones warmer and the shadows toward green/orange. Blacks come down, sign colors return, cheese stays white, and food never gets pushed."
      },
      images: compareFrames.flatMap((frame) => [frame.states.log, frame.states["709"], frame.states.graded]),
      notes: {
        seconds: 45,
        text: "The LOG image protects the window and case. Rec.709 gives the neutral baseline. From there I warm the midtones, separate the shadows toward green/orange, deepen the blacks, and selectively restore the building's colors without contaminating the food whites."
      }
    },
    {
      id: "two-eras",
      layout: "split",
      title: "Two eras, two looks",
      body: {
        looks: [
          {
            name: "Now",
            description: "Modern primes (24/35/50), clean and sharp.",
            imageId: "frame-05-graded"
          },
          {
            name: "Since 1982",
            description: "Vintage 50, Pro-Mist filter, Super 8 inserts, and old deli photos framed 4:3.",
            imageId: "reference-history-01"
          }
        ]
      },
      images: [
        graded[4],
        referenceImage({
          id: "reference-history-01",
          src: "/images/filmic-pitch/references/reference-history-diner.jpg",
          sourceUrl: "https://www.pinterest.com/pin/873065077789409645/",
          alt: "Reference: a sunlit vintage diner interior with wood paneling, stained glass, Coca-Cola signs, and an empty table.",
          caption: "Reference: warm practicals, aged surfaces, and a lived-in diner palette for the film's historical language.",
          width: 1169,
          height: 1464
        }),
        referenceSlot("reference-history-02", "Reference image pending for archival Zingerman's imagery.", "Reference slot: old deli photograph framed 4:3.")
      ],
      notes: {
        seconds: 20,
        text: "The present is precise and immediate. History gets a softer optical language—vintage glass, diffusion, Super 8, and archival material—so the audience can feel time without confusing the two eras."
      }
    },
    {
      id: "palette",
      layout: "swatches",
      title: "Colors from the building",
      body: {
        caption: "Sampled from my frames, 9/26.",
        swatches: [
          { name: "Brick", hex: "#8F5E3D", sampledFrom: "frame-04" },
          { name: "Rye", hex: "#4A2E17", sampledFrom: "frame-01" },
          { name: "Bagel crust", hex: "#A27753", sampledFrom: "frame-01" },
          { name: "Butcher paper", hex: "#E1D7B7", sampledFrom: "frame-06" },
          { name: "Door green", hex: "#334943", sampledFrom: "frame-04" },
          { name: "Awning", hex: "#293135", sampledFrom: "frame-02" }
        ]
      },
      images: [graded[3], graded[0], graded[5], graded[1]],
      notes: {
        seconds: 15,
        text: "The palette is not imposed on the deli; it is sampled from it. Brick, rye, crust, butcher paper, the green door, and the dark awning become the visual rules for graphics and grade."
      }
    },
    {
      id: "food",
      layout: "rows",
      title: "The food, where it lives",
      body: {
        lead: "Every build gets shot four times: real time, 120fps, 60fps, then a diopter for macro.",
        placement: "On butcher paper, under the signs, next to the case. Never on a white tablecloth."
      },
      images: [
        referenceImage({
          id: "reference-food-01",
          src: "/images/filmic-pitch/references/reference-food-sandwich-held.jpg",
          sourceUrl: "https://www.pinterest.com/pin/873065077789409592/",
          alt: "Reference: two flash-lit sandwich halves held close to camera with the stacked fillings exposed.",
          caption: "Reference for the real-time pass: close, handheld, direct, and generous about the sandwich layers.",
          width: 1179,
          height: 1412
        }),
        referenceImage({
          id: "reference-food-02",
          src: "/images/filmic-pitch/references/reference-food-blt-pair.jpg",
          sourceUrl: "https://www.pinterest.com/pin/873065077789409587/",
          alt: "Reference: two rye sandwiches stacked against a pale background with each ingredient clearly separated.",
          caption: "Reference for the 120fps pass: a graphic profile that keeps bread, meat, greens, and spread readable.",
          width: 786,
          height: 1004
        }),
        referenceImage({
          id: "reference-food-03",
          src: "/images/filmic-pitch/references/reference-food-sandwich-stack.jpg",
          sourceUrl: "https://www.pinterest.com/pin/873065077789409585/",
          alt: "Reference: an extreme close view through a toasted sandwich with melted cheese, greens, and open crumb.",
          caption: "Reference for the 60fps pass: compressed layers, toasted edges, and enough movement for the cheese to carry.",
          width: 736,
          height: 946
        }),
        referenceImage({
          id: "reference-food-04",
          src: "/images/filmic-pitch/references/reference-food-bread-macro.jpg",
          sourceUrl: "https://www.pinterest.com/pin/873065077789409602/",
          alt: "Reference: macro detail of a deeply browned loaf crust and open interior crumb.",
          caption: "Reference for the diopter pass: crust, flour, and crumb become the landscape of the frame.",
          width: 640,
          height: 960
        })
      ],
      notes: {
        seconds: 18,
        text: "Food stays inside the world of the deli. The four passes give editorial choice, but the surfaces, signs, paper, and case keep every beauty shot authentic to Zingerman's rather than turning it into generic tabletop advertising."
      }
    },
    {
      id: "people",
      layout: "split",
      title: "The people behind the counter",
      body: {
        points: [
          "Portraits on a 50 at eye level, window-lit.",
          "Interviews use two cameras (medium and close), the only multicam in the shoot.",
          "Hands slicing and wrapping for B-roll.",
          "Real staff and regulars, no actors."
        ]
      },
      images: [graded[0], graded[6]],
      notes: {
        seconds: 17,
        text: "The client asked for the people behind the work. Eye-level portraits and real staff keep the film familial, while the only two-camera setup protects honest interview moments without asking anyone to recreate them."
      }
    },
    {
      id: "shot-list",
      layout: "table",
      title: "Eight shots that carry it",
      body: {
        columns: ["Shot", "Lens", "Move", "FPS"],
        rows: [
          { shot: "Diag → Kerrytown", lens: "35mm", move: "handheld follow", fps: "24", imageId: null },
          { shot: "Storefront reveal", lens: "24mm", move: "gimbal push-in", fps: "24", imageId: "frame-04-graded" },
          { shot: "Slicer through corned beef", lens: "100mm macro", move: "slider", fps: "120", imageId: null },
          { shot: "Reuben on butcher paper", lens: "50mm", move: "locked overhead", fps: "60", imageId: null },
          { shot: "Hand-off across the counter", lens: "35mm", move: "gimbal through the line", fps: "24", imageId: "frame-01-graded" },
          { shot: "Old photos + a regular's story", lens: "vintage 50mm", move: "handheld, Super 8", fps: "18", imageId: null },
          { shot: "Longest-tenured staffer by the window", lens: "50mm", move: "locked", fps: "24", imageId: "frame-05-graded" },
          { shot: "First bite and the review", lens: "50mm", move: "locked, slow push", fps: "24", imageId: "frame-07-graded" }
        ]
      },
      images: [graded[3], graded[0], graded[4], graded[6]],
      notes: {
        seconds: 25,
        text: "These are the structural shots, not exhaustive coverage. Each has a story job, lens, movement, and frame rate. The repeated rule is that camera energy decreases as the student gets closer to eating."
      }
    },
    {
      id: "social-cut",
      layout: "split",
      title: "Social cut",
      body: {
        headline: "POV: a senior finally takes you to Zingerman's",
        runtime: "0:30",
        format: "9:16 · vertical from the start",
        capture: "Point-and-shoot with direct flash.",
        thesis: "The promo is cinema. The short should look like a friend posted it."
      },
      images: [
        shotSlot("social-cut-vertical-clip", "Empty 9:16 slot for a future social-cut clip.", "Future 9:16 social-cut clip or poster frame.")
      ],
      notes: {
        seconds: 18,
        text: "The social deliverable should not feel like a crop or a compressed version of the hero. Direct flash, vertical blocking, and a senior-to-student point of view give it the casual credibility of a recommendation from a friend."
      }
    },
    {
      id: "production",
      layout: "table",
      title: "$5,000, two days, one small rig",
      body: {
        kit: "Compact full-frame body, three primes plus a 100mm macro, vintage 50 plus Pro-Mist, gimbal, slider, two small LEDs, haze, Super 8, lav and boom.",
        schedule: [
          { day: "Day 1", plan: "The walk and the counter." },
          { day: "Day 2", plan: "Food, people, the first bite, social." }
        ],
        budgetLabel: "Estimates",
        columns: ["Line", "$"],
        rows: [
          { line: "Lens and camera rentals", amount: "900" },
          { line: "Lighting, grip, haze", amount: "400" },
          { line: "Gimbal and slider", amount: "250" },
          { line: "Sound recordist and kit", amount: "500" },
          { line: "Super 8 film, dev, scan", amount: "450" },
          { line: "Food for repeat passes", amount: "350" },
          { line: "Crew meals, thank-yous", amount: "400" },
          { line: "Color and sound post", amount: "1,200" },
          { line: "Contingency", amount: "550" },
          { line: "Total", amount: "5,000", total: true }
        ]
      },
      images: [],
      notes: {
        seconds: 30,
        text: "The approach is deliberately compact. Two days separate live-location coverage from controlled food and interview work. The budget protects sound and post while leaving contingency for a real client environment."
      }
    },
    {
      id: "close",
      layout: "quote",
      title: "Without a zoom, we had to dance with the chef.",
      body: {
        attribution: "Adam Bricker, ASC, on shooting Chef's Table.",
        close: "Thank you. PJ Kim"
      },
      images: [graded[4]],
      notes: {
        seconds: 12,
        text: "The pitch is really about proximity: moving with the walk, the staff, and the food until the camera earns the stillness of the first bite. Thank you."
      }
    }
  ]
};

if (deck.slides.length !== deck.meta.totalSlides) {
  throw new Error(`Expected ${deck.meta.totalSlides} slides, received ${deck.slides.length}.`);
}

export default deck;
