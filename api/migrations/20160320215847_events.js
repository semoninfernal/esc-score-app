
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table) {
      table.increments('id').primary();
      table.string('name')/*.unique()*/.notNullable();
      table.boolean('active').defaultTo(false);
      table.timestamps();
    }).createTable('event_members', function(table) {
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('event_id').references('events.id').onDelete('CASCADE');
      table.primary(['user_id', 'event_id']);
      table.boolean('owner').defaultTo(false);
    }).createTable('event_score_types', function(table) {
      table.increments('id').primary();
      table.integer('event_id').references('events.id').onDelete('CASCADE');
      table.string('name').unique();
      table.integer('min');
      table.integer('max');
      table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('DROP TABLE "events" CASCADE')
    .raw('DROP TABLE "event_members" CASCADE')
    .raw('DROP TABLE "event_score_types" CASCADE');
};
