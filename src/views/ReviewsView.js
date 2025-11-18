/**
 * Представление отзывов
 * Отвечает только за отображение UI
 */
import { DOMUtils } from '@utils/domUtils';
import { MESSAGES } from '@constants/messages';

export class ReviewsView {
    constructor(presenter) {
        this.presenter = presenter;
    }

    /**
     * Создает DOM структуру секции отзывов
     * @returns {HTMLElement}
     */
    render() {
        const section = DOMUtils.createElement('section', 'reviews', '', { id: 'reviews' });
        const container = DOMUtils.createElement('div', 'container');
        
        const title = DOMUtils.createElement('h2', 'section-title', 'Отзывы клиентов');
        const subtitle = DOMUtils.createElement('p', 'reviews-subtitle', 'Что говорят наши довольные клиенты');
        
        const reviewsGrid = DOMUtils.createElement('div', 'reviews-grid');
        
        const reviews = this.presenter.getReviews();
        if (reviews.length > 0) {
            reviews.forEach((review) => {
                const reviewCard = this.createReviewCard(review);
                reviewsGrid.appendChild(reviewCard);
            });
        } else {
            reviewsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">${MESSAGES.PLACEHOLDERS.NO_REVIEWS}</div>`;
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
        const starsContainer = this.createStars(review.rating || 5);
        
        // Текст отзыва
        const text = DOMUtils.createElement('p', 'review-text', review.text);
        
        // Информация о клиенте
        const clientInfo = this.createClientInfo(review);
        
        card.appendChild(starsContainer);
        card.appendChild(text);
        card.appendChild(clientInfo);
        
        return card;
    }

    /**
     * Создает звезды рейтинга
     * @param {number} rating - Рейтинг (1-5)
     * @returns {HTMLElement}
     */
    createStars(rating) {
        const starsContainer = DOMUtils.createElement('div', 'review-stars');
        
        for (let i = 1; i <= 5; i++) {
            const star = DOMUtils.createElement('span', 'review-star', '');
            star.innerHTML = i <= rating 
                ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
                : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
            starsContainer.appendChild(star);
        }
        
        return starsContainer;
    }

    /**
     * Создает информацию о клиенте
     * @param {Object} review - Данные отзыва
     * @returns {HTMLElement}
     */
    createClientInfo(review) {
        const clientInfo = DOMUtils.createElement('div', 'review-client');
        
        // Фото клиента
        const clientPhoto = this.createClientPhoto(review);
        
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
        
        return clientInfo;
    }

    /**
     * Создает фото клиента
     * @param {Object} review - Данные отзыва
     * @returns {HTMLElement}
     */
    createClientPhoto(review) {
        const clientPhoto = DOMUtils.createElement('div', 'review-client-photo');
        
        if (review.clientPhoto) {
            const img = DOMUtils.createElement('img', '', '', {
                src: review.clientPhoto,
                alt: review.clientName || 'Клиент',
                loading: 'lazy'
            });
            img.onerror = () => {
                const initials = this.presenter.getInitials(review.clientName);
                clientPhoto.textContent = initials;
                clientPhoto.classList.add('review-client-photo-fallback');
            };
            clientPhoto.appendChild(img);
        } else {
            const initials = this.presenter.getInitials(review.clientName);
            clientPhoto.textContent = initials;
            clientPhoto.classList.add('review-client-photo-fallback');
        }
        
        return clientPhoto;
    }
}

