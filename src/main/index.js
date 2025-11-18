import { App } from './App';
import { AppPresenter } from '@presenters/AppPresenter';
import { COLORS } from '@constants/colors';
import { i18n } from '@utils/i18n';
import '../styles/styles.css';

function init() {
    try {
        const currentLang = i18n.getCurrentLanguage();
        document.documentElement.lang = currentLang;
        
        const presenter = new AppPresenter(null, COLORS);
        const app = new App(presenter);
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                try {
                    app.init();
                } catch (error) {
                    console.error('Ошибка инициализации приложения:', error);
                    document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Ошибка загрузки</h1><p>Пожалуйста, обновите страницу.</p></div>';
                }
            });
        } else {
            try {
                app.init();
            } catch (error) {
                console.error('Ошибка инициализации приложения:', error);
                document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Ошибка загрузки</h1><p>Пожалуйста, обновите страницу.</p></div>';
            }
        }
    } catch (error) {
        console.error('Критическая ошибка:', error);
        document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Критическая ошибка</h1><p>Пожалуйста, обновите страницу или свяжитесь с администратором.</p></div>';
    }
}

// Обработка глобальных ошибок
window.addEventListener('error', (event) => {
    console.error('Глобальная ошибка:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Необработанное отклонение промиса:', event.reason);
});

init();
