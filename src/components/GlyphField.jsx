import { useState, useEffect, useRef } from 'react';

// Tracks viewport size so the glyph field fills exactly one screen.
// Fixed-positioned, so the field doesn't grow with scrollHeight.
// Quantized to 100px buckets so mobile URL-bar reflows don't churn React.
function useViewport() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const Q = 100;
    function resize() {
      const w = Math.ceil(window.innerWidth / Q) * Q;
      const h = Math.ceil(window.innerHeight / Q) * Q;
      setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return size;
}

// ──────────────────────────────────────────────────────────────────
// ASCII glyph background field — canvas implementation.
//
// Draws a deterministic grid of monospaced glyphs at low opacity onto
// a single <canvas>. When `highlight` > 0, a second, brighter canvas
// sits on top, masked by a radial gradient that follows the mouse.
// Mouse position is written to CSS variables so tracking never
// triggers a React re-render.
// ──────────────────────────────────────────────────────────────────
export default function GlyphField({
  density,
  phosphor,
  accent,
  pattern,
  highlight = 0,
  highlightRadius = 220,
}) {
  const { w, h } = useViewport();
  const rootRef = useRef(null);
  const baseRef = useRef(null);
  const brightRef = useRef(null);

  // Mouse tracking — pure CSS-var writes, no React re-render.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '-9999px');
    el.style.setProperty('--my', '-9999px');
    function onMove(e) {
      el.style.setProperty('--mx', e.clientX + 'px');
      el.style.setProperty('--my', e.clientY + 'px');
    }
    function onOut(e) {
      if (!e.relatedTarget) {
        el.style.setProperty('--mx', '-9999px');
        el.style.setProperty('--my', '-9999px');
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onOut);
    };
  }, []);

  // Draw the field whenever inputs change. One pass per canvas; no
  // per-cell objects, no React reconciliation.
  useEffect(() => {
    if (pattern === 'none' || !w || !h) return;

    const cellW = 12;
    const cellH = 18;
    const cols = Math.ceil(w / cellW);
    const rows = Math.ceil(h / cellH);
    const glyphs = '###@%&*+=-~^?!$';
    const seed = (i, j) => Math.abs(Math.sin(i * 374.31 + j * 91.13) * 4823.5) % 1;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function paint(canvas, opMultiplier) {
      if (!canvas) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      ctx.font = '12px ui-monospace, monospace';
      ctx.textBaseline = 'top';

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const r = seed(i, j);
          if (r > density) continue;
          let ch, color, op;
          if (pattern === 'dots') {
            ch = '·';
            color = phosphor;
            op = 0.18;
          } else if (pattern === 'grid') {
            ch = '+';
            color = phosphor;
            op = 0.12;
          } else {
            ch = glyphs[Math.floor(r * 137) % glyphs.length];
            const isAccent = r > 0.9 * density;
            color = isAccent ? accent : phosphor;
            op = isAccent ? 0.22 : 0.1;
          }
          ctx.globalAlpha = Math.min(1, op * opMultiplier);
          ctx.fillStyle = color;
          ctx.fillText(ch, i * cellW, j * cellH);
        }
      }
    }

    paint(baseRef.current, 1);
    if (highlight > 0) paint(brightRef.current, 1 + highlight);
  }, [w, h, density, phosphor, accent, pattern, highlight]);

  if (pattern === 'none') return null;

  // Soft-edged radial reveal centered on the mouse.
  const maskCss =
    `radial-gradient(circle ${highlightRadius}px at var(--mx,-9999px) var(--my,-9999px),` +
    ' rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0) 100%)';

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <canvas ref={baseRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      {highlight > 0 && (
        <canvas
          ref={brightRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            WebkitMaskImage: maskCss,
            maskImage: maskCss,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
}
