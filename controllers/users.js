const User = require('../models/user');

const created = 201;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.status(created).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error({ message: 'Пользователь не существует' });
      err.statusCode = notFound;
      err.name = 'NotFound';
      throw err;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(notFound).send({ message: err.message });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, runValidators: true,
  })
    .orFail(() => {
      const err = new Error({ message: 'Пользователь не существует' });
      err.statusCode = notFound;
      err.name = 'NotFound';
      throw err;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(notFound).send({ message: err.message });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, runValidators: true,
  })
    .orFail(() => {
      const err = new Error({ message: 'Пользователь не существует' });
      err.statusCode = notFound;
      err.name = 'NotFound';
      throw err;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(notFound).send({ message: err.message });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
};
