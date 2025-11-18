import { ROUTES, NAV_ITEMS } from '@constants/routes';
import { DOMUtils } from '@utils/domUtils';

import { i18n } from '@utils/i18n';

export class NavigationPresenter {
    constructor(config = null) {
        this.currentRoute = ROUTES.HOME;
        this.listeners = [];
        this.config = config;
        this.languagePresenter = null;
    }

    setLanguagePresenter(languagePresenter) {
        this.languagePresenter = languagePresenter;
    }

    getLanguagePresenter() {
        return this.languagePresenter;
    }

    getConfig() {
        return this.config || { artistName: 'Гаянна Мнацаканян' };
    }

    getNavItems() {
        if (this.languagePresenter) {
            return [
                { route: ROUTES.HOME, label: this.languagePresenter.t('nav.home') },
                { route: ROUTES.ABOUT, label: this.languagePresenter.t('nav.about') },
                { route: ROUTES.GALLERY, label: this.languagePresenter.t('nav.gallery') },
                { route: ROUTES.REVIEWS, label: this.languagePresenter.t('nav.reviews') },
                { route: ROUTES.CONTACT, label: this.languagePresenter.t('nav.contact') }
            ];
        }
        return NAV_ITEMS;
    }

    navigateTo(route) {
        this.currentRoute = route;
        DOMUtils.smoothScrollTo(route);
        this.notifyListeners(route);
    }

    getCurrentRoute() {
        return this.currentRoute;
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

    notifyListeners(route) {
        this.listeners.forEach(listener => {
            try {
                listener(route);
            } catch (error) {
                console.error('Ошибка в подписчике навигации:', error);
            }
        });
    }
}
