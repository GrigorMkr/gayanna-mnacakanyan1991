import { DOMUtils } from '@utils/domUtils';

/**
 * Компонент навигации
 */
export class Navbar {
    constructor(config) {
        this.config = config;
    }

    /**
     * Создает компонент навигации
     * @returns {HTMLElement}
     */
    create() {
        const nav = DOMUtils.createElement('nav', 'navbar');
        const container = DOMUtils.createElement('div', 'container');
        
        const brand = DOMUtils.createElement('div', 'nav-brand', this.config.artistName);
        brand.addEventListener('click', () => {
            DOMUtils.smoothScrollTo('#home');
        });
        
        const menu = DOMUtils.createElement('ul', 'nav-menu');
        const menuItems = [
            { href: '#home', text: 'Главная' },
            { href: '#about', text: 'О художнице' },
            { href: '#gallery', text: 'Галерея' },
            { href: '#contact', text: 'Контакты' }
        ];
        
        menuItems.forEach((item, index) => {
            const li = DOMUtils.createElement('li', 'nav-menu-item');
            const a = DOMUtils.createElement('a', 'nav-link', item.text, { href: item.href });
            a.style.animationDelay = (index * 0.1) + 's';
            a.addEventListener('click', (e) => {
                e.preventDefault();
                DOMUtils.smoothScrollTo(item.href);
            });
            li.appendChild(a);
            menu.appendChild(li);
        });
        
        const hamburger = DOMUtils.createElement('div', 'hamburger');
        for (let i = 0; i < 3; i++) {
            hamburger.appendChild(DOMUtils.createElement('span'));
        }
        
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
        
        container.appendChild(brand);
        container.appendChild(menu);
        
        // Иконка корзины будет добавлена через Cart.init()
        const cartIconPlaceholder = DOMUtils.createElement('div', 'cart-icon-placeholder');
        container.appendChild(cartIconPlaceholder);
        
        container.appendChild(hamburger);
        nav.appendChild(container);
        
        return nav;
    }
}

