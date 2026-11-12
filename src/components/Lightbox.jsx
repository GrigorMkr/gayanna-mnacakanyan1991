import { useEffect, useState } from 'react';
import { formatPrice } from '../data/site';
import './Lightbox.css';

export default function Lightbox({ works, index, onClose, onChange, startMode = 'canvas' }) {
  const work = works[index];
  const hasPrev = index > 0;
  const hasNext = index < works.length - 1;
  const hasRoom = Boolean(work?.room);
  const [mode, setMode] = useState(startMode === 'room' && hasRoom ? 'room' : 'canvas');

  useEffect(() => {
    setMode(startMode === 'room' && works[index]?.room ? 'room' : 'canvas');
  }, [index, startMode, works]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && hasPrev) onChange(index - 1);
      if (event.key === 'ArrowRight' && hasNext) onChange(index + 1);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [hasNext, hasPrev, index, onChange, onClose]);

  if (!work) return null;

  const image = mode === 'room' && work.room ? work.room : work.image;
  const caption = mode === 'room' && work.roomTitle ? work.roomTitle : work.title;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={work.title}>
      <button className="lightbox__backdrop" type="button" aria-label="Закрыть" onClick={onClose} />

      <div className="lightbox__panel">
        <button className="lightbox__close" type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </button>

        {hasRoom && (
          <div className="lightbox__modes" role="tablist" aria-label="Режим просмотра">
            <button
              type="button"
              className={mode === 'canvas' ? 'is-active' : ''}
              onClick={() => setMode('canvas')}
            >
              Холст
            </button>
            <button
              type="button"
              className={mode === 'room' ? 'is-active' : ''}
              onClick={() => setMode('room')}
            >
              В пространстве
            </button>
          </div>
        )}

        <div className={`lightbox__frame ${mode === 'room' ? 'is-room' : ''}`}>
          <img src={image} alt={caption} />
        </div>

        <div className="lightbox__info">
          <div>
            <h3>{work.title}</h3>
            <p className="lightbox__price">{formatPrice(work.price)}</p>
            {mode === 'room' && work.roomTitle && (
              <p className="lightbox__room-note">{work.roomTitle}</p>
            )}
          </div>
          <a className="btn btn-primary" href="#contact" onClick={onClose}>
            Узнать о покупке
          </a>
        </div>

        {hasPrev && (
          <button
            className="lightbox__nav lightbox__nav--prev"
            type="button"
            aria-label="Предыдущая работа"
            onClick={() => onChange(index - 1)}
          >
            ‹
          </button>
        )}
        {hasNext && (
          <button
            className="lightbox__nav lightbox__nav--next"
            type="button"
            aria-label="Следующая работа"
            onClick={() => onChange(index + 1)}
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
