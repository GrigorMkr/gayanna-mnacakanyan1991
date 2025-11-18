import { App } from './App';
import { AppPresenter } from '@presenters/AppPresenter';
import { AppConfig } from '@config/appConfig';
import { COLORS } from '@constants/colors';
import '../styles/styles.css';

function init() {
    const presenter = new AppPresenter(AppConfig, COLORS);
    const app = new App(presenter);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }
}

init();
