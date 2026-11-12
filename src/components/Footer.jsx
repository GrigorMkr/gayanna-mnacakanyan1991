import { site } from '../data/site';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">{site.artistName}</p>
          <p className="footer__note">{site.title}</p>
        </div>
        <p className="footer__copy">© {year}. Все права защищены.</p>
      </div>
    </footer>
  );
}
