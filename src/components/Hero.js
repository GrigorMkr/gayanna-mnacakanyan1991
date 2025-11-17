import { DOMUtils } from '@utils/domUtils';

/**
 * Компонент главной секции (Hero)
 */
export class Hero {
    constructor(config) {
        this.config = config;
    }

    /**
     * Создает компонент Hero
     * @returns {HTMLElement}
     */
    create() {
        const section = DOMUtils.createElement('section', 'hero', '', { id: 'home' });
        const content = DOMUtils.createElement('div', 'hero-content');
        
        const title = DOMUtils.createElement('h1', 'hero-title');
        
        // Разделяем имя на две части: "Гаяна" и "Мнацаканян"
        const nameParts = this.config.artistName.split(' ');
        const firstName = nameParts[0] || ''; // "Гаяна"
        const lastName = nameParts.slice(1).join(' ') || ''; // "Мнацаканян"
        
        // Первая строка: "Гаяна"
        const firstNameLine = DOMUtils.createElement('div', 'hero-title-line');
        firstName.split('').forEach((char, index) => {
            const span = DOMUtils.createElement('span', '', char);
            span.style.animationDelay = (index * 0.1) + 's';
            firstNameLine.appendChild(span);
        });
        
        // Вторая строка: "Мнацаканян"
        const lastNameLine = DOMUtils.createElement('div', 'hero-title-line');
        lastName.split('').forEach((char, index) => {
            const span = DOMUtils.createElement('span', '', char);
            span.style.animationDelay = ((firstName.length + index) * 0.1) + 's';
            lastNameLine.appendChild(span);
        });
        
        title.appendChild(firstNameLine);
        title.appendChild(lastNameLine);
        
        const subtitle = DOMUtils.createElement('p', 'hero-subtitle', this.config.title);
        const divider = DOMUtils.createElement('div', 'hero-divider');
        const description = DOMUtils.createElement('p', 'hero-description', this.config.description);
        
        content.appendChild(title);
        content.appendChild(subtitle);
        content.appendChild(divider);
        content.appendChild(description);
        
        const scrollIndicator = DOMUtils.createElement('div', 'scroll-indicator');
        scrollIndicator.appendChild(DOMUtils.createElement('span', '', '↓'));
        scrollIndicator.addEventListener('click', () => {
            DOMUtils.smoothScrollTo('#about');
        });
        
        section.appendChild(content);
        section.appendChild(scrollIndicator);
        
        return section;
    }
}

