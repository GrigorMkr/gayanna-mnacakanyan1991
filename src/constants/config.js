/**
 * Конфигурация приложения
 */
import { PathUtils } from '@utils/pathUtils';

// Функция для получения правильного пути к изображению
const getImagePath = (path) => PathUtils.getAssetPath(path);

export const APP_CONFIG = {
    ARTIST_NAME: 'Гаянна Мнацаканян',
    TITLE: 'Художница',
    DESCRIPTION: 'Живопись, наполненная красотой и эмоциями',
    get BACKGROUND_IMAGE() {
        return getImagePath('images/fon.jpg');
    },
    get ARTIST_PHOTOS() {
        return [
            getImagePath('images/artist-photo.jpg.JPG'),
            getImagePath('images/artist-photo2.jpg.jpg')
        ];
    },
    ABOUT: [
        'Гаянна Мнацаканян родилась и выросла в Армении — стране с богатыми художественными традициями и неповторимой культурой. С детства вдохновляясь красотой родной земли, она развивала свой талант и страсть к живописи.',
        'Образование получила в художественном колледже имени Паноса Терлемезяна, где оттачивала мастерство и изучала классические техники живописи. Работы Гаянны отражают глубокую связь с армянской культурой и современное видение искусства.',
        'Каждая картина — это история, эмоция, момент времени, запечатленный на холсте с любовью и мастерством.'
    ],
    CONTACTS: {
        PHONE: '+79174666109',
        WHATSAPP: 'https://wa.me/79174666109',
        TELEGRAM: 'https://t.me/+79174666109'
    },
    GALLERY_SOLD_COUNT: 254
};

