import { useMemo, useState } from 'react';
import { site } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { useTilt } from '../hooks/useTilt';
import Lightbox from './Lightbox';
import './Interiors.css';

function InteriorCard({ item, index, onOpen }) {
  const tilt = useTilt(6);

  return (
    <button
      type="button"
      className={`interiors__item span-${item.span || 'normal'} tilt`}
      ref={tilt.ref}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      onClick={() => onOpen(index)}
      style={{ animationDelay: `${(index % 8) * 50}ms` }}
    >
      <img src={item.image} alt={item.title} loading="lazy" />
      <span>{item.title}</span>
    </button>
  );
}

export default function Interiors() {
  const ref = useReveal();
  const [activeIndex, setActiveIndex] = useState(null);

  const linkedWorks = useMemo(
    () =>
      site.interiors
        .map((item) => {
          const work = site.gallery.find((entry) => entry.id === item.workId);
          if (!work) return null;
          return {
            ...work,
            room: item.image,
            roomTitle: item.title,
          };
        })
        .filter(Boolean),
    []
  );

  return (
    <section className="section interiors" id="interiors">
      <div className="container">
        <div className="section-panel reveal" ref={ref}>
          <div className="interiors__head">
            <div>
              <p className="section-eyebrow">В интерьере</p>
              <h2 className="section-title">Роскошные пространства</h2>
            </div>
            <p className="section-lead">
              Разные комнаты и рамы: от пентхауса до виллы у моря. Нажмите — откроется
              интерьер и холст.
            </p>
          </div>

          <div className="interiors__grid">
            {site.interiors.map((item, index) => (
              <InteriorCard key={item.id} item={item} index={index} onOpen={setActiveIndex} />
            ))}
          </div>
        </div>
      </div>

      {activeIndex !== null && linkedWorks[activeIndex] && (
        <Lightbox
          works={linkedWorks}
          index={activeIndex}
          startMode="room"
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      )}
    </section>
  );
}
