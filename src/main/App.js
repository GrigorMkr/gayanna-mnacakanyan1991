import { AppPresenter } from '@presenters/AppPresenter';
import { NavbarView } from '@views/NavbarView';
import { HeroView } from '@views/HeroView';
import { AboutView } from '@views/AboutView';
import { GalleryView } from '@views/GalleryView';
import { ReviewsView } from '@views/ReviewsView';
import { ContactView } from '@views/ContactView';
import { FooterView } from '@views/FooterView';
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

        const navbarView = new NavbarView(this.presenter.getNavigationPresenter());
        const heroView = new HeroView(this.presenter.getHeroPresenter());
        const aboutView = new AboutView(this.presenter.getAboutPresenter());
        const galleryView = new GalleryView(this.presenter.getGalleryPresenter());
        const reviewsView = new ReviewsView(this.presenter.getReviewsPresenter());
        const contactView = new ContactView(this.presenter.getContactPresenter());
        const footerView = new FooterView(this.presenter.getFooterPresenter());

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
