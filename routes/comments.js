const commentRouter = require('express').Router();
const amendComment = require('../controllers/comments')
const { methodNotAllowed } = require('../errors');

commentRouter
  .route('/:comment_id')
  .patch(amendComment)
  .all(methodNotAllowed);

module.exports = commentRouter;