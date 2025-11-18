import { i18n } from '@utils/i18n';

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';
const COOKIE_CONSENT_TYPE_KEY = 'cookie_consent_type';

export class CookieConsentPresenter {
    constructor() {
        this.isAccepted = this.checkConsent();
    }

    checkConsent() {
        try {
            const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
            return consent === 'true' || consent === 'essential';
        } catch (error) {
            return false;
        }
    }

    acceptAllConsent() {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
            localStorage.setItem(COOKIE_CONSENT_TYPE_KEY, 'all');
            this.isAccepted = true;
        } catch (error) {
            console.error('Ошибка сохранения согласия:', error);
        }
    }

    acceptEssentialConsent() {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
            localStorage.setItem(COOKIE_CONSENT_TYPE_KEY, 'essential');
            this.isAccepted = true;
        } catch (error) {
            console.error('Ошибка сохранения согласия:', error);
        }
    }

    getIsAccepted() {
        return this.isAccepted;
    }

    getConsentText() {
        return {
            message: i18n.t('cookie.message'),
            acceptAllButton: i18n.t('cookie.acceptAll'),
            acceptEssentialButton: i18n.t('cookie.acceptEssential')
        };
    }
}

