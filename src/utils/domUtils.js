/**
 * Утилиты для работы с DOM
 */
export class DOMUtils {
    /**
     * Создает DOM элемент
     * @param {string} tag - Тег элемента
     * @param {string} className - CSS класс
     * @param {string|HTMLElement} content - Содержимое
     * @param {Object} attributes - Атрибуты элемента
     * @returns {HTMLElement}
     */
    static createElement(tag, className = '', content = '', attributes = {}) {
        const element = document.createElement(tag);
        
        if (className) {
            element.className = className;
        }
        
        if (content) {
            if (typeof content === 'string') {
                element.innerHTML = content;
            } else if (content instanceof HTMLElement) {
                element.appendChild(content);
            }
        }
        
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        
        return element;
    }

    /**
     * Плавная прокрутка к элементу
     * @param {string} target - Селектор целевого элемента
     */
    static smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80; // Отступ для фиксированной навигации
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Проверяет, виден ли элемент в viewport
     * @param {HTMLElement} element - Элемент для проверки
     * @param {number} threshold - Порог видимости (0-1)
     * @returns {boolean}
     */
    static isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= -threshold * rect.height &&
            rect.bottom <= windowHeight + threshold * rect.height &&
            rect.left >= -threshold * rect.width &&
            rect.right <= windowWidth + threshold * rect.width
        );
    }

    /**
     * Дебаунс функция
     * @param {Function} func - Функция для дебаунса
     * @param {number} wait - Время ожидания в мс
     * @returns {Function}
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle функция для оптимизации производительности
     * @param {Function} func - Функция для throttle
     * @param {number} limit - Лимит времени в мс
     * @returns {Function}
     */
    static throttle(func, limit) {
        let inThrottle;
        let lastFunc;
        let lastRan;
        return function(...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                lastRan = Date.now();
                inThrottle = true;
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(() => {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, Math.max(limit - (Date.now() - lastRan), 0));
            }
        };
    }
}

