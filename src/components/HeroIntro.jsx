import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import InteractiveLogo from './logo/InteractiveLogo';
import useReducedMotion from '../hooks/useReducedMotion';
import useLogoVariant from '../hooks/useLogoVariant';

const SESSION_KEY = 'jpr_intro_seen';

// Fragmentos atmosféricos autorados (não randômicos em runtime): cruzam a
// tela em diagonais enquanto a marca é montada, parte deles convergindo
// para o centro e se dissolvendo bem no momento em que ela se assenta.
const AMBIENT_FRAGMENTS = [
  { id: 0, size: 46, rotate: -35, variant: 'filled', from: { top: '14%', left: '-6%' }, to: { top: '40%', left: '48%' }, delay: 0.0, blur: 0 },
  { id: 1, size: 58, rotate: 150, variant: 'outline', from: { top: '82%', left: '104%' }, to: { top: '46%', left: '54%' }, delay: 0.05, blur: 1 },
  { id: 2, size: 30, rotate: 60, variant: 'filled', from: { top: '-8%', left: '66%' }, to: { top: '34%', left: '46%' }, delay: 0.18, blur: 2 },
  { id: 3, size: 38, rotate: -110, variant: 'outline', from: { top: '96%', left: '20%' }, to: { top: '58%', left: '50%' }, delay: 0.12, blur: 0 },
  { id: 4, size: 24, rotate: 20, variant: 'filled', from: { top: '26%', left: '-10%' }, to: { top: '44%', left: '40%' }, delay: 0.32, blur: 1 },
  { id: 5, size: 52, rotate: -70, variant: 'outline', from: { top: '4%', left: '108%' }, to: { top: '36%', left: '58%' }, delay: 0.24, blur: 2 },
  { id: 6, size: 22, rotate: 95, variant: 'filled', from: { top: '104%', left: '80%' }, to: { top: '60%', left: '52%' }, delay: 0.4, blur: 0 },
];

function pickMode(reducedMotion) {
  if (reducedMotion) return 'static';
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return 'short';
  } catch {
    /* sessionStorage indisponível (modo privado, etc.) — trata como primeira entrada */
  }
  return 'full';
}

export default function HeroIntro({ onDone }) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const logoVariant = useLogoVariant();
  const [mode] = useState(() => pickMode(reducedMotion));
  const [showSubtitle, setShowSubtitle] = useState(mode === 'static');

  const ambientLayerRef = useRef(null);
  const ambientRefs = useRef([]);
  const doneRef = useRef(false);

  useLayoutEffect(() => {
    if (mode !== 'full') return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      AMBIENT_FRAGMENTS.forEach((cfg, i) => {
        const el = ambientRefs.current[i];
        if (!el) return;
        tl.fromTo(
          el,
          { top: cfg.from.top, left: cfg.from.left, opacity: 0, scale: 0.6, rotate: cfg.rotate, filter: `blur(${cfg.blur}px)` },
          { top: cfg.to.top, left: cfg.to.left, opacity: cfg.variant === 'outline' ? 0.32 : 0.48, scale: 1, duration: 1.1, ease: 'power2.inOut' },
          cfg.delay
        ).to(el, { opacity: 0, duration: 0.35, ease: 'power1.in' }, cfg.delay + 0.85);
      });
    }, ambientLayerRef);
    return () => ctx.revert();
  }, [mode]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* noop */
    }
    onDone?.();
  };

  const handleBuilt = () => {
    setShowSubtitle(true);
    finish();
  };

  return (
    <>
      {mode === 'full' && (
        <div className="hero-intro__ambient" ref={ambientLayerRef} aria-hidden="true">
          {AMBIENT_FRAGMENTS.map((cfg, i) => (
            <svg
              key={cfg.id}
              className={`hero-intro__frag hero-intro__frag--${cfg.variant}`}
              style={{ width: cfg.size, height: cfg.size * 0.87 }}
              ref={(el) => (ambientRefs.current[i] = el)}
              viewBox="0 0 100 87"
            >
              <polygon points="50,0 100,87 0,87" />
            </svg>
          ))}
        </div>
      )}

      <div className="hero__content">
        <InteractiveLogo key={logoVariant} variant={logoVariant} mode={mode} onBuilt={handleBuilt} />

        <h1 className="hero__content-title">JPRO Web Solutions</h1>

        {showSubtitle && (
          <TypeAnimation
            sequence={[t('hero.subtitle'), 1000]}
            wrapper="h2"
            className="hero__content-subtitle"
            cursor
            speed={60}
          />
        )}
      </div>
    </>
  );
}
