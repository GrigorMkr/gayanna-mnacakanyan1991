# Быстрый старт

## 1. Установка

```bash
npm install
```

## 2. Запуск

```bash
npm run dev
```

Сайт откроется автоматически в браузере на `http://localhost:8080`

## 3. Сборка

```bash
npm run build
```

Готовые файлы будут в папке `dist/`

## Что дальше?

- Измените контент в `src/config/appConfig.js`
- Измените цвета в `src/config/colorPalette.js`
- Добавьте свои изображения в папку `images/`

## Структура модулей

```
src/
├── components/    - Компоненты (Navbar, Hero, Gallery и т.д.)
├── config/       - Конфигурация (данные сайта, цвета)
├── utils/        - Утилиты (работа с DOM)
├── styles/       - Стили (StyleManager)
├── App.js        - Главный класс приложения
└── index.js      - Точка входа
```

