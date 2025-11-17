import { DOMUtils } from '@utils/domUtils';
import { GalleryModal } from './GalleryModal';

/**
 * Компонент галереи
 */
export class Gallery {
    constructor(config, cart = null) {
        this.config = config;
        this.images = [];
        this.cart = cart;
    }

    /**
     * Создает компонент Gallery
     * @returns {HTMLElement}
     */
    create() {
        const section = DOMUtils.createElement('section', 'gallery', '', { id: 'gallery' });
        const container = DOMUtils.createElement('div', 'container');
        
        const titleWrapper = DOMUtils.createElement('div', 'gallery-title-wrapper');
        const title = DOMUtils.createElement('h2', 'section-title', 'Галерея работ');
        const soldCounter = DOMUtils.createElement('div', 'gallery-sold-counter');
        const soldNumber = DOMUtils.createElement('span', 'gallery-sold-number', '254');
        const soldText = DOMUtils.createElement('span', 'gallery-sold-text', ' картин продано');
        
        soldCounter.appendChild(soldNumber);
        soldCounter.appendChild(soldText);
        titleWrapper.appendChild(title);
        titleWrapper.appendChild(soldCounter);
        
        const grid = DOMUtils.createElement('div', 'gallery-grid', '', { id: 'galleryGrid' });
        
        container.appendChild(titleWrapper);
        container.appendChild(grid);
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
     * Загружает изображения в галерею
     */
    loadImages() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        this.images = [...this.config.galleryImages];
        
        console.log('Загрузка изображений галереи:', this.images.length, 'изображений');
        
        if (this.images.length === 0) {
            galleryGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">Добавьте изображения в конфигурацию</div>';
            return;
        }
        
        this.images.forEach((painting, index) => {
            // Поддерживаем обратную совместимость: если painting - строка, преобразуем в объект
            const paintingData = typeof painting === 'string' 
                ? { image: painting, title: `Картина ${index + 1}`, price: Math.floor(Math.random() * 32000) + 8000 }
                : painting;
            
            const item = DOMUtils.createElement('div', 'gallery-item', '', { 'data-index': index });
            const img = DOMUtils.createElement('img', '', '', { 
                src: paintingData.image, 
                alt: paintingData.title, 
                loading: 'lazy',
                decoding: 'async'
            });
            
            // Оптимизация производительности
            if ('fetchPriority' in img) {
                img.fetchPriority = 'low';
            }
            
            // Убеждаемся, что изображение видимо
            img.style.display = 'block';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            // Информация о картине
            const info = DOMUtils.createElement('div', 'gallery-item-info');
            const title = DOMUtils.createElement('h3', 'gallery-item-title', paintingData.title);
            const price = DOMUtils.createElement('div', 'gallery-item-price', this.formatPrice(paintingData.price));
            
            info.appendChild(title);
            info.appendChild(price);
            
            // Кнопка добавления в корзину
            const addToCartBtn = DOMUtils.createElement('button', 'gallery-add-to-cart', '');
            addToCartBtn.setAttribute('type', 'button');
            addToCartBtn.setAttribute('aria-label', 'Добавить в корзину');
            addToCartBtn.innerHTML = `
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"></path>
                    <path d="M3 6h18"></path>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
            `;
            addToCartBtn.title = 'Добавить в корзину';
            addToCartBtn.style.color = '#2C2C2C';
            addToCartBtn.style.opacity = '1';
            addToCartBtn.style.display = 'flex';
            addToCartBtn.style.alignItems = 'center';
            addToCartBtn.style.justifyContent = 'center';
            addToCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Кнопка добавления в корзину нажата', { cart: this.cart, image: paintingData.image, title: paintingData.title, price: paintingData.price });
                if (this.cart) {
                    this.cart.addItem(paintingData.image, paintingData.title, paintingData.price);
                } else {
                    console.error('Корзина не инициализирована!');
                }
            });
            
            img.onerror = (e) => {
                console.error('Ошибка загрузки изображения:', paintingData.image, 'Полный URL:', img.src, 'Ошибка:', e);
                // Показываем ошибку для отладки
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
                errorDiv.textContent = `Ошибка: ${paintingData.image}`;
                item.innerHTML = '';
                item.appendChild(errorDiv);
            };
            
            img.onload = () => {
                console.log('Изображение загружено успешно:', paintingData.image, 'Размеры:', img.naturalWidth, 'x', img.naturalHeight);
                item.classList.add('loaded');
                // Убеждаемся, что элемент видим
                item.style.display = 'block';
                item.style.opacity = '1';
            };
            
            item.addEventListener('click', (e) => {
                // Не открываем модальное окно, если кликнули на кнопку корзины
                if (e.target.closest('.gallery-add-to-cart')) {
                    return;
                }
                GalleryModal.open(paintingData.image, index);
            });
            
            item.appendChild(img);
            item.appendChild(info);
            item.appendChild(addToCartBtn);
            galleryGrid.appendChild(item);
            
            console.log('Добавлен элемент галереи:', index, paintingData.title, paintingData.price);
        });
        
        console.log('Всего элементов в галерее:', galleryGrid.children.length);
    }

    /**
     * Форматирует цену для отображения
     * @param {number} price - Цена в рублях
     * @returns {string}
     */
    formatPrice(price) {
        if (price >= 1000) {
            const thousands = Math.floor(price / 1000);
            const remainder = price % 1000;
            if (remainder === 0) {
                return `${thousands} тыс. ₽`;
            } else {
                return `${thousands} ${remainder.toString().padStart(3, '0')} ₽`;
            }
        }
        return `${price} ₽`;
    }
}

