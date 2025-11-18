import { i18n } from '@utils/i18n';

export class LanguagePresenter {
    constructor() {
        this.listeners = [];
    }

    getCurrentLanguage() {
        return i18n.getCurrentLanguage();
    }

    getAvailableLanguages() {
        return i18n.getAvailableLanguages();
    }

    setLanguage(lang) {
        const success = i18n.setLanguage(lang);
        if (success) {
            this.notifyListeners();
        }
        return success;
    }

    t(key, params) {
        return i18n.t(key, params);
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

    notifyListeners() {
        this.listeners.forEach(listener => {
            try {
                listener(this.getCurrentLanguage());
            } catch (error) {
                console.error('Ошибка в подписчике языка:', error);
            }
        });
    }
}

