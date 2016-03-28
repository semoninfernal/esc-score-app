
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_items', function(table) {
    table.increments('id').primary();
    table.integer('event_id').references('events.id').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('image');
    table.integer('sort_index').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_items');
};
