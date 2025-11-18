/**
 * Презентер для навигации
 * Управляет логикой навигации
 */
import { ROUTES, NAV_ITEMS } from '@constants/routes';
import { DOMUtils } from '@utils/domUtils';

export class NavigationPresenter {
    constructor(config = null) {
        this.currentRoute = ROUTES.HOME;
        this.listeners = [];
        this.config = config;
    }

    /**
     * Получает конфигурацию
     * @returns {Object}
     */
    getConfig() {
        return this.config || { artistName: 'Гаянна Мнацаканян' };
    }

    /**
     * Получает элементы навигации
     * @returns {Array}
     */
    getNavItems() {
        return NAV_ITEMS;
    }

    /**
     * Переходит к секции
     * @param {string} route - Маршрут секции
     */
    navigateTo(route) {
        this.currentRoute = route;
        DOMUtils.smoothScrollTo(route);
        this.notifyListeners(route);
    }

    /**
     * Получает текущий маршрут
     * @returns {string}
     */
    getCurrentRoute() {
        return this.currentRoute;
    }

    /**
     * Подписывается на изменения маршрута
     * @param {Function} callback - Функция обратного вызова
     */
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

    /**
     * Уведомляет всех подписчиков об изменениях
     */
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
