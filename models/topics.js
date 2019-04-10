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

const postTopic = ({ slug, description }) => {
  const insertObj = { slug, description };
  return connection('topics')
    .insert(insertObj)
    .returning('*');
};

module.exports = { getTopics, getTopicsSlug, postTopic };