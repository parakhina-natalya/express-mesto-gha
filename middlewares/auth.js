const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, 'super-strong-secret');
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
      return;
    }

    req.user = payload;
    next();
  }
};

module.exports = auth;
