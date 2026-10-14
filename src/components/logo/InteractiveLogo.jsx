import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import logoDesktopUrl from '../../assets/hero/logo.svg';
import logoMobileUrl from '../../assets/hero/logo-mob.svg';
import { buildFragmentGrid } from './fragmentGrid';
import { ARTWORK, IDLE, INTRO, INTERACTION, RESPONSIVE, WORD_ZONES } from './logoConfig';
import useReducedMotion from '../../hooks/useReducedMotion';
import LogoPulse from './LogoPulse';
import '../../styles/components/_logo.scss';

const ARTWORK_URL = { desktop: logoDesktopUrl, mobile: logoMobileUrl };

// Pseudo-aleatório determinístico: mesma "coreografia" a cada montagem,
// em vez de trajetórias diferentes e imprevisíveis a cada carregamento.
function seeded(i) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Traço percorrendo as bordas triangulares do símbolo (path/polygon com
// pathLength=1 do LogoPulse), usado no encaixe da abertura e na reconstrução.
function firePulse(svgEl, { duration = 0.55 } = {}) {
  if (!svgEl) return;
  const shapes = svgEl.querySelectorAll('path, polygon');
  gsap.set(svgEl, { opacity: 1 });
  gsap.fromTo(
    shapes,
    { strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' }
  );
  gsap.to(svgEl, { opacity: 0, duration: 0.35, delay: duration * 0.6, overwrite: 'auto' });
}

const InteractiveLogo = forwardRef(function InteractiveLogo(
  { variant = 'desktop', mode = 'full', onBuilt, onRupture, onReconstruct },
  ref
) {
  const reducedMotion = useReducedMotion();
  const artwork = ARTWORK[variant];
  const artworkUrl = ARTWORK_URL[variant];
  const fragments = useMemo(
    () => buildFragmentGrid(artwork.grid.cols, artwork.grid.rows),
    [artwork.grid.cols, artwork.grid.rows]
  );

  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const pulseRef = useRef(null);
  const fragmentRefs = useRef([]);
  const wordRefs = useRef([]);
  const setters = useRef([]);
  const homePositions = useRef([]);
  const rectRef = useRef({ width: 0, height: 0 });
  const rafRef = useRef(null);
  const pointer = useRef({
    x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0, lastT: 0,
    inInfluence: false, entered: false, rupturing: false, moved: false,
  });
  const activeWordRef = useRef(-1);
  const builtRef = useRef(false);
  const [isBuilt, setIsBuilt] = useState(false);
  const coarsePointer =
    typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  useImperativeHandle(ref, () => ({
    snapToRest() {
      gsap.set(fragmentRefs.current, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
    },
  }));

  const measure = useCallback(() => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    rectRef.current = { width: rect.width, height: rect.height, left: rect.left, top: rect.top };
    homePositions.current = fragments.map((f) => ({
      x: (f.cx / 100 - 0.5) * rect.width,
      y: (f.cy / 100 - 0.5) * rect.height,
    }));
  }, [fragments]);

  // Ruptura e reconstrução são compartilhadas entre a interação por ponteiro,
  // o toque e o pulso espontâneo (idle) — mesma física, gatilhos diferentes.
  const runRupture = useCallback(
    (entryX, entryY) => {
      const p = pointer.current;
      p.rupturing = true;
      onRupture?.();
      const { width, height } = rectRef.current;
      const tl = gsap.timeline({
        onComplete: () => {
          p.rupturing = false;
        },
      });
      fragments.forEach((f, i) => {
        const home = homePositions.current[i];
        if (!home) return;
        const away = { x: home.x - (entryX - width / 2), y: home.y - (entryY - height / 2) };
        const dist = Math.hypot(away.x, away.y) || 1;
        const nx = away.x / dist;
        const ny = away.y / dist;
        const jitter = 0.7 + seeded(i + 200) * 0.6;
        tl.to(
          fragmentRefs.current[i],
          {
            x: nx * INTERACTION.ruptureDistance * jitter,
            y: ny * INTERACTION.ruptureDistance * jitter,
            rotation: (seeded(i + 300) - 0.5) * INTERACTION.maxRotation * 2,
            scale: 1 + seeded(i + 400) * 0.12,
            duration: INTERACTION.ruptureDuration,
            ease: 'power4.out',
            overwrite: 'auto',
          },
          i * INTERACTION.ruptureStagger
        );
      });
      return tl;
    },
    [fragments, onRupture]
  );

  const runReconstruct = useCallback(() => {
    onReconstruct?.();
    gsap.to(fragmentRefs.current, {
      x: 0, y: 0, rotation: 0, scale: 1,
      duration: INTERACTION.reconstructDuration,
      ease: `elastic.out(1, ${INTERACTION.reconstructElasticPeriod})`,
      stagger: INTERACTION.reconstructStagger,
      overwrite: 'auto',
    });
    firePulse(pulseRef.current, { duration: INTERACTION.reconstructDuration * 0.75 });
  }, [onReconstruct]);

  // ---- construção (intro) ----
  useLayoutEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);

    const ctx = gsap.context(() => {
      setters.current = fragmentRefs.current.map((el) => ({
        x: gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' }),
        rotation: gsap.quickTo(el, 'rotation', { duration: 0.6, ease: 'power3' }),
        scale: gsap.quickTo(el, 'scale', { duration: 0.5, ease: 'power3' }),
      }));

      if (mode === 'static' || reducedMotion) {
        gsap.set(fragmentRefs.current, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, filter: 'blur(0px)' });
        builtRef.current = true;
        setIsBuilt(true);
        onBuilt?.();
        return;
      }

      const entryDist = variant === 'mobile' ? INTRO.entryDistanceMobile : INTRO.entryDistance;
      const isShort = mode === 'short';
      const durationScale = isShort ? 0.5 : 1;
      const staggerScale = isShort ? 0.35 : 1;

      // Ordem de chegada em varredura (esquerda->direita no desktop,
      // cima->baixo no mobile) em vez da ordem crua da grade — a peça some
      // "escaneando" pela marca, ao invés de duas fileiras mecânicas.
      const sweepAxis = variant === 'mobile' ? 'cy' : 'cx';
      const sweepOrder = fragments
        .map((f, i) => i)
        .sort((a, b) => fragments[a][sweepAxis] - fragments[b][sweepAxis]);
      const sweepPosition = new Array(fragments.length);
      sweepOrder.forEach((fragIndex, order) => {
        sweepPosition[fragIndex] = order;
      });

      const tl = gsap.timeline({
        defaults: { ease: INTRO.buildEase },
      });

      fragments.forEach((f, i) => {
        const angleJitter = (seeded(i) - 0.5) * INTRO.entryAngleJitter * (Math.PI / 180);
        const baseAngle = Math.atan2(f.outward.y, f.outward.x) + angleJitter;
        const dist = entryDist * (0.7 + seeded(i + 50) * 0.6);
        const fromX = Math.cos(baseAngle) * dist;
        const fromY = Math.sin(baseAngle) * dist;
        const fromRot = (seeded(i + 100) - 0.5) * 200;

        tl.fromTo(
          fragmentRefs.current[i],
          { x: fromX, y: fromY, rotation: fromRot, scale: 0.4 + seeded(i + 150) * 0.3, opacity: 0, filter: 'blur(7px)' },
          {
            x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
            duration: INTRO.buildDuration * durationScale,
          },
          sweepPosition[i] * INTRO.buildStagger * staggerScale
        );
      });

      // Instante do encaixe final: um "soco" de escala no conjunto inteiro
      // (peso/impacto), um micro-wobble elástico por fragmento e o traço de
      // pulso — os três sincronizados no mesmo frame para vender o momento.
      tl.add(() => {
        firePulse(pulseRef.current, { duration: INTRO.settlePulseDuration });

        if (stageRef.current) {
          gsap.fromTo(
            stageRef.current,
            { scale: 1 },
            {
              scale: INTRO.impactPunchScale,
              duration: INTRO.impactPunchDuration * durationScale,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1,
              overwrite: 'auto',
            }
          );
        }

        gsap.fromTo(
          fragmentRefs.current,
          { scale: 1 },
          {
            scale: INTRO.settleWobbleScale,
            duration: INTRO.settleWobbleDuration * 0.4 * durationScale,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
            stagger: { each: INTRO.buildStagger * 0.5 * staggerScale, from: 'center' },
            overwrite: 'auto',
          }
        );
      }, `-=${INTRO.buildDuration * durationScale * 0.12}`);

      tl.call(() => {
        builtRef.current = true;
        setIsBuilt(true);
        onBuilt?.();
      });
    }, wrapperRef);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, reducedMotion, variant]);

  // ---- interação com o cursor ----
  useLayoutEffect(() => {
    if (reducedMotion || coarsePointer) return undefined;
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    const setActiveWord = (zone) => {
      if (zone === activeWordRef.current) return;
      activeWordRef.current = zone;
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const active = i === zone;
        gsap.to(el, {
          opacity: active ? 1 : 0,
          y: active ? 0 : 14,
          clipPath: active
            ? 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 38%)'
            : 'polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)',
          duration: 0.32,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    };

    const runField = () => {
      rafRef.current = requestAnimationFrame(runField);
      const p = pointer.current;
      if (!builtRef.current) return;

      if (!p.moved) {
        p.vx *= INTERACTION.velocityDecay;
        p.vy *= INTERACTION.velocityDecay;
      }
      p.moved = false;

      if (!p.inInfluence || p.rupturing) return;

      const speed = Math.hypot(p.vx, p.vy);
      const speedNorm = Math.min(speed / INTERACTION.speedNormDivisor, 1);
      const phase = p.entered ? 1 : INTERACTION.approachIntensity;
      const rotationCap = p.entered ? INTERACTION.maxRotation : INTERACTION.tiltMax;
      const { width, height } = rectRef.current;
      const radius = INTERACTION.influenceRadius;

      const px = p.x - width / 2;
      const py = p.y - height / 2;

      fragments.forEach((f, i) => {
        const home = homePositions.current[i];
        if (!home) return;
        const offX = home.x - px;
        const offY = home.y - py;
        const dist = Math.hypot(offX, offY) || 1;
        const proximity = Math.max(0, 1 - dist / radius);
        if (proximity <= 0) {
          setters.current[i]?.x(0);
          setters.current[i]?.y(0);
          setters.current[i]?.rotation(0);
          setters.current[i]?.scale(1);
          return;
        }

        const nx = offX / dist;
        const ny = offY / dist;
        const tangentX = -ny;
        const tangentY = nx;
        const curl = Math.sign(p.vx * ny - p.vy * nx) || 1;

        const pushMag =
          INTERACTION.repelStrength *
          proximity *
          (INTERACTION.repelBaseline + speedNorm * INTERACTION.repelSpeedBoost) *
          INTERACTION.maxTranslate *
          phase;
        const tangentMag = INTERACTION.vortexStrength * proximity * speedNorm * INTERACTION.maxTranslate * curl * phase;

        let targetX = nx * pushMag + tangentX * tangentMag;
        let targetY = ny * pushMag + tangentY * tangentMag;
        const mag = Math.hypot(targetX, targetY);
        if (mag > INTERACTION.maxTranslate) {
          const k = INTERACTION.maxTranslate / mag;
          targetX *= k;
          targetY *= k;
        }
        const rotationTarget = Math.max(
          -rotationCap,
          Math.min(
            rotationCap,
            tangentMag * INTERACTION.vortexRotationFactor + (nx - ny) * proximity * INTERACTION.tiltRotationFactor
          )
        );
        const scaleTarget = 1 + proximity * INTERACTION.scaleInfluence * phase;

        setters.current[i]?.x(targetX);
        setters.current[i]?.y(targetY);
        setters.current[i]?.rotation(rotationTarget);
        setters.current[i]?.scale(scaleTarget);
      });

      if (p.entered) {
        const localX = p.x / width;
        const zone = localX < 0.5 ? 0 : 1;
        setActiveWord(zone);
      }
    };

    const isInsideCore = (x, y) => {
      const { width, height } = rectRef.current;
      const margin = INTERACTION.coreExtra;
      return x > -margin && x < width + margin && y > -margin && y < height + margin;
    };

    const handleMove = (e) => {
      const { left, top } = rectRef.current;
      const x = e.clientX - left;
      const y = e.clientY - top;
      const now = performance.now();
      const p = pointer.current;
      const dt = Math.max(now - p.lastT, 1);
      const nvx = ((x - p.lastX) / dt) * 1000;
      const nvy = ((y - p.lastY) / dt) * 1000;
      const smoothing = INTERACTION.velocitySmoothing;
      p.vx = p.vx * (1 - smoothing) + nvx * smoothing;
      p.vy = p.vy * (1 - smoothing) + nvy * smoothing;
      p.lastX = x;
      p.lastY = y;
      p.lastT = now;
      p.x = x;
      p.y = y;
      p.moved = true;
      p.inInfluence = true;

      const insideCore = isInsideCore(x, y);
      if (insideCore && !p.entered) {
        p.entered = true;
        runRupture(x, y);
      } else if (!insideCore && p.entered) {
        p.entered = false;
      }
    };

    const handleLeave = () => {
      const p = pointer.current;
      p.inInfluence = false;
      p.entered = false;
      p.vx = 0;
      p.vy = 0;
      runReconstruct();
      setActiveWord(-1);
    };

    const handleEnterWrapper = () => {
      measure();
    };

    wrapper.addEventListener('pointermove', handleMove);
    wrapper.addEventListener('pointerenter', handleEnterWrapper);
    wrapper.addEventListener('pointerleave', handleLeave);
    rafRef.current = requestAnimationFrame(runField);

    return () => {
      wrapper.removeEventListener('pointermove', handleMove);
      wrapper.removeEventListener('pointerenter', handleEnterWrapper);
      wrapper.removeEventListener('pointerleave', handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, coarsePointer, runRupture, runReconstruct, fragments, measure]);

  // ---- toque (mobile) ----
  useLayoutEffect(() => {
    if (reducedMotion || !coarsePointer) return undefined;
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    const handleTap = () => {
      if (!builtRef.current) return;
      const p = pointer.current;
      p.inInfluence = true;
      p.rupturing = true;
      onRupture?.();
      const tl = gsap.timeline({
        onComplete: () => {
          p.inInfluence = false;
          p.rupturing = false;
          onReconstruct?.();
        },
      });
      fragments.forEach((f, i) => {
        const home = homePositions.current[i] || { x: 0, y: 0 };
        const dist = Math.hypot(home.x, home.y) || 1;
        const nx = home.x / dist;
        const ny = home.y / dist;
        const scaleFactor = RESPONSIVE.tabletScale;
        tl.to(
          fragmentRefs.current[i],
          {
            x: nx * INTERACTION.ruptureDistance * scaleFactor,
            y: ny * INTERACTION.ruptureDistance * scaleFactor,
            rotation: (seeded(i + 300) - 0.5) * INTERACTION.maxRotation,
            duration: RESPONSIVE.touchDuration * 0.4,
            ease: 'power3.out',
          },
          i * 0.012
        ).to(
          fragmentRefs.current[i],
          {
            x: 0, y: 0, rotation: 0,
            duration: RESPONSIVE.touchDuration * 0.6,
            ease: `elastic.out(1, ${INTERACTION.reconstructElasticPeriod})`,
          },
          `>-${RESPONSIVE.touchDuration * 0.15}`
        );
      });
    };

    wrapper.addEventListener('touchstart', handleTap, { passive: true });
    return () => wrapper.removeEventListener('touchstart', handleTap);
  }, [reducedMotion, coarsePointer, onRupture, onReconstruct, fragments]);

  // ---- pulso espontâneo (idle) ----
  // Mesmo sem cursor ou toque, a marca se rompe e remonta sozinha de tempos
  // em tempos, para nunca parecer totalmente estática. Nunca interrompe uma
  // interação real do usuário (checa inInfluence/rupturing antes de disparar).
  useEffect(() => {
    if (reducedMotion || !isBuilt) return undefined;
    let timeoutId;

    const scheduleNext = () => {
      const delay = (IDLE.minDelay + Math.random() * (IDLE.maxDelay - IDLE.minDelay)) * 1000;
      timeoutId = window.setTimeout(fire, delay);
    };

    const fire = () => {
      const p = pointer.current;
      if (!p.inInfluence && !p.rupturing) {
        const { width, height } = rectRef.current;
        // ponto de entrada sintético numa borda aleatória, como se algo
        // tivesse tocado a marca por um instante.
        const angle = Math.random() * Math.PI * 2;
        const entryX = width / 2 + Math.cos(angle) * width * 0.55;
        const entryY = height / 2 + Math.sin(angle) * height * 0.55;
        runRupture(entryX, entryY);
        window.setTimeout(() => {
          if (!pointer.current.inInfluence) runReconstruct();
        }, (INTERACTION.ruptureDuration + IDLE.holdDuration) * 1000);
      }
      scheduleNext();
    };

    scheduleNext();
    return () => window.clearTimeout(timeoutId);
  }, [reducedMotion, isBuilt, runRupture, runReconstruct]);

  return (
    <div className="jp-logo" ref={wrapperRef} role="img" aria-label="João Paulo Raposo">
      <div className="jp-logo__words" aria-hidden="true">
        {WORD_ZONES.map((word, i) => (
          <span
            key={word}
            className="jp-logo__word"
            ref={(el) => (wordRefs.current[i] = el)}
          >
            {word}
          </span>
        ))}
      </div>
      <div className="jp-logo__stage" style={{ aspectRatio: artwork.aspect }} ref={stageRef}>
        <div className="jp-logo__fragments">
          {fragments.map((f, i) => (
            <div
              key={f.id}
              className="jp-logo__fragment"
              style={{ clipPath: f.clipPath, transformOrigin: `${f.cx}% ${f.cy}%` }}
              ref={(el) => (fragmentRefs.current[i] = el)}
              aria-hidden="true"
            >
              <img src={artworkUrl} alt="" draggable={false} />
            </div>
          ))}
        </div>
        <LogoPulse ref={pulseRef} variant={variant} />
      </div>
    </div>
  );
});

export default InteractiveLogo;
