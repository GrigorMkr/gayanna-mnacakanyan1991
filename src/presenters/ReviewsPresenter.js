export class ReviewsPresenter {
    constructor(config) {
        this.config = config;
    }

    getReviews() {
        return this.config.reviews || [];
    }

    getAverageRating() {
        const reviews = this.getReviews();
        if (reviews.length === 0) return 0;
        
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 5), 0);
        return Math.round((totalRating / reviews.length) * 10) / 10;
    }

    getReviewCount() {
        return this.getReviews().length;
    }

    getInitials(name) {
        if (!name) return '?';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }
}
