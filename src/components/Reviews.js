import { DOMUtils } from '@utils/domUtils';

/**
 * Компонент секции отзывов
 */
export class Reviews {
    constructor(config) {
        this.config = config;
    }

    /**
     * Создает компонент Reviews
     * @returns {HTMLElement}
     */
    create() {
        const section = DOMUtils.createElement('section', 'reviews', '', { id: 'reviews' });
        const container = DOMUtils.createElement('div', 'container');
        
        const title = DOMUtils.createElement('h2', 'section-title', 'Отзывы клиентов');
        const subtitle = DOMUtils.createElement('p', 'reviews-subtitle', 'Что говорят наши довольные клиенты');
        
        const reviewsGrid = DOMUtils.createElement('div', 'reviews-grid');
        
        if (this.config.reviews && this.config.reviews.length > 0) {
            this.config.reviews.forEach((review) => {
                const reviewCard = this.createReviewCard(review);
                reviewsGrid.appendChild(reviewCard);
            });
        } else {
            reviewsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">Отзывы будут добавлены в конфигурацию</div>';
        }
        
        container.appendChild(title);
        container.appendChild(subtitle);
        container.appendChild(reviewsGrid);
        section.appendChild(container);
        
        return section;
    }

    /**
     * Создает карточку отзыва
     * @param {Object} review - Данные отзыва
     * @returns {HTMLElement}
     */
    createReviewCard(review) {
        const card = DOMUtils.createElement('div', 'review-card');
        
        // Звезды рейтинга
        const starsContainer = DOMUtils.createElement('div', 'review-stars');
        const rating = review.rating || 5;
        
        for (let i = 1; i <= 5; i++) {
            const star = DOMUtils.createElement('span', 'review-star', '');
            star.innerHTML = i <= rating 
                ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
                : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
            starsContainer.appendChild(star);
        }
        
        // Текст отзыва
        const text = DOMUtils.createElement('p', 'review-text', review.text);
        
        // Информация о клиенте
        const clientInfo = DOMUtils.createElement('div', 'review-client');
        
        // Фото клиента
        const clientPhoto = DOMUtils.createElement('div', 'review-client-photo');
        if (review.clientPhoto) {
            const img = DOMUtils.createElement('img', '', '', {
                src: review.clientPhoto,
                alt: review.clientName || 'Клиент',
                loading: 'lazy'
            });
            img.onerror = () => {
                // Если фото не загрузилось, показываем инициалы
                const initials = this.getInitials(review.clientName);
                clientPhoto.textContent = initials;
                clientPhoto.classList.add('review-client-photo-fallback');
            };
            clientPhoto.appendChild(img);
        } else {
            // Если фото нет, показываем инициалы
            const initials = this.getInitials(review.clientName);
            clientPhoto.textContent = initials;
            clientPhoto.classList.add('review-client-photo-fallback');
        }
        
        // Имя и информация о клиенте
        const clientDetails = DOMUtils.createElement('div', 'review-client-details');
        const clientName = DOMUtils.createElement('div', 'review-client-name', review.clientName || 'Анонимный клиент');
        const clientMeta = DOMUtils.createElement('div', 'review-client-meta', review.clientMeta || '');
        
        clientDetails.appendChild(clientName);
        if (review.clientMeta) {
            clientDetails.appendChild(clientMeta);
        }
        
        clientInfo.appendChild(clientPhoto);
        clientInfo.appendChild(clientDetails);
        
        // Собираем карточку
        card.appendChild(starsContainer);
        card.appendChild(text);
        card.appendChild(clientInfo);
        
        return card;
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

