import { site } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

export default function Contact() {
  const ref = useReveal();

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__panel section-panel reveal" ref={ref}>
          <div>
            <p className="section-eyebrow">Контакты</p>
            <h2 className="section-title">Давайте обсудим вашу будущую работу</h2>
            <p className="section-lead">
              Напишите или позвоните — подберём готовый холст или создадим картину под ваш
              интерьер.
            </p>
          </div>

          <div className="contact__actions">
            <a className="contact__link" href={`tel:${site.contacts.phone}`}>
              <span>Телефон</span>
              <strong>{site.contacts.phoneDisplay}</strong>
            </a>
            <a
              className="contact__link"
              href={site.contacts.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <span>WhatsApp</span>
              <strong>Написать в мессенджер</strong>
            </a>
            <a
              className="contact__link"
              href={site.contacts.telegram}
              target="_blank"
              rel="noreferrer"
            >
              <span>Telegram</span>
              <strong>Открыть диалог</strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
