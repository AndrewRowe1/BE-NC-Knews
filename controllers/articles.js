const { getArticles, getArticle, patchArticle, deleteArticle } = require('../models/articles');

const fetchArticles = ((req, res, next) => {
  getArticles(req.query)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next)
});

const fetchArticle = ((req, res, next) => {
  getArticle(req.params)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next)
});

const amendArticle = ((req, res, next) => {
  patchArticle(req.body, req.params)
    .then(([articlePatch]) => {
      res.status(200).send({ articlePatch });
    })
    .catch(next);
});

const removeArticle = ((req, res, next) => {
  deleteArticle(req.params)
    .then(([articleDelete]) => {
      res.status(204).send({ articleDelete });
    })
    .catch(next);
});

module.exports = { fetchArticles, fetchArticle, amendArticle, removeArticle };