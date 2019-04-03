const articleRouter = require('express').Router();
const { fetchArticles, fetchArticle, amendArticle, removeArticle } = require('../controllers/articles')
const { methodNotAllowed } = require('../errors');

articleRouter
  .route('/')
  .get(fetchArticles)
  .all(methodNotAllowed);

articleRouter
  .route('/:article_id')
  .get(fetchArticle)
  .patch(amendArticle)
  .delete(removeArticle)
  .all(methodNotAllowed);

module.exports = articleRouter;