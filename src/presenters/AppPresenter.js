/**
 * Главный презентер приложения
 * Координирует работу всех презентеров
 */
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
        
        // Инициализируем презентеры
        this.navigationPresenter = new NavigationPresenter(config);
        this.cartPresenter = new CartPresenter();
        this.galleryPresenter = new GalleryPresenter(config, this.cartPresenter);
        this.reviewsPresenter = new ReviewsPresenter(config);
        this.heroPresenter = new HeroPresenter(config, this.navigationPresenter);
        this.aboutPresenter = new AboutPresenter(config);
        this.contactPresenter = new ContactPresenter(config);
        this.footerPresenter = new FooterPresenter(config);
        
        // Состояние приложения
        this.isInitialized = false;
    }

    /**
     * Получает конфигурацию приложения
     * @returns {Object}
     */
    getConfig() {
        return this.config;
    }

    /**
     * Получает цвета приложения
     * @returns {Object}
     */
    getColors() {
        return this.colors;
    }

    /**
     * Получает презентер корзины
     * @returns {CartPresenter}
     */
    getCartPresenter() {
        return this.cartPresenter;
    }

    /**
     * Получает презентер галереи
     * @returns {GalleryPresenter}
     */
    getGalleryPresenter() {
        return this.galleryPresenter;
    }

    /**
     * Получает презентер отзывов
     * @returns {ReviewsPresenter}
     */
    getReviewsPresenter() {
        return this.reviewsPresenter;
    }

    /**
     * Получает презентер навигации
     * @returns {NavigationPresenter}
     */
    getNavigationPresenter() {
        return this.navigationPresenter;
    }

    /**
     * Получает презентер Hero
     * @returns {HeroPresenter}
     */
    getHeroPresenter() {
        return this.heroPresenter;
    }

    /**
     * Получает презентер About
     * @returns {AboutPresenter}
     */
    getAboutPresenter() {
        return this.aboutPresenter;
    }

    /**
     * Получает презентер Contact
     * @returns {ContactPresenter}
     */
    getContactPresenter() {
        return this.contactPresenter;
    }

    /**
     * Получает презентер Footer
     * @returns {FooterPresenter}
     */
    getFooterPresenter() {
        return this.footerPresenter;
    }

    /**
     * Инициализирует приложение
     */
    init() {
        if (this.isInitialized) {
            console.warn('Приложение уже инициализировано');
            return;
        }
        
        this.isInitialized = true;
        return true;
    }

    /**
     * Проверяет, инициализировано ли приложение
     * @returns {boolean}
     */
    getIsInitialized() {
        return this.isInitialized;
    }
}

