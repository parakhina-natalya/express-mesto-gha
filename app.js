const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const app = express();
mongoose.connect('mongodb://127.0.0.1/mestodb')
  // eslint-disable-next-line no-console
  .then(() => console.log('Успешное подключение к MongoDB'))
  // eslint-disable-next-line no-console
  .catch((err) => console.error('Ошибка подключения:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '6440505a2537b4eca607162b',
  };

  next();
});

app.use(router);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('start server');
});
