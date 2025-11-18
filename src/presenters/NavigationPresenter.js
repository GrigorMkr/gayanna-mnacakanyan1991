import { ROUTES, NAV_ITEMS } from '@constants/routes';
import { DOMUtils } from '@utils/domUtils';

export class NavigationPresenter {
    constructor(config = null) {
        this.currentRoute = ROUTES.HOME;
        this.listeners = [];
        this.config = config;
    }

    getConfig() {
        return this.config || { artistName: 'Гаянна Мнацаканян' };
    }

    getNavItems() {
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
