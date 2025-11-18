import { AppPresenter } from '@presenters/AppPresenter';
import { NavbarView } from '@views/NavbarView';
import { HeroView } from '@views/HeroView';
import { AboutView } from '@views/AboutView';
import { GalleryView } from '@views/GalleryView';
import { ReviewsView } from '@views/ReviewsView';
import { ContactView } from '@views/ContactView';
import { FooterView } from '@views/FooterView';
import { CookieConsentView } from '@views/CookieConsentView';
import { Cart } from '@components/Cart';
import { GalleryModal } from '@components/GalleryModal';
import { DOMUtils } from '@utils/domUtils';
import { SCROLL_CONFIG } from '@constants/ui';

export class App {
    constructor(presenter) {
        this.presenter = presenter;
    }

    init() {
        if (!this.presenter.init()) {
            return;
        }

        const app = document.getElementById('app');
        if (!app) {
            console.error('Элемент #app не найден!');
            return;
        }

        const cart = new Cart(this.presenter.getConfig());
        const { cartIcon } = cart.init();

        const languagePresenter = this.presenter.getLanguagePresenter();
        
        const navbarPresenter = this.presenter.getNavigationPresenter();
        navbarPresenter.setLanguagePresenter(languagePresenter);
        const navbarView = new NavbarView(navbarPresenter);
        
        const heroPresenter = this.presenter.getHeroPresenter();
        heroPresenter.setLanguagePresenter(languagePresenter);
        const heroView = new HeroView(heroPresenter);
        
        const aboutPresenter = this.presenter.getAboutPresenter();
        aboutPresenter.setLanguagePresenter(languagePresenter);
        const aboutView = new AboutView(aboutPresenter);
        
        const galleryPresenter = this.presenter.getGalleryPresenter();
        galleryPresenter.setLanguagePresenter(languagePresenter);
        const galleryView = new GalleryView(galleryPresenter);
        
        const reviewsPresenter = this.presenter.getReviewsPresenter();
        reviewsPresenter.setLanguagePresenter(languagePresenter);
        const reviewsView = new ReviewsView(reviewsPresenter);
        
        const contactPresenter = this.presenter.getContactPresenter();
        contactPresenter.setLanguagePresenter(languagePresenter);
        const contactView = new ContactView(contactPresenter);
        
        const footerPresenter = this.presenter.getFooterPresenter();
        footerPresenter.setLanguagePresenter(languagePresenter);
        const footerView = new FooterView(footerPresenter);

        const navbarElement = navbarView.render();
        app.appendChild(navbarElement);

        const cartIconPlaceholder = navbarElement.querySelector('.cart-icon-placeholder');
        if (cartIconPlaceholder && cartIcon) {
            cartIconPlaceholder.replaceWith(cartIcon);
        }

        app.appendChild(heroView.render());
        app.appendChild(aboutView.render());
        app.appendChild(galleryView.render());
        app.appendChild(reviewsView.render());
        app.appendChild(contactView.render());
        app.appendChild(footerView.render());

        const galleryImages = this.presenter.getGalleryPresenter().getGalleryImages();
        GalleryModal.init(galleryImages);

        const cookieConsentView = new CookieConsentView(this.presenter.getCookieConsentPresenter());
        const cookieConsentModal = cookieConsentView.render();
        if (cookieConsentModal) {
            document.body.appendChild(cookieConsentModal);
        }

        this.initScrollEffects();

        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    }

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

        const observerOptions = {
            threshold: SCROLL_CONFIG.THRESHOLD,
            rootMargin: SCROLL_CONFIG.ROOT_MARGIN
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const sections = document.querySelectorAll('section');
                sections.forEach((section) => {
                    if (section.id !== 'gallery') {
                        section.style.opacity = '0';
                        section.style.transform = 'translateY(30px)';
                        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        observer.observe(section);
                    } else {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }
                });
            });
        });
    }
}
