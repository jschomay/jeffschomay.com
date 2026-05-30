// ──────────────────────────────────────────────────────────────────
// Theme configuration.
//
// These were the live "tweak" values in the original design tool, now
// frozen as a static config. Edit any of them to re-skin the site, or
// lift them back into React state + UI controls if you want them live.
// ──────────────────────────────────────────────────────────────────

export const THEME = {
  // Core palette
  phosphor: '#f5b73c', // primary foreground (amber CRT phosphor)
  accent: '#ff7adc', // highlight / accent (pink)
  bg: '#0a0a0a', // page background

  // Flooded-block palette
  floodColor: '#f5b73c', // flooded block fill
  floodInk: '#0a0a0a', // flooded block text
  floodHighlight: '#ff7adc', // flooded block highlight
  floodBodyHeavy: true, // full-strength body text in flooded blocks

  // Background glyph field
  bgPattern: 'glyphs', // 'glyphs' | 'dots' | 'none'
  glyphDensity: 0.45, // 0–1 fill density
  glyphHighlight: 0.2, // mouse-spotlight brightness boost (0 = off)
  glyphHighlightRadius: 160, // mouse-spotlight radius in px

  // CRT effects
  scanlines: true,
  scanlineIntensity: 0.18,
  noise: true,
  boot: true, // hero scramble-in animation
  showCursor: true, // blinking block cursor in hero

  // Typography
  fontScale: 1,

  // Hero
  heroStyle: 'build', // 'build' | 'curious'

  // Headshot
  headshotColor: 'full', // 'full' | 'muted' | 'mono'
  headshotAspect: 'portrait', // 'square' | 'portrait' | 'landscape'
  headshotSize: 80, // width %
  headshotVPos: 30, // vertical object-position %

  // Project blocks
  showBigNumbers: true,
  // Treatment per block, in order:
  // [realtime, mainframes, crossword, lost, edge]
  treatments: ['flooded', 'heavy', 'heavy', 'flooded', 'heavy'],
  heavyBorderLeft: true,
  heavyBorderRight: true,
};
