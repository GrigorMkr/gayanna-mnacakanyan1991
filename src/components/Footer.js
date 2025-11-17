import { DOMUtils } from '@utils/domUtils';
import { DateTime } from './DateTime';

/**
 * Компонент футера
 */
export class Footer {
    constructor(config) {
        this.config = config;
        this.dateTime = new DateTime();
    }

    /**
     * Создает компонент Footer
     * @returns {HTMLElement}
     */
    create() {
        const footer = DOMUtils.createElement('footer', 'footer');
        const container = DOMUtils.createElement('div', 'container');
        
        // Контейнер для контента футера
        const footerContent = DOMUtils.createElement('div', 'footer-content');
        
        // Копирайт
        const copyright = DOMUtils.createElement('p', 'footer-copyright', 
            `&copy; ${new Date().getFullYear()} ${this.config.artistName}. Все права защищены.`);
        
        // Дата и время
        const dateTimeElement = this.dateTime.create();
        
        footerContent.appendChild(copyright);
        footerContent.appendChild(dateTimeElement);
        
        container.appendChild(footerContent);
        footer.appendChild(container);
        
        return footer;
    }
}

