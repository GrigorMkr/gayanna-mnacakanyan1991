import { site } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import './Reviews.css';

export default function Reviews() {
  const ref = useReveal();
  const reviews = [...site.reviews, ...site.reviews];

  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="section-panel reveal" ref={ref}>
          <p className="section-eyebrow">Отзывы</p>
          <h2 className="section-title">Слова тех, кто живёт с картинами</h2>

          <div className="reviews__viewport">
            <div className="reviews__track" aria-live="off">
              {reviews.map((review, index) => (
                <blockquote
                  key={`${review.clientName}-${index}`}
                  className="reviews__card"
                  aria-hidden={index >= site.reviews.length}
                >
                  <div className="reviews__stars" aria-label={`${review.rating} из 5`}>
                    {'★★★★★'.slice(0, review.rating)}
                  </div>
                  <p>{review.text}</p>
                  <footer>
                    <strong>{review.clientName}</strong>
                    <span>{review.clientMeta}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
