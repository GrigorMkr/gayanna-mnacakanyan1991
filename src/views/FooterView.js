/**
 * Представление футера
 * Отвечает только за отображение UI
 */
import { DOMUtils } from '@utils/domUtils';
import { DateTime } from '@components/DateTime';

export class FooterView {
    constructor(presenter) {
        this.presenter = presenter;
        this.dateTime = new DateTime();
    }

    /**
     * Создает DOM структуру футера
     * @returns {HTMLElement}
     */
    render() {
        const footer = DOMUtils.createElement('footer', 'footer');
        const container = DOMUtils.createElement('div', 'container');
        
        const footerContent = DOMUtils.createElement('div', 'footer-content');
        const copyright = this.createCopyright();
        const dateTimeElement = this.dateTime.create();
        
        footerContent.appendChild(copyright);
        footerContent.appendChild(dateTimeElement);
        container.appendChild(footerContent);
        footer.appendChild(container);
        
        return footer;
    }

    /**
     * Создает копирайт
     * @returns {HTMLElement}
     */
    createCopyright() {
        const languagePresenter = this.presenter.getLanguagePresenter ? this.presenter.getLanguagePresenter() : null;
        const artistName = this.presenter.getConfig().artistName;
        const year = new Date().getFullYear();
        let copyrightText;
        if (languagePresenter) {
            copyrightText = languagePresenter.t('footer.copyright');
        } else {
            copyrightText = `© ${year} ${artistName}. Все права защищены.`;
        }
        return DOMUtils.createElement('p', 'footer-copyright', copyrightText);
    }
}

