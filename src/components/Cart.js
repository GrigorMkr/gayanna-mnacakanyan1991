import { DOMUtils } from '@utils/domUtils';

/**
 * Компонент корзины для заказа картин
 */
export class Cart {
    constructor(config) {
        this.config = config;
        this.items = [];
        this.modal = null;
        this.cartIcon = null;
        this.badge = null;
        this.loadFromStorage();
    }

    /**
     * Загружает корзину из localStorage
     */
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('cart');
            if (saved) {
                this.items = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Ошибка загрузки корзины:', e);
        }
    }

    /**
     * Сохраняет корзину в localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.items));
        } catch (e) {
            console.error('Ошибка сохранения корзины:', e);
        }
    }

    /**
     * Добавляет картину в корзину
     * @param {string} imagePath - Путь к изображению
     * @param {string} title - Название картины
     * @param {number} price - Цена картины
     */
    addItem(imagePath, title = '', price = 0) {
        console.log('Cart.addItem вызван:', { imagePath, title, price, cartExists: !!this, itemsCount: this.items.length });
        
        const existingItem = this.items.find(item => item.imagePath === imagePath);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: Date.now() + Math.random(),
                imagePath,
                title: title || `Картина ${this.items.length + 1}`,
                price: price || 0,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateUI();
        const itemPrice = price || existingItem?.price || 0;
        const totalPrice = this.getTotalPrice();
        requestAnimationFrame(() => {
            this.showNotification(`Картина добавлена в корзину. Цена: ${this.formatPrice(itemPrice)}. Общая сумма: ${this.formatPrice(totalPrice)}`);
        });
    }

    /**
     * Удаляет картину из корзины
     * @param {string} id - ID элемента корзины
     */
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveToStorage();
        this.updateUI();
        this.showNotification('Картина удалена из корзины');
    }

    /**
     * Изменяет количество картины
     * @param {string} id - ID элемента корзины
     * @param {number} quantity - Новое количество
     */
    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(id);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
                this.updateUI();
            }
        }
    }

    /**
     * Очищает корзину
     */
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateUI();
        this.showNotification('Корзина очищена');
    }

    /**
     * Получает общее количество товаров в корзине
     * @returns {number}
     */
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Получает общую стоимость корзины
     * @returns {number}
     */
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
    }

    /**
     * Форматирует цену для отображения
     * @param {number} price - Цена в рублях
     * @returns {string}
     */
    formatPrice(price) {
        if (price >= 1000) {
            const thousands = Math.floor(price / 1000);
            const remainder = price % 1000;
            if (remainder === 0) {
                return `${thousands} тыс. ₽`;
            } else {
                return `${thousands} ${remainder.toString().padStart(3, '0')} ₽`;
            }
        }
        return `${price} ₽`;
    }

    /**
     * Показывает уведомление
     * @param {string} message - Текст уведомления
     */
    showNotification(message) {
        const notification = DOMUtils.createElement('div', 'cart-notification');
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    /**
     * Обновляет UI корзины (иконка, badge)
     */
    updateUI() {
        if (this.badge) {
            const total = this.getTotalItems();
            this.badge.textContent = total;
            this.badge.style.display = total > 0 ? 'flex' : 'none';
        }
        
        if (this.modal && this.modal.classList.contains('active')) {
            this.renderModalContent();
        }
    }

    /**
     * Создает иконку корзины для навигации
     * @returns {HTMLElement}
     */
    createCartIcon() {
        const cartIconContainer = DOMUtils.createElement('div', 'cart-icon-container');
        
        this.cartIcon = DOMUtils.createElement('div', 'cart-icon');
        this.cartIcon.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
        `;
        
        this.badge = DOMUtils.createElement('span', 'cart-badge');
        this.badge.textContent = this.getTotalItems();
        this.badge.style.display = this.getTotalItems() > 0 ? 'flex' : 'none';
        
        this.cartIcon.addEventListener('click', () => {
            this.openModal();
        });
        
        cartIconContainer.appendChild(this.cartIcon);
        cartIconContainer.appendChild(this.badge);
        
        return cartIconContainer;
    }

    /**
     * Создает модальное окно корзины
     * @returns {HTMLElement}
     */
    createModal() {
        const modal = DOMUtils.createElement('div', 'cart-modal', '', { id: 'cartModal' });
        
        const modalContent = DOMUtils.createElement('div', 'cart-modal-content');
        
        const header = DOMUtils.createElement('div', 'cart-modal-header');
        const title = DOMUtils.createElement('h2', 'cart-modal-title', 'Корзина заказа');
        const closeBtn = DOMUtils.createElement('button', 'cart-modal-close', '×');
        
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        const body = DOMUtils.createElement('div', 'cart-modal-body', '', { id: 'cartModalBody' });
        
        const footer = DOMUtils.createElement('div', 'cart-modal-footer');
        const total = DOMUtils.createElement('div', 'cart-total');
        const totalItems = DOMUtils.createElement('div', 'cart-total-items');
        const totalItemsLabel = DOMUtils.createElement('span', 'cart-total-label', 'Всего картин:');
        const totalItemsValue = DOMUtils.createElement('span', 'cart-total-value', '', { id: 'cartTotalValue' });
        totalItems.appendChild(totalItemsLabel);
        totalItems.appendChild(totalItemsValue);
        
        const totalPrice = DOMUtils.createElement('div', 'cart-total-price');
        const totalPriceLabel = DOMUtils.createElement('span', 'cart-total-label', 'Общая сумма:');
        const totalPriceValue = DOMUtils.createElement('span', 'cart-total-price-value', '', { id: 'cartTotalPriceValue' });
        totalPrice.appendChild(totalPriceLabel);
        totalPrice.appendChild(totalPriceValue);
        
        total.appendChild(totalItems);
        total.appendChild(totalPrice);
        
        const actions = DOMUtils.createElement('div', 'cart-actions');
        const clearBtn = DOMUtils.createElement('button', 'cart-btn cart-btn-clear', 'Очистить корзину');
        const orderBtn = DOMUtils.createElement('button', 'cart-btn cart-btn-order', 'Оформить заказ');
        
        clearBtn.addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите очистить корзину?')) {
                this.clear();
            }
        });
        
        orderBtn.addEventListener('click', () => {
            this.showOrderForm();
        });
        
        actions.appendChild(clearBtn);
        actions.appendChild(orderBtn);
        
        footer.appendChild(total);
        footer.appendChild(actions);
        
        modalContent.appendChild(header);
        modalContent.appendChild(body);
        modalContent.appendChild(footer);
        
        modal.appendChild(modalContent);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        this.modal = modal;
        this.renderModalContent();
        
        return modal;
    }

    /**
     * Рендерит содержимое модального окна
     */
    renderModalContent() {
        const body = document.getElementById('cartModalBody');
        const totalValue = document.getElementById('cartTotalValue');
        
        if (!body || !totalValue) return;
        
        const totalPriceValue = document.getElementById('cartTotalPriceValue');
        
        if (this.items.length === 0) {
            body.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"></path>
                            <path d="M3 6h18"></path>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </div>
                    <p>Корзина пуста</p>
                    <p class="cart-empty-hint">Добавьте картины из галереи</p>
                </div>
            `;
            totalValue.textContent = '0';
            if (totalPriceValue) totalPriceValue.textContent = '0 ₽';
        } else {
            body.innerHTML = '';
            
            this.items.forEach(item => {
                const cartItem = this.createCartItem(item);
                body.appendChild(cartItem);
            });
            
            totalValue.textContent = this.getTotalItems().toString();
            if (totalPriceValue) {
                totalPriceValue.textContent = this.formatPrice(this.getTotalPrice());
            }
        }
    }

    /**
     * Создает элемент товара в корзине
     * @param {Object} item - Элемент корзины
     * @returns {HTMLElement}
     */
    createCartItem(item) {
        const cartItem = DOMUtils.createElement('div', 'cart-item');
        
        const imageContainer = DOMUtils.createElement('div', 'cart-item-image');
        const img = DOMUtils.createElement('img', '', '', {
            src: item.imagePath,
            alt: item.title
        });
        imageContainer.appendChild(img);
        
        const info = DOMUtils.createElement('div', 'cart-item-info');
        const title = DOMUtils.createElement('div', 'cart-item-title', item.title);
        const price = DOMUtils.createElement('div', 'cart-item-price', this.formatPrice(item.price || 0));
        const itemTotal = DOMUtils.createElement('div', 'cart-item-total', `Итого: ${this.formatPrice((item.price || 0) * item.quantity)}`);
        info.appendChild(title);
        info.appendChild(price);
        info.appendChild(itemTotal);
        
        const controls = DOMUtils.createElement('div', 'cart-item-controls');
        
        const quantityContainer = DOMUtils.createElement('div', 'cart-item-quantity');
        const decreaseBtn = DOMUtils.createElement('button', 'cart-quantity-btn', '−');
        const quantityInput = DOMUtils.createElement('input', 'cart-quantity-input', '', {
            type: 'number',
            value: item.quantity,
            min: '1',
            max: '99'
        });
        const increaseBtn = DOMUtils.createElement('button', 'cart-quantity-btn', '+');
        
        decreaseBtn.addEventListener('click', () => {
            this.updateQuantity(item.id, item.quantity - 1);
        });
        
        increaseBtn.addEventListener('click', () => {
            this.updateQuantity(item.id, item.quantity + 1);
        });
        
        quantityInput.addEventListener('change', (e) => {
            const value = parseInt(e.target.value) || 1;
            this.updateQuantity(item.id, value);
        });
        
        quantityContainer.appendChild(decreaseBtn);
        quantityContainer.appendChild(quantityInput);
        quantityContainer.appendChild(increaseBtn);
        
        const removeBtn = DOMUtils.createElement('button', 'cart-item-remove', '');
        removeBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
        `;
        removeBtn.title = 'Удалить';
        removeBtn.addEventListener('click', () => {
            this.removeItem(item.id);
        });
        
        controls.appendChild(quantityContainer);
        controls.appendChild(removeBtn);
        
        cartItem.appendChild(imageContainer);
        cartItem.appendChild(info);
        cartItem.appendChild(controls);
        
        return cartItem;
    }

    /**
     * Показывает форму заказа
     */
    showOrderForm() {
        if (this.items.length === 0) {
            alert('Корзина пуста');
            return;
        }
        
        const body = document.getElementById('cartModalBody');
        if (!body) return;
        
        const form = DOMUtils.createElement('form', 'order-form', '', { id: 'orderForm' });
        
        form.innerHTML = `
            <h3 class="order-form-title">Оформление заказа</h3>
            <div class="order-form-group">
                <label for="orderName">Ваше имя *</label>
                <input type="text" id="orderName" name="name" required placeholder="Введите ваше имя">
            </div>
            <div class="order-form-group">
                <label for="orderPhone">Телефон *</label>
                <input type="tel" id="orderPhone" name="phone" required placeholder="+7 (999) 123-45-67">
            </div>
            <div class="order-form-group">
                <label for="orderEmail">Email</label>
                <input type="email" id="orderEmail" name="email" placeholder="your@email.com">
            </div>
            <div class="order-form-group">
                <label for="orderMessage">Комментарий к заказу</label>
                <textarea id="orderMessage" name="message" rows="4" placeholder="Дополнительная информация о заказе..."></textarea>
            </div>
            <div class="order-form-summary">
                <p><strong>Заказано картин:</strong> ${this.getTotalItems()}</p>
            </div>
            <div class="order-form-actions">
                <button type="button" class="cart-btn cart-btn-back">Назад</button>
                <button type="submit" class="cart-btn cart-btn-submit">Отправить заказ</button>
            </div>
        `;
        
        const backBtn = form.querySelector('.cart-btn-back');
        backBtn.addEventListener('click', () => {
            this.renderModalContent();
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitOrder(form);
        });
        
        body.innerHTML = '';
        body.appendChild(form);
    }

    /**
     * Отправляет заказ
     * @param {HTMLFormElement} form - Форма заказа
     */
    submitOrder(form) {
        const formData = new FormData(form);
        const orderData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message'),
            items: this.items,
            totalItems: this.getTotalItems(),
            date: new Date().toISOString()
        };
        
        // Формируем сообщение для WhatsApp/Telegram
        const message = this.formatOrderMessage(orderData);
        
        // Открываем WhatsApp с предзаполненным сообщением
        const whatsappUrl = `https://wa.me/${this.config.contacts.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Показываем сообщение об успехе
        const body = document.getElementById('cartModalBody');
        if (body) {
            body.innerHTML = `
                <div class="order-success">
                    <div class="order-success-icon">✓</div>
                    <h3>Заказ отправлен!</h3>
                    <p>Мы свяжемся с вами в ближайшее время.</p>
                    <p class="order-success-hint">Открыто окно WhatsApp для подтверждения заказа</p>
                    <button class="cart-btn cart-btn-close-modal" onclick="document.getElementById('cartModal').classList.remove('active')">Закрыть</button>
                </div>
            `;
        }
        
        // Очищаем корзину после отправки
        setTimeout(() => {
            this.clear();
            this.closeModal();
        }, 3000);
    }

    /**
     * Форматирует сообщение заказа
     * @param {Object} orderData - Данные заказа
     * @returns {string}
     */
    formatOrderMessage(orderData) {
        let message = `🎨 Заказ картин\n\n`;
        message += `Имя: ${orderData.name}\n`;
        message += `Телефон: ${orderData.phone}\n`;
        if (orderData.email) {
            message += `Email: ${orderData.email}\n`;
        }
        message += `\n📋 Заказанные картины (${orderData.totalItems} шт.):\n`;
        
        orderData.items.forEach((item, index) => {
            message += `${index + 1}. ${item.title} - ${item.quantity} шт.\n`;
        });
        
        if (orderData.message) {
            message += `\n💬 Комментарий:\n${orderData.message}\n`;
        }
        
        message += `\n📅 Дата заказа: ${new Date(orderData.date).toLocaleString('ru-RU')}`;
        
        return message;
    }

    /**
     * Открывает модальное окно корзины
     */
    openModal() {
        if (this.modal) {
            this.renderModalContent();
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Закрывает модальное окно корзины
     */
    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Инициализирует корзину (создает иконку и модальное окно)
     */
    init() {
        const cartIcon = this.createCartIcon();
        const cartModal = this.createModal();
        
        document.body.appendChild(cartModal);
        
        return { cartIcon, cartModal };
    }
}

