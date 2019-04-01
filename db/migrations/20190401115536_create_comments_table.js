
exports.up = function (knex, Promise) {
  console.log('creating comments table...');
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('body', 5000).notNullable();
    commentsTable.string('belongs_to').notNullable();
    commentsTable.string('created_by').unsigned().notNullable();
    commentsTable.foreign('created_by').references('username').inTable('users').onDelete('cascade');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at', 6).notNullable().defaultTo(knex.fn.now(6));
  });
};

exports.down = function (knex, Promise) {
  console.log('removing comments tables...');
  return knex.schema.dropTable('comments');
};
