import { site } from '../data/site';
import './Hero.css';

export default function Hero() {
  const [firstName, lastName] = site.artistName.split(' ');

  return (
    <section className="hero" id="top" aria-label="Главный экран">
      <div className="container hero__grid">
        <div className="hero__copy" id="about">
          <p className="hero__eyebrow">Об авторе</p>
          <h1 className="hero__name">
            <span>{firstName}</span>
            <span>{lastName}</span>
          </h1>
          <h2 className="hero__subtitle">Живопись как диалог с родиной</h2>
          {site.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="hero__text">
              {paragraph}
            </p>
          ))}
          <div className="hero__actions">
            <a className="btn btn-primary" href="#gallery">
              Смотреть работы
            </a>
            <a className="btn btn-ghost hero__ghost" href="#contact">
              Связаться
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <figure className="hero__photo">
            <img src={site.artistPhotos[0]} alt={site.artistName} />
          </figure>
          <figure className="hero__photo hero__photo--small">
            <img src={site.artistPhotos[1]} alt="" />
          </figure>
        </div>
      </div>
    </section>
  );
}
