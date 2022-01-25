const express = require('express');
const morgan = require('morgan');

const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const PORT = process.env.PORT ?? 3000;

// Импортируем созданный в отдельный файлах рутеры.
const indexRouter = require('./routes/index.route');
const registrationRouter = require('./routes/registration.route');
const loginRouter = require('./routes/login.route');
const logout = require('./routes/logout.route');
const myFilmRouter = require('./routes/myFilm.route');
const top100Router = require('./routes/top100.route');
//api_routers
const searchRouter = require('./routes/search.route')
const movieRouter = require('./routes/movie.route')

const sessionMiddleware = require('./middlewares/sessions');

const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'secret', // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

// Сообщаем express, что в качестве шаблонизатора используется "hbs".
app.set('view engine', 'hbs');
// Сообщаем express, что шаблона шаблонизаторая (вью) находятся в папке "ПапкаПроекта/views".
app.set('views', path.join(__dirname, 'views'));

// Подключаем middleware morgan с режимом логирования "dev", чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе.
app.use(morgan('dev'));

// Подключаем middleware, которое сообщает epxress, что в папке "ПапкаПроекта/public" будут находится статические файлы, т.е. файлы доступные для скачивания из других приложений.
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем middleware, которое позволяет читать содержимое body из HTTP-запросов типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));

// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());

app.use(cookieParser());
app.use(session(sessionConfig));

app.use(sessionMiddleware);
// Подключение роута /user
app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logout);
app.use('/top100', top100Router);
app.use('/myFilm', myFilmRouter);
// Подключение роута /user
app.use('/search', searchRouter);
app.use('/movie', movieRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
