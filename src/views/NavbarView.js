/**
 * Представление навигации
 * Отвечает только за отображение UI
 */
import { DOMUtils } from '@utils/domUtils';
import { ANIMATION_DELAYS } from '@constants/animations';

export class NavbarView {
    constructor(presenter) {
        this.presenter = presenter;
    }

    /**
     * Создает DOM структуру навигации
     * @returns {HTMLElement}
     */
    render() {
        const nav = DOMUtils.createElement('nav', 'navbar');
        const container = DOMUtils.createElement('div', 'container');
        
        const brand = this.createBrand();
        const menu = this.createMenu();
        const hamburger = this.createHamburger();
        
        // Иконка корзины будет добавлена через Cart
        const cartIconPlaceholder = DOMUtils.createElement('div', 'cart-icon-placeholder');
        
        container.appendChild(brand);
        container.appendChild(menu);
        container.appendChild(cartIconPlaceholder);
        container.appendChild(hamburger);
        nav.appendChild(container);
        
        this.setupMenuToggle(hamburger, menu);
        
        return nav;
    }

    /**
     * Создает бренд (логотип)
     * @returns {HTMLElement}
     */
    createBrand() {
        const config = this.presenter.getConfig ? this.presenter.getConfig() : { artistName: 'Гаянна Мнацаканян' };
        const brand = DOMUtils.createElement('div', 'nav-brand', config.artistName || 'Гаянна Мнацаканян');
        brand.addEventListener('click', () => {
            this.presenter.navigateTo('#home');
        });
        return brand;
    }

    /**
     * Создает меню навигации
     * @returns {HTMLElement}
     */
    createMenu() {
        const menu = DOMUtils.createElement('ul', 'nav-menu');
        const navItems = this.presenter.getNavItems();
        
        navItems.forEach((item, index) => {
            const li = DOMUtils.createElement('li', 'nav-menu-item');
            const a = DOMUtils.createElement('a', 'nav-link', item.label, { href: item.route });
            a.style.animationDelay = (index * ANIMATION_DELAYS.NAVBAR_ITEM) + 's';
            
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.presenter.navigateTo(item.route);
            });
            
            li.appendChild(a);
            menu.appendChild(li);
        });
        
        return menu;
    }

    /**
     * Создает кнопку гамбургер-меню
     * @returns {HTMLElement}
     */
    createHamburger() {
        const hamburger = DOMUtils.createElement('div', 'hamburger');
        for (let i = 0; i < 3; i++) {
            hamburger.appendChild(DOMUtils.createElement('span'));
        }
        return hamburger;
    }

    /**
     * Настраивает переключение мобильного меню
     * @param {HTMLElement} hamburger - Кнопка гамбургер
     * @param {HTMLElement} menu - Меню
     */
    setupMenuToggle(hamburger, menu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }
}

