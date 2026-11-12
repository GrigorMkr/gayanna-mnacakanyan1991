import { useState } from 'react';
import { formatPrice, site } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { useTilt } from '../hooks/useTilt';
import Lightbox from './Lightbox';
import './Gallery.css';

function GalleryCard({ work, index, onOpen }) {
  const tilt = useTilt(7);

  return (
    <article
      className={`gallery__piece span-${work.span || 'normal'}`}
      style={{ animationDelay: `${(index % 10) * 40}ms` }}
    >
      <button
        type="button"
        className="gallery__mat tilt"
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        onClick={() => onOpen(index, 'canvas')}
        aria-label={`Открыть работу «${work.title}»`}
      >
        <img src={work.image} alt={work.title} loading="lazy" />
        <span className="gallery__glow" />
      </button>
      <div className="gallery__caption">
        <div>
          <h3>{work.title}</h3>
          <p>{formatPrice(work.price)}</p>
        </div>
        <div className="gallery__actions">
          <button type="button" onClick={() => onOpen(index, 'canvas')}>
            Холст
          </button>
          {work.room && (
            <button type="button" onClick={() => onOpen(index, 'room')}>
              В пространстве
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Gallery() {
  const ref = useReveal();
  const [activeIndex, setActiveIndex] = useState(null);
  const [startMode, setStartMode] = useState('canvas');

  const openWork = (index, mode = 'canvas') => {
    setStartMode(mode);
    setActiveIndex(index);
  };

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section-panel reveal" ref={ref}>
          <div className="gallery__head">
            <div>
              <p className="section-eyebrow">Галерея</p>
              <h2 className="section-title">Работы без повторов</h2>
            </div>
            <p className="section-lead">
              Названия соответствуют сюжету. Нажмите картину — холст крупно или вид в
              роскошном интерьере.
            </p>
          </div>

          <div className="gallery__wall">
            {site.gallery.map((work, index) => (
              <GalleryCard key={work.id} work={work} index={index} onOpen={openWork} />
            ))}
          </div>
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          works={site.gallery}
          index={activeIndex}
          startMode={startMode}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      )}
    </section>
  );
}
