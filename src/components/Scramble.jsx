import { useState, useEffect } from 'react';

// ──────────────────────────────────────────────────────────────────
// Type-reveal "scramble" animation for the hero name. Each character
// resolves from random glyphs to its final value, left to right.
// Pass on={false} to render the final text immediately (no animation).
// Initial state is the final text so prerendered HTML (and hydration)
// carry the real content; the animation takes over client-side.
// ──────────────────────────────────────────────────────────────────
export default function Scramble({ text, delay = 0, on = true, className, style }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!on) {
      setOut(text);
      return;
    }
    let raf,
      t0;
    const chars = '█▓▒░#@%&*+=-~^?!$<>/\\';
    function step(t) {
      if (!t0) t0 = t;
      const elapsed = t - t0 - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(step);
        return;
      }
      const perChar = 18;
      const total = text.length * perChar + 200;
      if (elapsed > total) {
        setOut(text);
        return;
      }
      let s = '';
      for (let i = 0; i < text.length; i++) {
        const reveal = elapsed - i * perChar;
        if (reveal > 80) s += text[i];
        else if (reveal > 0) s += chars[Math.floor(Math.random() * chars.length)];
        else s += ' ';
      }
      setOut(s);
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, on]);

  return (
    <span className={className} style={style}>
      {out}
    </span>
  );
}
