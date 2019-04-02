const { getArticles, getArticle, patchArticle } = require('../models/articles');

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
  patchArticle(req.body, req.params.article)
    .then(([articlePatch]) => {
      res.status(200).send({ articlePatch });
    })
    .catch(console.log);
});

module.exports = { fetchArticles, fetchArticle, amendArticle };