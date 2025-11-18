import { AppConfig } from './appConfig';
import { i18n } from '@utils/i18n';
import { PathUtils } from '@utils/pathUtils';

const getImagePath = (path) => PathUtils.getAssetPath(path);

export class ConfigAdapter {
    constructor() {
        this.baseConfig = AppConfig;
    }

    get artistName() {
        return i18n.t('artistName');
    }

    get title() {
        return i18n.t('title');
    }

    get description() {
        return i18n.t('description');
    }

    get backgroundImage() {
        return getImagePath('images/fon.jpg');
    }

    get artistPhotos() {
        return [
            getImagePath('images/artist-photo.jpg.JPG'),
            getImagePath('images/artist-photo2.jpg.jpg')
        ];
    }

    get about() {
        return i18n.t('about');
    }

    get contacts() {
        return AppConfig.contacts;
    }

    get galleryImages() {
        const paintings = [
            { key: 'painting1', price: 25000 },
            { key: 'painting2', price: 18000 },
            { key: 'painting3', price: 32000 },
            { key: 'painting4', price: 22000 },
            { key: 'painting5', price: 28000 },
            { key: 'painting6', price: 15000 },
            { key: 'painting7', price: 35000 },
            { key: 'painting8', price: 19000 },
            { key: 'painting9', price: 27000 },
            { key: 'painting10', price: 38000 },
            { key: 'painting11', price: 21000 },
            { key: 'painting12', price: 16000 },
            { key: 'painting13', price: 29000 },
            { key: 'painting15', price: 33000 },
            { key: 'painting17', price: 14000 },
            { key: 'painting18', price: 36000 },
            { key: 'painting19', price: 24000 },
            { key: 'painting20', price: 31000 },
            { key: 'painting23', price: 26000 },
            { key: 'painting24', price: 17000 },
            { key: 'painting25', price: 34000 },
            { key: 'painting26', price: 23000 },
            { key: 'painting27', price: 20000 },
            { key: 'painting28', price: 37000 },
            { key: 'painting31', price: 30000 },
            { key: 'painting32', price: 13000 },
            { key: 'painting33', price: 25000 },
            { key: 'painting34', price: 39000 },
            { key: 'painting35', price: 18000 },
            { key: 'painting36', price: 28000 },
            { key: 'painting37', price: 22000 },
            { key: 'painting116', price: 15000 }
        ];

        return paintings.map(painting => ({
            image: getImagePath(`images/${painting.key}.${painting.key === 'painting13' || painting.key === 'painting23' || painting.key === 'painting26' || painting.key === 'painting27' || painting.key === 'painting28' || painting.key === 'painting34' ? 'JPG' : painting.key === 'painting18' || painting.key === 'painting19' || painting.key === 'painting20' || painting.key === 'painting31' || painting.key === 'painting32' || painting.key === 'painting33' || painting.key === 'painting35' || painting.key === 'painting36' || painting.key === 'painting37' ? 'PNG' : 'jpg'}`),
            title: i18n.t(`paintings.${painting.key}`),
            price: painting.price
        }));
    }

    get reviews() {
        const reviewTexts = i18n.t('reviewTexts');
        const baseReviews = AppConfig.reviews;
        
        return baseReviews.map((review, index) => ({
            ...review,
            text: reviewTexts[index] || review.text
        }));
    }

    get gallerySoldCount() {
        return AppConfig.gallerySoldCount || 254;
    }
}

