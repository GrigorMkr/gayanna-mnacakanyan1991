import { DOMUtils } from '@utils/domUtils';

export class CookieConsentView {
    constructor(presenter) {
        this.presenter = presenter;
        this.modal = null;
    }

    render() {
        if (this.presenter.getIsAccepted()) {
            return null;
        }

        const modal = DOMUtils.createElement('div', 'cookie-consent-modal', '', { id: 'cookieConsent' });
        const overlay = DOMUtils.createElement('div', 'cookie-consent-overlay');
        const content = DOMUtils.createElement('div', 'cookie-consent-content');
        
        const text = this.presenter.getConsentText();
        
        const message = DOMUtils.createElement('p', 'cookie-consent-message');
        message.innerHTML = text.message;
        
        const policyLink = message.querySelector('.cookie-policy-link');
        if (policyLink) {
            policyLink.addEventListener('click', (e) => {
                e.preventDefault();
            });
        }
        
        const buttons = DOMUtils.createElement('div', 'cookie-consent-buttons');
        const acceptAllBtn = DOMUtils.createElement('button', 'cookie-consent-accept-all', text.acceptAllButton);
        const acceptEssentialBtn = DOMUtils.createElement('button', 'cookie-consent-accept-essential', text.acceptEssentialButton);
        
        acceptAllBtn.addEventListener('click', () => {
            this.presenter.acceptAllConsent();
            this.hide();
        });
        
        acceptEssentialBtn.addEventListener('click', () => {
            this.presenter.acceptEssentialConsent();
            this.hide();
        });
        
        buttons.appendChild(acceptAllBtn);
        buttons.appendChild(acceptEssentialBtn);
        
        content.appendChild(message);
        content.appendChild(buttons);
        
        modal.appendChild(overlay);
        modal.appendChild(content);
        
        this.modal = modal;
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                modal.classList.add('active');
            });
        });
        
        return modal;
    }

    hide() {
        if (this.modal) {
            this.modal.classList.remove('active');
            setTimeout(() => {
                if (this.modal && this.modal.parentNode) {
                    this.modal.parentNode.removeChild(this.modal);
                }
            }, 300);
        }
    }
}

