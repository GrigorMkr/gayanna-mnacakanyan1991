import { GalleryPresenter } from './GalleryPresenter';
import { CartPresenter } from './CartPresenter';
import { ReviewsPresenter } from './ReviewsPresenter';
import { NavigationPresenter } from './NavigationPresenter';
import { HeroPresenter } from './HeroPresenter';
import { AboutPresenter } from './AboutPresenter';
import { ContactPresenter } from './ContactPresenter';
import { FooterPresenter } from './FooterPresenter';
import { COLORS } from '@constants/colors';
import { AppConfig } from '@config/appConfig';

export class AppPresenter {
    constructor(config = AppConfig, colors = COLORS) {
        this.config = config;
        this.colors = colors;
        
        this.navigationPresenter = new NavigationPresenter(config);
        this.cartPresenter = new CartPresenter();
        this.galleryPresenter = new GalleryPresenter(config, this.cartPresenter);
        this.reviewsPresenter = new ReviewsPresenter(config);
        this.heroPresenter = new HeroPresenter(config, this.navigationPresenter);
        this.aboutPresenter = new AboutPresenter(config);
        this.contactPresenter = new ContactPresenter(config);
        this.footerPresenter = new FooterPresenter(config);
        
        this.isInitialized = false;
    }

    getConfig() {
        return this.config;
    }

    getColors() {
        return this.colors;
    }

    getCartPresenter() {
        return this.cartPresenter;
    }

    getGalleryPresenter() {
        return this.galleryPresenter;
    }

    getReviewsPresenter() {
        return this.reviewsPresenter;
    }

    getNavigationPresenter() {
        return this.navigationPresenter;
    }

    getHeroPresenter() {
        return this.heroPresenter;
    }

    getAboutPresenter() {
        return this.aboutPresenter;
    }

    getContactPresenter() {
        return this.contactPresenter;
    }

    getFooterPresenter() {
        return this.footerPresenter;
    }

    init() {
        if (this.isInitialized) {
            console.warn('Приложение уже инициализировано');
            return;
        }
        
        this.isInitialized = true;
        return true;
    }

    getIsInitialized() {
        return this.isInitialized;
    }
}
