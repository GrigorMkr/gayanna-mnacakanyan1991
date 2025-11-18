import { GalleryPresenter } from './GalleryPresenter';
import { CartPresenter } from './CartPresenter';
import { ReviewsPresenter } from './ReviewsPresenter';
import { NavigationPresenter } from './NavigationPresenter';
import { HeroPresenter } from './HeroPresenter';
import { AboutPresenter } from './AboutPresenter';
import { ContactPresenter } from './ContactPresenter';
import { FooterPresenter } from './FooterPresenter';
import { CookieConsentPresenter } from './CookieConsentPresenter';
import { LanguagePresenter } from './LanguagePresenter';
import { COLORS } from '@constants/colors';
import { ConfigAdapter } from '@config/configAdapter';

export class AppPresenter {
    constructor(config = null, colors = COLORS) {
        this.config = config || new ConfigAdapter();
        this.colors = colors;
        
        this.navigationPresenter = new NavigationPresenter(this.config);
        this.cartPresenter = new CartPresenter();
        this.galleryPresenter = new GalleryPresenter(this.config, this.cartPresenter);
        this.reviewsPresenter = new ReviewsPresenter(this.config);
        this.heroPresenter = new HeroPresenter(this.config, this.navigationPresenter);
        this.aboutPresenter = new AboutPresenter(this.config);
        this.contactPresenter = new ContactPresenter(this.config);
        this.footerPresenter = new FooterPresenter(this.config);
        this.cookieConsentPresenter = new CookieConsentPresenter();
        this.languagePresenter = new LanguagePresenter();
        
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

    getCookieConsentPresenter() {
        return this.cookieConsentPresenter;
    }

    getLanguagePresenter() {
        return this.languagePresenter;
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
