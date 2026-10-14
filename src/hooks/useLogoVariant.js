import { useEffect, useState } from 'react';
import { RESPONSIVE } from '../components/logo/logoConfig';

// 'mobile' usa o lockup empilhado (logo-mob.svg), 'desktop' o horizontal
// (logo.svg) — a mesma quebra usada no restante do layout responsivo.
export default function useLogoVariant() {
  const query = `(max-width: ${RESPONSIVE.mobileBreakpoint}px)`;
  const [variant, setVariant] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(query).matches ? 'mobile' : 'desktop'
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setVariant(e.matches ? 'mobile' : 'desktop');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return variant;
}
