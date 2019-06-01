
exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('author').unsigned().notNullable();
    commentsTable.foreign('author').references('username').inTable('users').onDelete('cascade');
    commentsTable.integer('article_id').unsigned().notNullable();
    commentsTable.foreign('article_id').references('article_id').inTable('articles').onDelete('cascade');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at', 20).notNullable().defaultTo(knex.fn.now(20));
    commentsTable.string('body', 5000).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
