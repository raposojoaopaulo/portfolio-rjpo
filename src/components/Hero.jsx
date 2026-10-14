import { useState } from 'react';
import Triangles from './Triangles';
import HeroIntro from './HeroIntro';
import '../styles/components/_hero.scss';

export default function Hero() {
  const [ready, setReady] = useState(false);

  return (
    <section className={`hero${ready ? ' hero--ready' : ''}`}>
      <Triangles />
      <HeroIntro onDone={() => setReady(true)} />
    </section>
  );
}
