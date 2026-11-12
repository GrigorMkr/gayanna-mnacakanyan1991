import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    node.classList.add('is-visible');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    // Keep visible by default; observer only enhances late mounts.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -4% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
