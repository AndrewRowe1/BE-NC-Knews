const userRouter = require('express').Router();
const fetchUserByUserId = require('../controllers/users')
const { methodNotAllowed } = require('../errors');

userRouter
  .route('/:user_id')
  .get(fetchUserByUserId)
  .all(methodNotAllowed);

module.exports = userRouter;