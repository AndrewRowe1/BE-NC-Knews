const commentRouter = require('express').Router();
const { amendComment, removeComment } = require('../controllers/comments')
const { methodNotAllowed } = require('../errors');

commentRouter
  .route('/:comment_id')
  .patch(amendComment)
  .delete(removeComment)
  .all(methodNotAllowed);

module.exports = commentRouter;