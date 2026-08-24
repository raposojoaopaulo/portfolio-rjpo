import { useEffect } from 'react';

export default function useNoIndex(title) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow, noarchive';
    document.head.appendChild(meta);

    return () => {
      document.title = previousTitle;
      document.head.removeChild(meta);
    };
  }, [title]);
}
