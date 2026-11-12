import { site } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import './About.css';

export default function About() {
  const ref = useReveal();

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid section-panel reveal" ref={ref}>
          <div className="about__visual">
            <figure className="about__portrait">
              <img src={site.artistPhotos[0]} alt={site.artistName} />
            </figure>
            <figure className="about__portrait about__portrait--small">
              <img src={site.artistPhotos[1]} alt="" />
            </figure>
          </div>

          <div className="about__copy">
            <p className="section-eyebrow">Об авторе</p>
            <h2 className="section-title">Живопись как диалог с родиной</h2>
            {site.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="about__text">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
