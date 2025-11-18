/**
 * Презентер для секции контактов
 */
export class ContactPresenter {
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

