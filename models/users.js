const connection = require('../db/connection');

const getUserByUserId = (username) => {
  const user_name = username.user_id
  return connection('users')
    .select('*')
    .where('username', '=', user_name);
};

const getUsernames = (user) => {
  return connection
    .select('username')
    .from('users');
}

module.exports = { getUserByUserId, getUsernames };