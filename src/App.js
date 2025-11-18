import { AppConfig } from '@config/appConfig';
import { ColorPalette } from '@config/colorPalette';
import { StyleManager } from '@styles/styleManager';
import { Navbar } from '@components/Navbar';
import { Hero } from '@components/Hero';
import { About } from '@components/About';
import { Gallery } from '@components/Gallery';
import { Reviews } from '@components/Reviews';
import { Contact } from '@components/Contact';
import { Footer } from '@components/Footer';
import { GalleryModal } from '@components/GalleryModal';
import { Cart } from '@components/Cart';
import { DOMUtils } from '@utils/domUtils';

/**
 * Главный класс приложения
 */
export class App {
    constructor(config, colors) {
        this.config = config;
        this.colors = colors;
        this.styleManager = new StyleManager(colors);
    }

    /**
     * Инициализация приложения
     */
    init() {
        // Инициализация стилей
        this.styleManager.init();
        
        // Получаем контейнер приложения
        const app = document.getElementById('app');
        if (!app) {
            console.error('Элемент #app не найден!');
            return;
        }
        
        // Инициализируем корзину
        const cart = new Cart(this.config);
        const { cartIcon } = cart.init();
        
        // Создаем компоненты
        const navbar = new Navbar(this.config);
        const navbarElement = navbar.create();
        
        // Добавляем иконку корзины в навигацию
        const cartIconPlaceholder = navbarElement.querySelector('.cart-icon-placeholder');
        if (cartIconPlaceholder && cartIcon) {
            cartIconPlaceholder.replaceWith(cartIcon);
        }
        
        const hero = new Hero(this.config);
        const about = new About(this.config);
        const gallery = new Gallery(this.config, cart);
        const reviews = new Reviews(this.config);
        const contact = new Contact(this.config);
        const footer = new Footer(this.config);
        
        // Добавляем компоненты в DOM
        app.appendChild(navbarElement);
        app.appendChild(hero.create());
        app.appendChild(about.create());
        app.appendChild(gallery.create());
        app.appendChild(reviews.create());
        app.appendChild(contact.create());
        app.appendChild(footer.create());
        
        // Инициализируем модальное окно галереи
        GalleryModal.init(this.config.galleryImages);
        
        // Инициализируем эффекты прокрутки
        this.initScrollEffects();
        
        // Показываем страницу
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    }

    /**
     * Инициализация эффектов прокрутки
     */
    initScrollEffects() {
        const navbar = document.querySelector('.navbar');
        
        const handleScroll = DOMUtils.throttle(() => {
            const currentScroll = window.pageYOffset;
            
            if (navbar) {
                if (currentScroll > 100) {
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                } else {
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                }
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
        
        // Анимация появления элементов при прокрутке
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Наблюдаем за секциями
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const sections = document.querySelectorAll('section');
                sections.forEach((section) => {
                    // Не скрываем галерею сразу, чтобы изображения могли загрузиться
                    if (section.id !== 'gallery') {
                        section.style.opacity = '0';
                        section.style.transform = 'translateY(30px)';
                        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        observer.observe(section);
                    } else {
                        // Галерея видима сразу
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }
                });
            });
        });
    }
}

