import { App } from './App';
import { AppConfig } from '@config/appConfig';
import { ColorPalette } from '@config/colorPalette';
import './styles/styles.css';

/**
 * Точка входа приложения
 */
function init() {
    const app = new App(AppConfig, ColorPalette);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }
}

// Запускаем приложение
init();

