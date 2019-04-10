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

const getUsernames = () => {
  return connection
    .select('username')
    .from('users');
}

const postUser = ({ username, name, avatar_url }) => {
  const insertObj = { username, name, avatar_url };
  return connection('users')
    .insert(insertObj)
    .returning('*');
};

module.exports = { getUsers, getUserByUserId, getUsernames, postUser };