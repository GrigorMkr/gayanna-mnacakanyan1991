import { useRef } from 'react';

export function useTilt(max = 8) {
  const ref = useRef(null);

  const onMove = (event) => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * max * 2;
    const rotateX = (0.5 - y) * max * 2;
    node.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = '';
  };

  return { ref, onMove, onLeave };
}
