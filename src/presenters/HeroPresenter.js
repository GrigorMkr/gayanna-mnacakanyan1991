/**
 * Презентер для Hero секции
 */
export class HeroPresenter {
    constructor(config, navigationPresenter) {
        this.config = config;
        this.navigationPresenter = navigationPresenter;
    }

    /**
     * Получает конфигурацию
     * @returns {Object}
     */
    getConfig() {
        return this.config;
    }

    /**
     * Переходит к секции
     * @param {string} route - Маршрут
     */
    navigateTo(route) {
        if (this.navigationPresenter) {
            this.navigationPresenter.navigateTo(route);
        }
    }
}

