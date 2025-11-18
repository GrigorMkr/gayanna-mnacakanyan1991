/**
 * Презентер для футера
 */
export class FooterPresenter {
    constructor(config) {
        this.config = config;
    }

    /**
     * Получает конфигурацию
     * @returns {Object}
     */
    getConfig() {
        return this.config;
    }
}

