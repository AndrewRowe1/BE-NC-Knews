const userRouter = require('express').Router();
const { sendUser, fetchUsers, fetchUserByUserId } = require('../controllers/users')
const { methodNotAllowed } = require('../errors');

userRouter
  .route('/')
  .get(fetchUsers)
  .post(sendUser)
  .all(methodNotAllowed);

userRouter
  .route('/:user_id')
  .get(fetchUserByUserId)
  .all(methodNotAllowed);

module.exports = userRouter;