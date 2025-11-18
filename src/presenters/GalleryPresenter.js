export class GalleryPresenter {
    constructor(config, cartPresenter) {
        this.config = config;
        this.cartPresenter = cartPresenter;
        this.images = [];
        this.languagePresenter = null;
    }

    setLanguagePresenter(languagePresenter) {
        this.languagePresenter = languagePresenter;
    }

    getLanguagePresenter() {
        return this.languagePresenter;
    }

    getGalleryImages() {
        if (this.images.length === 0) {
            this.images = this.config.galleryImages || [];
        }
        return this.images;
    }

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

    addToCart(item) {
        if (this.cartPresenter) {
            this.cartPresenter.addItem(item.image, item.title, item.price);
        }
    }

    getPaintingByIndex(index) {
        const images = this.getGalleryImages();
        return images[index] || null;
    }

    getSoldCount() {
        return this.config.gallerySoldCount || 254;
    }
}
