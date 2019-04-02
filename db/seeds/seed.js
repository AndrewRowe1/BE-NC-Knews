const { articlesData, commentsData, topicsData, usersData } = require('../data');

const { dateToSqlArticle, formatComments, createArticleRef, } = require('../utils/referenceFuncs');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('users').insert(usersData).returning('*'))
    .then((userInsertions) => {
      const topicInsertions = knex('topics').insert(topicsData).returning('*');
      return Promise.all([userInsertions, topicInsertions]);
    })
    .then(([userInsertions, topicInsertions]) => {
      const formattedArticles = dateToSqlArticle(articlesData);
      const articleInsertions = knex('articles').insert(formattedArticles).returning('*');
      return Promise.all([userInsertions, topicInsertions, articleInsertions]);
    })
    .then(([userInsertions, topicInsertions, articleInsertions]) => {
      const articleLookup = createArticleRef(articleInsertions);
      const allCommentData = formatComments(commentsData, articleLookup);
      const commentInsertions = knex('comments')
        .insert(allCommentData)
        .returning('*');
      return Promise.all([userInsertions, topicInsertions, articleInsertions, commentInsertions]);
    });
};
