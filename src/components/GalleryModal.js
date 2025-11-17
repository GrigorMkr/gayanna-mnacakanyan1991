import { DOMUtils } from '@utils/domUtils';

/**
 * Модальное окно для просмотра изображений галереи
 */
export class GalleryModal {
    static images = [];
    static currentIndex = 0;
    static modal = null;
    static modalImage = null;

    /**
     * Инициализация модального окна
     * @param {Array<string|Object>} images - Массив путей к изображениям или объектов с данными картин
     */
    static init(images) {
        // Преобразуем массив в массив путей к изображениям для модального окна
        this.images = images.map(item => typeof item === 'string' ? item : item.image);
        this.create();
        this.bindEvents();
    }

    /**
     * Создает DOM структуру модального окна
     */
    static create() {
        this.modal = DOMUtils.createElement('div', 'modal', '', { id: 'imageModal' });
        const close = DOMUtils.createElement('span', 'modal-close', '&times;');
        this.modalImage = DOMUtils.createElement('img', 'modal-content', '', { id: 'modalImage' });
        const nav = DOMUtils.createElement('div', 'modal-nav');
        const prev = DOMUtils.createElement('button', 'modal-prev', '‹');
        const next = DOMUtils.createElement('button', 'modal-next', '›');
        
        nav.appendChild(prev);
        nav.appendChild(next);
        this.modal.appendChild(close);
        this.modal.appendChild(this.modalImage);
        this.modal.appendChild(nav);
        
        document.body.appendChild(this.modal);
    }

    /**
     * Привязывает обработчики событий
     */
    static bindEvents() {
        const close = this.modal.querySelector('.modal-close');
        const prev = this.modal.querySelector('.modal-prev');
        const next = this.modal.querySelector('.modal-next');
        
        close.addEventListener('click', () => this.close());
        prev.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prev();
        });
        next.addEventListener('click', (e) => {
            e.stopPropagation();
            this.next();
        });
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                if (e.key === 'Escape') this.close();
                else if (e.key === 'ArrowLeft') this.prev();
                else if (e.key === 'ArrowRight') this.next();
            }
        });
    }

    /**
     * Открывает модальное окно с изображением
     * @param {string} imagePath - Путь к изображению
     * @param {number} index - Индекс изображения в массиве
     */
    static open(imagePath, index = null) {
        if (index !== null && index >= 0 && index < this.images.length) {
            this.currentIndex = index;
        } else {
            this.currentIndex = this.images.indexOf(imagePath);
            if (this.currentIndex === -1) this.currentIndex = 0;
        }
        
        if (this.modalImage && this.images[this.currentIndex]) {
            this.modalImage.src = this.images[this.currentIndex];
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Закрывает модальное окно
     */
    static close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    /**
     * Показывает следующее изображение
     */
    static next() {
        if (this.images.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.modalImage.src = this.images[this.currentIndex];
    }

    /**
     * Показывает предыдущее изображение
     */
    static prev() {
        if (this.images.length === 0) return;
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.modalImage.src = this.images[this.currentIndex];
    }
}

