const Card = require('../models/card');

const badRequest = 400;
const notFound = 404;
const serverError = 500;

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

const getCards = (req, res) => {
  Card.find()
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

const removeCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const err = new Error({ message: 'Карточка не найдена' });
      err.statusCode = notFound;
      err.name = 'NotFound';
      throw err;
    })
    .then(() => {
      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные карточки' });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(notFound).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new Error({ message: 'Карточка не найдена' });
      err.statusCode = notFound;
      err.name = 'NotFound';
      throw err;
    })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные карточки' });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(notFound).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new Error({ message: 'Карточка не найдена' });
      err.statusCode = notFound;
      err.name = 'NotFound';
      throw err;
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные карточки' });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(notFound).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  createCard,
  getCards,
  removeCardById,
  likeCard,
  dislikeCard,
};
