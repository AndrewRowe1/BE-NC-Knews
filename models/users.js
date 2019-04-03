const connection = require('../db/connection');

const getUserByUserId = (username) => {
  const user_name = username.user_id
  return connection('users')
    .select('*')
    .where('username', '=', user_name);
};

module.exports = getUserByUserId;