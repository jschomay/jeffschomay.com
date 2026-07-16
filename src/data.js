// ──────────────────────────────────────────────────────────────────
// Portfolio content.
//
// Image paths are relative to /public — drop your downloaded `assets/`
// folder into portfolio-source/public/assets/ and these resolve at
// build time. (See README.)
// ──────────────────────────────────────────────────────────────────

// ── Profile ─────────────────────────────────────────────────────────
// Feeds the JSON-LD structured data injected at build time
// (see prerender.mjs) so search engines and recruiter software get a
// machine-readable Person card that stays in sync with this file.
export const PROFILE = {
  name: 'Jeff Schomay',
  jobTitle: 'Senior Staff AI Engineer',
  url: 'https://jeffschomay.com/',
  description:
    'Senior Staff AI Engineer specializing in agentic AI systems at scale. ' +
    'Technical. Creative. Curious. I build things others don’t see yet.',
  knowsAbout: [
    'Agentic AI systems',
    'Context engineering',
    'Generative AI',
    'LLM applications',
    'Legacy system modernization',
    'Multimodal AI pipelines',
    'Game development',
    'Interactive storytelling',
  ],
};

export const QUOTES = [
  { q: 'Jeff is my guy for the heady problems.', by: 'Sam Dawson · Product Manager, Mechanical Orchard' },
  { q: 'Consistently ahead of the agentic curve.', by: 'Aldric Giacomoni · Staff R&D Engineer, Mechanical Orchard' },
];

// ── Featured work (2-up grid) ───────────────────────────────────────
export const FEATURED = [
  {
    id: 'realtime',
    tag: 'FEATURED · CREATIVE',
    title: 'Rendering a game in real-time with AI',
    meta: '#1 on Hacker News · 22K views',
    img: 'assets/realtime-ai-game.mp4',
    img2: 'assets/realtime-hifi.webp',
    body: 'Could I render my lofi ASCII game as high-def frames in real time? \n\nI took Thunderlizard — my procedurally-generated ASCII dinosaur survival game — and wired it through low-latency image models to render each frame as I played. The challenge was balancing model trade-offs between style, fine-tuning, composition control, and latency.',
    links: [
      ['Read the full breakdown', 'https://blog.jeffschomay.com/rendering-a-game-in-real-time-with-ai'],
      ['On Hacker News', 'https://news.ycombinator.com/item?id=45051188'],
      ['Watch on YouTube', 'https://youtu.be/WkolFcU8_gE?si=W-BB_4Xvt5D_vSv0'],
      ['Play Thunderlizard', 'https://enegames.itch.io/thunder-lizard-eat-or-be-eaten'],
    ],
  },
  {
    id: 'morchard',
    tag: 'FEATURED · TECHNICAL',
    title: 'Modernizing mainframes with custom agentic AI',
    meta: 'Senior Staff AI Engineer · 2022 – 2026',
    img: 'assets/mechanical-orchard-logo.jpg',
    isLogo: true,
    body: "I led R&D at Mechanical Orchard and was the engineer the team turned to for big challenges. I taught AI to understand 50-year-old mainframe code by giving it a queryable graph of the legacy system's relationships and code, then built the agents that use that understanding to rewrite it in modern languages. \n\nThe POC unlocked the company's $24M Series A. The full system delivered 10× improvements in speed, reliability, and accuracy.",
    stats: [
      ['10×', 'speed · reliability · accuracy'],
      ['$24M', 'Series A unlocked'],
      ['4 yrs', 'shipping agentic AI at scale'],
    ],
    pullQuote: QUOTES[1].q,
    pullQuoteAttr: QUOTES[1].by,
    linksLabel: 'My articles on the Mechanical Orchard blog',
    links: [
      ['Orchestrating Confidence', 'https://mechanicalorchard.substack.com/p/orchestrating-confidence'],
      ['Context Engineering Explained in Pictures', 'https://mechanicalorchard.substack.com/p/context-engineering-explained-in'],
    ],
  },
];

// ── Additional highlights (wide stacked blocks) ─────────────────────
export const MORE = [
  {
    id: 'crossword',
    tag: 'AI + GAMES',
    title: 'Letting AI play my game',
    meta: 'Top 10 on Hacker News · 12K views',
    img: 'assets/ai-playing-crossword.webp',
    img2: 'assets/crossword-dungeon-in-play.gif',
    body: 'I built Crossword Dungeon — a game where the crossword forms the dungeon layout, and solving a letter makes the surrounding rooms harder. Then I built a play-testing harness to let AI play it, catch bugs, validate features, and find new edge cases. I applied the same context-engineering practice I use at work to make it.',
    links: [
      ['Read the breakdown', 'https://blog.jeffschomay.com/letting-ai-play-my-game'],
      ['On Hacker News', 'https://news.ycombinator.com/item?id=47947525'],
      ['How I make games with AI in 2026', 'https://blog.jeffschomay.com/how-i-m-using-ai-for-game-dev-in-2026'],
      ['Play Crossword Dungeon', 'https://enegames.itch.io/crossword-dungeon'],
    ],
  },
  {
    id: 'lost',
    tag: 'AI + GAMES',
    title: 'Lost — an infinite game with 100% AI generated content',
    meta: 'Presented at AI Engineer Summit 2023',
    img: 'assets/lost-game.png',
    img2: 'assets/lost-in-play.mp4',
    body: 'An atmospheric game where every location, visual, and game state impact is 100% AI-generated. I built a custom multimodal pipeline with fine-tuned models to keep the experience coherent across infinite content.',
    links: [
      ['Watch the AI Engineer Summit talk', 'https://www.youtube.com/watch?v=_KFbT6eph5A'],
      ['Play Lost', 'https://enegames.itch.io/lost'],
      ['Postmortem', 'https://blog.jeffschomay.com/lost-in-an-infinite-maze-building-a-real-time-generative-ai-game-assets-pipeline'],
    ],
  },
  {
    id: 'edge',
    tag: 'GAMES · CRAFT',
    title: 'The Edge of Known Space',
    meta: 'My most popular and personal favorite game',
    img: 'assets/edge-of-known-space.gif',
    img2: 'assets/edge-of-known-space-torch.gif',
    body: 'A single-screen, sci-fi, micro-metroidvania ASCII game with surprising depth. I wanted to explore how much I could pack into a minimal representation — striking visual fidelity at ASCII resolution, evolving mechanics that unfold across an hour with only a single screen, and an integral theme of uncovering the unknown.',
    pullQuote:
      "I absolutely loved this game. It's clever, it's atmospheric, it's surprising, and the graphics do things I've never seen done with ASCII art.",
    pullQuoteAttr: 'Player review, 2025',
    links: [
      ['Play it', 'https://enegames.itch.io/the-edge-of-known-space'],
      ['Dev log', 'https://enegames.itch.io/the-edge-of-known-space/devlog'],
    ],
  },
];

// ── Writing & talks ─────────────────────────────────────────────────
export const WRITING = [
  {
    sec: 'AI in games — early and ongoing',
    items: [
      [
        'Inworld AI NPCs in games (5-part series, 2023)',
        'https://blog.jeffschomay.com/series/inworld-npc-explorations',
        'deep dive into the risks and mitigations for ludonarrative dissonance when adding AI content to scripted games',
      ],
      [
        'How I make games with AI in 2026',
        'https://blog.jeffschomay.com/how-i-m-using-ai-for-game-dev-in-2026',
        'applying professional AI engineering practices to creative side projects',
      ],
    ],
  },
  {
    sec: 'Previous talks',
    items: [
      [
        'ElixirConf 2018: Behavior Trees and Battleship',
        'https://youtu.be/3sLYzxuKGXI?si=LDgi9S4auL3rdMde',
        'a game-playing AI via behavior trees',
      ],
      [
        'elm-conf 2016: Building an Interactive Storytelling Framework in Elm',
        'https://youtu.be/t8RSxzpw1Yw?si=dIFo7unTRRCezZzD',
        '4.4K views — announcing the open source Elm Narrative Engine',
      ],
      [
        'Elm Europe 2017: Turning the Elm Narrative Engine Inside-Out',
        'https://youtu.be/4H7iH_kymig?si=JRl6U-ikE8KUEWM-',
        'lessons after a year of development',
      ],
    ],
  },
];

// ── Social / contact links ──────────────────────────────────────────
export const SOCIAL_LINKS = [
  ['GitHub', 'https://github.com/jschomay/'],
  ['LinkedIn', 'https://www.linkedin.com/in/jeffschomay/'],
  ['Blog', 'https://blog.jeffschomay.com/'],
];

export const FOOTER_LINKS = [
  ['GitHub', 'https://github.com/jschomay/'],
  ['LinkedIn', 'https://www.linkedin.com/in/jeffschomay/'],
  ['Blog', 'https://blog.jeffschomay.com/'],
  ['Itch.io', 'https://enegames.itch.io/'],
  ['CV.pdf', 'assets/Jeff-Schomay-CV.pdf'],
];
