import { DOMUtils } from '@utils/domUtils';

/**
 * Компонент отображения даты и времени
 */
export class DateTime {
    constructor() {
        this.element = null;
        this.intervalId = null;
    }

    /**
     * Форматирует дату и время
     * @param {Date} date - Объект Date
     * @returns {Object} Объект с отформатированными датой и временем
     */
    formatDateTime(date) {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                       'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        
        const day = days[date.getDay()];
        const dayNumber = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return {
            date: `${day}, ${dayNumber} ${month} ${year}`,
            time: `${hours}:${minutes}:${seconds}`
        };
    }

    /**
     * Обновляет отображение даты и времени
     */
    update() {
        if (!this.element) return;
        
        const now = new Date();
        const { date, time } = this.formatDateTime(now);
        
        const dateElement = this.element.querySelector('.datetime-date');
        const timeElement = this.element.querySelector('.datetime-time');
        
        if (dateElement) {
            dateElement.textContent = date;
        }
        if (timeElement) {
            timeElement.textContent = time;
        }
    }

    /**
     * Создает компонент DateTime
     * @returns {HTMLElement}
     */
    create() {
        const container = DOMUtils.createElement('div', 'datetime-container');
        
        const dateElement = DOMUtils.createElement('div', 'datetime-date');
        const timeElement = DOMUtils.createElement('div', 'datetime-time');
        
        container.appendChild(dateElement);
        container.appendChild(timeElement);
        
        this.element = container;
        
        // Обновляем сразу
        this.update();
        
        // Обновляем каждую секунду
        this.intervalId = setInterval(() => {
            this.update();
        }, 1000);
        
        return container;
    }

    /**
     * Останавливает обновление времени
     */
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

