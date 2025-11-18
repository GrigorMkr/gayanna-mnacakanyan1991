/**
 * Презентер для корзины
 * Управляет бизнес-логикой корзины
 */
import { CART_CONFIG } from '@constants/ui';

export class CartPresenter {
    constructor() {
        this.items = [];
        this.listeners = [];
        this.loadFromStorage();
    }

    /**
     * Загружает корзину из localStorage
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(CART_CONFIG.STORAGE_KEY);
            if (stored) {
                this.items = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error);
            this.items = [];
        }
    }

    /**
     * Сохраняет корзину в localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem(CART_CONFIG.STORAGE_KEY, JSON.stringify(this.items));
        } catch (error) {
            console.error('Ошибка сохранения корзины:', error);
        }
    }

    /**
     * Добавляет товар в корзину
     * @param {string} image - Путь к изображению
     * @param {string} title - Название товара
     * @param {number} price - Цена товара
     */
    addItem(image, title, price) {
        const item = {
            id: `${image}-${Date.now()}`,
            image,
            title,
            price,
            quantity: 1
        };
        
        this.items.push(item);
        this.saveToStorage();
        this.notifyListeners();
        return item;
    }

    /**
     * Удаляет товар из корзины
     * @param {string} itemId - ID товара
     */
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToStorage();
        this.notifyListeners();
    }

    /**
     * Очищает корзину
     */
    clear() {
        this.items = [];
        this.saveToStorage();
        this.notifyListeners();
    }

    /**
     * Получает все товары в корзине
     * @returns {Array}
     */
    getItems() {
        return [...this.items];
    }

    /**
     * Получает общую стоимость корзины
     * @returns {number}
     */
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    /**
     * Получает количество товаров в корзине
     * @returns {number}
     */
    getItemCount() {
        return this.items.length;
    }

    /**
     * Проверяет, пуста ли корзина
     * @returns {boolean}
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Подписывается на изменения корзины
     * @param {Function} callback - Функция обратного вызова
     */
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

    /**
     * Уведомляет всех подписчиков об изменениях
     */
    notifyListeners() {
        this.listeners.forEach(listener => {
            try {
                listener(this.items, this.getTotal(), this.getItemCount());
            } catch (error) {
                console.error('Ошибка в подписчике корзины:', error);
            }
        });
    }
}

