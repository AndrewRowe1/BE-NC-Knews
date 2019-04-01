const { articlesData, commentsData, topicsData, usersData } = require('../data');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('users').insert(usersData).returning('*'))
    .then((usersInsertions) => {
      console.log(usersInsertions, 1);
      knex('topics').insert(topicsData).returning('*')
    })
    .then((topicsInsertions) => {
      console.log(topicsInsertions, 2);
    });
};

