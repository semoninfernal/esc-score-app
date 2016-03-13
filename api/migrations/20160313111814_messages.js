
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('messages', function(table) {
        table.increments('id');
        table.string('text').notNullable();
      })
    ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
