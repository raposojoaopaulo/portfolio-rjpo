import { useEffect } from 'react';

export default function useScrollAnimation(selector = '.animate', options = { threshold: 0.2 }) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const markIfVisible = element => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleTop = rect.top < viewportHeight * 0.92;
      const visibleBottom = rect.bottom > viewportHeight * 0.08;

      if (visibleTop && visibleBottom) {
        element.classList.add('in-view');
        return true;
      }

      return false;
    };

    const revealVisibleElements = () => {
      elements.forEach(el => {
        if (!el.classList.contains('in-view')) {
          markIfVisible(el);
        }
      });
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -8% 0px',
      ...options,
    });

    elements.forEach(el => {
      if (!markIfVisible(el)) {
        observer.observe(el);
      }
    });

    const handleViewportChange = () => {
      revealVisibleElements();
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    revealVisibleElements();

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange);
      elements.forEach(el => observer.unobserve(el));
    };
  }, [selector, options]);
}
