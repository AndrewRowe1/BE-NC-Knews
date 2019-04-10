const connection = require('../db/connection');

const getUsers = () => {
  return connection('users')
    .select('*');
};

const getUserByUserId = ({ user_id }) => {
  return connection('users')
    .select('*')
    .where('username', '=', user_id);
};

const getUsernames = (user) => {
  return connection
    .select('username')
    .from('users');
}

const postUser = (request) => {
  const insertObj = { username: request.username, name: request.name, avatar_url: request.avatar_url };
  return connection('users')
    .insert(insertObj)
    .returning('*');
};

module.exports = { getUsers, getUserByUserId, getUsernames, postUser };