/**
 * Представление секции "О художнице"
 * Отвечает только за отображение UI
 */
import { DOMUtils } from '@utils/domUtils';
import { GalleryModal } from '@components/GalleryModal';

export class AboutView {
    constructor(presenter) {
        this.presenter = presenter;
    }

    /**
     * Создает DOM структуру секции About
     * @returns {HTMLElement}
     */
    render() {
        const section = DOMUtils.createElement('section', 'about', '', { id: 'about' });
        const container = DOMUtils.createElement('div', 'container');
        
        const title = DOMUtils.createElement('h2', 'section-title', 'О художнице');
        const content = DOMUtils.createElement('div', 'about-content');
        
        const photosWrapper = this.createPhotos();
        const text = this.createText();
        
        content.appendChild(photosWrapper);
        content.appendChild(text);
        
        container.appendChild(title);
        container.appendChild(content);
        section.appendChild(container);
        
        return section;
    }

    /**
     * Создает обертку с фотографиями
     * @returns {HTMLElement}
     */
    createPhotos() {
        const photosWrapper = DOMUtils.createElement('div', 'about-photos-wrapper');
        const photos = this.presenter.getConfig().artistPhotos || [];
        
        photos.forEach((photoPath) => {
            const photoContainer = this.createPhotoContainer(photoPath);
            photosWrapper.appendChild(photoContainer);
        });
        
        return photosWrapper;
    }

    /**
     * Создает контейнер для фотографии
     * @param {string} photoPath - Путь к фотографии
     * @returns {HTMLElement}
     */
    createPhotoContainer(photoPath) {
        const photoContainer = DOMUtils.createElement('div', 'about-photo-container');
        const photo = DOMUtils.createElement('img', 'about-photo', '', { 
            src: photoPath, 
            alt: `${this.presenter.getConfig().artistName} - фото`,
            loading: 'lazy'
        });
        
        photo.onerror = () => {
            photoContainer.style.display = 'none';
        };
        
        photoContainer.addEventListener('click', () => {
            GalleryModal.open(photoPath);
        });
        
        photoContainer.appendChild(photo);
        return photoContainer;
    }

    /**
     * Создает текстовый блок
     * @returns {HTMLElement}
     */
    createText() {
        const text = DOMUtils.createElement('div', 'about-text');
        const aboutTexts = this.presenter.getConfig().about || [];
        const icons = this.getIcons();
        
        aboutTexts.forEach((paragraph, index) => {
            const p = DOMUtils.createElement('p', 'about-text-paragraph', '');
            const iconWrapper = DOMUtils.createElement('span', 'about-text-icon', '');
            iconWrapper.innerHTML = icons[index] || icons[0];
            const textSpan = DOMUtils.createElement('span', 'about-text-content', paragraph);
            p.appendChild(iconWrapper);
            p.appendChild(textSpan);
            text.appendChild(p);
        });
        
        return text;
    }

    /**
     * Получает иконки для параграфов
     * @returns {Array<string>}
     */
    getIcons() {
        return [
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
            </svg>`,
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>`,
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <circle cx="12" cy="12" r="4"></circle>
            </svg>`
        ];
    }
}

