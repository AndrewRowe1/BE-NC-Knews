const connection = require('../db/connection');

const getArticles = ({ author, topic, sort_by, order }) => {
  return connection
    .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at',
      'articles.votes')
    .count('comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .modify((query) => {
      if (author) {
        query.where({ 'articles.author': author });
      };
      if (topic) {
        query.where({ topic });
      };
      if (sort_by) {
        query.orderBy(sort_by, 'desc');
      }
      else {
        query.orderBy('articles.created_at', 'desc');
      }
      if (order) {
        query.orderBy('articles.created_at', order || 'desc');
      }
    })
    .groupBy('articles.article_id');
}

const getArticle = ({ article_id }) => {
  return connection.select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .count('comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .modify((query) => {
      if (article_id) {
        query.where({ 'articles.article_id': article_id });
      }
    })
    .groupBy('articles.article_id');
}

const patchArticle = (articlePatch, articleId) => {
  return connection('articles').where('article_id', '=', articleId).update(articlePatch).returning('*');
};

module.exports = { getArticles, getArticle, patchArticle };