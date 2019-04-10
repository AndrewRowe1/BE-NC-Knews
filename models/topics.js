const connection = require('../db/connection');

const getTopics = () => {
  return connection
    .select('*')
    .from('topics');
}

const getTopicsSlug = () => {
  return connection
    .select('slug')
    .from('topics');
}

const postTopic = (request) => {
  const insertObj = { slug: request.slug, description: request.description };
  return connection('topics')
    .insert(insertObj)
    .returning('*');
};

module.exports = { getTopics, getTopicsSlug, postTopic };