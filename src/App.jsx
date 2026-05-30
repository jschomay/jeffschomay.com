import { useState, useEffect } from 'react';
import GlyphField from './components/GlyphField.jsx';
import Scramble from './components/Scramble.jsx';
import { THEME } from './theme.js';
import { FEATURED, MORE, WRITING, QUOTES, SOCIAL_LINKS, FOOTER_LINKS } from './data.js';
import './styles.css';

const t = THEME;

// Resolve a /public asset path against Vite's base URL so it works
// whether served from root or a sub-path.
const asset = (p) => (p ? import.meta.env.BASE_URL + p : p);

const isVideo = (p) => /\.(mp4|webm)$/i.test(p || '');

// Renders either an <img> or an autoplay-looping <video> based on extension.
// For videos, expects sibling .webm and -poster.jpg files alongside the .mp4.
function Media({ src, className, alt }) {
  if (!src) return null;
  if (isVideo(src)) {
    const base = src.replace(/\.(mp4|webm)$/i, '');
    return (
      <video
        className={className}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={asset(base + '-poster.jpg')}
      >
        <source src={asset(base + '.webm')} type="video/webm" />
        <source src={asset(base + '.mp4')} type="video/mp4" />
      </video>
    );
  }
  return <img src={asset(src)} alt={alt || ''} className={className} loading="lazy" />;
}

const num = (n) => String(n).padStart(2, '0');

// ── Palette helper ──────────────────────────────────────────────────
function paletteFor(treatment) {
  if (treatment === 'flooded') {
    return {
      bg: t.floodColor,
      fg: t.floodInk,
      hl: t.floodHighlight,
      sub: t.floodInk + 'cc',
      body: t.floodBodyHeavy ? t.floodInk : t.floodInk + 'd0',
      soft: t.floodInk + '33',
    };
  }
  return {
    bg: '#0a0a0a',
    fg: t.phosphor,
    hl: t.accent,
    sub: t.phosphor + 'cc',
    body: t.phosphor + 'e6',
    soft: t.phosphor + '33',
  };
}

function heavyBorderVars(color) {
  return {
    '--heavy-bar': color,
    '--heavy-w-left': t.heavyBorderLeft ? '2px' : '0px',
    '--heavy-w-right': t.heavyBorderRight ? '2px' : '0px',
  };
}

// ── Hero ─────────────────────────────────────────────────────────────
function HeroSubheads() {
  const cursor = t.showCursor ? <span className="w-blink" style={{ color: t.accent }}>█</span> : null;
  if (t.heroStyle === 'build') {
    return (
      <>
        <p className="w-hero-tag small" style={{ color: t.phosphor, opacity: 0.8 }}>
          Technical. Creative. Curious.
        </p>
        <p className="w-hero-mantra lead" style={{ color: t.accent }}>
          <span style={{ color: t.phosphor, opacity: 0.55 }}>// </span>
          I build things others don't see yet.{cursor && ' '}
          {cursor}
        </p>
      </>
    );
  }
  return (
    <>
      <p className="w-hero-mantra lead" style={{ color: t.accent }}>
        <span style={{ color: t.phosphor, opacity: 0.55 }}>// </span>
        Technical. Creative. Curious.
      </p>
      <p className="w-hero-tag small" style={{ color: t.phosphor, opacity: 0.8 }}>
        I build things others don't see yet.{cursor && ' '}
        {cursor}
      </p>
    </>
  );
}

function Hero() {
  const aspectMap = { square: '1/1', portrait: '3/4', landscape: '4/3' };
  return (
    <section className="w-hero">
      <div className="w-hero-left">
        <div className="w-hero-eyebrow">
          <span style={{ color: t.accent }}>▌</span> PORTFOLIO HIGHLIGHTS
        </div>
        <h1 className="w-hero-name">
          <Scramble text="JEFF" on={t.boot} delay={0} />
          <br />
          <Scramble text="SCHOMAY." on={t.boot} delay={120} />
        </h1>
        <HeroSubheads />
        <div className="w-hero-links">
          {SOCIAL_LINKS.map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noopener" className="w-link big">
              <span className="w-link-glyph">›</span> {l}
            </a>
          ))}
        </div>
      </div>
      <div className="w-hero-right">
        <div
          className="w-headshot-wrap"
          style={{
            '--shot-size': t.headshotSize + '%',
            '--shot-aspect': aspectMap[t.headshotAspect] || '4/5',
            '--shot-vpos': t.headshotVPos + '%',
          }}
        >
          <img src={asset('assets/headshot.jpg')} alt="Jeff Schomay" className={`w-headshot ${t.headshotColor}`} />
          <div className={`w-headshot-overlay ${t.headshotColor === 'full' ? 'hidden' : ''}`} />
        </div>
      </div>
    </section>
  );
}

// ── Section head ────────────────────────────────────────────────────
function SectionHead({ idx, title, count, sub }) {
  return (
    <>
      <div className="w-section-head">
        <span className="w-sec-no" style={{ color: t.accent }}>{num(idx)}</span>
        <h2 className="w-sec-title">{title}</h2>
        <span className="w-sec-rule" />
        <span className="w-sec-count">{count}</span>
      </div>
      {sub && <p className="w-sec-sub">{sub}</p>}
    </>
  );
}

// ── Imagery ─────────────────────────────────────────────────────────
function PrimaryImage({ p }) {
  if (!p.img) return null;
  if (p.isLogo) {
    return (
      <div className="w-logo-wrap">
        <img src={asset(p.img)} alt="Mechanical Orchard" className="w-logo" loading="lazy" />
      </div>
    );
  }
  return (
    <div className="w-img-wrap">
      <Media src={p.img} className="w-img" />
    </div>
  );
}

function SecondaryImage({ p }) {
  if (!p.img2) return null;
  return (
    <div className="w-img-second">
      <Media src={p.img2} className="w-img sm" />
    </div>
  );
}

function LinksBlock({ p, pal, treatment }) {
  return (
    <div
      className={`w-links ${treatment === 'flooded' ? 'solid' : ''}`}
      style={{ borderColor: pal.soft, '--link-border': pal.soft, '--link-glyph': pal.hl }}
    >
      {p.linksLabel && (
        <div className="w-links-label" style={{ color: pal.hl }}>
          {p.linksLabel}
        </div>
      )}
      {p.links.map(([label, href]) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener"
          className="w-link"
          style={treatment === 'flooded' ? undefined : { color: pal.fg }}
        >
          <span className="w-link-glyph">›</span> {label}
        </a>
      ))}
    </div>
  );
}

function HeavyCorners({ color }) {
  return (
    <>
      <span className="w-corner tl" style={{ borderColor: color }} />
      <span className="w-corner tr" style={{ borderColor: color }} />
      <span className="w-corner bl" style={{ borderColor: color }} />
      <span className="w-corner br" style={{ borderColor: color }} />
    </>
  );
}

function MetaPill({ meta, treatment, pal }) {
  if (treatment === 'flooded') {
    return (
      <div className="w-block-sub" style={{ background: pal.fg, color: pal.hl, borderColor: pal.fg }}>
        {meta}
      </div>
    );
  }
  return (
    <div className="w-block-sub" style={{ color: pal.hl, borderColor: pal.hl }}>
      {meta}
    </div>
  );
}

// ── Featured block ──────────────────────────────────────────────────
function FeaturedBlock({ p, idx, treatment }) {
  const pal = paletteFor(treatment);
  const isFlood = treatment === 'flooded';
  const blockStyle = isFlood
    ? { background: pal.bg, color: pal.fg }
    : { background: pal.bg, color: pal.fg, ...heavyBorderVars(pal.hl) };

  return (
    <article className={`w-block ${treatment}`} style={blockStyle}>
      {!isFlood && <HeavyCorners color={pal.hl} />}
      {t.showBigNumbers && (
        <div className={`w-bignum ${treatment}`} style={{ color: pal.hl }}>
          {num(idx + 1)}
        </div>
      )}
      <div className="w-block-inner">
        <h3 className="w-block-title" style={{ color: pal.fg }}>{p.title}</h3>
        <MetaPill meta={p.meta} treatment={treatment} pal={pal} />

        <PrimaryImage p={p} />

        {p.isLogo ? (
          <>
            <p className="w-block-body" style={{ color: pal.body, whiteSpace: 'pre-line' }}>{p.body}</p>
            {p.stats && (
              <div className="w-stats" style={{ borderColor: pal.soft }}>
                {p.stats.map(([n, l]) => (
                  <div key={l}>
                    <div className="w-stat-n" style={{ color: pal.hl }}>{n}</div>
                    <div className="w-stat-l" style={{ color: pal.sub }}>{l}</div>
                  </div>
                ))}
              </div>
            )}
            {p.pullQuote && (
              <blockquote className="w-pull" style={{ borderColor: pal.hl, color: pal.fg }}>
                <span style={{ color: pal.hl, fontSize: '1.4em', lineHeight: 0 }}>“</span>
                {p.pullQuote}
                <span style={{ color: pal.hl, fontSize: '1.4em', lineHeight: 0 }}>”</span>
                <footer style={{ color: pal.sub }}>— {p.pullQuoteAttr}</footer>
              </blockquote>
            )}
          </>
        ) : (
          <>
            <p className="w-block-body" style={{ color: pal.body, whiteSpace: 'pre-line' }}>{p.body}</p>
            <SecondaryImage p={p} />
          </>
        )}

        <LinksBlock p={p} pal={pal} treatment={treatment} />
      </div>
    </article>
  );
}

// ── Wide block (additional highlights) ──────────────────────────────
function WideBlock({ p, idx, treatment, imgRight }) {
  const pal = paletteFor(treatment);
  const isFlood = treatment === 'flooded';
  const blockStyle = isFlood
    ? { background: pal.bg, color: pal.fg }
    : { background: pal.bg, color: pal.fg, ...heavyBorderVars(pal.hl) };

  return (
    <article
      className={`w-block w-wide ${treatment} ${imgRight ? 'img-right' : 'img-left'}`}
      style={blockStyle}
    >
      {!isFlood && <HeavyCorners color={pal.hl} />}
      {t.showBigNumbers && (
        <div className={`w-bignum ${treatment}`} style={{ color: pal.hl }}>
          {num(idx + 1)}
        </div>
      )}

      {p.img && (
        <div className="w-wide-img">
          <Media src={p.img} />
          {p.img2 && <Media src={p.img2} className="w-wide-img2-side" />}
        </div>
      )}

      <div className="w-wide-content">
        <h3 className="w-block-title" style={{ color: pal.fg }}>{p.title}</h3>
        <MetaPill meta={p.meta} treatment={treatment} pal={pal} />
        <p className="w-block-body" style={{ color: pal.body, whiteSpace: 'pre-line' }}>{p.body}</p>

        {p.img2 && <Media src={p.img2} className="w-wide-img2-stack" />}

        {p.pullQuote && (
          <blockquote className="w-pull" style={{ borderColor: pal.hl, color: pal.fg }}>
            <span style={{ color: pal.hl }}>“</span>
            {p.pullQuote}
            <span style={{ color: pal.hl }}>”</span>
            <footer style={{ color: pal.sub }}>— {p.pullQuoteAttr}</footer>
          </blockquote>
        )}

        <LinksBlock p={p} pal={pal} treatment={treatment} />
      </div>
    </article>
  );
}

// ── Sam D flooded quote takeover ────────────────────────────────────
function QuoteTakeover({ q, by }) {
  const pal = paletteFor('flooded');
  return (
    <article className="w-block flooded" style={{ background: pal.bg, color: pal.fg }}>
      <div className="w-quote-block">
        <span className="w-quote-mark" style={{ color: pal.hl }}>“</span>
        <p className="w-quote-text">{q}</p>
        <footer className="w-quote-by" style={{ color: pal.sub }}>— {by}</footer>
      </div>
    </article>
  );
}

// ── App ─────────────────────────────────────────────────────────────
export default function App() {
  const [, setBooted] = useState(!t.boot);

  useEffect(() => {
    if (!t.boot) {
      setBooted(true);
      return;
    }
    const id = setTimeout(() => setBooted(true), 1400);
    return () => clearTimeout(id);
  }, []);

  const cssVars = {
    '--bg': t.bg,
    '--ph': t.phosphor,
    '--ac': t.accent,
    '--ph-dim': t.phosphor + '99',
    '--ph-soft': t.phosphor + '44',
    '--scale': t.fontScale,
    '--scan-op': t.scanlineIntensity,
  };

  const treatments = t.treatments;
  const writingPal = paletteFor('heavy');
  const aboutPal = paletteFor('flooded');

  return (
    <div className="w-root" style={cssVars}>
      <GlyphField
        density={t.glyphDensity}
        phosphor={t.phosphor}
        accent={t.accent}
        pattern={t.bgPattern}
        highlight={t.glyphHighlight}
        highlightRadius={t.glyphHighlightRadius}
      />
      {t.scanlines && <div className="t-scanlines" aria-hidden="true" />}
      {t.noise && <div className="t-noise" aria-hidden="true" />}

      <div className="w-content">
        <Hero />

        <SectionHead idx={1} title="FEATURED WORK -- CREATIVE AND TECHNICAL" count="02 ENTRIES" />
        <div className="w-grid-2">
          {FEATURED.map((p, i) => (
            <FeaturedBlock key={p.id} p={p} idx={i} treatment={treatments[i]} />
          ))}
        </div>

        <SectionHead idx={2} title="ADDITIONAL HIGHLIGHTS" count="03 ENTRIES" />
        <div className="w-stack">
          {MORE.map((p, i) => (
            <WideBlock key={p.id} p={p} idx={i + 2} treatment={treatments[i + 2]} imgRight={i % 2 === 0} />
          ))}
        </div>

        <div className="w-quote-spacer" />
        <QuoteTakeover q={QUOTES[0].q} by={QUOTES[0].by} />

        <SectionHead
          idx={3}
          title="WRITING & TALKS"
          count={`0${WRITING.reduce((s, x) => s + x.items.length, 0)} ENTRIES`}
        />
        <article
          className="w-block heavy"
          style={{ background: writingPal.bg, ...heavyBorderVars(writingPal.hl), color: writingPal.fg }}
        >
          <HeavyCorners color={writingPal.hl} />
          <div className="w-writing">
            {WRITING.map((s) => (
              <div className="w-writing-sec" key={s.sec}>
                <div className="w-writing-sec-h" style={{ color: writingPal.hl }}>{s.sec}</div>
                <ul>
                  {s.items.map(([title, href, sub]) => (
                    <li key={title}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener"
                        className="w-link"
                        style={{ color: writingPal.fg, '--link-border': writingPal.soft, '--link-glyph': writingPal.hl }}
                      >
                        <span className="w-link-glyph">›</span> {title}
                      </a>
                      <div className="w-writing-sub" style={{ color: writingPal.body }}>{sub}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <SectionHead idx={4} title="HOW I GOT HERE" count="STORY" />
        <article className="w-block flooded" style={{ background: aboutPal.bg, color: aboutPal.fg }}>
          <div className="w-about">
            <p className="w-about-hook" style={{ color: aboutPal.fg }}>
              <span style={{ color: aboutPal.hl }}>// </span>
              Curiosity is my through-line.
            </p>
            <div className="w-about-cols">
              <p style={{ color: aboutPal.body, whiteSpace: 'pre-line' }}>
                I went to film school and moved to LA to be a screenwriter. Instead, I ended up in tech.{'\n\n'}Early
                on, I was lucky to work with one of the devs of <em style={{ color: aboutPal.fg }}>Quake</em>,
                who showed me the art behind good game design. I was so inspired that I pivoted from film to
                narrative games. {'\n\n'}Meanwhile, I continued to build my career in software, which took me to
                Adobe, where I worked under Mark Hamburg, the creator of <em style={{ color: aboutPal.fg }}>Photoshop</em>.
              </p>
              <p style={{ color: aboutPal.body, whiteSpace: 'pre-line' }}>
                My early narrative game work caught the attention of a dev at Latitude (the team behind <em style={{ color: aboutPal.fg }}>AI Dungeon</em>). We dove head-first into the early world of creative AI generation, building multimodal
                experiences in the GPT-3 era.{'\n\n'}I parlayed that new knowledge and enthusiasm into forging
                custom agentic systems at scale at Mechanical Orchard.{'\n\n'}I continue to experiment with
                bleeding-edge tech, finding new and creative ways to explore what is possible.
              </p>
            </div>
          </div>
        </article>

        <footer className="w-footer">
          <div className="w-footer-rule" />
          <div className="w-footer-row">
            <div>
              <div className="w-footer-name">JEFF SCHOMAY</div>
              <div className="w-footer-tag">
                <span style={{ color: t.accent }}>//</span> thanks for visiting
              </div>
            </div>
            <div className="w-footer-links">
              {FOOTER_LINKS.map(([l, h]) => {
                const external = h.startsWith('http');
                return (
                  <a
                    key={l}
                    href={external ? h : asset(h)}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener' : undefined}
                    className="w-link"
                  >
                    <span className="w-link-glyph">›</span> {l}
                  </a>
                );
              })}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
