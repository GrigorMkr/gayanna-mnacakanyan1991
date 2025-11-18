/**
 * Представление главной секции (Hero)
 * Отвечает только за отображение UI
 */
import { DOMUtils } from '@utils/domUtils';
import { ANIMATION_DELAYS } from '@constants/animations';

export class HeroView {
    constructor(presenter) {
        this.presenter = presenter;
    }

    /**
     * Создает DOM структуру Hero секции
     * @returns {HTMLElement}
     */
    render() {
        const section = DOMUtils.createElement('section', 'hero', '', { id: 'home' });
        const content = DOMUtils.createElement('div', 'hero-content');
        
        const title = this.createTitle();
        const config = this.presenter.getConfig();
        const subtitleText = config && config.title ? config.title : 'Художница';
        const subtitle = DOMUtils.createElement('p', 'hero-subtitle', subtitleText);
        const divider = DOMUtils.createElement('div', 'hero-divider');
        const descriptionText = config && config.description ? config.description : 'Живопись, наполненная красотой и эмоциями';
        const description = DOMUtils.createElement('p', 'hero-description', descriptionText);
        
        const scrollIndicator = this.createScrollIndicator();
        
        content.appendChild(title);
        content.appendChild(subtitle);
        content.appendChild(divider);
        content.appendChild(description);
        
        section.appendChild(content);
        section.appendChild(scrollIndicator);
        
        return section;
    }

    /**
     * Создает анимированный заголовок
     * @returns {HTMLElement}
     */
    createTitle() {
        const title = DOMUtils.createElement('h1', 'hero-title');
        const config = this.presenter.getConfig();
        const artistName = config && config.artistName ? config.artistName : 'Гаянна Мнацаканян';
        const nameParts = artistName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Первая строка: имя
        const firstNameLine = this.createTitleLine(firstName, 0);
        // Вторая строка: фамилия
        const lastNameLine = this.createTitleLine(lastName, firstName.length);
        
        title.appendChild(firstNameLine);
        title.appendChild(lastNameLine);
        
        return title;
    }

    /**
     * Создает строку заголовка с анимацией
     * @param {string} text - Текст строки
     * @param {number} offset - Смещение для задержки анимации
     * @returns {HTMLElement}
     */
    createTitleLine(text, offset) {
        const line = DOMUtils.createElement('div', 'hero-title-line');
        text.split('').forEach((char, index) => {
            const span = DOMUtils.createElement('span', '', char);
            span.style.animationDelay = ((offset + index) * ANIMATION_DELAYS.HERO_CHAR) + 's';
            line.appendChild(span);
        });
        return line;
    }

    /**
     * Создает индикатор прокрутки
     * @returns {HTMLElement}
     */
    createScrollIndicator() {
        const scrollIndicator = DOMUtils.createElement('div', 'scroll-indicator');
        scrollIndicator.appendChild(DOMUtils.createElement('span', '', '↓'));
        scrollIndicator.addEventListener('click', () => {
            this.presenter.navigateTo('#about');
        });
        return scrollIndicator;
    }
}

