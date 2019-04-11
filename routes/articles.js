const articleRouter = require('express').Router();
const { fetchArticles, fetchArticle, amendArticle, removeArticle, fetchCommentsByArticleId, sendCommentByArticleId, sendArticle } = require('../controllers/articles')
const { methodNotAllowed } = require('../errors');

articleRouter
  .route('/')
  .get(fetchArticles)
  .post(sendArticle)
  .all(methodNotAllowed);

articleRouter
  .route('/:article_id')
  .get(fetchArticle)
  .patch(amendArticle)
  .delete(removeArticle)
  .all(methodNotAllowed);

articleRouter
  .route('/:article_id/comments')
  .get(fetchCommentsByArticleId)
  .post(sendCommentByArticleId)
  .all(methodNotAllowed);

module.exports = articleRouter;