const connection = require('../db/connection');

const getTopics = () => {
  return connection
    .select('*')
    .from('topics');
}

module.exports = getTopics;