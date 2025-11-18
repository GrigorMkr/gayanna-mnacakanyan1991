import { App } from './App';
import { AppPresenter } from '@presenters/AppPresenter';
import { COLORS } from '@constants/colors';
import { i18n } from '@utils/i18n';
import '../styles/styles.css';

function init() {
    const currentLang = i18n.getCurrentLanguage();
    document.documentElement.lang = currentLang;
    
    const presenter = new AppPresenter(null, COLORS);
    const app = new App(presenter);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }
}

init();
