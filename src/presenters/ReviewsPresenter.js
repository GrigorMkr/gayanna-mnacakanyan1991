/**
 * Презентер для отзывов
 * Управляет бизнес-логикой отзывов
 */
export class ReviewsPresenter {
    constructor(config) {
        this.config = config;
    }

    /**
     * Получает все отзывы
     * @returns {Array}
     */
    getReviews() {
        return this.config.reviews || [];
    }

    /**
     * Получает средний рейтинг
     * @returns {number}
     */
    getAverageRating() {
        const reviews = this.getReviews();
        if (reviews.length === 0) return 0;
        
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 5), 0);
        return Math.round((totalRating / reviews.length) * 10) / 10;
    }

    /**
     * Получает количество отзывов
     * @returns {number}
     */
    getReviewCount() {
        return this.getReviews().length;
    }

    /**
     * Получает инициалы из имени
     * @param {string} name - Имя клиента
     * @returns {string}
     */
    getInitials(name) {
        if (!name) return '?';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }
}

