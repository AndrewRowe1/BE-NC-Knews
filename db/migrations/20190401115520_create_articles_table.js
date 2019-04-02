
exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.string('body', 5000).notNullable();
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.string('topic').unsigned().notNullable();
    articlesTable.foreign('topic').references('slug').inTable('topics').onDelete('cascade');
    articlesTable.string('author').unsigned().notNullable();
    articlesTable.foreign('author').references('username').inTable('users').onDelete('cascade');
    articlesTable.date('created_at', 6).notNullable().defaultTo(knex.fn.now(6));
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
