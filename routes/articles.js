const articleRouter = require('express').Router();
const { fetchArticles, fetchArticle, amendArticle } = require('../controllers/articles')
const { methodNotAllowed } = require('../errors');

articleRouter
  .route('/')
  .get(fetchArticles)
  .all(methodNotAllowed);

articleRouter
  .route('/:article_id')
  .get(fetchArticle)
  .patch(amendArticle)
  .all(methodNotAllowed);

module.exports = articleRouter;