import { CART_CONFIG } from '@constants/ui';

export class CartPresenter {
    constructor() {
        this.items = [];
        this.listeners = [];
        this.loadFromStorage();
    }

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

    saveToStorage() {
        try {
            localStorage.setItem(CART_CONFIG.STORAGE_KEY, JSON.stringify(this.items));
        } catch (error) {
            console.error('Ошибка сохранения корзины:', error);
        }
    }

    addItem(image, title, price) {
        // Проверяем, есть ли уже такой товар
        const existingItem = this.items.find(item => item.image === image);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const item = {
                id: `${image}-${Date.now()}`,
                image,
                title,
                price,
                quantity: 1
            };
            this.items.push(item);
        }
        
        this.saveToStorage();
        this.notifyListeners();
        return existingItem || this.items[this.items.length - 1];
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToStorage();
        this.notifyListeners();
    }

    clear() {
        this.items = [];
        this.saveToStorage();
        this.notifyListeners();
    }

    getItems() {
        return [...this.items];
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

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
