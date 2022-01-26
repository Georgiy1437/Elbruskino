# Elbruskino

Pet проект с использованием стороннего API кинопоиска, которая позволяет получить топ-100 фильмов, можно найти фильм по ключевым словам и выводит всю информацию о фильме. Также каждый пользователь может зарегистрироваться и авторизоваться.

## Стек технологий:

**Backend**: Node.js, Express, PostgreSQL, Sequelize, API;

**Frontend**: JavaScript, handlebars, html, css;

### Установка:

   * npm i
   * npx sequelize db:create (в server/db/config/config.json может потребоваться изменить пользователя на вашего)
   * npx sequelize db:migrate (запустит миграции)
   * npm run dev (запуск сервера)
