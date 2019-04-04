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

module.exports = { getTopics, getTopicsSlug };