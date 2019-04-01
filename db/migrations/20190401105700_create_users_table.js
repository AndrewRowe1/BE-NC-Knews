
exports.up = function (knex, Promise) {
  console.log('creating users table...');
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.string('username').primary();
    usersTable.string('name').notNullable();
    usersTable.string('avatar_url').notNullable();
  });
};

exports.down = function (knex, Promise) {
  console.log('removing users tables...');
  return knex.schema.dropTable('users');
};

