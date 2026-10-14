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
      number:  { value: 19, density: { enable: true, area: 900 } },
      color:   { value: "#cecece" },
      shape:   { type: "triangle" },
      opacity: { value: 0.16 },
      size:    { value: { min: 16, max: 46 } },
      move:    { enable: true, speed: 1.4, outModes: { default: "bounce" } },

      rotate: {
        value: { min: 0, max: 360 },
        direction: "random",
        animation: { enable: true, speed: 2, sync: false }
      }
    },
    detectRetina: true,

    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["parallax", "repulse"]
        }
      },
      modes: {
        parallax: {
          enable: true,
          force: 35,
          smooth: 30
        },
        repulse: {
          distance: 110,
          duration: 0.4,
          factor: 60,
          speed: 1
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
