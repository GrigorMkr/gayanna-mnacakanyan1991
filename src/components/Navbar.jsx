import { useEffect, useState } from 'react';
import { navLinks, site } from '../data/site';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__shell">
        <a className="nav__brand" href="#top" onClick={close}>
          {site.artistName}
        </a>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav id="site-menu" className="nav__menu" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <a className="nav__cta" href="#contact" onClick={close}>
            Связаться
          </a>
        </nav>
      </div>
    </header>
  );
}
