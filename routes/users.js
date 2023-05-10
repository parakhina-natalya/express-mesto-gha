const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const {
  getUsers, getUserById,
  updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

usersRouter.get('/me', auth, getUserInfo);

usersRouter.get('/', auth, getUsers);

usersRouter.get('/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

usersRouter.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

usersRouter.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/https?:\/\/(www\.)?[0-9a-z-.]*\.[a-z]*\/?([0-9a-z-._~:/?#[]@!$&'\(\)\*\+,;=]*)?#?/i),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
