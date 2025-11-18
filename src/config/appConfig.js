/**
 * Конфигурация приложения
 */
import { PathUtils } from '@utils/pathUtils';

// Функция для получения правильного пути к изображению
const getImagePath = (path) => PathUtils.getAssetPath(path);

export const AppConfig = {
    artistName: 'Гаянна Мнацаканян',
    title: 'Художница',
    description: 'Живопись, наполненная красотой и эмоциями',
    get backgroundImage() {
        return getImagePath('images/fon.jpg');
    },
    get artistPhotos() {
        return [
            getImagePath('images/artist-photo.jpg.JPG'),
            getImagePath('images/artist-photo2.jpg.jpg')
        ];
    },
    about: [
        'Гаянна Мнацаканян родилась и выросла в Армении — стране с богатыми художественными традициями и неповторимой культурой. С детства вдохновляясь красотой родной земли, она развивала свой талант и страсть к живописи.',
        'Образование получила в художественном колледже имени Паноса Терлемезяна, где оттачивала мастерство и изучала классические техники живописи. Работы Гаянны отражают глубокую связь с армянской культурой и современное видение искусства.',
        'Каждая картина — это история, эмоция, момент времени, запечатленный на холсте с любовью и мастерством.'
    ],
    contacts: {
        phone: '+79174666109',
        whatsapp: 'https://wa.me/79174666109',
        telegram: 'https://t.me/+79174666109'
    },
    get galleryImages() {
        return [
            { image: getImagePath('images/painting1.jpg'), title: 'Рассвет над Араратом', price: 25000 },
            { image: getImagePath('images/painting2.jpg'), title: 'Армянские мотивы', price: 18000 },
            { image: getImagePath('images/painting3.jpg'), title: 'Весенний сад', price: 32000 },
            { image: getImagePath('images/painting4.jpg'), title: 'Горный пейзаж', price: 22000 },
            { image: getImagePath('images/painting5.jpg'), title: 'Тишина вечера', price: 28000 },
            { image: getImagePath('images/painting6.jpg'), title: 'Цветущие поля', price: 15000 },
            { image: getImagePath('images/painting7.jpg'), title: 'Старый Ереван', price: 35000 },
            { image: getImagePath('images/painting8.jpg'), title: 'Морской бриз', price: 19000 },
            { image: getImagePath('images/painting9.jpg'), title: 'Осенняя симфония', price: 27000 },
            { image: getImagePath('images/painting10.jpg'), title: 'Душа Армении', price: 38000 },
            { image: getImagePath('images/painting11.jpg'), title: 'Горная река', price: 21000 },
            { image: getImagePath('images/painting12.jpg'), title: 'Цветы жизни', price: 16000 },
            { image: getImagePath('images/painting13.JPG'), title: 'Золотой час', price: 29000 },
            { image: getImagePath('images/painting15.jpg'), title: 'Традиции предков', price: 33000 },
            { image: getImagePath('images/painting17.jpg'), title: 'Летний день', price: 14000 },
            { image: getImagePath('images/painting18.PNG'), title: 'Горные вершины', price: 36000 },
            { image: getImagePath('images/painting19.PNG'), title: 'Воспоминания', price: 24000 },
            { image: getImagePath('images/painting20.PNG'), title: 'Свет и тень', price: 31000 },
            { image: getImagePath('images/painting23.JPG'), title: 'Древние стены', price: 26000 },
            { image: getImagePath('images/painting24.jpg'), title: 'Природная гармония', price: 17000 },
            { image: getImagePath('images/painting25.jpg'), title: 'Вечерний свет', price: 34000 },
            { image: getImagePath('images/painting26.JPG'), title: 'Армянская душа', price: 23000 },
            { image: getImagePath('images/painting27.JPG'), title: 'Цвета родины', price: 20000 },
            { image: getImagePath('images/painting28.JPG'), title: 'Горный воздух', price: 37000 },
            { image: getImagePath('images/painting31.PNG'), title: 'Времена года', price: 30000 },
            { image: getImagePath('images/painting32.PNG'), title: 'Тихая гавань', price: 13000 },
            { image: getImagePath('images/painting33.PNG'), title: 'Этюд в красках', price: 25000 },
            { image: getImagePath('images/painting34.JPG'), title: 'Древние традиции', price: 39000 },
            { image: getImagePath('images/painting35.PNG'), title: 'Природная красота', price: 18000 },
            { image: getImagePath('images/painting36.PNG'), title: 'Горная дорога', price: 28000 },
            { image: getImagePath('images/painting37.PNG'), title: 'Вдохновение', price: 22000 },
            { image: getImagePath('images/painting116.jpg'), title: 'Солнечный день', price: 15000 },
        ];
    },
    get reviews() {
        return [
            {
                rating: 5,
                text: 'Невероятно талантливая художница! Картина "Рассвет над Араратом" превзошла все мои ожидания. Каждая деталь проработана с любовью и мастерством. Гаянна создала настоящий шедевр, который теперь украшает мой дом.',
                clientName: 'Мария Петрова',
                clientMeta: 'Москва',
                clientPhoto: getImagePath('images/client1.jpg') // Можно добавить фото клиента
            },
            {
                rating: 5,
                text: 'Заказала портрет у Гаянны и осталась в полном восторге! Она уловила не только внешнее сходство, но и внутреннюю суть. Работа выполнена профессионально, с вниманием к деталям. Очень рекомендую!',
                clientName: 'Елена Смирнова',
                clientMeta: 'Санкт-Петербург',
                clientPhoto: getImagePath('images/client2.jpg')
            },
            {
                rating: 5,
                text: 'Картины Гаянны наполнены эмоциями и красотой. Купил "Армянские мотивы" и не могу налюбоваться. Каждый день открываю для себя что-то новое в этой работе. Спасибо за такое искусство!',
                clientName: 'Дмитрий Иванов',
                clientMeta: 'Екатеринбург',
                clientPhoto: getImagePath('images/client3.jpg')
            },
            {
                rating: 5,
                text: 'Работа с Гаянной - это настоящее удовольствие! Она внимательно выслушала все мои пожелания и создала картину, которая идеально вписывается в интерьер. Качество на высшем уровне, сроки соблюдены.',
                clientName: 'Анна Козлова',
                clientMeta: 'Новосибирск',
                clientPhoto: getImagePath('images/client4.jpg')
            },
            {
                rating: 5,
                text: 'Гаянна - мастер своего дела! Её работы отличаются особой энергетикой и глубиной. Картина "Душа Армении" стала центральным элементом моей коллекции. Очень довольна покупкой!',
                clientName: 'Ольга Волкова',
                clientMeta: 'Казань',
                clientPhoto: getImagePath('images/client5.jpg')
            },
            {
                rating: 5,
                text: 'Прекрасный художник с уникальным стилем! Заказал несколько картин для офиса, и все они вызывают восхищение у посетителей. Гаянна умеет передать настроение и атмосферу через краски.',
                clientName: 'Александр Новиков',
                clientMeta: 'Краснодар',
                clientPhoto: getImagePath('images/client6.jpg')
            }
        ];
    }
};

