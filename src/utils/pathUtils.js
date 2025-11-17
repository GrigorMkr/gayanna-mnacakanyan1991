/**
 * Утилиты для работы с путями
 */
export class PathUtils {
    /**
     * Получает базовый путь для ресурсов
     * Автоматически определяет путь для GitHub Pages или локальной разработки
     * @returns {string}
     */
    static getBasePath() {
        // Если мы на GitHub Pages (URL содержит /gayanna-mnacakanyan1991/)
        if (typeof window !== 'undefined') {
            const pathname = window.location.pathname;
            if (pathname.includes('/gayanna-mnacakanyan1991/')) {
                return '/gayanna-mnacakanyan1991';
            }
        }
        return '';
    }

    /**
     * Формирует правильный путь к ресурсу
     * @param {string} path - Путь к ресурсу (может начинаться с / или без)
     * @returns {string}
     */
    static getAssetPath(path) {
        // Убираем ведущий слеш, если есть
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        const basePath = this.getBasePath();
        
        // Если базовый путь есть, добавляем его
        if (basePath) {
            return `${basePath}/${cleanPath}`;
        }
        
        // Иначе возвращаем путь с ведущим слешем для локальной разработки
        return `/${cleanPath}`;
    }
}

