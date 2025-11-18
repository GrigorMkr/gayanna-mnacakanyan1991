/**
 * Презентер для галереи
 * Управляет бизнес-логикой галереи
 */
export class GalleryPresenter {
    constructor(config, cartPresenter) {
        this.config = config;
        this.cartPresenter = cartPresenter;
        this.images = [];
    }

    /**
     * Получает изображения галереи
     * @returns {Array}
     */
    getGalleryImages() {
        if (this.images.length === 0) {
            this.images = this.config.galleryImages || [];
        }
        return this.images;
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

    /**
     * Добавляет товар в корзину
     * @param {Object} item - Товар для добавления
     */
    addToCart(item) {
        if (this.cartPresenter) {
            this.cartPresenter.addItem(item.image, item.title, item.price);
        }
    }

    /**
     * Получает данные картины по индексу
     * @param {number} index - Индекс картины
     * @returns {Object|null}
     */
    getPaintingByIndex(index) {
        const images = this.getGalleryImages();
        return images[index] || null;
    }

    /**
     * Получает количество проданных картин
     * @returns {number}
     */
    getSoldCount() {
        return this.config.gallerySoldCount || 254;
    }
}

