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
        const languageSwitcher = this.createLanguageSwitcher();
        
        // Иконка корзины будет добавлена через Cart
        const cartIconPlaceholder = DOMUtils.createElement('div', 'cart-icon-placeholder');
        
        container.appendChild(brand);
        container.appendChild(menu);
        container.appendChild(cartIconPlaceholder);
        container.appendChild(languageSwitcher);
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
        const brand = DOMUtils.createElement('div', 'nav-brand');
        brand.addEventListener('click', () => {
            this.presenter.navigateTo('#home');
        });
        
        const logo = DOMUtils.createElement('div', 'nav-brand-logo');
        this.updateLogoForMobile(logo);
        
        window.addEventListener('resize', () => {
            this.updateLogoForMobile(logo);
        });
        
        brand.appendChild(logo);
        return brand;
    }
    
    updateLogoForMobile(logo) {
        const isMobile = window.innerWidth <= 768;
        const gradientId = `logoGradient-${Date.now()}`;
        
        if (isMobile) {
            logo.innerHTML = `
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#D4A574;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#C9A961;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="47" stroke="#D4A574" stroke-width="2" fill="none" opacity="0.5"/>
                    <ellipse cx="50" cy="50" rx="40" ry="32" fill="#E8D5C4" opacity="0.9" transform="rotate(-15 50 50)"/>
                    <ellipse cx="50" cy="50" rx="40" ry="32" stroke="#8B4513" stroke-width="3" fill="none" transform="rotate(-15 50 50)"/>
                    <circle cx="50" cy="18" r="6" fill="#FF0080" opacity="0.9"/>
                    <circle cx="75" cy="35" r="6" fill="#FFD700" opacity="0.9"/>
                    <circle cx="82" cy="50" r="6" fill="#00FF80" opacity="0.9"/>
                    <circle cx="75" cy="65" r="6" fill="#0080FF" opacity="0.9"/>
                    <circle cx="50" cy="82" r="6" fill="#FF00FF" opacity="0.9"/>
                    <circle cx="25" cy="65" r="6" fill="#FF4000" opacity="0.9"/>
                    <circle cx="18" cy="50" r="6" fill="#00FFFF" opacity="0.9"/>
                    <circle cx="25" cy="35" r="6" fill="#8000FF" opacity="0.9"/>
                    <text x="50" y="58" font-family="'Dancing Script', cursive" font-size="32" font-weight="700" fill="#4A2C1A" text-anchor="middle">GM</text>
                    <text x="50" y="76" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#4A2C1A" text-anchor="middle">customs</text>
                    <path d="M65 35 L73 25 L74 30 L66 40 Z" fill="url(#${gradientId})" opacity="0.95"/>
                    <path d="M65 35 L73 25" stroke="url(#${gradientId})" stroke-width="3" stroke-linecap="round"/>
                    <path d="M66 40 L74 30" stroke="url(#${gradientId})" stroke-width="3" stroke-linecap="round"/>
                    <path d="M69 24 L70 19" stroke="url(#${gradientId})" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            `;
        } else {
            const rainbowGradientId = `rainbowGradient-${Date.now()}`;
            const neonGlowId = `neonGlow-${Date.now()}`;
            const neonGlowStrongId = `neonGlowStrong-${Date.now()}`;
            
            logo.innerHTML = `
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#D4A574;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#C9A961;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="${rainbowGradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#FF0080;stop-opacity:0.4" />
                            <stop offset="16.66%" style="stop-color:#FF4000;stop-opacity:0.4" />
                            <stop offset="33.33%" style="stop-color:#FFFF00;stop-opacity:0.4" />
                            <stop offset="50%" style="stop-color:#00FF80;stop-opacity:0.4" />
                            <stop offset="66.66%" style="stop-color:#0080FF;stop-opacity:0.4" />
                            <stop offset="83.33%" style="stop-color:#8000FF;stop-opacity:0.4" />
                            <stop offset="100%" style="stop-color:#FF00FF;stop-opacity:0.4" />
                        </linearGradient>
                        <filter id="${neonGlowId}" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        <filter id="${neonGlowStrongId}" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <g id="rotatingBorder">
                        <animateTransform attributeName="transform" type="rotate" values="0 50 50;-360 50 50" dur="15s" repeatCount="indefinite"/>
                        <circle cx="50" cy="50" r="47" stroke="url(#${rainbowGradientId})" stroke-width="2.5" fill="none" filter="url(#${neonGlowStrongId})" opacity="0.3"/>
                    </g>
                    <ellipse cx="50" cy="50" rx="40" ry="32" fill="#E8D5C4" opacity="0.8" transform="rotate(-15 50 50)"/>
                    <ellipse cx="50" cy="50" rx="40" ry="32" stroke="#8B4513" stroke-width="3.5" fill="none" transform="rotate(-15 50 50)"/>
                    <g id="rotatingColors">
                        <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="15s" repeatCount="indefinite"/>
                        <ellipse cx="50" cy="18" rx="9" ry="4" fill="#FF0080" filter="url(#${neonGlowId})" opacity="1"/>
                        <ellipse cx="75" cy="35" rx="9" ry="4" fill="#FFD700" filter="url(#${neonGlowId})" opacity="1"/>
                        <ellipse cx="82" cy="50" rx="9" ry="4" fill="#00FF80" filter="url(#${neonGlowId})" opacity="1"/>
                        <ellipse cx="75" cy="65" rx="9" ry="4" fill="#0080FF" filter="url(#${neonGlowId})" opacity="1"/>
                        <ellipse cx="50" cy="82" rx="9" ry="4" fill="#FF00FF" filter="url(#${neonGlowId})" opacity="1"/>
                        <ellipse cx="25" cy="65" rx="9" ry="4" fill="#FF4000" filter="url(#${neonGlowId})" opacity="1"/>
                        <ellipse cx="18" cy="50" rx="9" ry="4" fill="#00FFFF" filter="url(#${neonGlowId})" opacity="1"/>
                        <ellipse cx="25" cy="35" rx="9" ry="4" fill="#8000FF" filter="url(#${neonGlowId})" opacity="1"/>
                    </g>
                    <text x="50" y="58" font-family="'Dancing Script', cursive" font-size="36" font-weight="700" fill="#4A2C1A" text-anchor="middle" stroke="#FFFFFF" stroke-width="1.2">GM</text>
                    <text x="50" y="76" font-family="'Inter', sans-serif" font-size="18" font-weight="700" fill="#4A2C1A" text-anchor="middle" stroke="#FFFFFF" stroke-width="1">customs</text>
                    <path d="M65 35 L73 25 L74 30 L66 40 Z" fill="url(#${gradientId})" opacity="0.95"/>
                    <path d="M65 35 L73 25" stroke="url(#${gradientId})" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M66 40 L74 30" stroke="url(#${gradientId})" stroke-width="3.5" stroke-linecap="round"/>
                    <path d="M69 24 L70 19" stroke="url(#${gradientId})" stroke-width="3" stroke-linecap="round"/>
                </svg>
            `;
        }
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
     * Создает переключатель языков
     * @returns {HTMLElement}
     */
    createLanguageSwitcher() {
        const languagePresenter = this.presenter.getLanguagePresenter ? this.presenter.getLanguagePresenter() : null;
        if (!languagePresenter) {
            return DOMUtils.createElement('div');
        }

        const switcher = DOMUtils.createElement('div', 'language-switcher');
        const currentLang = languagePresenter.getCurrentLanguage();
        const languages = languagePresenter.getAvailableLanguages();

        languages.forEach(lang => {
            const button = DOMUtils.createElement('button', 'lang-btn', lang.nativeName, {
                'data-lang': lang.code
            });
            
            if (lang.code === currentLang) {
                button.classList.add('active');
            }
            
            button.addEventListener('click', () => {
                languagePresenter.setLanguage(lang.code);
                window.location.reload();
            });
            
            switcher.appendChild(button);
        });

        return switcher;
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

