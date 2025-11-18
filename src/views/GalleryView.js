/**
 * Представление галереи
 * Отвечает только за отображение UI
 */
import { DOMUtils } from '@utils/domUtils';
import { GalleryModal } from '@components/GalleryModal';
import { MESSAGES } from '@constants/messages';

export class GalleryView {
    constructor(presenter) {
        this.presenter = presenter;
        this.gridElement = null;
    }

    /**
     * Создает DOM структуру галереи
     * @returns {HTMLElement}
     */
    render() {
        const section = DOMUtils.createElement('section', 'gallery', '', { id: 'gallery' });
        const container = DOMUtils.createElement('div', 'container');
        
        const titleWrapper = DOMUtils.createElement('div', 'gallery-title-wrapper');
        const languagePresenter = this.presenter.getLanguagePresenter ? this.presenter.getLanguagePresenter() : null;
        const titleText = languagePresenter ? languagePresenter.t('nav.gallery') : 'Галерея';
        const title = DOMUtils.createElement('h2', 'section-title', titleText);
        const soldCounter = this.createSoldCounter();
        
        titleWrapper.appendChild(title);
        titleWrapper.appendChild(soldCounter);
        
        this.gridElement = DOMUtils.createElement('div', 'gallery-grid', '', { id: 'galleryGrid' });
        
        container.appendChild(titleWrapper);
        container.appendChild(this.gridElement);
        section.appendChild(container);
        
        // Загружаем изображения после добавления в DOM
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.loadImages();
            });
        });
        
        return section;
    }

    /**
     * Создает счетчик проданных картин
     * @returns {HTMLElement}
     */
    createSoldCounter() {
        const soldCounter = DOMUtils.createElement('div', 'gallery-sold-counter');
        const soldNumber = DOMUtils.createElement('span', 'gallery-sold-number', String(this.presenter.getSoldCount()));
        const languagePresenter = this.presenter.getLanguagePresenter ? this.presenter.getLanguagePresenter() : null;
        const soldText = languagePresenter ? languagePresenter.t('gallery.soldCount') : ' картин продано';
        const soldTextSpan = DOMUtils.createElement('span', 'gallery-sold-text', soldText);
        
        soldCounter.appendChild(soldNumber);
        soldCounter.appendChild(soldTextSpan);
        
        return soldCounter;
    }

    /**
     * Загружает изображения в галерею
     */
    loadImages() {
        if (!this.gridElement) return;
        
        const images = this.presenter.getGalleryImages();
        
        if (images.length === 0) {
            this.gridElement.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">${MESSAGES.PLACEHOLDERS.NO_IMAGES}</div>`;
            return;
        }
        
        images.forEach((painting, index) => {
            const paintingData = typeof painting === 'string' 
                ? { image: painting, title: `Картина ${index + 1}`, price: Math.floor(Math.random() * 32000) + 8000 }
                : painting;
            
            const item = this.createGalleryItem(paintingData, index);
            this.gridElement.appendChild(item);
        });
    }

    /**
     * Создает элемент галереи
     * @param {Object} paintingData - Данные картины
     * @param {number} index - Индекс картины
     * @returns {HTMLElement}
     */
    createGalleryItem(paintingData, index) {
        const item = DOMUtils.createElement('div', 'gallery-item', '', { 'data-index': index });
        const img = DOMUtils.createElement('img', '', '', { 
            src: paintingData.image, 
            alt: paintingData.title, 
            loading: 'lazy',
            decoding: 'async'
        });
        
        if ('fetchPriority' in img) {
            img.fetchPriority = 'low';
        }
        
        img.style.display = 'block';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        // Информация о картине
        const info = DOMUtils.createElement('div', 'gallery-item-info');
        const title = DOMUtils.createElement('h3', 'gallery-item-title', paintingData.title);
        const price = DOMUtils.createElement('div', 'gallery-item-price', this.presenter.formatPrice(paintingData.price));
        
        info.appendChild(title);
        info.appendChild(price);
        
        // Кнопка добавления в корзину
        const addToCartBtn = this.createAddToCartButton(paintingData);
        
        img.onerror = () => {
            this.handleImageError(item, paintingData);
        };
        
        img.onload = () => {
            item.classList.add('loaded');
            item.style.display = 'block';
            item.style.opacity = '1';
        };
        
        item.addEventListener('click', (e) => {
            if (e.target.closest('.gallery-add-to-cart')) {
                return;
            }
            GalleryModal.open(paintingData.image, index);
        });
        
        item.appendChild(img);
        item.appendChild(info);
        item.appendChild(addToCartBtn);
        
        return item;
    }

    /**
     * Создает кнопку добавления в корзину
     * @param {Object} paintingData - Данные картины
     * @returns {HTMLElement}
     */
    createAddToCartButton(paintingData) {
        const btn = DOMUtils.createElement('button', 'gallery-add-to-cart', '');
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-label', 'Добавить в корзину');
        btn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
        `;
        btn.title = 'Добавить в корзину';
        btn.style.color = '#2C2C2C';
        btn.style.opacity = '1';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.presenter.addToCart(paintingData);
        });
        
        return btn;
    }

    /**
     * Обрабатывает ошибку загрузки изображения
     * @param {HTMLElement} item - Элемент галереи
     * @param {Object} paintingData - Данные картины
     */
    handleImageError(item, paintingData) {
        item.style.border = '2px solid red';
        item.style.minHeight = '150px';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'center';
        item.style.backgroundColor = '#ffe0e0';
        const errorDiv = document.createElement('div');
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.padding = '10px';
        errorDiv.textContent = `${MESSAGES.ERRORS.IMAGE_LOAD}: ${paintingData.image}`;
        item.innerHTML = '';
        item.appendChild(errorDiv);
    }
}

