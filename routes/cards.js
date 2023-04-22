const cardsRouter = require('express').Router();
const {
  createCard,
  getCards,
  removeCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/', createCard);

cardsRouter.get('/', getCards);

cardsRouter.delete('/:cardId', removeCardById);

cardsRouter.put('/:cardId/likes', likeCard);

cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
