const connection = require('../db/connection');

const getArticles = ({ author, topic, sort_by, order, limit }) => {
  return connection
    .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.body', 'articles.created_at',
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
        query.orderBy('articles.created_at', order || 'desc');
      }
      if (order) {
        query.orderBy('articles.created_at', order || 'desc');
      }
    })
    .groupBy('articles.article_id')
    .limit(limit || 10);
}

const getArticle = ({ article_id }) => {
  return connection.select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.body', 'articles.created_at', 'articles.votes')
    .count('comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .where({ 'articles.article_id': article_id })
    .groupBy('articles.article_id');
}

const getArticleIds = () => {
  return connection.select('article_id')
    .from('articles');
}

const patchArticle = ({ inc_votes }, { article_id }) => {
  return connection('articles').where('article_id', '=', article_id).increment('votes', inc_votes || 0).returning('*');
};

const deleteArticle = ({ article_id }) => {
  return connection('articles').del().where('article_id', '=', article_id).returning('*');
};

const getCommentsByArticleId = ({ article_id }, { sort_by, order, limit }) => {
  return connection('comments')
    .select('*')
    .where('article_id', '=', article_id)
    .modify((query) => {
      if (sort_by) {
        query.orderBy(sort_by || 'created_at', 'desc');
      }
      else if (!order) {
        query.orderBy('created_at', 'desc');
      }
      if (order) {
        query.orderBy('created_at', order || 'desc');
      }
    })
    .limit(limit || 10);
};

const postCommentsByArticleId = ({ article_id }, { username, body }) => {
  const insertObj = { author: username, body, article_id: article_id };
  return connection('comments')
    .insert(insertObj)
    .where('article_id', '=', article_id)
    .returning('*');
};

const postArticle = ({ author, body, topic, title }) => {
  const insertObj = { author, body, topic, title };
  return connection('articles')
    .insert(insertObj)
    .returning('*');
};

module.exports = { getArticles, getArticle, getArticleIds, patchArticle, deleteArticle, getCommentsByArticleId, postCommentsByArticleId, postArticle };