import { site } from '../data/site';
import './Marquee.css';

export default function Marquee() {
  const strip = [...site.gallery.slice(0, 12), ...site.gallery.slice(0, 12)];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {strip.map((work, i) => (
          <img key={`${work.id}-${i}`} src={work.image} alt="" />
        ))}
      </div>
    </div>
  );
}
