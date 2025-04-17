// src/components/Triangles.jsx
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";        // seu bundle atual
import { loadParallaxMover }  from "@tsparticles/move-parallax"; // plugin de parallax

export default function Triangles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadParallaxMover(engine);   // ⬅️  carrega o parallax mover
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: false },
    particles: {
      number:  { value: 32, density: { enable: true, area: 800 } },
      color:   { value: "#cecece" },
      shape:   { type: "triangle" },
      opacity: { value: 0.25 },
      size:    { value: { min: 20, max: 60 } },
      move:    { enable: true, speed: 2.5, outModes: { default: "bounce" } },

      // rotação opcional
      rotate: {
        value: { min: 0, max: 360 },
        direction: "random",
        animation: { enable: true, speed: 3, sync: false }
      }
    },
    detectRetina: true,

    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["repulse", "bubble", "parallax"] // ⬅️ inclui parallax
        }
      },
      modes: {
        repulse: {
          distance: 120,
          speed: 1
        },
        bubble: {
          distance: 140,
          size: 80,
          duration: 2,
          opacity: 0.8,
          color: { value: "#231F20" }
        },
        parallax: {
          enable: true,    // precisa estar true para usar o plugin
          force: 60,       // intensidade do parallax
          smooth: 20       // suavização do movimento
        }
      }
    }
  }), []);

  if (!ready) return null;
  return (
    <Particles
      id="triangles-bg"
      className="triangles-bg"
      options={options}
    />
  );
}
