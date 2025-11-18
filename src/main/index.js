/**
 * Точка входа приложения
 */
import { App } from './App';
import { AppPresenter } from '@presenters/AppPresenter';
import { AppConfig } from '@config/appConfig';
import { COLORS } from '@constants/colors';
import '../styles/styles.css';

/**
 * Инициализация приложения
 */
function init() {
    // Создаем главный презентер
    const presenter = new AppPresenter(AppConfig, COLORS);
    
    // Создаем главное приложение
    const app = new App(presenter);
    
    // Запускаем приложение
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }
}

// Запускаем приложение
init();

